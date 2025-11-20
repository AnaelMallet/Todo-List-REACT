import { Dispatch, SetStateAction, useState } from "react"
import classNames from "classnames"
import {
    ChevronDown,
    ChevronRight,
    CircleCheck,
    EllipsisVertical
} from "lucide-react"

import { ITaskState } from "./Task"
import TaskOptionPopover from "./TaskOptionPopover"

export interface TaskComponentProps {
    id: number
    title: string,
    description: string
    taskStates: ITaskState[]
    handleSettings: (id: number, setting: string) => Error | void,
    setTaskFormIsVisible: Dispatch<SetStateAction<boolean>>
}

function TaskComponent(props: TaskComponentProps) {
    const {
        id,
        title,
        description,
        taskStates,
        handleSettings,
        setTaskFormIsVisible
    } = props

    const [taskIsDone, setTaskIsDone] = useState(false)
    const [ taskIsUnroll, setTaskIsUnroll ] = useState(false)

    return (
        <article className={classNames({
            "bg-[#282c34] w-auto rounded-xl relative": true,
            "h-[3.5rem] hover:bg-[#181c24]": !taskIsUnroll,
            "h-full": taskIsUnroll
        })} key={id}>
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
                        "line-through": taskIsDone,
                        "no-underline": !taskIsDone
                    })}
                    onClick={() => {
                        setTaskIsUnroll(() => !taskIsUnroll)
                    }}
                >
                    {title}
                </p>
                <button onClick={() => {
                    handleSettings(id, "optionIsVisible")
                }}>
                    <EllipsisVertical className="size-10 text-gray-100" />
                </button>
                {
                    taskStates.find(taskState => taskState.taskOptionIsVisible === true && taskState.taskId === id)
                    ? <TaskOptionPopover
                        id={id}
                        title={title}
                        taskIsDone={taskIsDone}
                        taskStates={taskStates}
                        setTaskIsDone={setTaskIsDone}
                        handleSettings={handleSettings}
                        setTaskFormIsVisible={setTaskFormIsVisible}
                    />
                    : <></>
                }
                {
                    taskIsDone === false
                    ? <></>
                    : <CircleCheck className="absolute flex place-content-center place-items-center text-[#00b400] bg-white rounded-full -top-[0.9rem] -right-[0.9rem] h-8 w-8"/>
                }
            </div>
            {
                taskIsUnroll
                    ? <div className="px-4 pb-3">
                        <hr className="mb-5" />
                        <p>{description}</p>
                    </div>
                    : <></>
            }
        </article>
    )
}

export default TaskComponent