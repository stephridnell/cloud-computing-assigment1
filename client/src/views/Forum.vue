<template>
  <n-layout-content>
    <h1>Forum</h1>
    <new-post />
  </n-layout-content>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NLayoutContent } from 'naive-ui'
import NewPost from '@/components/NewPost.vue'

export default defineComponent({
  name: 'ForumView',
  components: {
    NLayoutContent,
    NewPost
  }
})
</script>
