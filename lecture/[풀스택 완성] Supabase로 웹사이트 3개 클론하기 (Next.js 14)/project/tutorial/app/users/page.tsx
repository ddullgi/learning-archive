"use client"

import { useEffect, useState } from "react"
import { searchUsers } from "../actions/user-actions"

export default function UserPage() {
  const [users, setUsers] = useState<{ id: number; name: string }[]>([])

  // * fetch로 API 요청하기
  // useEffect(() => {
  //   fetch(`/api/users?name=${"Bob"}`)
  //     .then((response) => response.json())
  //     .then((data) => setUsers(data.users))
  // }, [])

  useEffect(() => {
    searchUsers("Alice").then(data => setUsers(data))
  }, [])

  return <main>
    <h1>Users</h1>

    {users.map((user) => {
      return <p key={user.id}>{user.name}</p>
    })}
  </main>

}