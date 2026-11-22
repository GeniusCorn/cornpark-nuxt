/**
 * The Theme Switch's engine — the rain effect.
 *
 * Adapted from Pin UI's theme switch engine (MIT, https://github.com/shadcn-labs/Pin-UI),
 * cut down to the rain: the droplet and diwali effects are not used here.
 *
 * RAIN
 *   Rain of the next theme's colour falls at terminal velocity, slanted by
 *   wind, with depth: near drops faster, longer and brighter. Every drop
 *   splashes (a crown of droplets under gravity, a ripple on dry ground), and
 *   near drops leave a puddle that spreads like liquid wetting a surface. The
 *   shower builds, the puddles merge, and the last merge is computed rather
 *   than guessed: the puddles are scaled by exactly what closes the largest
 *   dry gap left.
 *
 * Everything happens inside the scene's own box — here the whole viewport.
 * The next theme is painted under the controls. When the scene is covered, the
 * scene itself commits. Reduced motion switches at once; a watchdog finishes
 * any run that stalls (a tab put in the background), so a switch can never
 * hang half done.
 */

export type ThemeName = 'light' | 'dark'

export interface ThemeSwitchEngine {
  /** Switch with the current effect; resolves once the scene has taken the next theme. */
  toggle: () => void
  busy: () => boolean
  destroy: () => void
}

interface Options {
  root: HTMLElement
  button: HTMLElement
  fx: HTMLElement
  /** The moment the scene is fully covered by the next theme. */
  onCommit: (theme: ThemeName) => void
}

const EASE_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)'
/* the longest real run is ~2.4s (a full viewport in rain) */
const WATCHDOG_MS = 5000

/* ── utils ─────────────────────────────────────────────────────────────── */

function noop() {}
const finished = (anim: Animation) => anim.finished.then(noop, noop)
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))
const rand = (a: number, b: number) => a + Math.random() * (b - a)
function easeInOutCubic(p: number) {
  return p < 0.5
    ? 4 * p * p * p
    : 1 - (-2 * p + 2) ** 3 / 2
}
const easeOutCubic = (p: number) => 1 - (1 - p) ** 3

/* "#rrggbb" at zero alpha: fading to "transparent" fades through black in some engines */
function transparentOf(hex: string) {
  const n = Number.parseInt(hex.slice(1), 16)
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, 0)`
}

/* the page's own backgrounds, read from CSS so the two can never drift apart */
function bgOf(root: HTMLElement, theme: ThemeName) {
  const hex = getComputedStyle(root).getPropertyValue(`--pts-bg-${theme}`).trim()
  if (hex.length !== 4)
    return hex
  /* transparentOf reads a 6-digit hex */
  const [, r, g, b] = hex
  return `#${r}${r}${g}${g}${b}${b}`
}

/* a damped harmonic oscillator sampled into a CSS linear() easing */
function springLinear(durationS: number, bounce: number) {
  const zeta = 1 - bounce
  const omega = (2 * Math.PI) / durationS
  const wd = omega * Math.sqrt(1 - zeta * zeta)
  const pts: string[] = []
  for (let i = 0, n = 48; i <= n; i++) {
    const t = (durationS * i) / n
    const x = 1 - Math.exp(-zeta * omega * t) * (Math.cos(wd * t) + ((zeta * omega) / wd) * Math.sin(wd * t))
    pts.push(i === n
      ? '1'
      : x.toFixed(4))
  }
  return `linear(${pts.join(', ')})`
}

const SPRING_MS = 520
/* ── puddle maths ───────────────────────────────────────────────────────── */

interface Lobe { dx: number, dy: number, s: number }
interface Spot { x: number, y: number, born: number, r0: number, rmax: number, lobes: Lobe[], tau?: number, creep?: number }

const RAIN = {
  ambientRatio: 1.4, // far drops per wetting drop
  creepPxPerS: 14, // the slow spread after the splash
  maxPuddles: 170,
  mergeMs: 460,
  minPuddles: 30,
  puddleArea: 85 * 85, // about one surface-wetting drop per this many px²
  rippleMs: 420,
  spawnMs: 900, // how long new drops keep entering
  splashGravity: 2400,
  spreadTauMs: 260, // how fast a wet spot spreads
  tailMs: 380, // the last splashes settle after the switch
  windDeg: 9, // slant from vertical
}

function puddleBase(p: Spot, t: number) {
  const age = Math.max(0, t - p.born)
  const tau = p.tau || RAIN.spreadTauMs
  const creep = p.creep ?? RAIN.creepPxPerS
  return p.r0 + (p.rmax - p.r0) * (1 - Math.exp(-age / tau)) + (creep * age) / 1000
}

