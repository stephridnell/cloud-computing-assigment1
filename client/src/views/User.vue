<template>
  <n-layout-content>
    <change-password :currentUser="currentUser" />
    <user-posts :currentUser="currentUser" />
  </n-layout-content>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import {
  NLayoutContent
} from 'naive-ui'
import { useStore } from 'vuex'
import ChangePassword from '../components/ChangePassword.vue'
import UserPosts from '../components/UserPosts.vue'

export default defineComponent({
  name: 'UserView',
  components: {
    NLayoutContent,
    ChangePassword,
    UserPosts
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
