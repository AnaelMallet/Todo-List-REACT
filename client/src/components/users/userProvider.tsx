import { createContext, Dispatch, SetStateAction, useContext, useEffect, useLayoutEffect, useState } from "react"
import { useMutation } from "@apollo/client"
import client from "@/app/graphql-api"
import { useRouter } from "next/navigation"

import { getLocalStorage, removeLocalStorage } from "../utils"
import { addNotification, useNotification } from "../notifications/NotificationProvider"

import { verifyTokenMutation } from "./graphql"

type UserContextType = {
  accessToken: string | null,
  setAccessToken: Dispatch<SetStateAction<string | null>>
  isLogged: boolean
  logout: () => void
}

export const UserContext = createContext<UserContextType>({} as UserContextType)

export function useUser() {
  return useContext(UserContext)
}

export default function UserProvider(props: any) {
  const [ accessToken, setAccessToken ] = useState<string | null>(null)
  const [ userId, setUserId ] = useState<string| null>(null)
  const [ isLogged, setIsLogged ] = useState<boolean>(false)
  const [isLoading , setIsLoading] = useState<boolean>(true)
  const [mutateFunction] = useMutation(verifyTokenMutation, { client })
  const { dispatch } = useNotification()
  const router = useRouter()

  const logout = () => {
    removeLocalStorage("userId")
    setUserId(null)
    location.reload()
  }

  useEffect(() => {
    setUserId(getLocalStorage("userId"))

    if (userId) {
      setIsLogged(true)
    }
  }, [userId])

  useEffect(() => {
    if (userId) {
      const interval = setInterval(async () => {
        const response = await mutateFunction({ variables: { userId } })
        const responseErrors = response.data.verifyToken.errors

        if (responseErrors.length > 0) {
          dispatch(addNotification(responseErrors[0].message, false))
          setUserId(null)
          setIsLogged(false)
          removeLocalStorage("userId")
          router.push("/login")
        }

        const newAccessToken = response.data.verifyToken.values.accessToken

        if (newAccessToken) {
          setAccessToken(newAccessToken)
        }
      }, 10000)

      return () => clearInterval(interval)
    }
    setIsLoading(false)
  }, [dispatch, mutateFunction, router, userId])

  if (isLoading) return <></>

  return (
    <UserContext.Provider value={{ accessToken, setAccessToken, isLogged, logout }}>
      {props.children}
    </UserContext.Provider>
  )
}