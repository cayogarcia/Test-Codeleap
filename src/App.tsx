import { useState } from "react"
import reactLogo from "./assets/codeleap_logo_white.png"
import Home from "./pages"
import RegisterModal from "./components/RegisterModal"
import "./App.css"

function App() {

  const [username, setUsername] = useState<string | null>(
    localStorage.getItem("username")
  )

  return (
    <div className="app-container">

      <header className="header">
        <img src={reactLogo} className="logo" alt="CodeLeap Logo" />
      </header>

      {!username && (
        <RegisterModal onRegister={setUsername} />
      )}

      {username && (
        <Home />
      )}

    </div>
  )
}

export default App