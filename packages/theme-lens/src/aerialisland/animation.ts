import type { EasingGenerator, MotionKeyframesDefinition, TimelineDefinition } from 'motion'
import type { Side } from './type'
import { spring } from 'motion'
import { ref } from 'vue'
import { aerialIslandState, aerialIslandStyles } from './aerialIsland'

// 展开前的宽度
const previousExpandedWidth = ref<string>()
// 收起前的宽度
const previousCollapsedWidth = ref<string>()

/**
 * 展开导航栏动画
 * @param width - 导航栏目标宽度
 */
export function expandWidthAnimation(width: string): TimelineDefinition {
  previousCollapsedWidth.value = width

  const sequence: TimelineDefinition = [
    // ['.aerial-island .center-side .overlay', { display: 'block' }, { duration: 0 }], // Initialize visible
    ['.aerial-island .center-side', { width: [previousExpandedWidth.value || width, width] }, { easing: spring({ stiffness: 70, damping: 7, restSpeed: 200 }), duration: 0.6 }],
    // ['.aerial-island .center-side .overlay', { backgroundColor: ['hsla(0, 0%, 100%, 0.7)', 'transparent'] }, { duration: 0.8, at: '<' }],
    // ['.aerial-island .center-side .overlay', { backdropFilter: ['blur(2.2px)', 'blur(0)'] }, { duration: 0.8, at: '<' }],
    // ['.aerial-island .center-side .overlay', { display: 'none' }, { duration: 0 }],
  ]

  return sequence
}

/**
 * 收起导航栏动画
 * @param width - 收起导航栏目标宽度
 */
export function collapseWidthAnimation(width: string): TimelineDefinition {
  const collapseStyles: Record<string, MotionKeyframesDefinition> & {
    spring: EasingGenerator
  } = {
    // blur: { backgroundColor: ['hsla(0, 0%, 100%, 0.7)', 'transparent'], backdropFilter: ['blur(2.2px)', 'blur(0)'] },
    height: { height: ['43px', '44px'] },
    spring: spring({ velocity: 80, stiffness: 70, damping: 7 }),
  }
  const { side } = aerialIslandState.value

  previousExpandedWidth.value = width

  const sequence: TimelineDefinition = [
    ['.aerial-island .center-side', { width: [previousCollapsedWidth.value || width, width] }, { duration: 0.4 }],
    // ['.aerial-island .center-side .overlay', collapseStyles.blur, { duration: 0.8, at: '<' }],
  ]

  const addHeightAnimation = (selector: string) => {
    sequence.push([selector, collapseStyles.height, { easing: collapseStyles.spring, duration: 0.6, at: '<' }])
  }

  if (side === 'leading' || side === 'both')
    addHeightAnimation('.aerial-island .trailing-side')
  if (side === 'trailing' || side === 'both')
    addHeightAnimation('.aerial-island .leading-side')

  addHeightAnimation('.aerial-island .center-side')

  // sequence.push(['.aerial-island .center-side .overlay', { display: ['block', 'none'] }, { duration: 0.1, at: '<' }])

  return sequence
}

let defaultHeight
// export function collapsed

/**
 * 扩大动画
 * 该函数实现了元素的扩展动画，包括元素的高度变化、模糊效果、侧边栏的显示与隐藏等。
 * 它通过设置不同的样式和动画序列来实现视觉效果的平滑过渡。
 */
export function expandHeightAnimation(height: string): TimelineDefinition {
  const { side } = aerialIslandState.value

  const sequence: TimelineDefinition = [['.aerial-island', { top: ['2.5%', '10%'] }]]

  defaultHeight = `${document.querySelector('.aerial-island')?.clientHeight}px`

  console.log('defaultHeight', defaultHeight)

  const collapseStyles: Record<string, MotionKeyframesDefinition> & {
    spring: EasingGenerator
  } = {
    blur: { filter: ['blur(0', 'blur(10px)'] },
    height: { height: ['43px', height] },
    spring: spring({ velocity: 80, stiffness: 70, damping: 7 }),
  }

  aerialIslandState.value.isExpanded = true

  if (side === 'leading' || side === 'trailing') {
    aerialIslandState.value.cacheSide = aerialIslandState.value.side
    sequence.push(...attachSideAnimation('both'))
  }

  const addHeightAnimation = (selector: string) => {
    sequence.push([selector, collapseStyles.height, { easing: collapseStyles.spring, duration: 0.6, at: '<' }])
  }

  addHeightAnimation('.aerial-island .center-side')
  addHeightAnimation('.aerial-island .leading-side')
  addHeightAnimation('.aerial-island .trailing-side')

  sequence.push(['.aerial-island .leading-side > *', collapseStyles.blur, { easing: collapseStyles.spring, duration: 0.6, at: '<' }])
  sequence.push(['.aerial-island .trailing-side > *', collapseStyles.blur, { easing: collapseStyles.spring, duration: 0.6, at: '<' }])

  sequence.push(['.aerial-island .leading-side > *', { display: ['block', 'none'] }, { easing: collapseStyles.spring, duration: 0.6, at: '<' }])
  sequence.push(['.aerial-island .trailing-side > *', { display: ['block', 'none'] }, { easing: collapseStyles.spring, duration: 0.6, at: '<' }])

  sequence.push(['.aerial-island .leading-side', { width: ['', '20px'] }, { easing: collapseStyles.spring, duration: 0.6, at: '<' }])
  sequence.push(['.aerial-island .trailing-side', { width: ['', '20px'] }, { easing: collapseStyles.spring, duration: 0.6, at: '<' }])

  return sequence
}

