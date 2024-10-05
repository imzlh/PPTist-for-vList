import { onMounted, onUnmounted, ref, type Ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useSlidesStore } from '@/store'
import { __v_store__ } from '@/main'

export default (wrapRef?: Ref<HTMLElement | undefined>) => {
  const slidesStore = useSlidesStore()
  const { viewportRatio } = storeToRefs(slidesStore)

  const slideWidth = ref(0)
  const slideHeight = ref(0)

  // 计算和更新幻灯片内容的尺寸（按比例自适应屏幕）
  const setSlideContentSize = () => {
    const slideWrapRef = wrapRef?.value || __v_store__.value!.root
    const winWidth = slideWrapRef.clientWidth
    const winHeight = slideWrapRef.clientHeight
    let width, height

    if (winHeight / winWidth === viewportRatio.value) {
      width = winWidth
      height = winHeight
    }
    else if (winHeight / winWidth > viewportRatio.value) {
      width = winWidth
      height = winWidth * viewportRatio.value
    }
    else {
      width = winHeight / viewportRatio.value
      height = winHeight
    }
    slideWidth.value = width
    slideHeight.value = height
  }

  onMounted(() => {
    setSlideContentSize()
    __v_store__.value!.root.addEventListener('resize', setSlideContentSize)
  })
  onUnmounted(() => {
    __v_store__.value!.root.removeEventListener('resize', setSlideContentSize)
  })

  return {
    slideWidth,
    slideHeight,
  }
}