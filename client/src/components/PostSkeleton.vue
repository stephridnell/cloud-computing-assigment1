<template>
  <n-card>
    <div style="display: flex;">
      <div flex="0 0 40px">
        <n-skeleton height="40px" circle />
      </div>
      <div style="flex-grow:1; padding-left:20px;">
        <n-space vertical>
          <n-skeleton style="width: 200px" />
          <n-skeleton style="width: 120px" />
        </n-space>
        <n-space vertical style="margin-top: 20px">
          <n-skeleton height="200px" width="200px" />
          <n-skeleton text :repeat="2" />
          <n-skeleton text style="width: 60%" />
        </n-space>
      </div>
    </div>
  </n-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NSpace, NSkeleton, NCard, NButton } from 'naive-ui'

export default defineComponent({
  name: 'PostSkeleton',
  components: {
    NSpace,
    NSkeleton,
    NCard,
    NButton
  }
})
</script>
