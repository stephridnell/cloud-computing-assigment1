<template>
  <n-layout-content>
    <n-space vertical>
      <change-password :currentUser="currentUser" />
      <user-posts :currentUser="currentUser" />
    </n-space>
  </n-layout-content>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import {
  NLayoutContent,
  NSpace
} from 'naive-ui'
import { useStore } from 'vuex'
import ChangePassword from '../components/ChangePassword.vue'
import UserPosts from '../components/UserPosts.vue'

export default defineComponent({
  name: 'UserView',
  components: {
    NLayoutContent,
    ChangePassword,
    UserPosts,
    NSpace
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
