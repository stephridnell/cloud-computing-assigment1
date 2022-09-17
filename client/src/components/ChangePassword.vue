<template>
  <n-card title="Change password">
    <n-form ref="formRef" :model="model" :rules="rules">
      <n-form-item path="password" label="Current password">
        <n-input
          type="password"
          v-model:value="model.password"
          show-password-on="click"
          placeholder=""
        />
      </n-form-item>
      <n-form-item path="newPassword" label="New password">
        <n-input
          type="password"
          v-model:value="model.newPassword"
          show-password-on="click"
          placeholder=""
        />
      </n-form-item>

      <n-row :gutter="[0, 24]">
        <n-col :span="24">
          <n-button :loading="loading" type="primary" @click="handleValidateButtonClick">
            Change
          </n-button>
        </n-col>
      </n-row>
    </n-form>
  </n-card>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import {
  FormInst,
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
import { User } from '../types'
import router from '../router'
import { useStore } from 'vuex'

interface ModelType {
  password: string
  newPassword: string
}
export default defineComponent({
  name: 'ChangePassword',
  components: {
    NForm,
    NFormItem,
    NInput,
    NRow,
    NCol,
    NCard,
    NButton
  },
  props: {
    currentUser: {
      type: Object as PropType<User>,
      required: true
    }
  },
  setup: (props) => {
    const store = useStore()
    const formRef = ref<FormInst | null>(null)
    const message = useMessage()
    const loadingRef = ref(false)
    const modelRef = ref<ModelType>({
      password: '',
      newPassword: ''
    })
    const rules: FormRules = {
      password: [
        {
          required: true,
          message: 'Current password is required'
        }
      ],
      newPassword: [
        {
          required: true,
          message: 'New password is required'
        }
      ]
    }
    return {
      formRef,
      model: modelRef,
      loading: loadingRef,
      rules,
      handleValidateButtonClick: async (e: MouseEvent) => {
        e.preventDefault()
        loadingRef.value = true
        try {
          await formRef.value?.validate()
          await http.post(`/${props.currentUser.id}/update-password`, modelRef.value)
          message.success('Success. Please login with your new password.')
          store.commit('logout')
          router.push('/login')
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
