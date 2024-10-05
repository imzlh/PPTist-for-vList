import { onMounted, onUnmounted, ref } from 'vue'
import { isFullscreen, exitFullscreen } from '@/utils/fullscreen'
import useScreening from '@/hooks/useScreening'
import { __v_store__ } from '@/main'

export default () => {
  const fullscreenState = ref(true)
  const escExit = ref(true)

  const { exitScreening } = useScreening()

  const handleFullscreenChange = () => {
    fullscreenState.value = isFullscreen()
    if (!fullscreenState.value && escExit.value) exitScreening()

    escExit.value = true
  }

  onMounted(() => {
    fullscreenState.value = isFullscreen()
    __v_store__.value!.root.addEventListener('fullscreenchange', handleFullscreenChange)
    __v_store__.value!.root.addEventListener('webkitfullscreenchange', handleFullscreenChange) // Safari 兼容
  })
  onUnmounted(() => {
    __v_store__.value!.root.removeEventListener('fullscreenchange', handleFullscreenChange)
    __v_store__.value!.root.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
  })

  const manualExitFullscreen = () => {
    if (!fullscreenState.value) return
    escExit.value = false
    exitFullscreen()
  }

  return {
    fullscreenState,
    manualExitFullscreen,
  }
}