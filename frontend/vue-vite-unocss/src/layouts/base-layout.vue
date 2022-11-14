<script setup lang="ts">
const menuOptions = shallowRef([
  {
    label: "Home",
    key: "test",
  },
]);
</script>

<template>
  <n-menu mode="horizontal" :options="menuOptions"></n-menu>
</template>

<style></style>
