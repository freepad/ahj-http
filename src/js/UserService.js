const baseUrl = 'http://localhost:3030'

const create = async (user) => {
  const response = await fetch(`${baseUrl}/?method=createUser`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  })
  if (response.status !== 200) {
    throw new Error(`status ${response.status}`)
  }

  return await response.json()
}

const get = async (userId) => {
  const response = await fetch(`${baseUrl}/?method=getUser&userId=${userId}`)
  if (response.status !== 200) {
    throw new Error(`status ${response.status}`)
  }

  return await response.json()
}

const getAll = async () => {
  const response = await fetch(`${baseUrl}/?method=getAllUser`)
  if (response.status !== 200) {
    throw new Error(`status ${response.status}`)
  }

  return await response.json()
}

const update = () => {
  // ...
}

const remove = () => {
  // ...
}

export const UserService = {
  create,
  getAll,
  get,
  update,
  remove
}
