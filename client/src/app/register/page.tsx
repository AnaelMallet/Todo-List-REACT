'use client'

import TextTitle from "@/components/text"
import { useRouter } from "next/navigation"

function RegsiterPage() {
  const router = useRouter()

  return (
    <main className=" h-screen flex place-content-center place-items-center">
      <div className="w-1/3 bg-[#282c34] rounded-lg">
        <TextTitle/>
        <div className="grid grid-cols-1 gap-y-10 w-full text-white">
          <div className="grid grid-cols-2 gap-x-5 px-5">
            <div>
              <label className="bg-transparent" htmlFor="firstname">Prénom</label>
              <input
                className="bg-transparent border-white border-2 rounded-2xl h-9 w-full mt-3 pl-2 focus:outline-none"
                id="firstname"
                type="text"
                placeholder="Prénom"
              />
            </div>
            <div>
              <label className="bg-transparent" htmlFor="lastname">Nom</label>
              <input
                className="bg-transparent border-white border-2 rounded-2xl h-9 w-full mt-3 pl-2 focus:outline-none"
                id="lastname"
                type="text"
                placeholder="Nom"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-5 px-5">
            <div>
              <label className="bg-transparent" htmlFor="email">Adresse email</label>
              <input
                className="bg-transparent border-white border-2 rounded-2xl h-9 w-full mt-3 pl-2 focus:outline-none"
                id="email"
                type="text"
                placeholder="Adresse email"
              />
            </div>
            <div>
              <label className="bg-transparent" htmlFor="username">Nom d'utilisateur</label>
              <input
                className="bg-transparent border-white border-2 rounded-2xl h-9 w-full mt-3 pl-2 focus:outline-none"
                id="username"
                type="text"
                placeholder="Nom d'utilisateur"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-5 px-5">
            <div>
              <label className="bg-transparent" htmlFor="password">Mot de passe</label>
              <input
                className="bg-transparent border-white border-2 rounded-2xl h-9 w-full mt-3 pl-2 focus:outline-none"
                id="password"
                type="password"
                placeholder="Mot de passe"
              />
            </div>
            <div>
              <label className="bg-transparent" htmlFor="passwordConfirmation">Confirmation du mot de passe</label>
              <input
                className="bg-transparent border-white border-2 rounded-2xl h-9 w-full mt-3 pl-2 focus:outline-none"
                id="passwordConfirmation"
                type="password"
                placeholder="Confirmation du mot de passe"
              />
            </div>
          </div>
          <div className="flex justify-center pb-6 space-x-10">
            <button className="bg-cyan-400 font-bold hover:bg-cyan-500 rounded-md p-2">Valider</button>
            <button onClick={() => router.back()} className="font-bold p-2 border-white border-2 rounded-md">Annuler</button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default RegsiterPage