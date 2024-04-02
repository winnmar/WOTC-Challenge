<template>
  <div class="points-tracker">
    <h2 class="points-tracker__points" :class="{ completed: isAllRunePointsSpent }">
      {{ runePoints }} / {{ maxRunePoints }}
    </h2>
    <h2 class="points-tracker__points-spent">Points Spent</h2>
  </div>
</template>

<script setup lang="ts">
import { useRunePointsStore } from '@/stores/runePoints'
import { storeToRefs } from 'pinia'

const runePointsStore = useRunePointsStore()
const { isAllRunePointsSpent, runePoints } = storeToRefs(runePointsStore)
defineProps<{
  maxRunePoints: number
}>()
</script>

<style lang="scss" scoped>
.points-tracker {
  display: flex;
  flex-direction: column;
  place-items: center;
  line-height: normal;
  padding: 1.125rem 1.5rem 1.125rem 1.5rem;
  background-color: $black;
  border: 1px solid $dark-grey;

  &__points.completed {
    color: $light-blue;
  }

  &__points-spent {
    color: $dark-blue;
  }
}
</style>
