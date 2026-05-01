"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(prevState: any, formData: FormData) {
  const password = formData.get("password");
  
  if (!process.env.ADMIN_PASSWORD) {
    console.error("ADMIN_PASSWORD environment variable is NOT set in Cloudflare!");
    return { error: "Authentication system error: Missing environment configuration." };
  }

  if (password === process.env.ADMIN_PASSWORD) {
    // using cookies() requires awaiting it in next 15+ but next 14 it's synchronous. We will await it to be safe for 15+.
    const cookieStore = await cookies();
    cookieStore.set("auth", process.env.ADMIN_PASSWORD, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
    });
    redirect("/admin");
  }
  return { error: "Invalid password" };
}
