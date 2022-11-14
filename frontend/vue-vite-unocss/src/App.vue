<script setup lang="ts"></script>

<template>
  <n-config-provider>
    <n-message-provider>
      <n-dialog-provider>
        <router-view></router-view>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<style lang="postcss"></style>
