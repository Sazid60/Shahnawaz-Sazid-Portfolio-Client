
import DashboardContent from "@/components/modules/dashboard/skills/DashboardContent";
import { getUserSession } from "@/helpers/getUserSession";


export default async function DashboardHome() {
  const session = await getUserSession();

  return (
    <DashboardContent session={session} />
  );
}
