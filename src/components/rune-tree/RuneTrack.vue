<template>
  <div v-if="track" class="rune-track">
    <div class="rune-track__line">
      <div class="rune-track__title">
        <p>{{ track.trackName }}</p>
      </div>
      <RuneButton
        v-for="(button, index) in track.runes"
        v-model="track.runes[index]"
        :key="`${button.name} ${index}`"
        @left-button-click="handleLeftButtonClick(index)"
        @right-button-click="handleRightButtonClick(index)"
      >
        <div
          v-if="track.runes.length !== index + 1"
          class="rune-track__connector"
          :class="{
            activated: track.runes[index].isActive
          }"
        >
          <div class="rune-track__connector__animation"></div>
        </div>
      </RuneButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import RuneButton from './RuneButton.vue'
import type { RuneTrackTypeContent } from '@/types/runeTree'

const track = defineModel<RuneTrackTypeContent>()

const emit = defineEmits<{
  (e: 'leftButtonClick', index: number): void
  (e: 'rightButtonClick', index: number): void
}>()

const handleLeftButtonClick = (index: number) => {
  emit('leftButtonClick', index)
}

const handleRightButtonClick = (index: number) => {
  emit('rightButtonClick', index)
}
</script>

<style lang="scss" scoped>
@keyframes progressAnimation {
  0% {
    width: 0rem;
    background-color: $dark-blue;
  }
  100% {
    width: 6.25rem;
    background-color: $light-blue;
  }
}
@keyframes progressAnimationMobile {
  0% {
    height: 0rem;
    background-color: $dark-blue;
  }
  100% {
    height: 6.25rem;
    background-color: $light-blue;
  }
}

.rune-track {
  &__title {
    align-content: center;
    margin-right: 3.125rem;
  }

  &__line {
    display: flex;
  }

  &__connector {
    width: 6.25rem;
    height: 0.875rem;
    background-color: $dark-grey-opaque;
    border-top: 1px solid $light-grey-opaque;
    border-bottom: 1px solid $light-grey-opaque;
    z-index: 0;
    align-self: center;

    &__animation {
      height: 0.875rem;
      transition: 0.4s linear;
      transition-property: width, background-color;
    }

    &.activated &__animation {
      background-color: $light-blue;
      animation: progressAnimation 1s;
    }
  }
  @include breakpoint('large') {
    &__title {
      margin: 0;
    }

    &__line {
      flex-direction: column;
      align-items: center;
    }

    &__connector {
      height: 5rem;
      width: 0.875rem;

      &__animation {
        width: 0.875rem;
        height: 5rem;
        transition-property: height, background-color;
      }

      &.activated &__animation {
        background-color: $light-blue;
        animation: progressAnimationMobile 1s;
      }
    }
  }
}
</style>
