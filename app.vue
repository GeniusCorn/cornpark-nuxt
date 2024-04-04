<template>
  <div flex flex-row gap-4 justify-between>
    <div text-red>
      CornPark
    </div>

    <div flex flex-row gap-4>
      <div>Blog</div>
      <div>Projects</div>
    </div>
  </div>

  <div>
    <NuxtPage />
  </div>
</template>

<style>
body {
  background-color: #fff;
  color: rgba(0,0,0,0.8);
}
.dark-mode body {
  background-color: #091a28;
  color: #ebf4f1;
}
.sepia-mode body {
  background-color: #f1e7d0;
  color: #433422;
}
</style>
