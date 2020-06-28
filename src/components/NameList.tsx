import React from 'react'
import { useNames, Names } from '../context/NamesContext'

const NameList: React.FC = () => {
  const { names, setNames } = useNames()

  function deleteName(nameId: string) {
    setNames((prevNames: Names) => {
      const currNames = { ...prevNames }
      delete currNames[nameId]
      return currNames
    })
  }

  return (
    <div className="w-full mt-10 text-center">
      {Object.keys(names).length !== 0
        ? Object.entries(names).map(([id, name]) => (
            <NameBadge key={id} nameId={id} name={name} remove={deleteName} />
          ))
        : 'No names'}
    </div>
  )
}

interface NameBadgeProps {
  nameId: string
  name: any
  remove: (nameId: string) => void
}

// eslint-disable-next-line react/display-name
const NameBadge: React.FC<NameBadgeProps> = React.memo(
  ({ nameId, name, remove }) => (
    <span className="inline-flex items-center px-3 py-1 my-1 mr-2 text-sm font-medium leading-5 text-indigo-800 bg-indigo-100 rounded-full">
      {name}
      <button
        type="button"
        onClick={() => remove(nameId)}
        className="inline-flex flex-shrink-0 ml-2 -mr-1 text-indigo-500 focus:outline-none focus:text-indigo-700"
        aria-label="Remove large badge"
      >
        <svg
          className="w-2 h-2"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 8 8"
        >
          <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
        </svg>
      </button>
    </span>
  )
)

export default NameList
