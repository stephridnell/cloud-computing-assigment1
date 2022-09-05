<template>
  <nav class="nav">
    <router-link to="/login">Login</router-link> |
    <router-link to="/register">Register</router-link> |
    <router-link to="/forum">Forum</router-link> |
    <router-link to="/user">User</router-link>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TopNav',
  props: {
    msg: String
  }
})
</script>
