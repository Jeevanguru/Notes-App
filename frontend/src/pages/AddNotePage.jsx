import { useContext, useState } from "react";
import { UserContext } from "../context/AllContexts";
import useAddNotes from "../components/hooks/useAddNote";
import { Save } from "lucide-react";

const AddNotesPage = () => {
  const { user } = useContext(UserContext);
  const { handleAddNote } = useAddNotes();

  const [note, setNote] = useState({
    _id: user._id,
    title: "",
    content: "",
  });

  const handleNoteChange = (e) => {
    setNote((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleNoteSubmit = async (e) => {
    e.preventDefault();
    handleAddNote(note);
  };

  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-white flex justify-center items-start px-4 py-10">
      
      {/* Main Card */}
      <div className="w-full max-w-4xl bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="border-b border-white/10 px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Create Note
            </h1>
            <p className="text-sm text-white/50 mt-1">
              Capture your thoughts quickly and beautifully.
            </p>
          </div>

          <button
            onClick={handleNoteSubmit}
            className="flex items-center gap-2 bg-white text-black px-5 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-200 active:scale-95"
          >
            <Save size={18} />
            Save
          </button>
        </div>

        {/* Form */}
        <div className="p-8 flex flex-col gap-6">

          {/* Title Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white/50 font-medium">
              Note Title
            </label>

            <input
              onChange={handleNoteChange}
              type="text"
              name="title"
              placeholder="Enter note title..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-2xl font-semibold text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition"
            />
          </div>

          {/* Content Textarea */}
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-sm text-white/50 font-medium">
              Content
            </label>

            <textarea
              onChange={handleNoteChange}
              name="content"
              placeholder="Start writing your note here..."
              id="notes"
              rows={16}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-lg text-white placeholder:text-white/30 resize-none focus:outline-none focus:ring-2 focus:ring-white/20 transition"
            ></textarea>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddNotesPage;