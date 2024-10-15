import { useState } from 'react'
import styles from './taskInput.module.scss'
import { Todo } from '../../@types/todo.types'
interface TaskInputProps {
  addTodo: (name: string) => void
  editTodo: (name: string) => void
  currenTodo: Todo | null
  finishEditTodo: () => void
}
export default function TaskInput(props: TaskInputProps) {
  const { addTodo, currenTodo, editTodo, finishEditTodo } = props
  const [name, setName] = useState<string>('')

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (currenTodo) {
      finishEditTodo()
      if (name) {
        setName('')
      }
    } else {
      addTodo(name)
      setName('')
    }
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (currenTodo) {
      editTodo(value)
    } else {
      setName(value)
    }
  }
  return (
    <div className='mb-2'>
      <h1 className={styles.title}>Todo List</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Nhập công việc'
          value={currenTodo ? currenTodo.name : name}
          onChange={handleChange}
        />
        <button type='submit'>{currenTodo ? '✔️' : '➕'}</button>
      </form>
    </div>
  )
}
