const API = 'http://localhost:5000/api'

export async function listItems(){
  const r = await fetch(`${API}/items`)
  return r.json()
}

export async function createItem(body){
  const r = await fetch(`${API}/items`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})
  return r.json()
}

export async function deleteItem(id){
  return fetch(`${API}/items/${id}`,{method:'DELETE'})
}

export async function parseVoice(body){
  const r = await fetch(`${API}/parse`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})
  return r.json()
}

export async function getSuggestions(q=''){
  const r = await fetch(`${API}/suggestions?q=${encodeURIComponent(q)}`)
  return r.json()
}
