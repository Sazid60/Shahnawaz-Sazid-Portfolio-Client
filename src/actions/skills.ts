
"use server";
import { SkillFormValues } from "@/components/modules/dashboard/skills/AddSkillsModal"
import { getUserSession } from "@/helpers/getUserSession"
import { revalidatePath, revalidateTag } from "next/cache";


export const createSkill = async (data: SkillFormValues, image?: File | null) => {
    const session = await getUserSession()
    const formData = new FormData()

    formData.append("skill", data.skill)
    formData.append("expertise", data.expertise)
    formData.append("userId", session?.user?.id.toString() || "")


    if (image) formData.append("file", image)

    console.log([...formData.entries()])

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/skill`, {
        method: "POST",
        body: formData,
    })

    if (!res.ok) {
        throw new Error(await res.text() || "Skill creation failed")
    }

    const result = await res.json();
    if (result) {
        revalidateTag("SKILLS")
        revalidatePath("/")
        revalidatePath("/dashboard/skills")
    }

    return result
}

export const deleteSkill = async (id: number) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/skill/${id}`, {
        method: "DELETE",
        cache: "no-store",
    })

    if (!res.ok) {
        throw new Error((await res.text()) || "Skill deletion failed")
    }

    const result = await res.json()

    revalidateTag("SKILLS")
    revalidatePath("/")
    revalidatePath("/dashboard/skills")

    return result
}


export const updateSkill = async (id: number, data: SkillFormValues, image?: File | null) => {
  const formData = new FormData();

  formData.append("data", JSON.stringify(data));
  if (image) formData.append("file", image); 

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/skill/${id}`, {
    method: "PATCH",
    body: formData,
  });

  if (!res.ok) throw new Error((await res.text()) || "Skill update failed");

  const result = await res.json();
  revalidateTag("SKILLS");
  revalidatePath("/");
  revalidatePath("/dashboard/skills");

  return result;
};
