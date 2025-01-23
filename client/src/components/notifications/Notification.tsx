import classNames from "classnames"
import { Dispatch, useEffect, useState } from "react"

import { CheckIconSVG, CrossIconSVG } from "@/app/svg"

import {
  NotificationInterface,
  NotificationAction,
  removeNotification,
  useNotification
} from "./NotificationProvider"

type Notification = {
  notification: NotificationInterface
  dispatch: Dispatch<NotificationAction>
  key: string
}

export default function Notification(props: Notification) {
  const {
    notification
  } = props

  const [notificationTimerWidth, setNotificationTimerWidth] = useState(100)
  const { dispatch } = useNotification()

  const handleStartTimer = () => {
    const interval = setInterval(() => {
      setNotificationTimerWidth((prev: number) => {
        if (prev > 0) {
          return prev - 0.5
        }

        clearInterval(interval)
        return prev
      })
    }, 40)
  }

  useEffect(() => {
    handleStartTimer()
  }, [])

  useEffect(() => {
    const handleRemoveNotification = () => {
      dispatch(removeNotification(notification.uuid))
    }

    if (notificationTimerWidth === 0) {
      handleRemoveNotification()
    }
  }, [dispatch, notification.uuid, notificationTimerWidth])
  
  return (
    <div className={classNames({
          "h-12 w-fit rounded-md shadow-xl place-content-center": true,
          "bg-[#00c400]": notification.isSuccess,
          "bg-[#d40000]": !notification.isSuccess
      })}
    >
        <div className="flex place-items-center mt-2">
            <p className="ml-3">{notification.isSuccess ? <CheckIconSVG/> : <CrossIconSVG/>}</p>
            <p className="ml-2 mr-5 text-lg text-white">{notification.message}</p>
        </div>
        <div className={classNames({
          "h-2 mt-1 rounded-md": true,
          "bg-[#009400]": notification.isSuccess,
          "bg-[#a40000]": !notification.isSuccess
        })}
        style={{width: `${notificationTimerWidth}%`}}/>
    </div>
  )
}