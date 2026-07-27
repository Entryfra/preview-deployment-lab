import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('Загрузка...')

  useEffect(() => {
    fetch('/api/notes')
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage('Ошибка подключения к backend'))
  }, [])

  return (
    <main>
      <h1>Frontend работает</h1>
      <p>Ответ backend: {message}</p>
    </main>
  )
}

export default App
