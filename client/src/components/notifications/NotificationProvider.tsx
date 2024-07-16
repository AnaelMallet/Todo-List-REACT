import { createContext, Dispatch, useContext, useReducer } from "react"
import { v4 as uuid } from "uuid"

import Notification from "./Notification"

export interface NotificationInterface {
  uuid: string,
  message: string,
  isSuccess: boolean
}

interface NotificationState {
  notifications: NotificationInterface[]
}

const initialNotificationState: NotificationState = {
  notifications: []
}

enum NotificationActionType {
  ADD = "ADD_NOTIFICATION",
  REMOVE = "REMOVE_NOTIFICATION"
}

interface AddNotificationAction {
  type: NotificationActionType.ADD,
  payload: NotificationInterface
}

interface RemoveNotificationAction {
  type: NotificationActionType.REMOVE,
  payload: { uuid: string }
}

export type NotificationAction = AddNotificationAction | RemoveNotificationAction

function notificationReducer(state: NotificationState, action: NotificationAction): NotificationState {
  switch(action.type) {
    case NotificationActionType.ADD:
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      }
    case NotificationActionType.REMOVE:
      return {
        notifications: state.notifications.filter(notification => notification.uuid !== action.payload.uuid)
      }
    default:
      return state
  }
}

export function addNotification(message: string, isSuccess: boolean): AddNotificationAction {
  return {
    type: NotificationActionType.ADD,
    payload: {
      uuid: uuid(),
      message,
      isSuccess
    }
  }
}

export function removeNotification(uuid: string): RemoveNotificationAction {
  return {
    type: NotificationActionType.REMOVE,
    payload: {
      uuid
    }
  }
}

export const NotificationContext = createContext<{
  state: NotificationState,
  dispatch: Dispatch<NotificationAction>
}>({
  state: initialNotificationState,
  dispatch: () => undefined
})

export default function NotificationProvider(props: any) {
  const [ state, dispatch ] = useReducer(notificationReducer, initialNotificationState)

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      <div className="absolute bottom-0 right-0 m-5 grid justify-items-end space-y-3 z-10 w-1/2">
        {state.notifications.map((notification: NotificationInterface) => {
          return <Notification notification={notification} dispatch={dispatch} key={notification.uuid} />
        })}
      </div>
      {props.children}
    </NotificationContext.Provider>
  )
}