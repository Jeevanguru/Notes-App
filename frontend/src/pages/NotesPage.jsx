import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { UserContext } from "../context/AllContexts";
import useDeleteNote from "../components/hooks/useDeleteNote";
import { EditNoteContext } from "../context/AllContexts";

import {
  Plus,
  Pencil,
  Trash2,
  StickyNote,
} from "lucide-react";

export default function NotesPage() {
  const navigateTo = useNavigate();

  const { setEditNote } = useContext(EditNoteContext);
  const { user, setUser } = useContext(UserContext);
  const { deleteNote } = useDeleteNote();

  const handleEditNote = (note) => {
    setEditNote(note);
    navigateTo(`editnote/?noteId=${note._id}`);
  };

  const handleDeleteNote = async (noteId) => {
    const updatedNotes = user.notes.filter(
      (note) => note._id !== noteId
    );

    setUser((prev) => ({
      ...prev,
      notes: updatedNotes,
    }));

    await deleteNote(noteId);
  };

  /* Empty State */
  if (!user?.notes?.length) {
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#151515] via-[#3a3a3a] to-[#0f0f0f] text-white px-6 py-10">

      <div className="mx-auto flex min-h-[80vh] max-w-7xl items-center justify-center">

        <div className="w-full max-w-xl rounded-[36px] border border-white/10 bg-white/[0.06] p-12 text-center backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.5)]">

          {/* Icon */}
          <div className="mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-[32px] border border-white/10 bg-white/5">

            <StickyNote
              size={48}
              className="text-gray-200"
            />

          </div>

          {/* Heading */}
          <h1 className="text-5xl font-bold tracking-tight text-white">

            No Notes Yet

          </h1>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-md text-lg leading-8 text-gray-400">

            Start capturing your thoughts, tasks, ideas,
            and memories in your premium workspace.

          </p>

          {/* Button */}
          <Link
            to="/addnotes"
            className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-gray-200 via-gray-400 to-gray-300 px-7 py-4 text-lg font-semibold text-black shadow-xl transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
          >

            <Plus size={22} />

            Create Your First Note

          </Link>
        </div>
      </div>
    </section>
  );
}

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#151515] via-[#3a3a3a] to-[#0f0f0f] text-white px-6 py-10">

  <div className="mx-auto max-w-7xl">

    {/* Header */}
    <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

      <div>
        <h1 className="text-5xl font-bold tracking-tight">
          Your Notes
        </h1>

        <p className="mt-3 text-lg text-gray-400">
          A clean space for your thoughts.
        </p>
      </div>

      <Link
        to="/addnotes"
        className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-gray-200 via-gray-400 to-gray-300 px-6 py-4 font-semibold text-black shadow-lg transition hover:scale-[1.02]"
      >
        <Plus size={20} />
        Create Note
      </Link>
    </div>

    {/* Notes Grid */}
    <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">

      {user?.notes?.map((note, i) => (
        <div
          key={i}
          className="rounded-3xl border border-white/10 bg-white/[0.06] p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.08]"
        >

          {/* Top */}
          <div className="flex items-start justify-between gap-4">

            <div>
              <h2 className="text-2xl font-semibold break-words text-white">
                {note.title}
              </h2>

              <div className="mt-5 space-y-2 text-sm text-gray-400">

                <div>
                  Created : {note?.createdAt?.split("T")[0]}
                </div>

                <div>
                  Updated : {note?.updatedAt?.split("T")[0]}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">

              <button
                onClick={() => handleEditNote(note)}
                className="rounded-xl border border-white/10 bg-white/5 p-3 text-gray-300 transition hover:bg-white/10 hover:text-white"
              >
                <Pencil size={18} />
              </button>

              <button
                onClick={() =>
                  handleDeleteNote(note._id)
                }
                className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-red-400 transition hover:bg-red-500/20"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="my-6 h-[1px] bg-white/10"></div>

          {/* Content */}
          <p className="line-clamp-7 whitespace-pre-line leading-8 text-gray-300">
            {note?.content}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
  );
}