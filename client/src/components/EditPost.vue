<template>
  <n-form ref="formRef" :model="model" :rules="rules">
    <n-form-item path="subject" label="Subject">
      <n-input
        v-model:value="model.subject"
        @keydown.enter.prevent
        placeholder=""
      />
    </n-form-item>
    <n-form-item path="messageText" label="Message text">
      <n-input
        type="textarea"
        v-model:value="model.messageText"
        placeholder=""
      />
    </n-form-item>
    <img v-if="newImgURL || post.image" :src="newImgURL ?? post.image" />
    <n-form-item path="image">
      <n-upload
        ref="upload"
        :default-upload="false"
        :max="1"
        @change="handleChange"
        @remove="handleRemove"
      >
        <n-button>Select new image</n-button>
      </n-upload>
    </n-form-item>
    <n-space>
      <n-button strong secondary :loading="loading" type="primary" @click="handleValidateButtonClick">Save</n-button>
      <n-button strong secondary type="tertiary" @click="$emit('cancel')">Cancel</n-button>
    </n-space>
  </n-form>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import {
  FormInst,
  FormRules,
  NForm,
  NFormItem,
  NInput,
  NUpload,
  NSpace,
  NButton,
  useMessage
} from 'naive-ui'
import type { UploadInst, UploadFileInfo } from 'naive-ui'
import http from '../http'
import { useStore } from 'vuex'
import { Post } from '../types'
import router from '../router'

interface ModelType {
  subject: string
  messageText?: string
  image: File | null
}

export default defineComponent({
  name: 'EditPost',
  components: {
    NForm,
    NFormItem,
    NInput,
    NSpace,
    NButton,
    NUpload
  },
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true
    }
  },
  setup: (props, { emit }) => {
    const store = useStore()
    const currentUser = computed(() => store.getters.currentUser)
    const formRef = ref<FormInst | null>(null)
    const message = useMessage()
    const uploadRef = ref<UploadInst | null>(null)
    const imgRef = ref<string | null>(null)
    const loadingRef = ref(false)
    const modelRef = ref<ModelType>({
      subject: props.post.subject,
      messageText: props.post.message_text,
      image: null
    })
    const rules: FormRules = {
      subject: [
        {
          required: true,
          message: 'Subject is required'
        }
      ]
    }
    return {
      formRef,
      model: modelRef,
      loading: loadingRef,
      rules,
      upload: uploadRef,
      handleRemove: () => {
        imgRef.value = null
        modelRef.value.image = null
      },
      handleChange: (data: { file: UploadFileInfo }) => {
        if (data.file.status !== 'removed') {
          imgRef.value = URL.createObjectURL(data.file.file as File)
          modelRef.value.image = data.file.file as File
        }
      },
      newImgURL: imgRef,
      handleValidateButtonClick: async (e: MouseEvent) => {
        e.preventDefault()
        emit('newPost')
        loadingRef.value = true
        try {
          await formRef.value?.validate()
          const formData = new FormData()
          formData.append('subject', modelRef.value.subject)
          formData.append('messageText', modelRef.value.messageText ?? '')
          formData.append('userId', currentUser.value.id)
          formData.append('oldImage', props.post.image ?? '')
          if (modelRef.value.image) {
            formData.append('image', modelRef.value.image)
          }
          await http.put(`/update/${props.post.id}`, formData)
          message.success('Message updated')
          router.push('/forum')
          window.scrollTo(0, 0)
        } catch (err: any) {
          if (err.msg) {
            message.error(err.msg,
              {
                closable: true,
                duration: 5000
              })
          }
        } finally {
          loadingRef.value = false
        }
      }
    }
  }
})
</script>
