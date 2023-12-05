// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode> // Lo comento porque me rompe la lógica del pulso. No es importante igual
    <App />
  // </React.StrictMode>,
)
