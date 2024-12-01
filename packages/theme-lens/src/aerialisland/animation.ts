import type { EasingGenerator, MotionKeyframesDefinition, TimelineDefinition } from 'motion'
import { spring, timeline } from 'motion'
import { ref } from 'vue'

export const isAttachSide = ref<boolean>()
export const isAttachLeadingSide = ref<boolean>()
export const isAttachTrailing = ref<boolean>()

export const isExpanded = ref<boolean>()

export const stylesConfig: MotionKeyframesDefinition = {
  borderWidth: '1px',
  margin: '1rem',
}

/**
 * 展开导航栏动画
 * @param width - 导航栏目标宽度（像素值）
 * 定义了导航栏展开时的动画序列，包括宽度的变化、背景颜色渐变、模糊效果以及初始显示状态。
 */
export function expandNavbarAnimation(width: string) {
  const sequence: TimelineDefinition = [
    // ['.aerial-island .center-side .overlay', { display: 'block' }, { duration: 0 }], // Initialize visible
    ['.aerial-island .center-side', { width: [`200px`, `${width}px`] }, { easing: spring({ stiffness: 70, damping: 7, restSpeed: 200 }), duration: 0.6 }],
    // ['.aerial-island .center-side .overlay', { backgroundColor: ['hsla(0, 0%, 100%, 0.7)', 'transparent'] }, { duration: 0.8, at: '<' }],
    // ['.aerial-island .center-side .overlay', { backdropFilter: ['blur(2.2px)', 'blur(0)'] }, { duration: 0.8, at: '<' }],
    // ['.aerial-island .center-side .overlay', { display: 'none' }, { duration: 0 }],
  ]
  return timeline(sequence)
}

/**
 * 收起导航栏动画
 * @param width - 导航栏当前宽度（像素值）
 * 定义了导航栏收起时的动画序列，包括宽度的收缩、背景颜色渐变、模糊效果、轻微高度调整以及最终隐藏状态。
 */
export function collapseNavbarAnimation(width: string) {
  const collapseStyles: Record<string, MotionKeyframesDefinition> & {
    spring: EasingGenerator
  } = {
    // blur: { backgroundColor: ['hsla(0, 0%, 100%, 0.7)', 'transparent'], backdropFilter: ['blur(2.2px)', 'blur(0)'] },
    height: { height: ['43px', '44px'] },
    spring: spring({ velocity: 80, stiffness: 70, damping: 7 }),
  }

  const sequence: TimelineDefinition = [
    ['.aerial-island .center-side', { width: [`${width}px`, `200px`] }, { duration: 0.4 }],
    // ['.aerial-island .center-side .overlay', collapseStyles.blur, { duration: 0.8, at: '<' }],
  ]

  const addHeightAnimation = (selector: string) => {
    sequence.push([selector, collapseStyles.height, { easing: collapseStyles.spring, duration: 0.6, at: '<' }])
  }

  addHeightAnimation('.aerial-island .center-side')

  if (isAttachLeadingSide.value) {
    addHeightAnimation('.aerial-island .leading-side')
  }

  if (isAttachTrailing.value) {
    addHeightAnimation('.aerial-island .trailing-side')
  }

  // sequence.push(['.aerial-island .center-side .overlay', { display: ['block', 'none'] }, { duration: 0.1, at: '<' }])

  return timeline(sequence)
}

// Side Animations

type Side = 'leading' | 'trailing' | 'both'

