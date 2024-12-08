import type { AnimationState, Side } from './type'
import { type MotionKeyframesDefinition, timeline, type TimelineDefinition } from 'motion'
import { ref } from 'vue'
import { attachSideAnimation, collapseAnimation, detachSideAnimation, expandAnimation } from './animation'

export * from './animation'

// State
export const aerialIslandState = ref<{
  side: Side
  cacheSide: Side | null
  cacheCenterSideWidth: string
  isExpanded: boolean
}>({
  side: 'both',
  cacheSide: null,
  cacheCenterSideWidth: '0',
  isExpanded: false,
})

// Config
export const aerialIslandStyles: MotionKeyframesDefinition = {
  borderWidth: '1px',
  margin: '1rem',
}

const animationFunctions: Record<AnimationState, () => TimelineDefinition> = {
  expandedWidth: () => {
    if (aerialIslandState.value.isExpanded)
      return []

    return expandAnimation({ width: aerialIslandState.value.cacheCenterSideWidth })
  },
  collapsedWidth: () => {
    if (aerialIslandState.value.isExpanded)
      return []

    return collapseAnimation({ width: '200px' })
  },
  expandedHeight: () => {
    return expandAnimation({ height: '200px' })
  },
  collapsedHeight: () => {
    return collapseAnimation({ height: '200px' })
  },
  attachedLeadingSide: () => {
    return attachSideAnimation('leading')
  },
  attachedTrailingSide: () => {
    return attachSideAnimation('trailing')
  },
  attachedBothSide: () => {
    return attachSideAnimation('both')
  },
  detachedLeadingSide: () => {
    return detachSideAnimation('leading')
  },
  detachedTrailingSide: () => {
    return detachSideAnimation('trailing')
  },
  detachedBothSide: () => {
    return detachSideAnimation('both')
  },
}

export function aerialIslandAnimation(state: AnimationState) {
  const sequence = animationFunctions[state]()

  console.log(`Running ${state} animation`)

  return {
    transition: timeline(sequence),
  }
}

export function aerialIslandAnimationInit() {
  aerialIslandState.value.cacheCenterSideWidth = `${document.querySelector('.aerial-island .center-side')?.clientWidth}px` || '0'

  aerialIslandAnimation('expandedWidth')
}
