"use server"

import { revalidatePath, revalidateTag } from "next/cache"
import { getUserSession } from "@/helpers/getUserSession"

export type UserFormValues = {
  name?: string
  email?: string
  phone?: string
  password?: string
}

export const updateUser = async (id: number, data: UserFormValues, image?: File | null) => {
  const session = await getUserSession()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const formData = new FormData()
  formData.append("data", JSON.stringify(data))
  if (image) formData.append("file", image)

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/${id}`, {
    method: "PATCH",
    body: formData,
  })

  if (!res.ok) throw new Error((await res.text()) || "User update failed")

  const result = await res.json()

 
  revalidateTag("USER")
  revalidatePath("/dashboard/profile")

  return result
}
