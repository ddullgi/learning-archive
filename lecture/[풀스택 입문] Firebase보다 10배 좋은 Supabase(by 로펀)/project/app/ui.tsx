"use client"

import EmptyNote from "@/components/empty-note"
import Header from "@/components/header"
import NewNote from "@/components/new-note"
import NoteViewer from "@/components/note-viewer"
import Sidebar from "@/components/sidebar"
import { supabase } from "@/utils/supabase"
import { useEffect, useState } from "react"

const notes = [
  { id: 1, title: "첫 번째 노트", content: "노트 내용 1" },
  { id: 2, title: "두 번째 노트", content: "노트 내용 2" },
]

export default function UI() {
  const [activeNoteId, setActiveNoteId] = useState(null)
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    supabase.from("note").select("*").then(console.log)
  }, [])

  return (
    <main className="w-full h-screen flex flex-col">
      <Header />
      <div className="grow relative">
        <Sidebar
          notes={notes}
          activeNoteId={activeNoteId}
          setActiveNoteId={setActiveNoteId}
          setIsCreating={setIsCreating}
        />
        {
          isCreating ? <NewNote setIsCreating={setIsCreating} />
            : activeNoteId ? <NoteViewer note={notes.find((note) => note.id === activeNoteId)} /> : <EmptyNote />
        }
      </div>
    </main>
  )
}