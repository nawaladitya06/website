export const dynamic = "force-dynamic";
"use client";
import { loginAction } from "../actions";
import { useActionState } from "react";

export default function LoginPage() {
  // @ts-ignore
  const [state, formAction] = useActionState(loginAction, null);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative z-20">
      <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md max-w-sm w-full">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h1>
        <form action={formAction} className="flex flex-col gap-4">
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white focus:outline-none focus:border-purple-500/50" 
            required
          />
          <button type="submit" className="w-full px-4 py-3 rounded-xl bg-white text-black hover:bg-gray-200 font-bold transition-colors">
            Login
          </button>
          {state?.error && <p className="text-red-400 text-sm">{state.error}</p>}
        </form>
      </div>
    </div>
  );
}
