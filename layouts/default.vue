<script setup lang="ts">
const { signOut } = useAuth()

useHead({
  htmlAttrs: {
    class: ['h-full'],
  },
  bodyAttrs: {
    class: ['h-full'],
  },
})
</script>

<template>
  <div>
    <nav>
      <ul>
        <li>
          <NuxtLink to="/app/dashboard">
            Dashboard
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/app/wardrobe">
            Wardrobe
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/app/activities">
            Activities
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
  <div>
    <button @click="signOut()">
      Sign out
    </button>
  </div>
  <div>
    <NuxtPage />
  </div>
</template>
