"use client"

import { useEffect, useState } from "react"

export default function NoteViewer({ note }) {
  const [title, setTitle] = useState(note?.title);
  const [content, setContent] = useState(note?.content);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setTitle(note?.title);
    setContent(note?.content);
    setIsEditing(false);
  }, [note])

  return <div className="w-2/3 p-2 flex flex-col gap-2 absolute top-0 bottom-0 right-0">
    {isEditing ? (<>
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
    </>) : (
      <>
        <h1
          className="text-xl p-2" >
          {title}
        </h1>

        <p
          className="border rounded-md border-gray-300 text-lg p-2 grow"
        >
          {content}
        </p>
      </>
    )}

    <div className="w-full flex justify-end gap-2">
      {isEditing ? (<>
        <button className="border-2 border-green-600 rounded-full px-3 py-1 hover:bg-green-200 transition-all duration-300 ease-in-out" type="button" >저장</button>
        <button className="border-2 border-red-600 rounded-full px-3 py-1 hover:bg-red-200 transition-all duration-300 ease-in-out" type="button" >삭제</button>
      </>) : (<>
        <button
          onClick={() => setIsEditing(true)}
          className="border-2 border-green-600 rounded-full px-3 py-1 hover:bg-green-200 transition-all duration-300 ease-in-out" type="button" >수정하기</button>
      </>)}

    </div>
  </div>
}