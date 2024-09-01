'use client'

import { AddIconSVG } from "../app/svg"

import { Lists } from "./Lists"
import TextTitle from "./text"


function Sidebar() {
  return (
    <div className="absolute inline w-[16rem] h-screen bg-[#282c34] text-white" id="sidebar">
      <TextTitle/>
      <div className="flex place-items-center justify-center space-x-5 mt-5" id="lists">
        <p className="text-xl">Mes listes</p>
        <button className="flex place-items-center justify-center space-x-2 bg-cyan-400 hover:bg-cyan-500 font-bold rounded-md px-3 py-1" id="AddList">
          <p>Ajouter</p>
          <AddIconSVG />
        </button>
      </div>
      <Lists /> {/* all lists expect favorites */}
    </div>
  )
}

export default Sidebar