'use client'

import {
  ApolloQueryResult,
  OperationVariables,
  useMutation
} from "@apollo/client"
import { useState } from "react"

import client from "@/app/graphql-api"
import {
  DeleteIconSVG,
  EditIconSVG,
  FullStarIconSVG,
  StarIconSVG
} from "@/app/svg"

import { addNotification, useNotification } from "../notifications/NotificationProvider"
import { useUser } from "../users/userProvider"
import { useModal } from "../confirmationModal/modalProvider"

import { toggleFavoriteMutation, deleteListMutation } from "./graphql"
import UpdateListNameForm from "./UpdateListNameForm"

export interface ListProps {
  uuid: string
  name: string
  isFavorite: boolean
}

interface ListsArrayProps {
  lists: ListProps[]
  refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<any>>
}

function ListsArray(props: ListsArrayProps) {
  const {
    lists,
    refetch
  } = props

  const settingsLists = lists.map(list => ({
    listId: list.uuid,
    isUpdateListName: false
  }))

  const { dispatch } = useNotification()
  const { openModal, closeModal } = useModal()
  const { userContext } = useUser()
  const [toggleFavoriteMutate] = useMutation(toggleFavoriteMutation, { client, context: userContext })
  const [deleteListMutate] = useMutation(deleteListMutation, { client, context: userContext })
  const [stateLists, setStateLists] = useState(settingsLists)

  function handleIsUpdateListName(id: string) {
    const newList = stateLists.map(list => {
      if (list.listId === id) {
        const updatedList = {
          ...list,
          isUpdateListName: !list.isUpdateListName
        }

        return updatedList
      }
      return list
    })

    setStateLists(newList)
  }

  async function handleDeleteList(id: string): Promise<void> {
    const list = lists.find(list => list.uuid === id)

    const response = await deleteListMutate({ variables: { listUuid: list?.uuid } })
    const responseErrors = response.data.deleteList.errors

    refetch()

    if (responseErrors.length > 0) {
      dispatch(addNotification(responseErrors[0].message, false))
    }
    else {
      dispatch(addNotification(`La liste "${list?.name}" à bien été supprimée.`, true))
    }

    closeModal()
  }

  return (
    <div className="mt-7 space-y-4 pt-1 pb-3 mr-3 overflow-y-auto max-h-[49.09rem] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-lg [&::-webkit-scrollbar]:pr-3">
      {
        lists.map(list => {
          return (
            <div key={list.uuid} className="ml-3 mr-5 space-y-1">
              <div className="flex place-items-center justify-between space-x-2">
                {
                  stateLists
                    .find((displayList: any) => displayList.listId === list.uuid)
                    ?.isUpdateListName
                    ? <UpdateListNameForm
                      list={list}
                      handleIsUpdateListName={handleIsUpdateListName}
                      refetch={refetch}
                    />
                    : <span onClick={() => { }} className="cursor-pointer text-lg truncate hover:bg-gray-700 w-full rounded-md pl-2">{list.name}</span>
                }
                <span className="flex space-x-2">
                  <button 
                    onClick={() => {
                      handleIsUpdateListName(list.uuid)
                    }}
                  >
                    <EditIconSVG />
                  </button>
                  <button
                    onClick={async () => {
                      const response = await toggleFavoriteMutate({ variables: { listUuid: list.uuid } })
                      const responseErrors = response.data.toggleIsFavorite.errors

                      if (responseErrors.length > 0) {
                        dispatch(addNotification(responseErrors[0].message, false))

                        return
                      }

                      dispatch(addNotification(
                        list.isFavorite
                        ? `La liste "${list.name}" n'est plus en favoris.`
                        : `La liste "${list.name}" a été mise en favoris.`,
                        true
                      ))

                      refetch()
                    }}
                  >{list.isFavorite ? <FullStarIconSVG /> : <StarIconSVG />}</button>
                  <button
                    onClick={() => {
                      openModal({
                        title: "Confirmation",
                        description: `Souhaitez-vous vraiment supprimer la liste "${list.name}" ?`,
                        function: async function() { await handleDeleteList(list.uuid) }
                      })
                    }}
                  >
                    <DeleteIconSVG />
                  </button>
                </span>
              </div>
              <hr />
            </div>
          )
        })
      }
    </div>
  )
}

export default ListsArray