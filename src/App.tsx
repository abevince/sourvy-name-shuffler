import React from 'react'

import ShufflerComponent from './components/ShufflerComponent'
import NameForm from './components/NameForm'
import NameList from './components/NameList'

const App: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center flex-1 max-w-full min-h-screen py-20 bg-cool-gray-50 text-cool-gray-900">
      <ShufflerComponent />
      <div className="flex flex-wrap justify-center max-w-full px-8 mt-8 md:max-w-6xl">
        <NameForm />
        <NameList />
      </div>
    </div>
  )
}

export default App
