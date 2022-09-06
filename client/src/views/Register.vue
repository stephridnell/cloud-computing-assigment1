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
      <n-row :gutter="[0, 24]">
        <n-col :span="24">
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
            "
          >
            <n-button round type="primary" @click="handleValidateButtonClick">
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
  FormItemInst,
  FormRules,
  NForm,
  NFormItem,
  NInput,
  NRow,
  NCol,
  NCard,
  NButton
} from 'naive-ui'

interface ModelType {
  id: string
  username: string
  password: string
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
    NCard
  },
  setup: () => {
    const formRef = ref<FormInst | null>(null)
    const rPasswordFormItemRef = ref<FormItemInst | null>(null)
    const modelRef = ref<ModelType>({
      id: '',
      username: '',
      password: ''
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
      rPasswordFormItemRef,
      model: modelRef,
      rules,
      handleValidateButtonClick: async (e: MouseEvent) => {
        e.preventDefault()
        try {
          await formRef.value?.validate()
          // submit
        } catch (err) {
          // do nothing, .validate() handles the form error messages
          // i just dont want unresolved promise errors showing up in console
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
