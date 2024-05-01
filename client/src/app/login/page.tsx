'use client'

import TextTitle from "@/components/text"
import { useRouter } from "next/navigation"

function LoginPage() {
  const router = useRouter()

  return (
    <main className="h-screen flex place-items-center place-content-center">
      <div className="w-1/3 bg-[#282c34] rounded-lg">
        <TextTitle/>
        <div className="grid grid-cols-1 gap-y-10 w-full">
          <div className="px-5">
            <label className="bg-transparent text-white" htmlFor="login">adresse email/nom d'utilisateur</label>
            <input
              className="bg-transparent text-white border-white border-2 rounded-2xl h-9 w-full mt-3 pl-2"
              type="text"
              id="login"
              placeholder="adresse email/nom d'utilisateur"
            />
          </div>
          <div className="px-5">
            <label className="bg-transparent text-white" htmlFor="password">Mot de passe</label>
            <input
              className="bg-transparent text-white border-white border-2 rounded-2xl h-9 w-full mt-3 pl-2"
              type="password"
              id="password"
              placeholder="Mot de passe"
            />
          </div>
          <div className="flex justify-center text-white pb-6 space-x-10">
            <button className="bg-cyan-400 font-bold hover:bg-cyan-500 rounded-md p-2">Valider</button>
            <button onClick={() => router.back()} className="font-bold p-2 border-white border-2 rounded-md">Annuler</button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default LoginPage