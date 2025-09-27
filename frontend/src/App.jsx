import React, { useEffect, useState, useRef } from 'react'
import { listItems, parseVoice, createItem, deleteItem, getSuggestions } from './api'
import './styles.css'

export default function App(){
  const [items, setItems] = useState([])
  const [transcript, setTranscript] = useState('')
  const [lang, setLang] = useState('en-US')
  const [listening, setListening] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const recognitionRef = useRef(null)

  useEffect(()=>{ fetchItems() }, [])

  async function fetchItems(){
    const res = await listItems()
    setItems(res)
  }

  async function handleParse(text){
    const res = await parseVoice({transcript:text, lang: lang})
    if(res.action === 'add' && res.item){
      fetchItems()
    } else if(res.action === 'remove'){
      fetchItems()
    }
    setTranscript(text)
  }

  function initSpeech(){
    if(!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)){
      alert('Speech Recognition not supported in this browser. Use Chrome or Edge.')
      return
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.lang = lang
    recognition.continuous = false
    recognition.interimResults = false
    recognition.onresult = (e) => {
      const text = e.results[0][0].transcript
      setTranscript(text)
      handleParse(text)
    }
    recognition.onend = ()=> setListening(false)
    recognitionRef.current = recognition
  }

  function startListening(){
    if(!recognitionRef.current) initSpeech()
    try{
      recognitionRef.current.start()
      setListening(true)
    }catch(e){ console.error(e) }
  }
  function stopListening(){
    if(recognitionRef.current) recognitionRef.current.stop()
    setListening(false)
  }

  async function handleAddManual(name){
    await createItem({name, quantity:1})
    fetchItems()
  }

  async function handleDelete(id){
    await deleteItem(id)
    fetchItems()
  }

  async function fetchSuggest(q){
    const s = await getSuggestions(q)
    setSuggestions(s)
  }

  return (
    <div className="container">
      <header>
        <h1>Voice Shopping Assistant</h1>
        <div className="controls">
          <select value={lang} onChange={e=>setLang(e.target.value)}>
            <option value="en-US">English (US)</option>
            <option value="en-GB">English (UK)</option>
            <option value="hi-IN">Hindi</option>
            <option value="es-ES">Spanish</option>
          </select>
          <button onClick={listening? stopListening: startListening}>{listening? 'Listening... (click to stop)': 'Start Voice'}</button>
        </div>
      </header>

      <main>
        <section className="voice-box">
          <div className="transcript">{transcript || 'Speak or type to add items'}</div>
        </section>

        <section className="add-manual">
          <input placeholder="Add item manually" onChange={e=>fetchSuggest(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter') handleAddManual(e.target.value) }} />
          <div className="suggestions">
            {suggestions.map((s,i)=>(<button key={i} onClick={()=>handleAddManual(s)}>{s}</button>))}
          </div>
        </section>

        <section className="list">
          <h2>Your list</h2>
          <ul>
            {items.map(it=> (
              <li key={it.id}>
                <div>
                  <strong>{it.name}</strong>
                  <div className="meta">Qty: {it.quantity} {it.category? ' • ' + it.category: ''}</div>
                </div>
                <div>
                  <button onClick={()=>handleDelete(it.id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="minimal">Minimal UI • Visual feedback shows recognized text & actions</footer>
    </div>
  )
}