/*
 * The smallest uniform scale k at which the spots' main circles cover every
 * pixel. Cell centres are sampled with half a cell's diagonal added to each
 * distance, which makes it a bound for every pixel in the cell rather than an
 * estimate. Spots are bucketed and the search stops once no farther bucket
 * could do better, so it is exact without being slow.
 */
function coverageScale(spots: Spot[], t: number, w: number, h: number) {
  const n = spots.length
  if (!n)
    return 1
  const cell = Math.max(40, Math.max(w, h) / 48)
  const cols = Math.ceil(w / cell)
  const rows = Math.ceil(h / cell)
  const half = Math.hypot(w / cols, h / rows) / 2
  const bases = Array.from<number>({ length: n }).fill(0)
  let maxBase = 0
  for (let i = 0; i < n; i++) {
    bases[i] = puddleBase(spots[i], t)
    if (bases[i] > maxBase)
      maxBase = bases[i]
  }
  const B = cell * 2
  const nx = Math.max(1, Math.ceil(w / B))
  const ny = Math.max(1, Math.ceil(h / B))
  const buckets: number[][] = Array.from({ length: nx * ny }, () => [])
  for (let i = 0; i < n; i++) {
    /* a spot outside the scene joins the edge bucket: it is only ever farther than that */
    const bx = clamp(Math.floor(spots[i].x / B), 0, nx - 1)
    const by = clamp(Math.floor(spots[i].y / B), 0, ny - 1)
    buckets[by * nx + bx].push(i)
  }
  const maxRing = Math.max(nx, ny)
  let worst = 1
  for (let iy = 0; iy < rows; iy++) {
    for (let ix = 0; ix < cols; ix++) {
      const x = ((ix + 0.5) * w) / cols
      const y = ((iy + 0.5) * h) / rows
      const cbx = clamp(Math.floor(x / B), 0, nx - 1)
      const cby = clamp(Math.floor(y / B), 0, ny - 1)
      let best = Infinity
      for (let r = 0; r <= maxRing; r++) {
        if (r >= 1 && ((r - 1) * B + half) / maxBase >= best)
          break
        for (let gy = cby - r; gy <= cby + r; gy++) {
          if (gy < 0 || gy >= ny)
            continue
          for (let gx = cbx - r; gx <= cbx + r; gx++) {
            if (gx < 0 || gx >= nx)
              continue
            if (Math.max(Math.abs(gx - cbx), Math.abs(gy - cby)) !== r)
              continue
            for (const q of buckets[gy * nx + gx]) {
              const need = (Math.hypot(x - spots[q].x, y - spots[q].y) + half) / bases[q]
              if (need < best)
                best = need
            }
          }
        }
      }
      if (best > worst)
        worst = best
    }
  }
  return worst * 1.01
}
/* ── the engine ────────────────────────────────────────────────────────── */

