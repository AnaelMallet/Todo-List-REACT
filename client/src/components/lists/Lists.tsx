'use client'

import {
  ApolloQueryResult,
  OperationVariables,
  useMutation
} from "@apollo/client"
import { useEffect, useState } from "react"
import { Pencil, Trash2 } from "lucide-react"
import classNames from "classnames"

import client from "@/app/graphql-api"
import { FullStarIconSVG, StarIconSVG } from "@/app/svg"

import { addNotification, useNotification } from "../notifications/NotificationProvider"
import { useUser } from "../users/UserProvider"
import { useModal } from "../confirmationModal/ModalProvider"
import { getSessionStorage } from "../utils"

import { toggleFavoriteMutation, deleteListMutation } from "./graphql"
import UpdateListNameForm from "./UpdateListNameForm"
import { useSelectList } from "./SelectListProvider"

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
  const { selectedList, setSelectedList } = useSelectList()
  const [toggleFavoriteMutate] = useMutation(toggleFavoriteMutation, { client, context: userContext })
  const [deleteListMutate] = useMutation(deleteListMutation, { client, context: userContext })
  const [stateLists, setStateLists] = useState(settingsLists)

  useEffect(() => {
    setStateLists(() => settingsLists)
  }, [lists])

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
    closeModal()

    if (responseErrors.length > 0) {
      dispatch(addNotification(responseErrors[0].message, false))
    }
    else {
      dispatch(addNotification(`La liste "${list?.name}" à bien été supprimée.`, true))
    }
  }

  return (
    <ul className="mt-7 space-y-4 pt-1 pb-3 mx-2 overflow-y-auto max-h-[49.09rem] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-lg [&::-webkit-scrollbar]:pr-3">
      {
        lists.map(list => {
          return (
            <li key={list.uuid} className="ml-3 mr-5 space-y-1">
              <div className="flex place-items-center justify-between space-x-2 mb-2">
                {
                  stateLists
                    .find((displayList: any) => displayList.listId === list.uuid)?.isUpdateListName
                    ? <UpdateListNameForm
                      list={list}
                      handleIsUpdateListName={handleIsUpdateListName}
                      refetch={refetch}
                    />
                    : <span
                      onClick={() => { setSelectedList(() => list.uuid) }}
                      className={classNames({
                        "cursor-pointer text-lg truncate w-full rounded-md pl-1": true,
                        "hover:bg-gray-700": list.uuid !== selectedList || (selectedList === "" || getSessionStorage("SelectedList") === null),
                        "hover:bg-gray-400 bg-gray-500": list.uuid === selectedList && (selectedList !== "" || getSessionStorage("SelectedList") !== null)
                      })}
                    >{list.name}</span>
                }
                <span className="flex space-x-2">
                  <button
                    onClick={() => {
                      handleIsUpdateListName(list.uuid)
                    }}
                  >
                    <Pencil />
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
                        description: `Êtes-vous sûr de vouloir supprimer la liste "${list.name}" ?`,
                        function: async function () { await handleDeleteList(list.uuid) }
                      })
                    }}
                  >
                    <Trash2 />
                  </button>
                </span>
              </div>
              <hr />
            </li>
          )
        })
      }
    </ul>
  )
}

export default ListsArray