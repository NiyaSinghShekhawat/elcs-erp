import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import './index.css'

// Ensure root element exists
const rootElement = document.getElementById('root')
if (!rootElement) {
  document.body.innerHTML = `
    <div style="padding:50px;text-align:center;font-family:Arial;">
      <h1 style="color:red;">ERROR: Root element not found!</h1>
      <p>Check index.html for &lt;div id="root"&gt;&lt;/div&gt;</p>
    </div>
  `
  throw new Error('Root element not found!')
}

// Render the app
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
)

