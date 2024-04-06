<script lang="ts" setup>

</script>

<template>
  <main px-12 pb-12>
    <div
      m-auto prose font-sans cursor-pointer hover:text-momo
      flex items-center gap-2
      @click="$router.go(-1)"
    >
      <div i-tabler-arrow-back-up />
      Back
    </div>
    <ContentDoc>
      <template #default="{ doc }">
        <article prose m-auto font-sans>
          <!-- <h1>{{ doc.title }}</h1> -->
          <ContentRenderer :value="doc" />
        </article>
      </template>

      <template #empty>
        <article prose m-auto font-sans>
          <h1>Document is empty.</h1>
        </article>
      </template>

      <template #not-found>
        <article prose m-auto font-sans>
          <h1>Document not found.</h1>
        </article>
      </template>
    </ContentDoc>
  </main>
</template>

<style scoped>

</style>
