<template>
  <n-layout-content>
    <latest-posts style="margin-bottom: 50px" />
    <new-post />
  </n-layout-content>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NLayoutContent } from 'naive-ui'
import NewPost from '@/components/NewPost.vue'
import LatestPosts from '@/components/LatestPosts.vue'

export default defineComponent({
  name: 'ForumView',
  components: {
    NLayoutContent,
    NewPost,
    LatestPosts
  }
})
</script>
