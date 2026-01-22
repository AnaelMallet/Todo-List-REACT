import classNames from "classnames"
import { useEffect, useState } from "react"
import { CircleX, CircleCheck } from "lucide-react"

import {
  NotificationInterface,
  removeNotification,
  useNotification
} from "./NotificationProvider"

type Notification = {
  notification: NotificationInterface
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
    <section className={classNames({
          "h-12 w-fit rounded-md shadow-xl place-content-center": true,
          "bg-[#00c400]": notification.isSuccess,
          "bg-[#d40000]": !notification.isSuccess
      })}
    >
        <div className="flex place-items-center mt-2">
            <p className="ml-3">{notification.isSuccess ? <CircleCheck className="text-[#00c400] bg-white rounded-full"/> : <CircleX className="text-[#a40000] bg-white rounded-full"/>}</p>
            <p className="ml-2 mr-5 text-lg text-white">{notification.message}</p>
        </div>
        <div className={classNames({
          "h-2 mt-1 rounded-md": true,
          "bg-[#009400]": notification.isSuccess,
          "bg-[#a40000]": !notification.isSuccess
        })}
        style={{width: `${notificationTimerWidth}%`}}/>
    </section>
  )
}