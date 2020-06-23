import React, { useState } from 'react'

function promisifyTimeout(
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
const names = [
  'Anie',
  'Vince',
  'Jerry',
  'Alfred',
  'Eugen',
  'Jerimiah',
  'Jericho',
  'Goku',
]
const App: React.FC = () => {
  const [name, setName] = useState('Shuffling!')

  // useEffect(() => {
  //   const timeOut = setInterval(() => {
  //     setName((prevName) => prevName + 1)
  //   }, 1000)
  //   return () => clearInterval(timeOut)
  // }, [])

  const loopNames = React.useCallback(async () => {
    for (let i = 0; i < names.length; i++) {
      await promisifyTimeout(() => {
        setName(names[i])
      }, 100)
      // clearTimeout(timeoutId)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen text-xl">
      <h1 className="text-6xl">{name}</h1>

      <button
        onClick={loopNames}
        className="px-4 py-2 text-white bg-gray-800 rounded"
      >
        Start!
      </button>
    </div>
  )
}

export default App
