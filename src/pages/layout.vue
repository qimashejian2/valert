<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const active = ref()

watch(() => active.value, router.replace)

watch(
  () => route.path,
  (newValue) => {
    active.value = newValue
  },
  { immediate: true }
)
</script>

<template>
  <div class="layout">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>

    <var-bottom-navigation border safe-area fixed v-model:active="active">
      <var-bottom-navigation-item :label="$t('HOME')" icon="home" name="/layout/home" />
      <var-bottom-navigation-item :label="$t('TOPIC')" icon="heart" name="/layout/topic" />
      <var-bottom-navigation-item :label="$t('MESSAGE')" icon="bell" name="/layout/message" />
      <var-bottom-navigation-item :label="$t('PROFILE')" icon="account-circle" name="/layout/profile" />
    </var-bottom-navigation>
  </div>
</template>

<style lang="less" scoped>
.layout {
  padding-bottom: 51px;
  overflow-y: auto;
  height: var(--app-height);
}
</style>
