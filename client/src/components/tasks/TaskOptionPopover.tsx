import { Dispatch, SetStateAction } from "react"
import { Pencil, Trash2, ThumbsUp, ThumbsDown } from "lucide-react"
import classNames from "classnames"

import { useModal } from "../confirmationModal/ModalProvider"

import { ITaskState } from "./Task"

interface PopoverTaskProps {
    id: number
    title: string
    taskIsDone: boolean
    taskStates: ITaskState[],
    setTaskIsDone: Dispatch<SetStateAction<boolean>>
    handleSettings: (id: number, setting: string) => Error | void,
    setTaskFormIsVisible: Dispatch<SetStateAction<boolean>>
}

export default function TaskOptionPopover(props: PopoverTaskProps) {
    const { openModal, closeModal } = useModal()
    const {
        id,
        title,
        taskIsDone,
        taskStates,
        setTaskIsDone,
        handleSettings,
        setTaskFormIsVisible
    } = props
    
    return (
        <section className="absolute flex -right-[10.1rem] w-[10rem] h-max z-10">
            <p className="w-3 h-3 bg-[#282c34] rotate-45 place-self-center -mr-[0.35rem] -z-10"/>
            <div className="bg-[#282c34] rounded-lg w-full h-full py-1 place-content-center space-y-1">
                <button
                    className="w-full rounded-t-lg flex place-items-center place-content-center space-x-2 hover:bg-[#181c24]"
                    onClick={() => {
                        setTaskIsDone(() => !taskIsDone)
                        handleSettings(id, "optionIsVisible")
                    }}
                >
                    {
                        !taskIsDone
                            ? <>
                                <ThumbsUp className="size-5"/>
                                <p>Terminer</p>
                            </>
                            : <>
                                <ThumbsDown className="size-5"/>
                                <p>Non terminer</p>
                            </>
                    }
                    
                </button>
                <hr className="mx-3"/>
                <button
                    className={classNames({
                        "w-full flex place-items-center place-content-center space-x-2 enabled:hover:bg-[#181c24]": true,
                        "text-gray-400": !!taskStates.find(taskState => taskState.isUpdating === true)
                    })}
                    onClick={() => {
                        handleSettings(id, "optionIsVisible")
                        handleSettings(id, "isUpdating")
                        setTaskFormIsVisible(() => true)
                    }}
                    disabled={!!taskStates.find(taskState => taskState.isUpdating === true)}
                >
                    <Pencil className="size-5"/>
                    <p>Modifier</p>
                </button>
                <hr className="mx-3"/>
                <button
                    className="w-full rounded-b-lg flex place-items-center place-content-center space-x-2 hover:bg-[#181c24]"
                    onClick={() => {
                        handleSettings(id, "optionIsVisible")
                        openModal({
                        title: "Suppression d'une liste",
                        description: `Êtes-vous sûr de vouloir supprimer la tâche "${title}" ?`,
                        function: function () {
                            console.log("Tâche supprimé !")
                            closeModal()
                        }
                    })}}
                >
                    <Trash2 className="size-5"/>
                    <p>Supprimer</p>
                </button>
            </div>
        </section>
    )
}