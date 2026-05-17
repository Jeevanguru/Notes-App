import { useContext } from "react";

import {
  EditNoteContext,
} from "../context/AllContexts";

import useEditNote from "../components/hooks/useEditNote";

import {
  PencilLine,
  Save,
} from "lucide-react";

const EditNote = () => {

  const {
    editNote,
    setEditNote,
  } = useContext(EditNoteContext);

  const { saveNote } =
    useEditNote();

  const handleNoteChange = (e) => {

    setEditNote((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddNote = async () => {

    await saveNote(editNote);
  };

  return (

    <section className="min-h-screen bg-gradient-to-br from-[#181818] via-[#3c3c3c] to-[#0f0f0f] px-6 py-10 text-white">

      <div className="mx-auto max-w-5xl">

        {/* Main Card */}
        <div className="rounded-[34px] border border-white/10 bg-white/[0.06] p-8 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.5)] md:p-10">

          {/* Header */}
          <div className="mb-10 flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">

              <PencilLine
                size={28}
                className="text-gray-200"
              />

            </div>

            <div>

              <h1 className="text-4xl font-bold tracking-tight">

                Edit Note

              </h1>

              <p className="mt-2 text-gray-400">

                Refine and organize your thoughts beautifully.

              </p>

            </div>
          </div>

          {/* Title */}
          <div className="mb-8">

            <label className="mb-3 block text-sm font-medium text-gray-300">

              Note Title

            </label>

            <input
              type="text"
              name="title"
              onChange={handleNoteChange}
              value={editNote?.title}
              placeholder="Enter note title..."
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-2xl font-semibold text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-gray-300 focus:bg-white/10"
            />
          </div>

          {/* Content */}
          <div>

            <label className="mb-3 block text-sm font-medium text-gray-300">

              Note Content

            </label>

            <textarea
              name="content"
              onChange={handleNoteChange}
              value={editNote?.content}
              placeholder="Write your thoughts here..."
              className="min-h-[450px] w-full resize-none rounded-3xl border border-white/10 bg-white/5 p-6 text-lg leading-9 text-gray-200 placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-gray-300 focus:bg-white/10"
            ></textarea>
          </div>

          {/* Save Button */}
          <div className="mt-10 flex justify-end">

            <button
              onClick={handleAddNote}
              className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-gray-200 via-gray-400 to-gray-300 px-7 py-4 text-lg font-bold text-black shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >

              <Save size={20} />

              Save Edit

            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default EditNote;