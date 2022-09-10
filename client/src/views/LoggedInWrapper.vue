<template>
<n-space vertical size="large">
  <n-layout embedded>
    <n-layout-header bordered>
      <n-space align="flex-end" justify="flex-end">
        <router-link to="/forum">
          <n-button quaternary strong size="large" :class="currentRoute === '/forum' && 'active'">
          <template #icon>
            <n-icon>
              <forum-icon />
            </n-icon>
          </template>
            Forum
          </n-button>
        </router-link>
        <router-link to="/user">
          <n-button quaternary strong size="large" :class="currentRoute === '/user' && 'active'">
            <n-avatar
              style="margin-right: 10px"
              round
              size="small"
              :src="currentUser.user_image"
            />

            {{ currentUser.user_name }}
          </n-button>
        </router-link>
        <n-button quaternary strong size="large" @click="logout">
          <template #icon>
            <n-icon>
              <logout-icon />
            </n-icon>
          </template>
        </n-button>
      </n-space>
    </n-layout-header>
    <router-view />
  </n-layout>
</n-space>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { NLayout, NLayoutHeader, NAvatar, NButton, NSpace, NIcon } from 'naive-ui'
import { useStore } from 'vuex'
import { Logout as LogoutIcon, ListDetails as ForumIcon } from '@vicons/tabler'
import router from '../router'

export default defineComponent({
  name: 'LoggedInWrapper',
  components: {
    NLayout,
    NAvatar,
    NLayoutHeader,
    NButton,
    NSpace,
    NIcon,
    LogoutIcon,
    ForumIcon
  },
  setup: () => {
    const store = useStore()
    const currentUser = computed(() => store.getters.currentUser)
    const currentRoute = computed(() => router.currentRoute.value.path)
    return {
      currentUser,
      currentRoute,
      logout: () => {
        store.commit('logout')
        router.push('/login')
      }
    }
  }
})
</script>

<style scoped>
.n-layout-header {
  padding: 24px;
}

.n-layout-content {
  background: rgba(128, 128, 128, 0.4);
  padding: 24px;
}

a {
  text-decoration: none;
}

.active {
  background: var(--n-color-hover);
}
</style>
