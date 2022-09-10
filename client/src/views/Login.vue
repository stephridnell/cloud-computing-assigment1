<template>
  <n-card title="Login">
    <n-form ref="formRef" :model="model" :rules="rules">
      <n-form-item path="id" label="ID">
        <n-input
          v-model:value="model.id"
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
              Login
            </n-button>
            <router-link to="/register">Register</router-link>
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
  FormItemInst,
  FormRules,
  NForm,
  NFormItem,
  NInput,
  NRow,
  NCol,
  NCard,
  NButton,
  useMessage
} from 'naive-ui'
import http from '../http'
import router from '../router'
import { useStore } from 'vuex'

interface ModelType {
  id: string
  password: string
}

interface LoginResponse {
  user: {
    id: string
    // eslint-disable-next-line camelcase
    user_name: string
    // eslint-disable-next-line camelcase
    user_image: string
  }
}

export default defineComponent({
  name: 'LoginView',
  components: {
    NForm,
    NFormItem,
    NInput,
    NRow,
    NCol,
    NButton,
    NCard
  },
  setup: () => {
    const store = useStore()
    const formRef = ref<FormInst | null>(null)
    const message = useMessage()
    const loadingRef = ref(false)
    const rPasswordFormItemRef = ref<FormItemInst | null>(null)
    const modelRef = ref<ModelType>({
      id: '',
      password: ''
    })
    const rules: FormRules = {
      id: [
        {
          required: true,
          message: 'ID is required'
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
      rPasswordFormItemRef,
      loading: loadingRef,
      model: modelRef,
      rules,
      handleValidateButtonClick: async (e: MouseEvent) => {
        e.preventDefault()
        loadingRef.value = true
        try {
          await formRef.value?.validate()
          const data = await http.post('/auth/login', modelRef.value) as LoginResponse
          store.commit('setCurrentUser', data.user)
          router.push('/forum')
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
<style scoped>
.n-card {
  max-width: 420px;
  margin: 0 auto;
  margin-top: 100px;
}
</style>
