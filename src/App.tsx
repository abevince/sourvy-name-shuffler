import React from 'react'

import ShufflerComponent from './components/ShufflerComponent'

const App: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center flex-1 h-screen max-w-full text-xl bg-cool-gray-50">
      <ShufflerComponent />
    </div>
  )
}

export default App
