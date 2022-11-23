import React from 'react'
import TodoItem from '../TodoItem/TodoItem'
export default function TodoList(props:any) {
  const todos = props.todos
  return (
    <ul>
      {todos.map(item => <TodoItem key={item.id} {...item} />)}
    </ul>
  )
}