export function attachSideAnimation(side: Side) {
  const sequence: TimelineDefinition = []
  const sideBaseStyles: Record<string, MotionKeyframesDefinition> = {
    leading: { borderRadius: '20px 0 0 20px', marginRight: 0, borderTopWidth: stylesConfig.borderWidth, borderRightWidth: 0, borderBottomWidth: stylesConfig.borderWidth, borderLeftWidth: stylesConfig.borderWidth },
    trailing: { borderRadius: '0 20px 20px 0', marginLeft: 0, borderTopWidth: stylesConfig.borderWidth, borderRightWidth: stylesConfig.borderWidth, borderBottomWidth: stylesConfig.borderWidth, borderLeftWidth: 0 },
    center: { borderRadius: 0, borderTopWidth: stylesConfig.borderWidth, borderRightWidth: 0, borderBottomWidth: stylesConfig.borderWidth, borderLeftWidth: 0 },
  }

  const sideMapping = {
    leading: () => {
      isAttachLeadingSide.value = true
      sequence.push(['.aerial-island .leading-side', sideBaseStyles.leading, { at: '<' }])
      sequence.push(['.aerial-island .center-side', sideBaseStyles.trailing, { at: '<' }])

      // Border
      sequence.push(['.aerial-island .leading-side', { borderTopWidth: stylesConfig.borderWidth, borderRightWidth: 0, borderBottomWidth: stylesConfig.borderWidth, borderLeftWidth: stylesConfig.borderWidth }, { at: '<' }])
      sequence.push(['.aerial-island .trailing-side', { borderTopWidth: 0, borderRightWidth: 0, borderBottomWidth: 0, borderLeftWidth: 0 }, { at: '<' }])
      sequence.push(['.aerial-island .center-side', { borderTopWidth: 0, borderRightWidth: 0, borderBottomWidth: 0, borderLeftWidth: 0 }, { at: '<' }])
    },
    trailing: () => {
      isAttachTrailing.value = true
      sequence.push(['.aerial-island .trailing-side', sideBaseStyles.trailing, { at: '<' }])
      sequence.push(['.aerial-island .center-side', sideBaseStyles.leading, { at: '<' }])

      // Border
      sequence.push(['.aerial-island .leading-side', { borderWidth: stylesConfig.borderWidth }, { at: '<' }])
    },
    both: () => {
      isAttachLeadingSide.value = true
      isAttachTrailing.value = true
      sequence.push(['.aerial-island .leading-side', sideBaseStyles.leading, { at: '<' }])
      sequence.push(['.aerial-island .trailing-side', sideBaseStyles.trailing, { at: '<' }])
      sequence.push(['.aerial-island .center-side', sideBaseStyles.center, { at: '<' }])
    },
  }

  sideMapping[side]?.()

  return timeline(sequence)
}

