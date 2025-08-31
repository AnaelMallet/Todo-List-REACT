import client from "@/app/graphql-api"
import { OperationVariables, ApolloQueryResult, useMutation } from "@apollo/client"
import { Formik, Form, Field } from "formik"

import { useNotification, addNotification } from "../notifications/NotificationProvider"
import { useUser } from "../users/userProvider"

import { validationSchema } from "./api"
import { updateListMutation } from "./graphql"
import { ListProps } from "./Lists"

interface UpdateListNameComponentProps {
  list: ListProps,
  handleIsUpdateListName: (uuid: string) => void,
  refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<any>>,
}

function UpdateListNameForm(props: UpdateListNameComponentProps) {
  const {
    list,
    handleIsUpdateListName,
    refetch
  } = props

  const { dispatch } = useNotification()
  const { userContext } = useUser()
  const [updateListMutate] = useMutation(updateListMutation, { client, context: userContext })

  return (
    <div>
      <Formik
        initialValues={{
          name: list.name
        }}
        validationSchema={validationSchema}
        onSubmit={async values => {
          if (values.name === list.name) {
            handleIsUpdateListName(list.uuid)
            return
          }

          const response = await updateListMutate({ variables: { input: { uuid: list.uuid, ...values } } })
          const responseErrors = response.data.updateList.errors

          if (responseErrors.length > 0) {
            dispatch(addNotification(responseErrors[0].message, false))
          } else {
            dispatch(addNotification(`La liste a été mise à jour.`, true))
          }

          handleIsUpdateListName(list.uuid)
          refetch()
        }}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <Field
              className="text-lg bg-transparent w-full pl-2 focus:outline-none"
              id="name"
              type="text"
              placeholder="Sans nom"
              name="name"
              autoFocus={true}
              values={list.name}
              onBlur={() => {
                if (values.name === list.name) {
                  handleIsUpdateListName(list.uuid)
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

export default UpdateListNameForm