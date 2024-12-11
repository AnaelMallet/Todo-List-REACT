'use client'

import { useMutation } from "@apollo/client"
import client from "@/app/graphql-api"
import { Field, Form, Formik } from "formik"
import { Dispatch, SetStateAction } from "react"

import { addNotification, useNotification } from "../notifications/NotificationProvider"
import { useUser } from "../users/userProvider"

import { initialValues, validationSchema } from "./api"
import { createListMutation } from "./graphql"

interface ListsProps {
  isAddingList: boolean
  setIsAddingList: Dispatch<SetStateAction<boolean>>
}

function Lists(props: ListsProps) {
  const { dispatch } = useNotification()
  const { userContext } = useUser()
  const [mutateFunction, { loading }] = useMutation(createListMutation, { client, context: userContext })

  return (
    <>
      {
        props.isAddingList
        ?
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

              if (!loading) {
                props.setIsAddingList(false)
              }
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
        : <></>
      }
      <p className="mt-7 flex justify-center text-lg">... aucune liste pour le moment</p>
    </>
  )
}

export {
  Lists
}