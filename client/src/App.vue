<template>
  <n-layout embedded content-style="min-height: 100vh;">
    <n-message-provider>
      <router-view />
    </n-message-provider>
  </n-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NMessageProvider, NLayout } from 'naive-ui'

export default defineComponent({
  name: 'App',
  components: {
    NMessageProvider,
    NLayout
  }
})
</script>

<style lang="scss">
html,body {
  margin:0;
  padding:0;
  height:100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}
</style>
