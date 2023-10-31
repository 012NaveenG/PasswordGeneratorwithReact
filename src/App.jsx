import { useState, useCallback, useEffect } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("dsiufuduf");
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

  const generatePassword = useCallback(() => {
    let pass = ""
    let str = "abcdefghijklmnopqrwtuvwxyzABCDEFGHIJKLMNOPQRTSUVWXYZ"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += '!@#$%^&*()'
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      setPassword(pass)
    }
  }, [length, charAllowed, numberAllowed])
  const copyPassword = () => {
    window.navigator.clipboard.writeText(password)
  }
  useEffect(() => {
    generatePassword()
  }, [length, charAllowed, numberAllowed, generatePassword])

  return (
    <>
      <h1>This is a Password Generator App ..</h1>
      <div className="container">
        <input
          id='passinput'
          readOnly
          value={password}
          type="text"
        />
        <button onClick={copyPassword}>Copy</button>
        <div className="tools">
          <input type="range"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            min={6}
            max={30} />length ({length})
          <input type="checkbox"
            defaultChecked={numberAllowed}
            onChange={() => setNumberAllowed((prev) => !prev)}

          />
          <label>Numbers</label>

          <input type="checkbox"
            defaultChecked={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label>Characters</label>
        </div>
      </div>

    </>
  )
}

export default App
