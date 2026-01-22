import { Dispatch, SetStateAction } from "react"
import { Pencil, Trash2, ThumbsUp, ThumbsDown } from "lucide-react"
import classNames from "classnames"

import { useModal } from "../confirmationModal/ModalProvider"

import { useTaskSettingManager } from "./taskSettingManagerProvider"
import { TaskProps } from "./TaskComponent"
import { ApolloQueryResult, OperationVariables, useMutation } from "@apollo/client"
import { deleteTaskMutation, toggleTaskIsDoneMutation } from "./graphql"
import { useUser } from "../users/UserProvider"
import { addNotification, useNotification } from "../notifications/NotificationProvider"

interface PopoverTaskProps {
    task: TaskProps
    setTaskFormIsVisible: Dispatch<SetStateAction<boolean>>,
    refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<any>>
}

export default function TaskOptionPopover(props: PopoverTaskProps) {
    const {
        task,
        setTaskFormIsVisible,
        refetch
    } = props
    const { openModal, closeModal } = useModal()
    const { userContext } = useUser()
    const { dispatch } = useNotification()
    const { settings, handleOptionIsVisible, handleIsUpdating } = useTaskSettingManager()
    const [mutateFunction] = useMutation(toggleTaskIsDoneMutation, { context: userContext })
    const [deleteTaskMutate] = useMutation(deleteTaskMutation, { context: userContext })
    
    return (
        <section className="absolute flex -right-[10.1rem] w-[10rem] h-max z-10">
            <p className="w-3 h-3 bg-[#282c34] rotate-45 place-self-center -mr-[0.35rem] -z-10"/>
            <div className="bg-[#282c34] rounded-lg w-full h-full py-1 place-content-center space-y-1">
                <button
                    className="w-full rounded-t-lg flex place-items-center place-content-center space-x-2 hover:bg-[#181c24]"
                    onClick={async () => {
                        const response = await mutateFunction({ variables: { taskUuid: task.uuid } })

                        const responseErrors = response.data.toggleIsDone.errors
                        
                        if (responseErrors.length > 0) {
                            dispatch(addNotification(responseErrors[0].message, false))
                            return 
                        }
                        
                        dispatch(addNotification(
                            task.isDone
                            ? `La tâche "${task.title}" n'est pas terminée.`
                            : `La tâche "${task.title}" est terminée.`
                        , true))

                        handleOptionIsVisible(task.uuid)
                        refetch()
                    }}
                >
                    {
                        task.isDone
                            ? <>
                                <ThumbsDown className="size-5"/>
                                <p>Non terminer</p>
                            </>
                            : <>
                                <ThumbsUp className="size-5"/>
                                <p>Terminer</p>
                            </>
                    }
                    
                </button>
                <hr className="mx-3"/>
                <button
                    className={classNames({
                        "w-full flex place-items-center place-content-center space-x-2 enabled:hover:bg-[#181c24]": true,
                        "text-gray-400": !!settings.find(taskState => taskState.isUpdating === true)
                    })}
                    onClick={() => {
                        handleOptionIsVisible(task.uuid)
                        handleIsUpdating(task.uuid)
                        setTaskFormIsVisible(() => true)
                    }}
                    disabled={!!settings.find(taskState => taskState.isUpdating === true)}
                >
                    <Pencil className="size-5"/>
                    <p>Modifier</p>
                </button>
                <hr className="mx-3"/>
                <button
                    className="w-full rounded-b-lg flex place-items-center place-content-center space-x-2 hover:bg-[#181c24]"
                    onClick={() => {
                        handleOptionIsVisible(task.uuid)
                        openModal({
                        title: "Suppression d'une liste",
                        description: `Êtes-vous sûr de vouloir supprimer la tâche "${task.title}" ?`,
                        function: async function () {
                            const response = await deleteTaskMutate({ variables: { taskUuid: task.uuid } })

                            const responseErrors = response.data.deleteTask.errors
                        
                            refetch()
                            closeModal()

                            if (responseErrors.length > 0) {
                                dispatch(addNotification(responseErrors[0].message, false))
                            } else {
                                dispatch(addNotification(`La tâche ${task.title} à bien été supprimée.`, true))
                            }
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