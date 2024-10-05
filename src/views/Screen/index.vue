<template>
  <div class="pptist-screen">
    <BaseView :changeViewMode="changeViewMode" v-if="viewMode === 'base'" />
    <PresenterView :changeViewMode="changeViewMode" v-else-if="viewMode === 'presenter'" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { KEYS } from '@/configs/hotkey'
import useScreening from '@/hooks/useScreening'

import BaseView from './BaseView.vue'
import PresenterView from './PresenterView.vue'
import { __v_store__ } from '@/main'

const viewMode = ref<'base' | 'presenter'>('base')

const changeViewMode = (mode: 'base' | 'presenter') => {
  viewMode.value = mode
}

const { exitScreening } = useScreening()

// 快捷键退出放映
const keydownListener = (e: KeyboardEvent) => {
  const key = e.key.toUpperCase()
  if (key === KEYS.ESC) exitScreening()
}

onMounted(() => __v_store__.value!.root.addEventListener('keydown', keydownListener))
onUnmounted(() => __v_store__.value!.root.removeEventListener('keydown', keydownListener))
</script>

<style lang="scss" scoped>
.pptist-screen {
  width: 100%;
  height: 100%;
}
</style>