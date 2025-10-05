"use server";

export type ContactFormValues = {
    name: string;
    email: string;
    phone?: string;
    message: string;
};

export const sendContactMessage = async (data: ContactFormValues) => {
    if (!data.name?.trim() || !data.email?.trim() || !data.message?.trim()) {
        throw new Error("Name, email, and message are required");
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        cache: "no-store",
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to send contact message");
    }

    const result = await res.json();

    return result;
};
