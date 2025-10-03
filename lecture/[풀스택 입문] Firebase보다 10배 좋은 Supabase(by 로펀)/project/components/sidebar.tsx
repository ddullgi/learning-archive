"use client"

export default function Sidebar({
  activeNoteId,
  setActiveNoteId,
  setIsCreating,
  notes,
  search,
  setSearch,
}) {
  return (
    <aside className="absolute top-0 bottom-0 left-0 w-1/3 p-2 border-r border-gray-300">
      <button
        onClick={() => {
          setIsCreating(true)
          setActiveNoteId(null)
        }}
        type="button"
        className="p-2 text-lg font-bold border border-gray-600 rounded-lg w-full">
        + 새로운 노트
      </button>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="노트를 검색해보세요"
        className="w-full mt-2 p-2 border border-gray-600 rounded-lg"
      />

      <ul className="mt-2 flex flex-col gap-2">
        {notes.map((note) =>
          <li key={note.id}>
            <button
              className={`${activeNoteId === note.id ? "font-bold" : ""}`}
              onClick={() => {
                setActiveNoteId(note.id)
                setIsCreating(false)
              }}
              type="button"
            >
              {note.title}
            </button>
          </li>
        )}
      </ul>
    </aside>
  )
}