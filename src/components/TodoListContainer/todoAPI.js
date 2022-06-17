
export function requestAddTodo(newTodo) {
    return fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [newTodo] 
      }),
    })
    .then(response => response.json())
}

export function requestRemoveTodo(id) {
  return fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default/${id}`, {
      method: "Delete",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then(response => response.json())
}

export function requestEditTodo(id, updatedTodo) {
  return fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        "Content-Type" : "application/json",
      },
      body: JSON.stringify(updatedTodo)
    })
    .then((response) => {
      if (response.status===200) {
        return response.json()
      } else {
        throw new Error ("There is an issue")
      }
    })
}

export function requestEditCheck(id, checkItem) {
  return fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        "Content-Type" : "application/json",
      },
      body: JSON.stringify(checkItem)
    })
    .then((response) => {
      if (response.status===200) {
        return response.json()
      } else {
        throw new Error ("There is an issue")
      }
    })   
}