export function createThemeSwitch({ button, fx, onCommit, root }: Options): ThemeSwitchEngine {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)')
  const supportsLinear = CSS.supports('transition-timing-function', 'linear(0, 1)')
  const springEase = supportsLinear
    ? springLinear(SPRING_MS / 1000, 0.3)
    : EASE_OUT

  let busy = false
  let runId = 0
  let destroyed = false
  /* effect-specific teardown, run when a switch ends or is cut short */
  const cleanups: (() => void)[] = []
  /* the layers an effect paints under the controls */
  const layers = new Set<HTMLElement>()

  const currentTheme = (): ThemeName => (root.dataset.theme === 'dark'
    ? 'dark'
    : 'light')
  const size = () => ({ h: root.clientHeight, w: root.clientWidth })

  /* a point in the scene's own coordinates */
  function centreOf(el: Element) {
    const o = root.getBoundingClientRect()
    const r = el.getBoundingClientRect()
    return { x: r.left - o.left + r.width / 2, y: r.top - o.top + r.height / 2 }
  }

  function commit(next: ThemeName) {
    root.dataset.theme = next
    updateLabel()
    onCommit(next)
  }

  function updateLabel() {
    button.setAttribute('aria-label', `Switch to ${currentTheme() === 'dark'
      ? 'light'
      : 'dark'} theme`)
  }

  function pressButton(depth: number) {
    const s = 1 - depth
    const down = button.animate([
      { transform: 'scale(1)' },
      { transform: `scale(${s})` },
    ], {
      duration: 90,
      easing: EASE_OUT,
      fill: 'forwards',
    })
    return finished(down).then(() => {
      const up = button.animate([
        { transform: `scale(${s})` },
        { transform: 'scale(1)' },
      ], {
        duration: SPRING_MS,
        easing: springEase,
        fill: 'forwards',
      })
      down.cancel()
      return finished(up).then(() => up.cancel())
    })
  }

  /* a canvas the size of the scene; under the controls unless it is put in the fx layer */
  function makeCanvas(className: string, over = false) {
    const { h, w } = size()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const canvas = document.createElement('canvas')
    canvas.className = className
    canvas.width = Math.max(1, Math.round(w * dpr))
    canvas.height = Math.max(1, Math.round(h * dpr))
    if (over) {
      fx.appendChild(canvas)
    }
    else {
      root.insertBefore(canvas, root.firstChild)
      layers.add(canvas)
    }
    const ctx = canvas.getContext('2d')!
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    return { canvas, ctx, h, w }
  }

  /* ─ rain ─ */

  interface Drop {
    z: number
    speed: number
    len: number
    width: number
    x0: number
    y0: number
    landX: number
    landY: number
    spawn: number
    land: number
    puddle: boolean
    hit: boolean
    hero?: boolean
    spot?: Spot
  }

  /* a jittered grid: random-looking, with no large dry holes */
  function stratified(n: number, w: number, h: number) {
    const cols = Math.max(1, Math.round(Math.sqrt((n * w) / h)))
    const rows = Math.max(1, Math.ceil(n / cols))
    const cells: [number, number][] = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) cells.push([c, r])
    }
    for (let i = cells.length - 1; i > 0; i--) {
      const j = (Math.random() * (i + 1)) | 0;
      [cells[i], cells[j]] = [cells[j], cells[i]]
    }
    const cw = w / cols
    const ch = h / rows
    return cells.slice(0, n).map(([c, r]) => ({ x: (c + Math.random()) * cw, y: (r + Math.random()) * ch }))
  }

  /* a wet spot is not a perfect disc: bumps where the splash spread further, and specks flung past its edge */
  function makeSpot(d: Drop, scale: number): Spot {
    const lobes: Lobe[] = []
    const nl = 3 + ((Math.random() * 3) | 0)
    for (let l = 0; l < nl; l++) {
      const a = rand(0, Math.PI * 2)
      const off = rand(0.55, 0.85)
      lobes.push({
        dx: Math.cos(a) * off,
        dy: Math.sin(a) * off,
        s: rand(0.28, 0.46),
      })
    }
    const ns = 2 + ((Math.random() * 4) | 0)
    for (let m = 0; m < ns; m++) {
      const a = rand(0, Math.PI * 2)
      const off = rand(1.2, 1.9)
      lobes.push({
        dx: Math.cos(a) * off,
        dy: Math.sin(a) * off,
        s: rand(0.06, 0.14),
      })
    }
    return {
      born: d.land,
      lobes,
      r0: 1.5 + 2.5 * d.z,
      /* the toggle's spot spills well past the 54px button, so it reads */
      rmax: (d.hero
        ? 64
        : 10 + 38 * d.z) * scale * rand(0.9, 1.15),
      x: d.landX,
      y: d.landY,
    }
  }

  function planRain(w: number, h: number) {
    const tan = Math.tan((RAIN.windDeg * Math.PI) / 180)
    const nP = clamp(Math.round((w * h) / RAIN.puddleArea), RAIN.minPuddles, RAIN.maxPuddles)
    const nA = Math.round(nP * RAIN.ambientRatio)
    const scale = clamp(Math.sqrt((w * h) / (1280 * 800)), 0.75, 1.35)
    const drops: Drop[] = []

    const makeDrop = (z: number, landX: number, landY: number, puddle: boolean): Drop => {
      const speed = 1300 + 1500 * z // terminal velocity: near drops read faster
      const len = (16 + 40 * z) * scale
      const y0 = -len - rand(0, 80)
      /* the shower builds: spawn density rises linearly */
      const spawn = RAIN.spawnMs * Math.sqrt(Math.random())
      return {
        hit: false,
        land: spawn + ((landY - y0) / speed) * 1000,
        landX,
        landY,
        len,
        puddle,
        spawn,
        speed,
        width: 0.8 + 1.4 * z,
        x0: landX - tan * (landY - y0),
        y0,
        z,
      }
    }

    for (const p of stratified(nP, w, h)) drops.push(makeDrop(rand(0.55, 1), p.x, p.y, true))
    for (let i = 0; i < nA; i++) drops.push(makeDrop(rand(0.1, 0.5), rand(-0.05, 1.05) * w, rand(0.05, 1.02) * h, false))
    /* a near drop lands on the toggle mid-shower, so the button changes with the rain, not in the final merge */
    const c = centreOf(button)
    const hero = makeDrop(1, c.x, c.y, true)
    const travel = ((c.y - hero.y0) / hero.speed) * 1000
    hero.land = Math.max(travel + 40, RAIN.spawnMs * 0.55 + travel * 0.5)
    hero.spawn = hero.land - travel
    hero.hero = true
    drops.push(hero)

    /* every wet spot is decided now, while nothing moves, so the final merge costs no frame mid-shower */
    let lastLand = 0
    const spots: Spot[] = []
    for (const d of drops) {
      if (!d.puddle)
        continue
      if (d.land > lastLand)
        lastLand = d.land
      d.spot = makeSpot(d, scale)
      spots.push(d.spot)
    }
    const mergeStart = lastLand + 40
    const mergeK = Math.max(1, coverageScale(spots, mergeStart + RAIN.mergeMs, w, h))
    return {
      drops,
      mergeK,
      mergeStart,
      scale,
      tan,
    }
  }

  /* paint the spots (body and lobes) of the next theme, and flip any control a spot reaches */
  function paintSpots(c: CanvasRenderingContext2D, w: number, h: number, spots: Spot[], t: number, k: number, color: string) {
    c.clearRect(0, 0, w, h)
    c.fillStyle = color
    c.beginPath()
    for (const p of spots) {
      const r = puddleBase(p, t) * k
      c.moveTo(p.x + r, p.y)
      c.arc(p.x, p.y, r, 0, Math.PI * 2)
      for (const lb of p.lobes) {
        const lx = p.x + lb.dx * r
        const ly = p.y + lb.dy * r
        const lr = r * lb.s
        c.moveTo(lx + lr, ly)
        c.arc(lx, ly, lr, 0, Math.PI * 2)
      }
    }
    c.fill('nonzero')
  }

  function effectRain(next: ThemeName, id: number) {
    const color = bgOf(root, next)
    /* puddles of the next theme under the controls; the rain over them */
    const wet = makeCanvas('pts__layer')
    const sky = makeCanvas('pts__layer', true)
    const { ctx, h, w } = sky
    const wctx = wet.ctx
    const plan = planRain(w, h)
    const puddles: Spot[] = []
    const splashes: { x: number, y: number, vx: number, vy: number, r: number, born: number, life: number }[] = []
    const rings: { x: number, y: number, born: number, rmax: number, z: number }[] = []
    const tilt = -Math.atan(plan.tan)
    /* one shared streak gradient in unit space, placed per drop by a transform */
    const streak = ctx.createLinearGradient(0, -1, 0, 0)
    streak.addColorStop(0, transparentOf(color))
    streak.addColorStop(1, color)
    let revealed = false
    let revealedAt = 0
    const t0 = performance.now()

    return new Promise<void>((resolve) => {
      const land = (d: Drop) => {
        const { landX: x, landY: y } = d
        if (d.puddle && d.spot) {
          puddles.push(d.spot)
          if (d.hero)
            void pressButton(0.05)
        }
        /* a crown splash: droplets thrown up and out, more for near drops */
        const n = Math.round(2 + d.z * 4)
        for (let j = 0; j < n; j++) {
          const ang = rand(-Math.PI * 0.92, -Math.PI * 0.08)
          const v = rand(60, 210) * (0.5 + d.z)
          splashes.push({
            born: d.land,
            life: rand(200, 340),
            r: rand(0.6, 1.2) * (0.6 + d.z),
            vx: Math.cos(ang) * v,
            vy: Math.sin(ang) * v,
            x,
            y,
          })
        }
        /* a ripple only on dry ground: inside a fresh puddle a ring reads as a target, not water */
        if (!d.puddle) {
          rings.push({
            born: d.land,
            rmax: (5 + 16 * d.z) * plan.scale,
            x,
            y,
            z: d.z,
          })
        }
      }

      const drawSky = (t: number) => {
        ctx.fillStyle = streak
        for (const d of plan.drops) {
          if (d.hit || t < d.spawn)
            continue
          const y = d.y0 + (d.speed * (t - d.spawn)) / 1000
          const x = d.x0 + plan.tan * (y - d.y0)
          ctx.save()
          ctx.translate(x, y)
          ctx.rotate(tilt)
          ctx.scale(1, d.len)
          ctx.globalAlpha = 1
          ctx.fillRect(-d.width / 2, -1, d.width, 1)
          ctx.restore()
        }
        /* ripple rings, a little flattened, as seen at an angle */
        ctx.lineWidth = 1
        ctx.strokeStyle = color
        for (let r = rings.length - 1; r >= 0; r--) {
          const g = rings[r]
          const p = (t - g.born) / RAIN.rippleMs
          if (p >= 1) {
            rings.splice(r, 1)
            continue
          }
          const rad = 1 + g.rmax * easeOutCubic(p)
          ctx.globalAlpha = (1 - p) * (0.3 + 0.4 * g.z)
          ctx.beginPath()
          ctx.ellipse(g.x, g.y, rad, rad * 0.85, 0, 0, Math.PI * 2)
          ctx.stroke()
        }
        /* crown droplets under gravity */
        ctx.fillStyle = color
        for (let s = splashes.length - 1; s >= 0; s--) {
          const sp = splashes[s]
          const age = t - sp.born
          if (age >= sp.life) {
            splashes.splice(s, 1)
            continue
          }
          const at = age / 1000
          ctx.globalAlpha = 1 - age / sp.life
          ctx.beginPath()
          ctx.arc(sp.x + sp.vx * at, sp.y + sp.vy * at + 0.5 * RAIN.splashGravity * at * at, sp.r, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.globalAlpha = 1
      }

      const frame = (now: number) => {
        if (id !== runId) {
          resolve()
          return
        }
        const t = now - t0
        for (const d of plan.drops) {
          if (!d.hit && t >= d.land) {
            d.hit = true
            land(d)
          }
        }
        let k = 1
        if (t >= plan.mergeStart && !revealed) {
          const p = clamp((t - plan.mergeStart) / RAIN.mergeMs, 0, 1)
          k = 1 + (plan.mergeK - 1) * easeInOutCubic(p)
          if (p >= 1) {
            /* the scene's background now equals the puddles' colour: seamless */
            revealed = true
            revealedAt = t
            commit(next)
            wet.canvas.remove()
            layers.delete(wet.canvas)
          }
        }
        if (!revealed)
          paintSpots(wctx, w, h, puddles, t, k, color)
        ctx.clearRect(0, 0, w, h)
        drawSky(t)
        if (revealed && t - revealedAt > RAIN.tailMs) {
          resolve()
          return
        }
        requestAnimationFrame(frame)
      }
      requestAnimationFrame(frame)
    })
  }
  /* ─ core ─ */

  function cleanup() {
    cleanups.splice(0).forEach((fn) => {
      try {
        fn()
      }
      catch {
        /* one teardown failing must not keep the rest from running */
      }
    })
    fx.replaceChildren()
    layers.forEach(el => el.remove())
    layers.clear()
    root.classList.remove('is-switching')
    button.getAnimations().forEach(a => a.cancel())
    button.removeAttribute('aria-busy')
  }

  function toggle() {
    if (busy || destroyed)
      return
    busy = true
    const id = ++runId
    const next: ThemeName = currentTheme() === 'dark'
      ? 'light'
      : 'dark'
    root.classList.add('is-switching')
    button.setAttribute('aria-busy', 'true')

    const instant = reducedMotion.matches || document.visibilityState !== 'visible'
    let run: Promise<void>
    try {
      run = instant
        ? Promise.resolve(commit(next))
        : effectRain(next, id)
    }
    catch (err) {
      run = Promise.reject(err)
    }

    let watchdog = 0
    const guard = new Promise<void>((resolve) => {
      watchdog = window.setTimeout(() => {
        runId++ // stops any effect still in flight
        fx.getAnimations({ subtree: true }).forEach((a) => {
          try {
            a.finish()
          }
          catch {
            a.cancel()
          }
        })
        resolve()
      }, WATCHDOG_MS)
    })

    Promise.race([run, guard])
      .catch(err => console.error('[ThemeSwitch]', err))
      .then(() => {
        window.clearTimeout(watchdog)
        if (destroyed)
          return
        /* never leave the scene on the old theme, whatever happened above */
        if (currentTheme() !== next)
          commit(next)
        cleanup()
        busy = false
      })
  }

  button.addEventListener('click', toggle)
  updateLabel()

  return {
    busy: () => busy,
    destroy() {
      destroyed = true
      runId++
      button.removeEventListener('click', toggle)
      cleanup()
    },
    toggle,
  }
}
