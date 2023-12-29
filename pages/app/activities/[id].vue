<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const route = useRoute()
</script>

<template>
  Activity for Id {{ route.params.id }}
</template>
