export function promisifyTimeout(
  fn: () => void,
  timeout: number
): Promise<NodeJS.Timeout> {
  return new Promise((resolve) => {
    const timeOutId = setTimeout(() => {
      fn()
      resolve(timeOutId)
    }, timeout)
  })
}

export function knuthShuffle(arr: string[]): string[] {
  let rand: number, temp: string, i: number

  for (i = arr.length - 1; i > 0; i -= 1) {
    rand = Math.floor((i + 1) * Math.random()) //get random between zero and i (inclusive)
    temp = arr[rand] //swap i and the zero-indexed number
    arr[rand] = arr[i]
    arr[i] = temp
  }
  return arr
}
