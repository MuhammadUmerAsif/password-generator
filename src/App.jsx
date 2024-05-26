import { useState,useCallback,useEffect } from 'react'
import './App.css'

function App() {
  const [password, setPassword] = useState("");
  const [charAllowed, setcharAllowed] = useState(false);
  const [length, setLength] = useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    setCopyMessage("Copied to clipboard")
    setTimeout(() => {
      setCopyMessage("")
    }, 10000)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed,passwordGenerator])
  return (
    <>
    <h1 className='text-center text-white'
    style={{fontSize: '40px',fontWeight: 'bold',paddingTop:'20px'}}
    >Password Generator</h1>
    <div className="h-40 flex flex-wrap items-center justify-center">
      <div className="bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-2  w-[400px] md:w-[600px] p-4 overflow-y-auto rounded-lg">
        <div className='flex flex-wrap justify-center items-center h-10 '>
          <input className="grow bg-black rounded-l-lg h-full py-1 px-2" 
          placeholder='Generated Password'
          value={password}
          readOnly
          ></input>
          <button className="w-[100px] bg-slate-800 text-white h-full border-r-2 rounded-r-lg"
          onClick={copyPasswordToClipboard}
          >Copy</button>
        </div>
        {copyMessage && <div className="text-center mt-2 text-white">{copyMessage}</div>}
        <div className='flex flex-wrap justify-evenly items-center h-10 mt-4 '>
          <input className="w-[100px]> mr-2 text-black" 
          value={length}
          type="range" 
          id='rangeInput'
          min={8} 
          max={20}
          onChange={(e) => setLength(e.target.value)}
          ></input>
          <label className='text-black font-bold'
          htmlFor='rangeInput'>Range: {length}</label>
          <input className="" 
          type="checkbox" 
          id='numberInput'
          onChange={(e) => setnumberAllowed(e.target.checked)}
          ></input>
          <label className='text-black font-bold' htmlFor='numberInput'>Numbers</label>
          <input className="" type="checkbox" id='charInput'
          onChange={(e) => setcharAllowed(e.target.checked)}
          ></input>
          <label className='text-black font-bold' htmlFor='charInput'>Special Char</label>
        </div>
        
      </div>
    </div>
    </>
  )
}

export default App
