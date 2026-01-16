import { createContext, useContext, useState } from "react"

interface ITaskState {
    taskId: string
    isUpdating: boolean
    taskOptionIsVisible: boolean
}

type taskSettingManagerType = {
    settings: ITaskState[],
    populateHook: (data: any) => void,
    handleIsUpdating: (id: string) => void,
    handleOptionIsVisible: (id: string) => void
}

export const TaskSettingManagerContext = createContext<taskSettingManagerType>({} as taskSettingManagerType)

export function useTaskSettingManager() {
    return useContext(TaskSettingManagerContext)
}

export default function TaskSettingManagerProvider(props: any) {
    const [settings, setSettings] = useState<ITaskState[]>([])

    function populateHook(data: any) {
        const settingsTasks: ITaskState[] = data.map((task: any) => ({
            taskId: task.uuid,
            isUpdating: false,
            taskOptionIsVisible: false
        }))

        setSettings(prev => {
            if (prev.length === settingsTasks.length) return prev
            return settingsTasks
        })
    }

    function handleIsUpdating(id: string) {
        const updatedTaskStates = [...settings]
        const taskState = updatedTaskStates.find(state => state.taskId === id) as ITaskState

        taskState.isUpdating = !taskState.isUpdating

        setSettings(() => updatedTaskStates)
    }

    function handleOptionIsVisible(id: string) {
        const updatedTaskStates = [...settings]
        const taskState = updatedTaskStates.find(state => state.taskId === id) as ITaskState
        const otherTaskState = updatedTaskStates.find(state => state.taskOptionIsVisible === true && state.taskId !== id)

        if (otherTaskState) {
            otherTaskState.taskOptionIsVisible = false
        }

        taskState.taskOptionIsVisible = !taskState.taskOptionIsVisible


        setSettings(() => updatedTaskStates)
    }

    return (
        <TaskSettingManagerContext.Provider value={{ settings, populateHook, handleIsUpdating, handleOptionIsVisible }}>
         {props.children}
        </TaskSettingManagerContext.Provider>
    )
}