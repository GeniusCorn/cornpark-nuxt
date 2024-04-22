<script lang="ts" setup>

</script>

<template>
  <main px-12 pb-12>
    <div
      m-auto flex cursor-pointer items-center gap-2
      font-sans prose hover:text-momo
      @click="$router.push('/blog')"
    >
      <div i-tabler-arrow-back-up />
      Back
    </div>
    <ContentDoc>
      <template #default="{ doc }">
        <article m-auto font-sans prose>
          <!-- <h1>{{ doc.title }}</h1> -->
          <ContentRenderer :value="doc" />
        </article>
      </template>

      <template #empty>
        <article m-auto font-sans prose>
          <h1>Document is empty.</h1>
        </article>
      </template>

      <template #not-found>
        <article m-auto font-sans prose>
          <h1>Document not found.</h1>
        </article>
      </template>
    </ContentDoc>
  </main>
</template>

<style scoped>

</style>
