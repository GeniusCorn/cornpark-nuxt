<script lang="ts" setup>
const tools = [
  { href: 'https://www.typescriptlang.org/', icon: 'i-vscode-icons-file-type-typescript-official', name: 'TypeScript' },
  { href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', icon: 'i-vscode-icons-file-type-js-official', name: 'JavaScript' },
  { href: 'https://nuxt.com/', icon: 'i-vscode-icons-file-type-nuxt', name: 'Nuxt' },
  { href: 'https://vuejs.org/', icon: 'i-vscode-icons-file-type-vue', name: 'Vue' },
  { href: 'https://tailwindcss.com/', icon: 'i-vscode-icons-file-type-tailwind', name: 'Tailwind' },
  { href: 'https://unocss.dev/', icon: 'i-vscode-icons-file-type-unocss', name: 'UnoCSS' },
  { href: 'https://nestjs.com/', icon: 'i-vscode-icons-file-type-nestjs', name: 'NestJS' },
  { href: 'https://orm.drizzle.team/', icon: 'i-vscode-icons-file-type-drizzle-orm', name: 'Drizzle' },
  { href: 'https://www.postgresql.org/', icon: 'i-vscode-icons-file-type-pgsql', name: 'PostgreSQL' },
  { href: 'https://www.mysql.com/', icon: 'i-vscode-icons-file-type-mysql', name: 'MySQL' },
  { href: 'https://www.netlify.com/', icon: 'i-vscode-icons-file-type-light-netlify', name: 'Netlify' },
  { href: 'https://code.visualstudio.com/', icon: 'i-vscode-icons-file-type-vscode', name: 'VS Code' },
  { href: 'https://brave.com/', icon: 'i-selfhst-brave', name: 'Brave' },
  { href: 'https://obsidian.md/', icon: 'i-selfhst-obsidian', name: 'Obsidian' },

  // { href: 'https://bitwarden.com/', icon: 'i-selfhst-bitwarden', name: 'Bitwarden' },
]
</script>

<template>
  <div
    class="space-y-6"
  >
    <div>
      Some of the software and technologies I use on a daily basis.
    </div>

    <div
      class="flex flex-row flex-wrap gap-4"
    >
      <NuxtLink
        v-for="tool in tools"
        :key="tool.name"
        class="group border border-black/5 rounded-2xl bg-white/60 flex flex-col gap-2 size-20 shadow-sm transition-all duration-200 ease-out items-center justify-center dark:border-white/10 hover:border-momo/30 dark:bg-white/5 hover:bg-momo/10 hover:shadow-lg dark:hover:border-momo/40 dark:hover:bg-momo/20 hover:-translate-y-1"
        :href="tool.href"
        rel="noopener noreferrer"
        target="_blank"
        :title="tool.name"
      >
        <span
          class="size-12 transition-transform duration-200 group-hover:scale-110"
          :class="[tool.icon]"
        />
      </NuxtLink>
    </div>
  </div>
</template>
