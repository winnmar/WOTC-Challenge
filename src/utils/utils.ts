interface MyArrayType {
  isActive: boolean
}

export const findLastActive = (arr: MyArrayType[]) => {
  return arr.reduceRight((lastIndex, element, currentIndex) => {
    if (element.isActive && lastIndex === -1) {
      return currentIndex
    }
    return lastIndex
  }, -1)
}
