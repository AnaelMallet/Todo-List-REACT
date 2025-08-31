import {
    ApolloError,
    OperationVariables,
    ApolloQueryResult,
    useLazyQuery
} from "@apollo/client"
import {
    Dispatch, 
    useEffect,
    SetStateAction,
} from "react"

import { useUser } from "../users/userProvider"

import { getUserListsQuery } from "./graphql"
import AddListForm from "./AddListForm"
import ListsArray from "./Lists"

interface QueryInfo {
  loading: boolean
  error: ApolloError | undefined
  data: any
  userIsLogged: boolean
  refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<any>>
}

function ListsArrayComponent(props: QueryInfo) {
  if (!props.userIsLogged) return <p className="mt-7 flex justify-center text-lg">Connectez-vous pour voir vos listes.</p>
  if (props.loading) return <p className="mt-7 flex justify-center text-lg">Chargement ...</p>
  if (props.error) return <p className="mt-7 flex justify-center text-lg">Une erreur est survenu.</p>
  if (!props.data || props.data.lists.values.length === 0) return <p className="mt-7 flex justify-center text-lg">...Aucune liste pour le moment.</p>

  return (
    <ListsArray lists={props.data.lists.values} refetch={props.refetch} />
  )
}

interface ListsFormComponentProps {
  isAddingList: boolean
  setIsAddingList: Dispatch<SetStateAction<boolean>>
}

export function ListsComponent(props: ListsFormComponentProps) {
  const { isLogged, userContext } = useUser()
  const [getLists, {
      loading,
      refetch,
      data,
      error
    }] = useLazyQuery(getUserListsQuery, { context: userContext })

  useEffect(() => {
    if (isLogged) {
      getLists()
    }
  }, [getLists, isLogged])

  return (
    <div>
      <AddListForm
        isAddingList={props.isAddingList}
        setIsAddingList={props.setIsAddingList}
        refetch={refetch}
      />
      <ListsArrayComponent
        data={data}
        loading={loading}
        error={error}
        userIsLogged={isLogged}
        refetch={refetch}
      />
    </div>
  )
}