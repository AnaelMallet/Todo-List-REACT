import classNames from "classnames"
import {
    ChevronDown,
    ChevronRight,
    EllipsisVertical
} from "lucide-react"

import { ITaskState } from "./Task"

export interface TaskComponentProps {
    id: number
    title: string,
    description: string
    taskStates: ITaskState[]
    handleIsUnroll: (id: number) => void
    handleIsChecked: (id: number) => void
}

function TaskComponent(props: TaskComponentProps) {
    const {
        id,
        title,
        description,
        taskStates,
        handleIsChecked,
        handleIsUnroll
    } = props

    return (
        <article className={classNames({
            "bg-[#282c34] w-auto rounded-xl": true,
            "h-[3.5rem]": !taskStates.find(taskState => id === taskState.taskId)?.isUnroll,
            "h-full": taskStates.find(taskState => id === taskState.taskId)?.isUnroll
        })} key={id}>
            <div className="flex items-center cursor-pointer h-[3.5rem]">
                <button onClick={ () => { handleIsUnroll(id) } }>
                    {
                        taskStates.find(taskState => id === taskState.taskId)?.isUnroll
                            ? <ChevronDown className="size-10 text-gray-100" />
                            : <ChevronRight className="size-10 text-gray-100" />
                    }
                </button>
                <p
                    className={classNames({
                        "text-2xl w-full truncate items-center select-none": true,
                        "line-through": taskStates.find(taskState => id === taskState.taskId)?.isChecked,
                        "no-underline": !taskStates.find(taskState => id === taskState.taskId)?.isChecked
                    })}
                    onClick={() => {
                        handleIsUnroll(id)
                    }}
                >
                    {title}
                </p>
                <button onClick={() => handleIsChecked(id)}>
                    <EllipsisVertical className="size-10 text-gray-100" />
                </button>
            </div>
            {
                taskStates.find(taskState => id === taskState.taskId)?.isUnroll
                    ? <div className="px-3 pb-3">
                        <hr className="m-5" />
                        <p>{description}</p>
                    </div>
                    : <></>
            }
        </article>
    )
}

export default TaskComponent