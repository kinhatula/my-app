import { useEffect, useState } from 'react'
import { Todo } from '../../@types/todo.types'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'

export default function Todolist() {
  const [todos, setTodos] = useState<Todo[]>([])
  const doneTodos = todos.filter((todo) => todo.done)
  const notTodos = todos.filter((todo) => !todo.done)
  const [currenTodo, setCurrenTodo] = useState<Todo | null>(null)

  useEffect(() => {
    const todosString = localStorage.getItem('todos')
    const todoObj: Todo[] = JSON.parse(todosString || '[]')
    setTodos(todoObj)
  }, [])

  const addTodo = (name: string) => {
    const todo: Todo = {
      name,
      done: false,
      id: new Date().toISOString()
    }
    setTodos((prev) => [...prev, todo])
    const todosString = localStorage.getItem('todos')
    const todoObj: Todo[] = JSON.parse(todosString || '[]')
    const newTodosObj = [...todos, todo]
    localStorage.setItem('todos', JSON.stringify(newTodosObj))
  }
  const handleDoneTodo = (id: string, done: boolean) => {
    setTodos((prev) => {
      return prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done }
        }
        return todo
      })
    })
  }
  const startEditTodo = (id: string) => {
    const findedTodo = todos.find((todo) => todo.id === id)
    if (findedTodo) {
      setCurrenTodo(findedTodo)
    }
  }

  const editTodo = (name: string) => {
    setCurrenTodo((prev) => {
      if (prev) return { ...prev, name }
      return null
    })
  }
  const finishEditTodo = () => {
    setTodos((prev) => {
      return prev.map((todo) => {
        if (todo.id === (currenTodo as Todo)?.id) {
          return currenTodo as Todo
        }
        return todo
      })
    })
    setCurrenTodo(null)
    const todosString = localStorage.getItem('todos')
    const todoObj: Todo[] = JSON.parse(todosString || '[]')
    const newTodosObj = todoObj.map((todo) => {
      if (todo.id === (currenTodo as Todo)?.id) {
        return currenTodo as Todo
      }
      return todo
    })
    localStorage.setItem('todos', JSON.stringify(newTodosObj))
  }
  const deleteTodo = (id: string) => {
    if (currenTodo) {
      setCurrenTodo(null)
    }
    setTodos((prev) => {
      const findedIndexTodo = prev.findIndex((todo) => todo.id === id)
      if (findedIndexTodo > -1) {
        const result = [...prev]
        result.splice(findedIndexTodo, 1)
        return result
      }
      return prev
    })
  }
  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <TaskInput addTodo={addTodo} currenTodo={currenTodo} editTodo={editTodo} finishEditTodo={finishEditTodo} />
        <TaskList
          todos={notTodos}
          handleDoneTodo={handleDoneTodo}
          startEditTodo={startEditTodo}
          deleteTodo={deleteTodo}
        />
        <TaskList
          doneTaskList
          todos={doneTodos}
          handleDoneTodo={handleDoneTodo}
          startEditTodo={startEditTodo}
          deleteTodo={deleteTodo}
        />
      </div>
    </div>
  )
}
