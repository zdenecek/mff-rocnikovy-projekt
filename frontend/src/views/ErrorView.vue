<template>
  <div class="error">
    <h1>Error</h1>
    <p>{{ $route.query.message }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
})
</script>

<style scoped>

</style>