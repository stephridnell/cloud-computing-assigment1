<template>
  <div>
    <TopNav />
    <n-message-provider>
      <router-view />
    </n-message-provider>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TopNav from '@/components/TopNav.vue'
import { NMessageProvider } from 'naive-ui'

export default defineComponent({
  name: 'App',
  components: {
    TopNav,
    NMessageProvider
  }
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 1rem;
}
</style>
