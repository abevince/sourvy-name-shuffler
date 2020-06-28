import React, { useState } from 'react'
import shortid from 'shortid'
import { useNames } from '../context/NamesContext'

const NameForm: React.FC = () => {
  const [name, setName] = useState<string>('')
  const { names, setNames } = useNames()
  const [isActive, setIsActive] = useState(false)

  function handleInput(e: React.FormEvent<HTMLInputElement>): void {
    setName(e.currentTarget.value)
  }

  function handleSubmit(e: React.SyntheticEvent): void {
    e.preventDefault()
    if (name !== '') {
      setNames({ ...names, [shortid()]: name })
      setName('')
    }
  }
  return (
    <div className="mt-4">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className={`relative pt-6 pb-1 transition-all duration-300 border-b-2 border-transparent rounded ${
          isActive ? 'border-cool-gray-400' : 'border-cool-gray-200'
        }`}
      >
        <InputLabel isActive={isActive || name !== ''} label="Name" />
        <input
          className="px-2 py-2 focus:outline-none text-cool-gray-600"
          type="text"
          name="name"
          onChange={handleInput}
          value={name}
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
        />
        <button className="relative inline-flex items-center px-4 py-2 mt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out bg-gray-100 border border-gray-300 rounded text-cool-gray-600 hover:text-gray-500 hover:bg-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="ml-2">Add</span>
        </button>
      </form>
    </div>
  )
}

interface LabelProps {
  isActive: boolean
  label: string
}

const InputLabel: React.FC<LabelProps> = React.memo(({ isActive, label }) => (
  <label
    className={`absolute top-0 py-2 ml-2 tracking-wide text-cool-gray-400 transition-all duration-200 transform pointer-events-none ${
      isActive ? 'text-sm text-cool-gray-500' : '-mt-2 translate-y-full text-lg'
    }`}
    htmlFor="name"
  >
    {label}
  </label>
))

export default NameForm
