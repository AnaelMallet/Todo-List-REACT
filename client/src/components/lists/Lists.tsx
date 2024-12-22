'use client'

import {
  ApolloError,
  ApolloQueryResult,
  LazyQueryExecFunction,
  OperationVariables,
  useLazyQuery,
  useMutation
} from "@apollo/client"
import client from "@/app/graphql-api"
import { Field, Form, Formik } from "formik"
import { Dispatch, SetStateAction, useEffect } from "react"

import { addNotification, useNotification } from "../notifications/NotificationProvider"
import { useUser } from "../users/userProvider"

import { initialValues, validationSchema } from "./api"
import { createListMutation, getUserListsQuery } from "./graphql"
import {
  DeleteIconSVG,
  EditIconSVG,
  FullStarIconSVG,
  StarIconSVG
} from "@/app/svg"

interface ListProps {
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
    lists
  } = props

  return (
    <div className="mt-7 space-y-4 pt-1 pb-3 mr-3 overflow-y-auto max-h-[49.09rem] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-lg [&::-webkit-scrollbar]:pr-3">
      {
        lists.map(list => {
          return (
            <div key={list.uuid} className="ml-3 mr-3 space-y-1">
              <div className="flex place-items-center justify-between space-x-2">
                <span onClick={() => {}} className="cursor-pointer text-lg truncate hover:bg-gray-700 w-full rounded-md pl-2">{list.name}</span>
                <span className="flex space-x-2">
                  <button><EditIconSVG/></button>
                  <button>{ list.isFavorite ? <FullStarIconSVG/> : <StarIconSVG/> }</button>
                  <button><DeleteIconSVG/></button>
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

interface QueryInfo {
  loading: boolean
  error: ApolloError | undefined
  data: any
  userIsLogged: boolean
  refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<any>>
}

function ListsArrayComponent(props: QueryInfo) {
  if (props.loading) return <p className="mt-7 flex justify-center text-lg">Chargement ...</p>
  if (props.error) return <p className="mt-7 flex justify-center text-lg">Une erreur est survenu.</p>
  if (!props.data || props.data.lists.values.length === 0) return <p className="mt-7 flex justify-center text-lg">... Aucune liste pour le moment.</p>
  if (!props.userIsLogged) return <p className="mt-7 flex justify-center text-lg">Connectez-vous pour voir vos listes.</p>

  return (
    <ListsArray lists={props.data.lists.values} refetch={props.refetch}/>
  )
}

interface ListsFormProps {
  isAddingList: boolean
  setIsAddingList: Dispatch<SetStateAction<boolean>>
  refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<any>>
}

function ListForm(props: ListsFormProps) {
  const { userContext } = useUser()
  const [mutateFunction] = useMutation(createListMutation, { client, context: userContext })
  const { dispatch } = useNotification()

  if (!props.isAddingList) return <></>

  return (
    <div
      className="mt-2 flex justify-center text-lg"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async values => {
          if (values.name === "") {
            props.setIsAddingList(false)
            return
          }

          const response = await mutateFunction({ variables: { input: { ...values, isFavorite: false } } })
          const responseErrors = response.data.createList.errors

          if (responseErrors.length > 0) {
            dispatch(addNotification(responseErrors[0].message, false))
          } else {
            dispatch(addNotification(`La liste "${values.name}" a été ajouté.`, true))
          }

          props.refetch()
          props.setIsAddingList(false)
        }}
      >
        {({ handleSubmit, submitForm, isSubmitting }) => (
          <Form
            onSubmit={() => handleSubmit}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit()
              }
            }}
          >
            <Field
              id="name"
              className="bg-transparent border-2 rounded-2xl h-9 w-full mt-3 pl-2 focus:outline-none border-white"
              type="text"
              placeholder="Sans nom"
              name="name"
              autoFocus={true}
              onBlur={() => {
                setTimeout(submitForm, 0)
              }}
              disabled={isSubmitting}
              />

          </Form>
        )}

      </Formik>
    </div>
  )
}

interface ListsFormComponentProps {
  isAddingList: boolean
  setIsAddingList: Dispatch<SetStateAction<boolean>>
}

function ListsComponent(props: ListsFormComponentProps) {
  const { isLogged, userContext } = useUser()
  const [getAllLists, { loading, refetch, data, error }] = useLazyQuery(getUserListsQuery, { context: userContext })

  useEffect(() => {
    if (isLogged) {
      getAllLists()
    }
  }, [getAllLists, isLogged])

  return (
    <div>
      <ListForm
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

export {
  ListsComponent
}