'use client'

import { useState } from "react"
import { Plus } from "lucide-react"

import { ListsComponent } from "./lists/ListComponent"
import { addNotification, useNotification } from "./notifications/notificationProvider"
import TextTitle from "./text"
import { useUser } from "./users/userProvider"

function Sidebar() {
  const { isLogged } = useUser()
  const { dispatch } = useNotification()
  const [ isAddingList, setIsAddingList ] = useState<boolean>(false)

  const addList = () => {
    console.log("isLogged", isLogged)

    if (isLogged === false) {
      dispatch(addNotification("Connectez-vous pour ajouter une liste.", false))

      return
    }

    setIsAddingList(true)

    return
  }

  return (
    <aside className="absolute inline w-[20rem] z-10 h-screen bg-[#282c34] text-white">
      <TextTitle />
      <section className="flex place-items-center space-x-10 ml-4 mt-5">
        <p className="text-3xl pb-1">Mes listes</p>
        <button data-testid="addListButton" onClick={addList} className="flex space-x-2 bg-cyan-400 hover:bg-cyan-500 font-bold rounded-md px-3 py-1">
          <p>Ajouter</p>
          <Plus />
        </button>
      </section>
      <ListsComponent isAddingList={isAddingList} setIsAddingList={setIsAddingList}/>
    </aside>
  )
}

export default Sidebar