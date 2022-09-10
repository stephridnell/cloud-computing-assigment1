<template>
  <n-layout-content>
    <latest-posts ref="latestPostsRef" style="margin-bottom: 50px" />
    <new-post @newPost="refreshPosts" />
  </n-layout-content>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { NLayoutContent } from 'naive-ui'
import NewPost from '@/components/NewPost.vue'
import LatestPosts from '@/components/LatestPosts.vue'

export default defineComponent({
  name: 'ForumView',
  components: {
    NLayoutContent,
    NewPost,
    LatestPosts
  },
  setup: function () {
    const latestPostsRef = ref<typeof LatestPosts>()
    return {
      latestPostsRef,
      refreshPosts: function () {
        latestPostsRef.value?.fetchPosts()
      }
    }
  }
})
</script>
