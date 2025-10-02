import { getUserSession } from "@/helpers/getUserSession";

export default async function DashboardHome() {
  const quote = "The secret of getting ahead is getting started. – Mark Twain";

  const session = await getUserSession();
  console.log(session)
  console.log(session?.user.id)

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 w-full">
      <h1 className="text-4xl font-bold  mb-4">
        Welcome, {session?.user?.name ?? "Guest"}!
      </h1>
      <h1 className="text-4xl font-bold  mb-4">
        {session?.user?.email ?? ""}
      </h1>
      <p className="text-lg  italic text-center">{quote}</p>
    </div>
  );
}
