<template>
  <n-layout-content>
    <change-password :currentUser="currentUser" />
  </n-layout-content>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import {
  NLayoutContent
} from 'naive-ui'
import { useStore } from 'vuex'
import ChangePassword from '../components/ChangePassword.vue'

export default defineComponent({
  name: 'UserView',
  components: {
    NLayoutContent,
    ChangePassword
  },
  setup: () => {
    const store = useStore()
    const currentUser = computed(() => store.getters.currentUser)
    return {
      currentUser
    }
  }
})
</script>
