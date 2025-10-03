"use client"

import { useState } from "react"

export default function EmptyNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("")

  return <div className="w-2/3 p-2 flex flex-col gap-2 absolute top-0 bottom-0 right-0">
    <input
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="노트의 제목을 입력하세요"
      className="border rounded-md border-gray-300 text-xl p-2" />

    <textarea
      value={content}
      onChange={(e) => setContent(e.target.value)}
      className="border rounded-md border-gray-300 text-lg p-2 grow"
    />

    <div className="w-full flex justify-end">
      <button className="border-2 border-green-600 rounded-full px-3 py-1 hover:bg-green-200 transition-all duration-300 ease-in-out" type="button" >저장</button>
    </div>
  </div>
}