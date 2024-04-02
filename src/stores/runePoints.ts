import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useRunePointsStore = defineStore('runePoints', () => {
  const runePoints = ref(0)
  const isAllRunePointsSpent = computed(() => runePoints.value === 6)
  function increment() {
    runePoints.value++
  }
  function decrement() {
    runePoints.value--
  }

  return { runePoints, isAllRunePointsSpent, increment, decrement }
})