export function detachSideAnimation(side: Side) {
  const sequence: TimelineDefinition = []

  const sideBaseStyles: Record<string, MotionKeyframesDefinition> = {
    leading: { borderRadius: '20px', marginRight: '1rem' },
    trailing: { borderRadius: '20px', marginLeft: '1rem' },
    center: { borderRadius: '20px' },
  }

  const sideCenterStyles: Record<string, MotionKeyframesDefinition> = {
    leading: { borderRadius: '20px 0 0 20px' },
    trailing: { borderRadius: '0 20px 20px 0' },
    both: { borderRadius: '20px' },
  }

  const sideMapping = {
    leading: () => {
      isAttachLeadingSide.value = false
      // TODO: 待完成
      sequence.push(['.aerial-island .leading-side', { borderRadius: '20px', marginRight: '1rem' }, { at: '<' }])
      sequence.push(['.aerial-island .trailing-side', { borderRadius: '0 20px 20px 0' }, { at: '<' }])
      sequence.push(['.aerial-island .center-side', sideCenterStyles.leading, { at: '<' }])

      // Border
      sequence.push(['.aerial-island .leading-side', { borderWidth: stylesConfig.borderWidth }, { at: '<' }])
      sequence.push(['.aerial-island .trailing-side', { borderTopWidth: stylesConfig.borderWidth, borderRightWidth: stylesConfig.borderWidth, borderBottomWidth: stylesConfig.borderWidth, borderLeftWidth: 0 }, { at: '<' }])
      sequence.push(['.aerial-island .center-side', { borderTopWidth: stylesConfig.borderWidth, borderRightWidth: 0, borderBottomWidth: stylesConfig.borderWidth, borderLeftWidth: stylesConfig.borderWidth }, { at: '<' }])
    },
    trailing: () => {
      isAttachTrailing.value = false
      sequence.push(['.aerial-island .leading-side', { borderRadius: '20px 0 0 20px', marginRight: 0 }, { at: '<' }])
      sequence.push(['.aerial-island .trailing-side', sideBaseStyles.trailing, { at: '<' }])
      sequence.push(['.aerial-island .center-side', sideCenterStyles.trailing, { at: '<' }])

      // Border
      sequence.push(['.aerial-island .leading-side', { borderTopWidth: stylesConfig.borderWidth, borderRightWidth: 0, borderBottomWidth: stylesConfig.borderWidth, borderLeftWidth: stylesConfig.borderWidth }, { at: '<' }])
      sequence.push(['.aerial-island .trailing-side', { borderWidth: stylesConfig.borderWidth }, { at: '<' }])
      sequence.push(['.aerial-island .center-side', { borderTopWidth: stylesConfig.borderWidth, borderRightWidth: stylesConfig.borderWidth, borderBottomWidth: stylesConfig.borderWidth, borderLeftWidth: 0 }, { at: '<' }])
    },
    both: () => {
      isAttachLeadingSide.value = false
      isAttachTrailing.value = false
      sequence.push(['.aerial-island .leading-side', sideBaseStyles.leading, { at: '<' }])
      sequence.push(['.aerial-island .trailing-side', sideBaseStyles.trailing, { at: '<' }])
      sequence.push(['.aerial-island .center-side', sideCenterStyles.both, { at: '<' }])

      // Border
      sequence.push(['.aerial-island .leading-side', { borderWidth: stylesConfig.borderWidth }, { at: '<' }])
      sequence.push(['.aerial-island .trailing-side', { borderWidth: stylesConfig.borderWidth }, { at: '<' }])
      sequence.push(['.aerial-island .center-side', { borderWidth: stylesConfig.borderWidth }, { at: '<' }])
    },
  }

  sideMapping[side]?.()

  return timeline(sequence)
}

export const attachbothSideAnimation = () => attachSideAnimation('both')
export const detachbothSideAnimation = () => detachSideAnimation('both')
export const attachLeadingSideAnimation = () => attachSideAnimation('leading')
export const detachLeadingSideAnimation = () => detachSideAnimation('leading')
export const attachTrailingSideAnimation = () => attachSideAnimation('trailing')
export const detachTrailingSideAnimation = () => detachSideAnimation('trailing')

export function expandedAnimation() {
  const sequence: TimelineDefinition = [['.aerial-island', { top: ['2.5%', '10%'] }]]

  const collapseStyles: Record<string, MotionKeyframesDefinition> & {
    spring: EasingGenerator
  } = {
    blur: { filter: ['blur(0', 'blur(10px)'] },
    height: { height: ['43px', '200px'] },
    spring: spring({ velocity: 80, stiffness: 70, damping: 7 }),
  }

  isExpanded.value = true

  const addHeightAnimation = (selector: string) => {
    sequence.push([selector, collapseStyles.height, { easing: collapseStyles.spring, duration: 0.6, at: '<' }])
  }

  addHeightAnimation('.aerial-island .center-side')
  addHeightAnimation('.aerial-island .leading-side')
  addHeightAnimation('.aerial-island .trailing-side')

  sequence.push(['.aerial-island .leading-side > *', collapseStyles.blur, { easing: collapseStyles.spring, duration: 0.6, at: '<' }])
  sequence.push(['.aerial-island .trailing-side > *', collapseStyles.blur, { easing: collapseStyles.spring, duration: 0.6, at: '<' }])

  sequence.push(['.aerial-island .leading-side', { width: ['', '20px'] }, { easing: collapseStyles.spring, duration: 0.6, at: '<' }])
  sequence.push(['.aerial-island .trailing-side', { width: ['', '20px'] }, { easing: collapseStyles.spring, duration: 0.6, at: '<' }])

  return timeline(sequence)
}
