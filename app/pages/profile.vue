<script setup lang="ts">
import { authClient } from '#shared/auth-client'

const { data } = await authClient.useSession(useFetch)
const image = computed(() => data.value?.user.image || '')
</script>

<template>
  <div
    class="flex flex-col gap-4 items-center"
  >
    <ClientOnly>
      <img
        :src="image"
        class="rounded-full size-xs"
      >

      <template #fallback>
        <div
          i-ri-account-circle-fill
          class="my-8 rounded-full size-xs"
        />
      </template>
    </ClientOnly>
    <div>{{ data?.user.name }}</div>

    <button
      v-show="!data"
      @click="() => authClient.signIn.social({
        provider: 'github',
        callbackURL: '/profile',
      })"
    >
      Continue with GitHub
    </button>

    <button
      v-show="data"
      @click="authClient.signOut()"
    >
      Sign out
    </button>
  </div>
</template>
