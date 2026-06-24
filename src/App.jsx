import React from 'react'
import './index.css'

function App() {
  const env = import.meta.env.VITE_ENV || 'development'

  const bannerColor = {
    development: '#f59e0b',
    staging:     '#3b82f6',
    production:  '#16a34a',
  }

  return (
    <div>
      {/* Environment banner — shows which env this build is from */}
      <div style={{ background: bannerColor[env], color: '#fff', textAlign: 'center', padding: '8px', fontSize: '13px', fontWeight: 600 }}>
        {env.toUpperCase()} environment dev to stage1
      </div>

      <div className="container">
        <h1>Hello World ⚛️</h1>
        <p>Your React starter is working. development with new branch</p>
      </div>
    </div>
  )
}

export default App
