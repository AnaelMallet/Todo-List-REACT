import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ApolloQueryResult, OperationVariables, useMutation, useQuery } from "@apollo/client"
import client from "@/app/graphql-api"

import { getLocalStorage, removeLocalStorage, setLocalStorage } from "../utils"
import { addNotification, useNotification } from "../notifications/NotificationProvider"

import { getMeQuery, verifyTokenMutation } from "./graphql"

type User = {
  firstname: string
  lastname: string
  email: string
  username?: string
  password?: string
  confirmationPassword?: string
}

type UserContextType = {
  isLogged: boolean
  logout: () => void,
  user: User | null,
  userId: string | null,
  refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<any>>,
  setUser: Dispatch<SetStateAction<User | null>>,
  userContext: any
}

export const UserContext = createContext<UserContextType>({} as UserContextType)

export function useUser() {
  return useContext(UserContext)
}

export default function UserProvider(props: any) {
  const [ userId, setUserId ] = useState<string| null>(null)
  const [ isLogged, setIsLogged ] = useState<boolean>(false)
  const [isLoading , setIsLoading] = useState<boolean>(true)
  const [ user, setUser ] = useState<User | null>(null)
  const [ userContext, setUserContext ] = useState<any>(null)
  const [mutateFunction] = useMutation(verifyTokenMutation, { client })
  const { dispatch } = useNotification()
  const router = useRouter()

  const { loading, refetch } = useQuery(getMeQuery, { variables: { userId }, onCompleted: (data) => {
    setUser(data.me.values)
  } })

  const logout = () => {
    removeLocalStorage("userId")
    removeLocalStorage("token")
    setUserId(null)
    setIsLogged(false)
    dispatch(addNotification("Vous êtes déconnecté !", true))
  }

  useEffect(() => {
    setUserId(getLocalStorage("userId"))

    if (userId) {
      setIsLogged(true)
    }
  }, [userId])

  useEffect(() => {
    const fetchAccessToken = async () => {
      const response = await mutateFunction({ variables: { userId } })
        const responseErrors = response.data.verifyToken.errors
  
        if (responseErrors.length > 0) {
          dispatch(addNotification(responseErrors[0].message, false))
          setUserId(() => {
            return null
          })
          setIsLogged(() => {
            return false
          })
          removeLocalStorage("userId")
          router.push("/login")
        }
  
        return response.data.verifyToken.values.accessToken
    }
    const initializeAccessToken = async () => {
      if (userId) {
  
        setLocalStorage("token", await fetchAccessToken())

        const interval = setInterval(async () => {
          const newAccessToken = await fetchAccessToken()

          if (newAccessToken !== getLocalStorage("token")) {
            setLocalStorage("token", newAccessToken)
            window.dispatchEvent(new StorageEvent("storage"))
          }
        }, 10000)
  
        return () => clearInterval(interval)
      }
      setIsLoading(false)
    }
    initializeAccessToken()
  }, [dispatch, mutateFunction, router, userId])

  useEffect(() => {
    const handleStorage = () => {
      setUserContext(() => {
        const accessToken = getLocalStorage("token")

        return {
          headers: {
            authorization: `Bearer ${accessToken}`
          }
        }
      })
    }

    handleStorage()
    window.addEventListener("storage", handleStorage)

    return () => window.removeEventListener("storage", handleStorage)
  }, [])

  if (loading && isLoading) return <></>

  return (
    <UserContext.Provider value={{
      isLogged,
      logout,
      user,
      userId,
      refetch,
      setUser,
      userContext
    }}>
      {props.children}
    </UserContext.Provider>
  )
}