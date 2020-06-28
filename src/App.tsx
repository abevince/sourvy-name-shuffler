import React from 'react'

import ShufflerComponent from './components/ShufflerComponent'
import NameForm from './components/NameForm'
import NameList from './components/NameList'
import gitLogo from './assets/static/Octicons-mark-github.svg'

const App: React.FC = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center flex-1 max-w-full min-h-screen pt-20 pb-10 bg-cool-gray-50 text-cool-gray-900">
        <ShufflerComponent />
        <div className="flex flex-wrap justify-center max-w-full px-8 mt-8 md:max-w-6xl">
          <NameForm />
          <NameList />
        </div>
      </div>
      <div className="absolute bottom-0 right-0 mb-2 mr-2">
        <a
          href="https://github.com/abevince/sourvy-name-shuffler"
          target="_blank"
          rel="noreferrer noopener"
        >
          <img className="w-10 h-10" src={gitLogo} alt="Github logo" />
        </a>
      </div>
    </>
  )
}

export default App
