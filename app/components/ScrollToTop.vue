<script lang="ts" setup>
function toTop() {
  window.scrollTo({
    behavior: 'smooth',
    top: 0,
  })
}

const { y } = useWindowScroll()
</script>

<template>
  <button
    title="Scroll to top"
    class="hover-bg-gray-300/40"
    rounded-full op-0 flex size-10 cursor-pointer transition
    duration-300 items-center bottom-4 right-4 justify-center
    fixed z-100 hover:op-100 print:hidden
    :class="y > 300 ? 'op30' : 'op0 pointer-events-none'"
    @click="toTop"
  >
    <div i-ri-arrow-up-s-line />
  </button>
</template>
