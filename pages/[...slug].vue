<script lang="ts" setup>

</script>

<template>
  <main px-12 pb-12>
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
