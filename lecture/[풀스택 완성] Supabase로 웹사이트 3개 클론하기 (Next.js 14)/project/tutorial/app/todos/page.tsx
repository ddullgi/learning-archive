"use client"

import { useMutation, useQuery } from "react-query"
import { createTodo, getTodos } from "../actions/todo-actions"
import { useState } from "react"

export default function TodosPage() {
  const [todoInput, setTodoInput] = useState("")

  const todosQuery = useQuery({
    queryKey: ["todos"],
    queryFn: () => getTodos()
  })

  const createTodoMutation = useMutation({
    mutationFn: async () => {
      return createTodo(todoInput)
    },
    onSuccess: (TODOS) => {
      console.log("Success")
      console.log(TODOS)
      todosQuery.refetch()
    },
    onError: (error: Error) => {
      alert(error.message)
    }
  })


  return <div>
    <h1>TODOS</h1>

    {/* TODOS 생성하는 부분 */}
    <input
      type="text"
      placeholder="Enter new todo"
      value={todoInput}
      onChange={(e) => setTodoInput(e.target.value)}
    />
    <button
      onClick={() => {
        createTodoMutation.mutate()
      }}
      type="button"
    >
      {createTodoMutation.isLoading ? "Creating..." : "Create Todo"}
    </button>

    {/* TODOS 보여주는 부분 */}
    {todosQuery.isLoading && <p>Loading...</p>}
    {/* biome-ignore lint/complexity/useOptionalChain: <explanation> */}
    {todosQuery.data &&
      todosQuery.data.map((todo, index) => {
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        return <p key={index}>{todo}</p>
      })}
  </div>


}