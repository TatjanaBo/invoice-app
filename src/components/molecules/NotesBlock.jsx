"use client";

export default function NotesBlock({ note, setNote }) {
  return (
    <div className="mt-8 text-center">
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="border p-2 rounded w-full max-w-xl text-center"
        rows={2}
      />
    </div>
  );
}
