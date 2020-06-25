import React, { useState, useRef } from 'react'
import { useNames } from '../context/NamesContext'
import { promisifyTimeout, knuthShuffle } from '../utils'
import shuffleSVG from '../assets/static/shuffle-logo.svg'
import shufflingGIF from '../assets/static/giraffe.gif'
import congratsGIF from '../assets/static/congrats.gif'

const ShufflerComponent: React.FC = () => {
  const [name, setName] = useState<string>('')
  const [speed, setSpeed] = useState<number>(100)
  const [isShuffling, setIsShuffling] = useState<boolean>(false)
  const speedRef = useRef<number>(speed)

  const { names } = useNames()

  const loopNames = React.useCallback(async () => {
    window.scrollTo(0, 0)
    setIsShuffling(true)
    const randomizedNameKeys = knuthShuffle(Object.keys(names))
    const length = randomizedNameKeys.length
    const target = length <= 10 ? 1000 : 5000
    const gain = (speed * length - target) / (length * (length + 1))
    for (let i = 0; i < randomizedNameKeys.length; i++) {
      await promisifyTimeout(() => {
        setName(names[randomizedNameKeys[i]])

        i % 2 === 0
          ? (speedRef.current = Math.floor(speedRef.current - gain))
          : (speedRef.current = Math.floor(speedRef.current + gain * 3))
      }, speedRef.current)
      // clearTimeout(timeoutId)
    }
    speedRef.current = speed
    setIsShuffling(false)
  }, [names, speed])

  return (
    <>
      <div className="flex flex-col justify-end px-4 text-center h-80">
        <img
          className={`rounded mx-auto h-0 scale-0 transition transform ease-in-out duration-150 ${
            !isShuffling && name === '' && 'scale-100 h-40'
          }`}
          src={shuffleSVG}
          alt="Shuffling giraffe"
        />

        <img
          className={`rounded mx-auto h-0 scale-0 transition transform ease-in-out duration-150 ${
            isShuffling && 'scale-100 h-40'
          }`}
          src={shufflingGIF}
          alt="Shuffling giraffe"
        />
        <img
          className={`mx-auto h-0 scale-0 transition transform ease-in-out duration-150 ${
            !isShuffling && name !== '' && 'scale-110 h-40'
          }`}
          src={congratsGIF}
          alt="Congrats!"
        />
        {Object.keys(names).length === 0 ? (
          <h1 className="pt-6 text-4xl text-cool-gray-700">
            Hi! Please add some names.{' '}
            <span role="img" aria-label="Peace">
              ✌
            </span>
          </h1>
        ) : (
          <h1
            className={`text-6xl text-cool-gray-800 pt-6 transition transform ease-in-out duration-150 ${
              isShuffling && 'scale-110'
            }`}
          >
            {name ? name : 'Start shuffling!'}
          </h1>
        )}
      </div>

      <button
        type="button"
        onClick={loopNames}
        disabled={isShuffling}
        className={`inline-flex items-center mx-auto px-5 py-3 border border-transparent text-lg leading-6 font-medium rounded-md text-white focus:outline-none transition transform ease-in-out duration-150 mt-6 bg-blue-600 hover:bg-blue-500 focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 ${
          (Object.keys(names).length === 0 || isShuffling) && 'scale-0'
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
    </>
  )
}

export default ShufflerComponent
