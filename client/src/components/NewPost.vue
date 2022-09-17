<template>
  <n-card title="New post">
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
      <n-form-item path="image" label="Image">
        <n-upload
          ref="upload"
          :default-upload="false"
          :max="1"
          @change="handleChange"
        >
          <n-button>Select File</n-button>
        </n-upload>
      </n-form-item>

      <n-row :gutter="[0, 24]">
        <n-col :span="24">
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
            "
          >
            <n-button :loading="loading" type="primary" @click="handleValidateButtonClick">
              Submit
            </n-button>
          </div>
        </n-col>
      </n-row>
    </n-form>
  </n-card>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import {
  FormInst,
  FormRules,
  NForm,
  NFormItem,
  NInput,
  NRow,
  NCol,
  NCard,
  NUpload,
  NButton,
  useMessage
} from 'naive-ui'
import type { UploadInst, UploadFileInfo } from 'naive-ui'
import http from '../http'
import { useStore } from 'vuex'

interface ModelType {
  subject: string
  messageText: string
  image: File | null
}

export default defineComponent({
  name: 'NewPost',
  components: {
    NForm,
    NFormItem,
    NInput,
    NRow,
    NCol,
    NButton,
    NCard,
    NUpload
  },
  setup: (_props, { emit }) => {
    const store = useStore()
    const currentUser = computed(() => store.getters.currentUser)
    const formRef = ref<FormInst | null>(null)
    const message = useMessage()
    const uploadRef = ref<UploadInst | null>(null)
    const loadingRef = ref(false)
    const modelRef = ref<ModelType>({
      subject: '',
      messageText: '',
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
      handleChange: (data: { file: UploadFileInfo }) => {
        modelRef.value.image = data.file.file as File
      },
      handleValidateButtonClick: async (e: MouseEvent) => {
        e.preventDefault()
        emit('newPost')
        loadingRef.value = true
        try {
          await formRef.value?.validate()
          const formData = new FormData()
          formData.append('subject', modelRef.value.subject)
          formData.append('messageText', modelRef.value.messageText)
          formData.append('userId', currentUser.value.id)
          if (modelRef.value.image) {
            formData.append('image', modelRef.value.image)
          }
          await http.post('/post', formData)
          message.success('New message posted')
          modelRef.value = {
            subject: '',
            messageText: '',
            image: null
          }
          uploadRef.value = null
          emit('newPost')
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
