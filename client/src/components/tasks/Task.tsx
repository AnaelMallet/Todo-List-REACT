import { Dispatch, SetStateAction, useState } from "react"
import classNames from "classnames"
import {
    ChevronDown,
    ChevronRight,
    CircleCheck,
    EllipsisVertical
} from "lucide-react"

import TaskOptionPopover from "./TaskOptionPopover"
import { useTaskSettingManager } from "./taskSettingManagerProvider"
import { TaskProps } from "./TaskComponent"
import { ApolloQueryResult, OperationVariables } from "@apollo/client"

export interface ITaskState {
    taskId: string
    isUpdating: boolean
    taskOptionIsVisible: boolean
}

export interface Task {
    uuid: string
    title: string
    description: string
}

export interface TaskComponentProps {
    task: TaskProps
    setTaskFormIsVisible: Dispatch<SetStateAction<boolean>>,
    refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<any>>
}

export default function Task(props: TaskComponentProps) {
    const {
        task,
        setTaskFormIsVisible,
        refetch
    } = props
    const { settings, handleOptionIsVisible } = useTaskSettingManager()
    const [ taskIsUnroll, setTaskIsUnroll ] = useState(false)

    return (
        <article data-testid="taskElement" className={classNames({
            "bg-[#282c34] w-auto rounded-xl relative text-white": true,
            "h-[3.5rem] hover:bg-[#181c24]": !taskIsUnroll,
            "h-full": taskIsUnroll
        })} key={task.uuid}>
            <div className="flex items-center cursor-pointer h-[3.5rem]">
                <button onClick={ () => { setTaskIsUnroll(() => !taskIsUnroll) } }>
                    {
                        taskIsUnroll
                            ? <ChevronDown className="size-10 text-gray-100" />
                            : <ChevronRight className="size-10 text-gray-100" />
                    }
                </button>
                <p
                    className={classNames({
                        "text-2xl w-full truncate items-center select-none": true,
                        "line-through": task.isDone,
                        "no-underline": !task.isDone
                    })}
                    onClick={() => {
                        setTaskIsUnroll(() => !taskIsUnroll)
                    }}
                >
                    {task.title}
                </p>
                <button data-testid="taskPopoverButton" onClick={() => {
                    handleOptionIsVisible(task.uuid)
                }}>
                    <EllipsisVertical className="size-10 text-gray-100" />
                </button>
                {
                    settings.find(taskState => taskState.taskOptionIsVisible === true && taskState.taskId === task.uuid)
                    ? <TaskOptionPopover
                        task={task}
                        setTaskFormIsVisible={setTaskFormIsVisible}
                        refetch={refetch}
                    />
                    : <></>
                }
                {
                    task.isDone === false
                    ? <></>
                    : <CircleCheck data-testid="doneMarkElement" className="absolute flex place-content-center place-items-center text-[#00b400] bg-white rounded-full -top-[0.9rem] -right-[0.9rem] h-8 w-8"/>
                }
            </div>
            {
                taskIsUnroll
                    ? <div className="px-4 pb-3">
                        <hr className="mb-5" />
                        <p>{task.description}</p>
                    </div>
                    : <></>
            }
        </article>
    )
}