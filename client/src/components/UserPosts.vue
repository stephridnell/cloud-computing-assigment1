<template>
  <div>
    <n-space vertical>
      <post-component v-for="(post, index) in posts" :key="index" :post="post"/>
    </n-space>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { NSpace } from 'naive-ui'
import http from '../http'
import PostComponent from './PostComponent.vue'
import { Post, User } from '../types'

interface LatestPostsResponse {
  posts: Post[]
}

const postsRef = ref<Post[]>([])

export default defineComponent({
  name: 'UserPosts',
  components: {
    PostComponent,
    NSpace
  },
  props: {
    currentUser: {
      type: Object as PropType<User>,
      required: true
    }
  },
  setup: () => {
    return {
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
  mounted: async function () {
    const data = await http.get(`/${this.currentUser.id}/posts`) as LatestPostsResponse
    postsRef.value = data.posts
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