/**
 * 收缩动画
 * 该函数实现了元素的收缩动画，包括元素的高度变化、模糊效果、侧边栏的显示与隐藏等。
 * 它通过设置不同的样式和动画序列来实现视觉效果的平滑过渡。
 */
export function collapseHeightAnimation(height: string): TimelineDefinition {
  // TODO:
  const sequence: TimelineDefinition = [['.aerial-island', { top: ['10%', '2.5%'] }]]

  const collapseStyles: Record<string, MotionKeyframesDefinition> & {
    spring: EasingGenerator
  } = {
    blur: { filter: ['blur(10px)', 'blur(0)'] },
    height: { height: [height, '43px'] },
    spring: spring({ velocity: 80, stiffness: 70, damping: 7 }),
  }

  if (aerialIslandState.value.cacheSide) {
    sequence.push(...detachSideAnimation(aerialIslandState.value.cacheSide))
    aerialIslandState.value.cacheSide = null
  }

  aerialIslandState.value.isExpanded = false

  const addHeightAnimation = (selector: string) => {
    sequence.push([selector, collapseStyles.height, { easing: collapseStyles.spring, duration: 0.6, at: '<' }])
  }

  addHeightAnimation('.aerial-island .center-side')
  addHeightAnimation('.aerial-island .leading-side')
  addHeightAnimation('.aerial-island .trailing-side')

  sequence.push(['.aerial-island .leading-side > *', collapseStyles.blur, { easing: collapseStyles.spring, duration: 0.6, at: '<' }])
  sequence.push(['.aerial-island .trailing-side > *', collapseStyles.blur, { easing: collapseStyles.spring, duration: 0.6, at: '<' }])

  sequence.push(['.aerial-island .leading-side > *', { display: ['none', 'flex'] }, { easing: collapseStyles.spring, duration: 0.6, at: '<' }])
  sequence.push(['.aerial-island .trailing-side > *', { display: ['none', 'flex'] }, { easing: collapseStyles.spring, duration: 0.6, at: '<' }])

  sequence.push(['.aerial-island .leading-side', { width: ['20px', 'auto'] }, { easing: collapseStyles.spring, duration: 0.6, at: '<' }])
  sequence.push(['.aerial-island .trailing-side', { width: ['20px', 'auto'] }, { easing: collapseStyles.spring, duration: 0.6, at: '<' }])

  return sequence
}

export function expandAnimation({ width, height }: { width: string, height?: string } | { width?: string, height: string }): TimelineDefinition {
  if (width && height)
    return [...expandWidthAnimation(width), ...expandHeightAnimation(height)]
  else if (width)
    return expandWidthAnimation(width)
  else if (height)
    return expandHeightAnimation(height)

  return []
}

export function collapseAnimation({ width, height }: { width: string, height?: string } | { width?: string, height: string }): TimelineDefinition {
  if (width && height)
    return [...collapseWidthAnimation(width), ...collapseHeightAnimation(height)]
  else if (width)
    return collapseWidthAnimation(width)
  else if (height)
    return collapseHeightAnimation(height)

  return []
}

/**
 * 合并天空岛
 *
 * @param side - 要附加动画的侧面 ('leading', 'trailing', 或 'both')
 */
