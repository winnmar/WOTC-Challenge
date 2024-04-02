<template>
  <div
    v-if="button"
    v-bind="$attrs"
    class="rune-button"
    :class="{ active: button.isActive, blocked: isAllRunePointsSpent && !button.isActive }"
    @click="leftButtonClick"
    @contextmenu.prevent="rightButtonClick"
  >
    <div class="rune-button__img" :class="{ inactive: !button.isActive }"></div>
  </div>
  <slot></slot>
</template>

<script setup lang="ts">
import type { RuneButtonType } from '@/types/runeTree'
import { useRunePointsStore } from '@/stores/runePoints'
import { storeToRefs } from 'pinia'

const runePointsStore = useRunePointsStore()
const { isAllRunePointsSpent } = storeToRefs(runePointsStore)

const emit = defineEmits<{
  (e: 'leftButtonClick'): void
  (e: 'rightButtonClick'): void
}>()
const button = defineModel<RuneButtonType>()

const leftButtonClick = () => {
  emit('leftButtonClick')
}

const rightButtonClick = () => {
  emit('rightButtonClick')
}

const backgroundOffset = `-${button.value ? button.value.iconIndex * 50 : 0}px`
</script>

<style lang="scss" scoped>
.rune-button {
  position: relative;
  cursor: pointer;
  width: 3.625rem;
  height: 3.625rem;
  background-image: linear-gradient(
    to bottom,
    $light-grey 0%,
    $light-grey 50%,
    $dark-grey 50%,
    $light-grey 100%
  );
  filter: $enabled-filter;

  &__img {
    position: absolute;
    width: 3.125rem;
    height: 3.125rem;
    margin: auto;
    inset: 0;
    background-image: url('/src/assets/talent-icons-sprite.png');
    background-position-x: v-bind('backgroundOffset');

    &.inactive {
      background-position-y: 3.125rem;
    }
  }

  &.active {
    background-image: linear-gradient(
      to bottom,
      $light-blue 0%,
      $light-blue 50%,
      $dark-blue 50%,
      $light-blue 100%
    );
    box-shadow: 0rem 0rem 0.313rem 0.125rem $shadow;
    z-index: 1;
    filter: none;
  }

  &.blocked {
    filter: $disabled-filter;

    &:hover {
      cursor: auto;
      filter: $disabled-filter;
      box-shadow: none;
      transition: none;
    }
  }

  &:hover {
    transition: 0.2s ease-in;
    box-shadow: 0rem 0rem 0.313rem 0.125rem $shadow;
    filter: none;
  }
}
</style>
