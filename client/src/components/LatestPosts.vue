<template>
  <div>
    <n-space align="center" justify="flex-end" style="margin-bottom: 24px">
      <n-button strong secondary type="primary" @click="scrollToBottom">New post</n-button>
    </n-space>
    <n-space vertical>
      <post-skeleton v-if="loading" />
      <post-component v-for="(post, index) in posts" :key="index" :post="post"/>
    </n-space>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { NSpace, NButton } from 'naive-ui'
import http from '../http'
import PostComponent from './PostComponent.vue'
import { Post } from '../types'
import PostSkeleton from './PostSkeleton.vue'

interface LatestPostsResponse {
  posts: Post[]
}

const postsRef = ref<Post[]>([])
const loadingRef = ref(true)

export default defineComponent({
  name: 'NewPost',
  components: {
    PostComponent,
    NSpace,
    NButton,
    PostSkeleton
  },
  setup: () => {
    return {
      loading: loadingRef,
      posts: postsRef,
      nl2br: (str: string) => {
        const breakTag = '<br />'
        const replaceStr = '$1' + breakTag + '$2'
        return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, replaceStr)
      },
      scrollToBottom: () => {
        window.scrollTo(0, document.body.scrollHeight)
      }
    }
  },
  methods: {
    fetchPosts: async () => {
      loadingRef.value = true
      const data = await http.get('/latest-posts') as LatestPostsResponse
      postsRef.value = data.posts
      loadingRef.value = false
    }
  },
  mounted: async function () {
    await this.fetchPosts()
  }
})
</script>

<style lang="scss">
img {
  max-width: 100%;
}
.post-user {
  font-size: 16px;
}
.post-date {
  font-size: 12px;
}
</style>
