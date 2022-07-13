export function requestAddAccount(account) {
  return fetch(
    `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/tbl304DDbP24rw3sE`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(account),
    }
  ).then((response) => response.json())
}

export function requestAddTodo(tableName, newTodo) {
  return fetch(
    `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${tableName}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [newTodo],
      }),
    }
  ).then((response) => response.json())
}

export function requestRemoveTodo(tableName, id) {
  return fetch(
    `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${tableName}/${id}`,
    {
      method: "Delete",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  ).then((response) => response.json())
}

export function requestEditTodo(tableName, id, updatedTodo) {
  return fetch(
    `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${tableName}/${id}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    }
  ).then((response) => {
    if (response.status === 200) {
      return response.json()
    } else {
      throw new Error("There is an issue")
    }
  })
}
export function requestEditCheck(tableName, id, checkItem) {
  return fetch(
    `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${tableName}/${id}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkItem),
    }
  ).then((response) => {
    if (response.status === 200) {
      return response.json()
    } else {
      throw new Error("There is an issue")
    }
  })
}
