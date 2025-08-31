'use client'

import { useState } from "react"

import { AddIconSVG } from "../app/svg"

import { ListsComponent } from "./lists/ListComponent"
import { addNotification, useNotification } from "./notifications/NotificationProvider"
import TextTitle from "./text"
import { useUser } from "./users/userProvider"

function Sidebar() {
  const { isLogged } = useUser()
  const { dispatch } = useNotification()
  const [ isAddingList, setIsAddingList ] = useState<boolean>(false)

  const addList = () => {
    if (isLogged === false) {
      dispatch(addNotification("You must be connected to add a list", false))

      return
    }

    setIsAddingList(true)

    return
  }

  return (
    <div className="absolute inline w-[20rem] h-screen bg-[#282c34] text-white">
      <TextTitle/>
      <div className="flex place-items-center space-x-10 ml-4 mt-5">
        <p className="text-3xl pb-1">Mes listes</p>
        <button onClick={addList} className="flex place-items-center justify-center space-x-2 bg-cyan-400 hover:bg-cyan-500 font-bold rounded-md px-3 py-1">
          <p>Ajouter</p>
          <AddIconSVG />
        </button>
      </div>
      <ListsComponent isAddingList={isAddingList} setIsAddingList={setIsAddingList}/>
    </div>
  )
}

export default Sidebar