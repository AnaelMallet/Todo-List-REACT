import classNames from "classnames"
import {
    ChevronDown,
    ChevronRight,
    Check
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
        <div className={classNames({
            "relative bg-[#282c34] w-auto rounded-xl p-3": true,
            "h-[4rem]": !taskStates.find(taskState => id === taskState.taskId)?.isUnroll,
            "h-full": taskStates.find(taskState => id === taskState.taskId)?.isUnroll
        })} key={id}>
            <div className="flex items-center cursor-pointer" onClick={() => {
                handleIsUnroll(id)
            }}>
                <div className="absolute left-0 mt-1">
                    {
                        taskStates.find(taskState => id === taskState.taskId)?.isUnroll
                            ? <ChevronDown className="text-center size-12 text-gray-300" />
                            : <ChevronRight className="text-center size-12 text-gray-300" />
                    }
                </div>
                <span className={classNames({
                    "text-2xl w-full truncate mx-10 items-center select-none": true,
                    "line-through": taskStates.find(taskState => id === taskState.taskId)?.isChecked,
                    "no-underline": !taskStates.find(taskState => id === taskState.taskId)?.isChecked
                })}>
                    {title}
                </span>
            </div>
            <button onClick={() => handleIsChecked(id)} className="absolute top-0 right-0">
                <Check className={classNames({
                    "size-10 rounded-tr-xl rounded-bl-xl border-transparent border-l-white border-b-white border-[1.5px]": true,
                    "bg-[#00c400]": taskStates.find(taskState => id === taskState.taskId)?.isChecked,
                    "bg-[#282c34] hover:bg-[#181c24]": !taskStates.find(taskState => id === taskState.taskId)?.isChecked
                })} />
            </button>
            {
                taskStates.find(taskState => id === taskState.taskId)?.isUnroll
                    ? <>
                        <hr className="m-5" />
                        <span>{description}</span>
                    </>
                    : <></>
            }
        </div>
    )
}

export default TaskComponent