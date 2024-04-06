<script lang="ts" setup>

</script>

<template>
  <main px-12 pb-12>
    <ContentDoc v-slot="{ doc }">
      <article prose m-auto font-roboto>
        <ContentRenderer :value="doc">
          <ContentRendererMarkdown :value="doc" />
        </ContentRenderer>
      </article>
    </ContentDoc>

    <div flex justify-center>
      <img
        width="300"
        rounded-full m-auto
        src="https://avatars.githubusercontent.com/u/12198452"
      >
    </div>
  </main>
</template>
