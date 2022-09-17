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
      <div style="flex-grow:1;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <strong class="post-user">
                {{ post.user.user_name }} <span style="color: grey; font-size: 12px; font-weight: normal;" v-if="isEdited">(Edited)</span>
              </strong><br/>
              <span class="post-date">
                {{ new Date(post.created_at).toLocaleString('en-AU') }}
              </span>
            </div>
            <n-button v-if="canEdit" strong secondary type="primary" @click="editPost">Edit post</n-button>
          </div>
        </div>
        <n-space vertical style="margin-top: 20px">
          <n-image :src="post.image" />
          <div v-html="nl2br(post.message_text)" />
        </n-space>
      </div>
    </div>
    <n-modal
      :show="showModal"
      :style="bodyStyle"
      :bordered="false"
      :segmented="segmented">
      <n-card
        title="Edit post"
        :bordered="false"
        aria-modal="true">
        <edit-post :post="post" @cancel="closeModal" />
      </n-card>
    </n-modal>
  </n-card>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { NSpace, NImage, NAvatar, NCard, NButton, NModal } from 'naive-ui'
import { Post } from '../types'
import EditPost from './EditPost.vue'

export default defineComponent({
  name: 'PostComponent',
  components: {
    NSpace,
    NImage,
    NCard,
    NButton,
    NAvatar,
    NModal,
    EditPost
  },
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true
    },
    canEdit: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  setup: (props) => {
    const showModalRef = ref(false)
    return {
      nl2br: (str: string) => {
        const breakTag = '<br />'
        const replaceStr = '$1' + breakTag + '$2'
        return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, replaceStr)
      },
      isEdited: props.post.updated_at !== props.post.created_at,
      editPost: () => {
        showModalRef.value = true
      },
      closeModal: () => {
        showModalRef.value = false
      },
      showModal: showModalRef,
      bodyStyle: {
        width: '600px'
      },
      segmented: {
        content: 'soft',
        footer: 'soft'
      } as const
    }
  }
})
</script>

<style lang="scss">
.n-image img {
  max-width: 100%;
  max-height: 200px;
}
.post-user {
  font-size: 16px;
}
.post-date {
  font-size: 12px;
}
</style>
