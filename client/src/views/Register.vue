<template>
  <n-card title="Register">
    <n-form ref="formRef" :model="model" :rules="rules">
      <n-form-item path="id" label="ID">
        <n-input
          v-model:value="model.id"
          @keydown.enter.prevent
          placeholder=""
        />
      </n-form-item>
      <n-form-item path="username" label="Username">
        <n-input
          v-model:value="model.username"
          @keydown.enter.prevent
          placeholder=""
        />
      </n-form-item>
      <n-form-item path="password" label="Password">
        <n-input
          type="password"
          v-model:value="model.password"
          show-password-on="click"
          placeholder=""
        />
      </n-form-item>
      <n-form-item path="userImage" label="User image">
        <n-upload
          ref="upload"
          action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
          :default-upload="false"
          :max="1"
          multiple
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
            <n-button :loading="loading" round type="primary" @click="handleValidateButtonClick">
              Register
            </n-button>
            <router-link to="/login">Login</router-link>
          </div>
        </n-col>
      </n-row>
    </n-form>
  </n-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
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

interface ModelType {
  id: string
  username: string
  password: string
  userImage: File | null
}

export default defineComponent({
  name: 'RegisterView',
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
  setup: () => {
    const formRef = ref<FormInst | null>(null)
    const message = useMessage()
    const uploadRef = ref<UploadInst | null>(null)
    const loadingRef = ref(false)
    const modelRef = ref<ModelType>({
      id: '',
      username: '',
      password: '',
      userImage: null
    })
    const rules: FormRules = {
      id: [
        {
          required: true,
          message: 'ID is required'
        }
      ],
      username: [
        {
          required: true,
          message: 'Username is required'
        }
      ],
      password: [
        {
          required: true,
          message: 'Password is required'
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
        modelRef.value.userImage = data.file.file as File
      },
      handleValidateButtonClick: async (e: MouseEvent) => {
        e.preventDefault()
        loadingRef.value = true
        try {
          await formRef.value?.validate()
          const formData = new FormData()
          formData.append('id', modelRef.value.id)
          formData.append('username', modelRef.value.username)
          formData.append('password', modelRef.value.password)
          if (modelRef.value.userImage) {
            formData.append('userImage', modelRef.value.userImage)
          }

          const response = await http.post('/register', formData)
          console.log(response)
          // submit
        } catch (err: any) {
          message.error(err?.msg ?? 'Something went wrong',
            {
              closable: true,
              duration: 5000
            })
        } finally {
          loadingRef.value = false
        }
      }
    }
  }
})
</script>
<style scoped>
.n-card {
  max-width: 420px;
  margin: 0 auto;
  margin-top: 100px;
}
</style>
