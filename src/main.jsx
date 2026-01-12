import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

/**
 * ReactのメインプログラムをHTMLの「root」要素に接続するためのエントリポイントです。
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)