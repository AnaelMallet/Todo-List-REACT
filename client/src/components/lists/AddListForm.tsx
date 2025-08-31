import client from "@/app/graphql-api"
import { ApolloQueryResult, OperationVariables, useMutation } from "@apollo/client"
import { Formik, Form, Field } from "formik"
import { Dispatch, SetStateAction } from "react"

import { useNotification, addNotification } from "../notifications/NotificationProvider"
import { useUser } from "../users/userProvider"

import { initialValues, validationSchema } from "./api"
import { createListMutation } from "./graphql"

interface ListsFormProps {
  isAddingList: boolean
  setIsAddingList: Dispatch<SetStateAction<boolean>>
  refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<any>>
}

function AddListForm(props: ListsFormProps) {
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
        {({ isSubmitting, values }) => (
          <Form>
            <Field
              id="name"
              className="bg-transparent border-2 rounded-2xl h-9 w-full mt-3 pl-2 focus:outline-none border-white"
              type="text"
              placeholder="Sans nom"
              name="name"
              autoFocus={true}
              onBlur={() => {
                if (values.name === "") {
                  props.setIsAddingList(false)
                }
              }}
              disabled={isSubmitting}
            />
          </Form>
        )}

      </Formik>
    </div>
  )
}

export default AddListForm