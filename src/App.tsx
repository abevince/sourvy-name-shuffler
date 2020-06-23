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
  const [isShuffling, setIsShuffling] = useState<boolean>(false)

  // useEffect(() => {
  //   const timeOut = setInterval(() => {
  //     setName((prevName) => prevName + 1)
  //   }, 1000)
  //   return () => clearInterval(timeOut)
  // }, [])

  const loopNames = React.useCallback(async () => {
    setIsShuffling(true)
    for (let i = 0; i < names.length; i++) {
      await promisifyTimeout(() => {
        setName(names[i])
      }, 200)
      // clearTimeout(timeoutId)
    }
    setIsShuffling(false)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen text-xl">
      <div className="w-screen h-64 px-4 text-center">
        <h1 className="text-5xl truncate">{name}</h1>
      </div>

      <button
        type="button"
        onClick={loopNames}
        disabled={isShuffling}
        className={`inline-flex items-center mx-auto px-5 py-2 border border-transparent text-lg leading-6 font-medium rounded-md text-white focus:outline-none transition transform ease-in-out duration-150 mt-6 bg-blue-600 hover:bg-blue-500 focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 ${
          isShuffling && 'scale-0'
        }`}
      >
        Shuffle!
        <svg
          className="ml-2 -mr-0.5 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M6.59 12.83L4.4 15c-.58.58-1.59 1-2.4 1H0v-2h2c.29 0 .8-.2 1-.41l2.17-2.18 1.42 1.42zM16 4V1l4 4-4 4V6h-2c-.29 0-.8.2-1 .41l-2.17 2.18L9.4 7.17 11.6 5c.58-.58 1.59-1 2.41-1h2zm0 10v-3l4 4-4 4v-3h-2c-.82 0-1.83-.42-2.41-1l-8.6-8.59C2.8 6.21 2.3 6 2 6H0V4h2c.82 0 1.83.42 2.41 1l8.6 8.59c.2.2.7.41.99.41h2z" />
        </svg>
      </button>
    </div>
  )
}

export default App
