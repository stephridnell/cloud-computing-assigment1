<template>
  <div>
    <n-space align="center" justify="flex-end" style="margin-bottom: 24px">
      <n-button strong secondary type="primary" @click="scrollToBottom">New message</n-button>
    </n-space>
    <n-space vertical>
      <n-card v-for="(post, index) in posts" :key="index" :title="post.subject">
        <div style="display: flex;">
          <div flex="0 0 40px">
            <n-avatar
              style="margin-right: 10px"
              round
              :size="40"
              :src="post.user.user_image"
            />
          </div>
          <div>
            <div>
              <strong class="post-user">
                {{ post.user.user_name }}
              </strong><br/>
              <span class="post-date">
                {{ new Date(post.created_at).toLocaleString('en-AU') }}
              </span>
            </div>
            <n-space vertical style="margin-top: 20px">
              <n-image :src="post.image" />
              <div v-html="nl2br(post.message_text)" />
            </n-space>
          </div>
        </div>
      </n-card>
    </n-space>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { NCard, NSpace, NImage, NAvatar, NButton } from 'naive-ui'
import http from '../http'

interface Post {
  // eslint-disable-next-line camelcase
  created_at: number
  // eslint-disable-next-line camelcase
  created_by: string
  image?: string
  // eslint-disable-next-line camelcase
  message_text?: string
  subject: string
  user: {
    id: string
  // eslint-disable-next-line camelcase
    user_image: string
  // eslint-disable-next-line camelcase
    user_name: string
  }
}

interface LatestPostsResponse {
  posts: Post[]
}

const postsRef = ref<Post[]>([])

export default defineComponent({
  name: 'NewPost',
  components: {
    NCard,
    NSpace,
    NImage,
    NAvatar,
    NButton
  },
  setup: () => {
    return {
      posts: postsRef,
      nl2br: (str) => {
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
      const data = await http.get('/latest-posts') as LatestPostsResponse
      postsRef.value = data.posts
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
