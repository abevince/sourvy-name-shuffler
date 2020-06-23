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
  'Freiza',
  'Son Gohan',
  'Master Kamen',
  'Superlongnamewihtoutspace',
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
      }, 200)
      // clearTimeout(timeoutId)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen text-xl">
      <div className="w-screen h-64 px-4 text-center">
        <h1 className="text-5xl truncate">{name}</h1>
      </div>
      <button
        onClick={loopNames}
        className="px-5 py-2 text-white bg-gray-800 rounded-lg"
      >
        Start!
      </button>
    </div>
  )
}

export default App
