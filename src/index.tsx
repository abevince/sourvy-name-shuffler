import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import './assets/style/index.css'
import { NamesProvider } from './context/NamesContext'

ReactDOM.render(
  <React.StrictMode>
    <NamesProvider>
      <App />
    </NamesProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
