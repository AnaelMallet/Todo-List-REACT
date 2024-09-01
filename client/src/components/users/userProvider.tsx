import { createContext, Dispatch, SetStateAction, useCallback, useContext, useEffect, useLayoutEffect, useState } from "react"
import { useMutation, useQuery } from "@apollo/client"
import client from "@/app/graphql-api"
import { useRouter } from "next/navigation"

import { getLocalStorage, removeLocalStorage } from "../utils"
import { addNotification, useNotification } from "../notifications/NotificationProvider"

import { getMeQuery, verifyTokenMutation } from "./graphql"

type User = {
  firstname: string
  lastname: string
  email: string
  username: string
}

type UserContextType = {
  accessToken: string | null,
  setAccessToken: Dispatch<SetStateAction<string | null>>
  isLogged: boolean
  logout: () => void,
  user: User | null
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
  const [ user, setUser ] = useState<User | null>(null)
  const [mutateFunction] = useMutation(verifyTokenMutation, { client })
  const { dispatch } = useNotification()
  const router = useRouter()

  const { loading } = useQuery(getMeQuery, { variables: { userId }, onCompleted: (data) => {
    setUser(data.me.values)
  } })

  const logout = () => {
    removeLocalStorage("userId")
    setUserId(null)
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

  if (loading && isLoading) return <></>

  return (
    <UserContext.Provider value={{
      accessToken,
      setAccessToken,
      isLogged,
      logout,
      user
    }}>
      {props.children}
    </UserContext.Provider>
  )
}