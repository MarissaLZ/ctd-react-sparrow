export function requestAddAccount(account) {
  return fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/tbl304DDbP24rw3sE`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify( {fields: account}
    )
  })
    .then(response => response.json())
}

export function requestAddTodo(tableID, newTodo) {
  return fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${tableID}`, {
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

export function requestRemoveTodo(tableID, id) {
  return fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${tableID}/${id}`, {
      method: "Delete",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then(response => response.json())
}

export function requestEditTodo(tableID, id, updatedTodo) {
  return fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${tableID}/${id}`, {
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
export function requestEditCheck(tableID, id, checkItem) {
  return fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${tableID}/${id}`, {
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

