"use client"

import Header from "@/components/header"
import NewNote from "@/components/new-note"
import Sidebar from "@/components/sidebar"

const notes = [
  { id: 1, title: "첫 번째 노트", content: "노트 내용 1" },
  { id: 2, title: "두 번째 노트", content: "노트 내용 2" },
  { id: 3, title: "세 번째 노트", content: "노트 내용 3" },
  { id: 4, title: "네 번째 노트", content: "노트 내용 4" },
]

export default function UI() {
  return (
    <main className="w-full h-screen flex flex-col">
      <Header />
      <div className="grow relative">
        <Sidebar notes={notes} />
        {/* New Note */}
        <NewNote />
        {/* Note Viewer (Edit or View)*/}
        {/* Empty Note */}
      </div>
    </main>
  )
}