<template>
  <n-card :title="post.subject">
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
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { NSpace, NImage, NAvatar, NCard } from 'naive-ui'
import { Post } from '../types'

export default defineComponent({
  name: 'PostComponent',
  components: {
    NSpace,
    NImage,
    NCard,
    NAvatar
  },
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true
    }
  },
  setup: () => {
    return {
      nl2br: (str: string) => {
        const breakTag = '<br />'
        const replaceStr = '$1' + breakTag + '$2'
        return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, replaceStr)
      }
    }
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
