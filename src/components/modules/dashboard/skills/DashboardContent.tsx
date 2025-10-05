
import Image from "next/image";
// import UpdateImageModal from "../user/UpdateImageModal";

export default function DashboardContent() {

  const user = {
    name: "Shahnawaz Sazid",
    email: "shahnawazsazid60@gmail.com",
    image: "/sazid.webp",
    id: 1, 
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-3xl bg-zinc-900/50 border border-zinc-800 rounded-sm shadow-lg px-8 py-14 flex flex-col items-center text-center space-y-6">

        <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 relative rounded-full border-4 border-violet-600 shadow-md overflow-hidden">
          <Image
            src={user.image}
            alt="My Profile"
            fill
            className="object-cover rounded-full"
          />
        </div>

        {/* <div className="mt-4">
          <UpdateImageModal userId={user.id} />
        </div> */}

        <div className="mt-4">
          <h1 className="text-2xl font-bold text-white">{user.name}</h1>
          <p className="mt-1 text-gray-300">{user.email}</p>
        </div>

        <blockquote className="italic border-l-4 border-violet-600 pl-4 mt-4 text-gray-300">
          &quot;The secret of getting ahead is getting started. – Mark Twain&quot;
        </blockquote>
      </div>
    </div>
  );
}
