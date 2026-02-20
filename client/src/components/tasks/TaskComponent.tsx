import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { useLazyQuery } from "@apollo/client"

import { useSelectList } from "../lists/SelectListProvider"
import { useUser } from "../users/userProvider"

import TaskForm from "./TaskForm"
import { getListTasksQuery } from "./graphql"
import Task from "./Task"
import { useTaskSettingManager } from "./taskSettingManagerProvider"

export type TaskProps = {
    uuid: string,
    title: string,
    description: string,
    isDone: boolean
}

type GetTaskValuesProps = {
    listName: string,
    tasks: TaskProps[]
}

export function TasksComponent() {
    const { selectedList } = useSelectList()
    const { userContext, isLogged } = useUser()
    const { settings, populateHook } = useTaskSettingManager()
    const [taskFormIsVisible, setTaskFormIsVisible] = useState(false)
    const [getTasks, {
        loading,
        refetch,
        data,
        error
    }] = useLazyQuery(getListTasksQuery, { context: userContext, variables: { listUuid: selectedList } })

    useEffect(() => {
        if (isLogged && selectedList !== "") {
            getTasks()
        }

    }, [selectedList, isLogged, getTasks])

    if (!isLogged) return <p className="fixed pt-[5rem] pb-5 w-full h-full overflow-y-auto flex justify-center text-2xl">Vous devez vous connecter vous visualiser vos tâches.</p>
    if (selectedList === "") return <p className="fixed pt-[5rem] pb-5 w-full h-full overflow-y-auto flex justify-center text-2xl">Selectionnez une liste pour voir ces tâches associées.</p>
    if (loading) return <p className="fixed pt-[5rem] pb-5 w-full h-full overflow-y-auto flex justify-center text-2xl">Chargement...</p>
    if (!data || !data.tasks.values || error) return <p className="fixed pt-[5rem] pb-5 w-full h-full overflow-y-auto flex justify-center text-2xl">Une erreur est survenu.</p>

    const getTaskValues: GetTaskValuesProps = data.tasks.values

    populateHook(getTaskValues.tasks)

    return (
        <main className="fixed pt-[5rem] pb-5 w-full h-full overflow-y-auto flex justify-center [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-lg [&::-webkit-scrollbar]:pr-3">
            <section className="grid grid-cols-1 gap-10 h-max w-[35vw] ml-[10rem]">
                <div className="flex justify-center space-x-10 ml-4 mt-5">
                    <p className="pb-1 text-3xl">{getTaskValues.listName}</p>
                    <button onClick={() => setTaskFormIsVisible(() => true)} className="flex place-items-center space-x-2 bg-cyan-400 hover:bg-cyan-500 text-white font-bold rounded-md px-3">
                        <p>Ajouter une tâche</p>
                        <Plus />
                    </button>
                </div>
                {
                    taskFormIsVisible
                        ? <TaskForm
                            setDisplayTaskForm={setTaskFormIsVisible}
                            task={getTaskValues.tasks.find((task: any) => settings.find(taskState => taskState.isUpdating === true)?.taskId === task.uuid)}
                            list={{ uuid: selectedList, name: getTaskValues.listName }}
                            refetch={refetch}
                        />
                        : <></>
                }
                {
                    getTaskValues.tasks.length > 0 ?
                        getTaskValues.tasks.map((task: TaskProps) => {
                            return (
                                <Task
                                key={task.uuid}
                                task={task}
                                setTaskFormIsVisible={setTaskFormIsVisible}
                                refetch={refetch}
                            />
                            )
                        })
                    : <p className="flex justify-center text text-lg">...Aucune tâche pour le moment.</p>
                }
            </section>
        </main>
    )
}