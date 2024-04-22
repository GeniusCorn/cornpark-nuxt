<script lang="ts" setup>

</script>

<template>
  <main px-12 pb-12>
    <ContentDoc v-slot="{ doc }">
      <article m-auto font-roboto prose>
        <ContentRenderer :value="doc">
          <ContentRendererMarkdown :value="doc" />
        </ContentRenderer>
      </article>
    </ContentDoc>

    <div flex justify-center>
      <img
        width="300"
        rounded-full
        src="https://avatars.githubusercontent.com/u/12198452"
      >
    </div>
  </main>
</template>
