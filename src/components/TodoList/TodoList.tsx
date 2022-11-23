import React from 'react'
import { IContext, ITodo } from '../../models/context'
import TodoItem from '../TodoItem/TodoItem'

/**
 * Functional component to render todos
 * @param props of interface IContext
 * @returns TSX  <TodoItem/>
 */
export default function TodoList(props:IContext) {
  const todos = props.todos
  return (
    <ul>
      {todos?.map((item: ITodo) => <TodoItem key={item.id} {...item} />)}
    </ul>
  )
}