export function attachSideAnimation(side: Side): TimelineDefinition {
  const sequence: TimelineDefinition = []
  const sideBaseStyles: Record<string, MotionKeyframesDefinition> = {
    leading: { borderRadius: '20px 0 0 20px', marginRight: 0, borderTopWidth: aerialIslandStyles.borderWidth, borderRightWidth: 0, borderBottomWidth: aerialIslandStyles.borderWidth, borderLeftWidth: aerialIslandStyles.borderWidth },
    trailing: { borderRadius: '0 20px 20px 0', marginLeft: 0, borderTopWidth: aerialIslandStyles.borderWidth, borderRightWidth: aerialIslandStyles.borderWidth, borderBottomWidth: aerialIslandStyles.borderWidth, borderLeftWidth: 0 },
    center: { borderRadius: 0, borderTopWidth: aerialIslandStyles.borderWidth, borderRightWidth: 0, borderBottomWidth: aerialIslandStyles.borderWidth, borderLeftWidth: 0 },
  }

  const sideMapping = {
    leading: () => {
      aerialIslandState.value.side = 'leading'
      sequence.push(['.aerial-island .leading-side', sideBaseStyles.leading, { at: '<' }])
      sequence.push(['.aerial-island .center-side', sideBaseStyles.trailing, { at: '<' }])

      // Border
      sequence.push(['.aerial-island .leading-side', { borderTopWidth: aerialIslandStyles.borderWidth, borderRightWidth: 0, borderBottomWidth: aerialIslandStyles.borderWidth, borderLeftWidth: aerialIslandStyles.borderWidth }, { at: '<' }])
      sequence.push(['.aerial-island .trailing-side', { borderTopWidth: 0, borderRightWidth: 0, borderBottomWidth: 0, borderLeftWidth: 0 }, { at: '<' }])
      sequence.push(['.aerial-island .center-side', { borderTopWidth: 0, borderRightWidth: 0, borderBottomWidth: 0, borderLeftWidth: 0 }, { at: '<' }])
    },
    trailing: () => {
      aerialIslandState.value.side = 'trailing'
      sequence.push(['.aerial-island .trailing-side', sideBaseStyles.trailing, { at: '<' }])
      sequence.push(['.aerial-island .center-side', sideBaseStyles.leading, { at: '<' }])

      // Border
      sequence.push(['.aerial-island .leading-side', { borderWidth: aerialIslandStyles.borderWidth }, { at: '<' }])
    },
    both: () => {
      aerialIslandState.value.side = 'both'
      sequence.push(['.aerial-island .leading-side', sideBaseStyles.leading, { at: '<' }])
      sequence.push(['.aerial-island .trailing-side', sideBaseStyles.trailing, { at: '<' }])
      sequence.push(['.aerial-island .center-side', sideBaseStyles.center, { at: '<' }])
    },
  }

  sideMapping[side]?.()

  return sequence
}

/**
 * 分离天空岛的某一侧
 *
 * @param side - 要移除动画的侧面('leading', 'trailing', 或 'both')
 * @returns 包含动画序列和过渡效果的对象。
 */
export function detachSideAnimation(side: Side): TimelineDefinition {
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
      aerialIslandState.value.side = 'leading'
      // TODO: 待完成
      sequence.push(['.aerial-island .leading-side', { borderRadius: '20px', marginRight: '1rem' }, { at: '<' }])
      sequence.push(['.aerial-island .trailing-side', { borderRadius: '0 20px 20px 0' }, { at: '<' }])
      sequence.push(['.aerial-island .center-side', sideCenterStyles.leading, { at: '<' }])

      // Border
      sequence.push(['.aerial-island .leading-side', { borderWidth: aerialIslandStyles.borderWidth }, { at: '<' }])
      sequence.push(['.aerial-island .trailing-side', { borderTopWidth: aerialIslandStyles.borderWidth, borderRightWidth: aerialIslandStyles.borderWidth, borderBottomWidth: aerialIslandStyles.borderWidth, borderLeftWidth: 0 }, { at: '<' }])
      sequence.push(['.aerial-island .center-side', { borderTopWidth: aerialIslandStyles.borderWidth, borderRightWidth: 0, borderBottomWidth: aerialIslandStyles.borderWidth, borderLeftWidth: aerialIslandStyles.borderWidth }, { at: '<' }])
    },
    trailing: () => {
      aerialIslandState.value.side = 'trailing'
      sequence.push(['.aerial-island .leading-side', { borderRadius: '20px 0 0 20px', marginRight: 0 }, { at: '<' }])
      sequence.push(['.aerial-island .trailing-side', sideBaseStyles.trailing, { at: '<' }])
      sequence.push(['.aerial-island .center-side', sideCenterStyles.trailing, { at: '<' }])

      // Border
      sequence.push(['.aerial-island .leading-side', { borderTopWidth: aerialIslandStyles.borderWidth, borderRightWidth: 0, borderBottomWidth: aerialIslandStyles.borderWidth, borderLeftWidth: aerialIslandStyles.borderWidth }, { at: '<' }])
      sequence.push(['.aerial-island .trailing-side', { borderWidth: aerialIslandStyles.borderWidth }, { at: '<' }])
      sequence.push(['.aerial-island .center-side', { borderTopWidth: aerialIslandStyles.borderWidth, borderRightWidth: aerialIslandStyles.borderWidth, borderBottomWidth: aerialIslandStyles.borderWidth, borderLeftWidth: 0 }, { at: '<' }])
    },
    both: () => {
      aerialIslandState.value.side = 'both'
      sequence.push(['.aerial-island .leading-side', sideBaseStyles.leading, { at: '<' }])
      sequence.push(['.aerial-island .trailing-side', sideBaseStyles.trailing, { at: '<' }])
      sequence.push(['.aerial-island .center-side', sideCenterStyles.both, { at: '<' }])

      // Border
      sequence.push(['.aerial-island .leading-side', { borderWidth: aerialIslandStyles.borderWidth }, { at: '<' }])
      sequence.push(['.aerial-island .trailing-side', { borderWidth: aerialIslandStyles.borderWidth }, { at: '<' }])
      sequence.push(['.aerial-island .center-side', { borderWidth: aerialIslandStyles.borderWidth }, { at: '<' }])
    },
  }

  sideMapping[side]?.()

  return sequence
}
