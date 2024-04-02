<template>
  <div class="rune-tree">
    <div class="rune-tree__title">
      <h2>{{ runeTreeData.title }}</h2>
    </div>
    <div class="rune-tree__container">
      <div class="rune-tree__rune-track">
        <RuneTrack
          v-for="(value, key) in runeTreeData.tracks"
          v-model="runeTreeData.tracks[key]"
          :key="key"
          @left-button-click="handleLeftButtonClick($event, key)"
          @right-button-click="handleRightButtonClick($event, key)"
        ></RuneTrack>
      </div>
      <div class="rune-tree__points-tracker">
        <RunePointTracker :max-rune-points="runeTreeData.maxRunePoints" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RunePointTracker from './RunePointsTracker.vue'
import RuneTrack from './RuneTrack.vue'
import runeTreeConfig from '@/runeTreeConfig.json'
import { ref } from 'vue'
import { findLastActive } from '@/utils/utils'
import { useRunePointsStore } from '@/stores/runePoints'
import type { RuneTreeType } from '@/types/runeTree'
import { storeToRefs } from 'pinia'

const runePointsStore = useRunePointsStore()
const { increment, decrement } = runePointsStore
const { isAllRunePointsSpent } = storeToRefs(runePointsStore)

const runeTreeData = ref<RuneTreeType>(runeTreeConfig)

const handleLeftButtonClick = (index: number, key: string) => {
  const isClickedTalentActive = runeTreeData.value.tracks[key].runes[index].isActive
  const isClickedTalentNextInTrackOrder =
    findLastActive(runeTreeData.value.tracks[key].runes) === index - 1

  if (!isClickedTalentActive && isClickedTalentNextInTrackOrder && !isAllRunePointsSpent.value) {
    increment()
    runeTreeData.value.tracks[key].runes[index].isActive = true
  }
}

const handleRightButtonClick = (index: number, key: string) => {
  if (findLastActive(runeTreeData.value.tracks[key].runes) === index) {
    decrement()
    runeTreeData.value.tracks[key].runes[index].isActive = false
  }
}
</script>

<style lang="scss" scoped>
.rune-tree {
  $this: &;
  padding: 1rem;
  background-image: url('@/assets/talent-calc-bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  border: 1px solid $dark-grey;

  &__title {
    background-color: $dark-grey-opaque;
    text-align: center;
    padding: 0.25rem;
  }

  &__container {
    display: grid;
    grid-template-columns: auto auto;
    margin: 5rem 0 3.125rem 0;

    #{$this}__rune-track {
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
    }
    #{$this}__points-tracker {
      display: flex;
      place-items: center;
      margin: 0 3.125rem 0 4.688rem;
    }
  }

  @include breakpoint('large') {
    display: flex;
    flex-direction: column;

    &__container {
      display: flex;
      flex-direction: column-reverse;
      margin: 0;
      place-items: center;

      #{$this}__rune-track {
        justify-content: center;
        flex-direction: row;
        flex-wrap: wrap;
      }

      #{$this}__points-tracker {
        position: sticky;
        top: 0;
        margin: 1rem 0 1rem 0;
        z-index: 999;
      }
    }
  }
}
</style>
