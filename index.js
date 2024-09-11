import express from 'express'

const app = express()
const PORT = 3000

app.use(express.json())

let todos = [
  { id: crypto.randomUUID(), name: 'Learn NodeJS', completed: false },
  { id: crypto.randomUUID(), name: 'Learn React', completed: false }
]

app.get('/todos', (req, res) => {
  res.json(todos)
})

app.post('/todo', (req, res) => {
  const newTodo = {
    id: crypto.randomUUID(),
    name: req.body.name,
    completed: false
  }

  todos.push(newTodo)
  res.json(todos)
})

app.delete('/todo/:id', (req, res) => {
  const { id } = req.params
  todos = todos.filter(todo => todo.id !== id)

  res.json({ msg: 'Todo deleted successfully' })
})

app.put('/todo/:id/name', (req, res) => {
  const { id } = req.params
  const { name } = req.body
  const todo = todos.find(todo => todo.id === id)

  if (!todo) return res.json({ msg: 'Todo not found' })
  if (!name) return res.json({ msg: 'Name is required' })
  
  todo.name = name
  res.json({ msg: 'Name updated successfully' })
})

app.put("/todo/:id/completed", (req, res) => {
  const { id } = req.params
  const todo = todos.find(todo => todo.id === id)

  if (!todo) return res.json({ msg: 'Todo not found' })
  todo.completed = !todo.completed

  res.json({ msg: "Completed attribute updated successfully" })
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))