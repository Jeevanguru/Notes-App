import { useContext } from "react";

import {
  UserContext,
  AuthContext,
} from "../context/AllContexts";

import {
  LogOut,
  Mail,
  NotebookPen,
  CalendarDays,
} from "lucide-react";

const Profile = () => {

  const { setLoggedIn } =
    useContext(AuthContext);

  const { user } =
    useContext(UserContext);

  const handleLogOut = () => {

    localStorage.removeItem(
      "notesapptoken"
    );

    setLoggedIn(false);
  };

  if (!user) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#181818] via-[#3c3c3c] to-[#0f0f0f] text-white">

        <div className="rounded-3xl border border-white/10 bg-white/5 px-10 py-6 backdrop-blur-xl">

          <h1 className="text-xl font-medium animate-pulse">
            Loading Profile...
          </h1>

        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#181818] via-[#3d3d3d] to-[#0f0f0f] text-white px-6 py-10">

      <div className="mx-auto max-w-7xl">

        {/* Profile Card */}
        <div className="overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.06] backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.5)]">

          {/* Top */}
          <div className="border-b border-white/10 px-8 py-10 md:px-12">

            <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">

              {/* Left */}
              <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start">

                {/* Image */}
                <div className="relative">

                  <img
                    src={
                      user?.profilePicture ||
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }
                    alt="Profile"
                    loading="lazy"
                    className="h-36 w-36 rounded-3xl border border-white/10 object-cover shadow-2xl"
                  />

                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-black/20"></div>
                </div>

                {/* Info */}
                <div className="text-center sm:text-left">

                  <h1 className="text-5xl font-bold tracking-tight">
                    {user?.name}
                  </h1>

                  <div className="mt-4 flex items-center justify-center gap-2 text-gray-300 sm:justify-start">

                    <Mail size={17} />

                    <p>{user?.email}</p>

                  </div>

                  {/* Notes Count */}
                  <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3">

                    <NotebookPen size={20} />

                    <span className="font-semibold text-gray-200">
                      {user?.notes?.length || 0} Notes Created
                    </span>

                  </div>
                </div>
              </div>

              {/* Logout */}
              <button
                onClick={handleLogOut}
                className="flex items-center justify-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-6 py-4 font-semibold text-red-400 transition-all duration-300 hover:bg-red-500/20 hover:scale-[1.02]"
              >

                <LogOut size={20} />

                Logout

              </button>
            </div>
          </div>

          {/* Notes */}
          <div className="px-8 py-10 md:px-12">

            {/* Heading */}
            <div className="mb-12">

              <h2 className="text-4xl font-bold tracking-tight">
                Your Notes
              </h2>

              <p className="mt-3 text-lg text-gray-400">
                A clean collection of your ideas and thoughts.
              </p>

            </div>

            {/* Grid */}
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

              {user?.notes?.map((note, index) => (

                <div
                  key={index}
                  className="rounded-3xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.07]"
                >

                  {/* Title */}
                  <h3 className="break-words text-2xl font-semibold text-white">

                    {note.title}

                  </h3>

                  {/* Date */}
                  <div className="mt-5 flex items-center gap-2 text-sm text-gray-400">

                    <CalendarDays size={15} />

                    {note?.createdAt?.split("T")[0]}

                  </div>

                  {/* Divider */}
                  <div className="my-6 h-[1px] w-full bg-white/10"></div>

                  {/* Content */}
                  <p className="line-clamp-7 whitespace-pre-line leading-8 text-gray-300">

                    {note.content}

                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;