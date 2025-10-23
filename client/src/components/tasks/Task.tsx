import { useState } from "react"
import { Plus } from "lucide-react"

import { useSelectList } from "../lists/SelectListProvider"

import TaskComponent from "./TaskComponent"
import AddTaskForm from "./AddTaskForm"

export interface ITaskState {
    taskId: number
    isUnroll: boolean
    isChecked: boolean
}

export default function Task() {
    const int = 1
    const tasks = [
        {
            id: 1,
            title: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima, fugit.",
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum ducimus, officia maiores unde magni voluptas iure expedita labore doloremque, id tempore nisi. Dolore officiis accusamus consequatur porro labore veniam eveniet voluptatibus perspiciatis alias voluptatem. Delectus enim in alias tempore cupiditate, atque debitis quam!"
        },
        {
            id: 2,
            title: "Lorem ipsum dolor sit amet.",
            description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam quas officia eos, hic earum velit voluptatem? Repellendus quidem sunt excepturi praesentium cumque est cupiditate laborum."
        },
        {
            id: 3,
            title: "Lorem, ipsum dolor.",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A est nam natus, repellat molestiae veritatis odio totam possimus reprehenderit animi iusto voluptates reiciendis, quo cum dolorem vel quod nihil tempore! Animi officiis velit voluptate aliquam. Nostrum saepe quidem repudiandae quasi ipsa neque atque asperiores amet aspernatur maxime reiciendis, pariatur doloremque laudantium ea illum magnam eius adipisci quas incidunt hic. Maxime harum suscipit asperiores quisquam saepe dolore quos ut incidunt ex vitae laudantium nisi nesciunt aliquam atque, delectus reprehenderit exercitationem deleniti obcaecati hic molestiae expedita! Impedit sequi, reiciendis, dicta labore dolores mollitia commodi ipsum odio recusandae nam sit ratione eligendi consequatur obcaecati hic consectetur molestiae officiis dolorem asperiores perspiciatis vero! Modi quaerat, ipsa nam, placeat a commodi dolorum reiciendis necessitatibus fuga asperiores hic labore quis, inventore minus quibusdam nostrum distinctio nemo aperiam ipsum iure officia suscipit et voluptatem in. Voluptas iusto animi accusamus repudiandae cum ex, enim maxime alias doloribus libero?"
        },
        {
            id: 4,
            title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, et!",
            description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo, sunt."
        },
        {
            id: 5,
            title: "Lorem ipsum dolor sit amet consectetur.",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quaerat placeat, eligendi voluptatum reprehenderit facilis a aliquid earum saepe numquam pariatur tenetur in modi quia veritatis harum asperiores temporibus consectetur dicta quis? Animi nostrum perspiciatis facere veritatis harum placeat odio omnis aut at dignissimos dolorem praesentium tempora dolorum quaerat molestiae cumque, magnam voluptatibus perferendis minima ducimus alias repellat tempore? Unde facilis aliquam ipsam, blanditiis minima qui delectus fuga quaerat corporis expedita tenetur, dolore error voluptatum quos atque suscipit!"
        }
    ]
    const settingsTasks: ITaskState[] = tasks.map(task => ({
        taskId: task.id,
        isUnroll: false,
        isChecked: false
    }))
    const [taskStates, setTaskStates] = useState<ITaskState[]>(settingsTasks)
    const [displayTaskForm, setDisplayTaskForm] = useState(false)
    const { selectedList } = useSelectList()

    function handleIsUnroll(id: number) {
        const newtaskStates = taskStates.map(taskState => {
            if (taskState.taskId === id) {
                const updatedTaskState = {
                    ...taskState,
                    isUnroll: !taskState.isUnroll
                }

                return updatedTaskState
            }

            return taskState
        })

        setTaskStates(newtaskStates)
    }

    function handleIsChecked(id: number) {
        const newtaskStates = taskStates.map(taskState => {
            if (taskState.taskId === id) {
                const updatedTaskState = {
                    ...taskState,
                    isChecked: !taskState.isChecked
                }

                return updatedTaskState
            }

            return taskState
        })

        setTaskStates(newtaskStates)
    }

    return (
        <div className="fixed pt-[5rem] pb-5 w-full h-full overflow-y-auto flex justify-center [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-lg [&::-webkit-scrollbar]:pr-3">
            <div className="grid grid-cols-1 gap-10 h-max w-[40vw] ml-[10rem]">
                <div className="flex justify-center space-x-10 ml-4 mt-5">
                    <p className="pb-1 text-3xl">Lorem, ipsum dolor.</p>
                    <button onClick={() => setDisplayTaskForm(() => true)} className="flex place-items-center space-x-2 bg-cyan-400 hover:bg-cyan-500 text-white font-bold rounded-md px-3">
                        <p>Ajouter une tâche</p>
                        <Plus />
                    </button>
                </div>
                {
                    displayTaskForm
                        ? <AddTaskForm setDisplayTaskForm={setDisplayTaskForm} />
                        : <></>
                }
                {
                    int > 0 ?
                        <div className="grid grid-cols-1 gap-10 text-white">
                            {
                                tasks.map(task => {
                                    return (
                                        <TaskComponent
                                            key={task.id}
                                            id={task.id}
                                            title={task.title}
                                            description={task.description}
                                            taskStates={taskStates}
                                            handleIsUnroll={handleIsUnroll}
                                            handleIsChecked={handleIsChecked}
                                        />
                                    )
                                })
                            }
                        </div>
                        : <p className="flex justify-center text text-lg">...Aucune tâche dans cette liste pour le moment.</p>
                }
            </div>
        </div>
    )
}