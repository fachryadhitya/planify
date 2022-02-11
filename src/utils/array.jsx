//find equality in two array of objects
export function findEquality(arr1, arr2) {
  return arr1.filter((item) => arr2.some((item2) => item.date === item2.date && item.month === item2.month));
}
