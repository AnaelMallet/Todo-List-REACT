import { Field, Form, Formik } from "formik"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import classNames from "classnames"
import { ApolloQueryResult, OperationVariables, useMutation } from "@apollo/client"

import client from "@/app/graphql-api"

import { useModal } from "../confirmationModal/modalProvider"
import { useUser } from "../users/userProvider"

import { validationSchema, initialValues } from "./api"
import { Task } from "./Task"
import { upsertTaskMutation } from "./graphql"
import { useNotification, addNotification } from "../notifications/notificationProvider"
import { useTaskSettingManager } from "./taskSettingManagerProvider"

interface AddTaskFormProps {
    setDisplayTaskForm: Dispatch<SetStateAction<boolean>>,
    task: Task | undefined,
    list: {uuid: string, name: string},
    refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<any>>
}

export default function AddTaskForm(props: AddTaskFormProps) {
    const {
        setDisplayTaskForm,
        task,
        list,
        refetch
    } = props

    const { userContext } = useUser()
    const { dispatch } = useNotification()
    const { openModal, closeModal } = useModal()
    const { handleIsUpdating } = useTaskSettingManager()
    const [ initialTaskValues, setInitialValues ] = useState(task)
    const [mutateFunction] = useMutation(upsertTaskMutation, { client, context: userContext })

    useEffect(() => {
        setInitialValues(() => task)
    }, [task])

    return (
        <section data-testid="taskFormElement" className="border-2 border-gray-400 rounded-lg">
            <Formik
                initialValues={initialTaskValues ?? initialValues}
                validationSchema={validationSchema}
                enableReinitialize={true}
                onSubmit={async values => {
                    const response = await mutateFunction({ variables: { input: {
                        uuid: task?.uuid,
                        title: values.title,
                        description: values.description,
                        listId: list.uuid
                    } } })
                    const responseErrors = response.data.upsertTask.errors

                    if (responseErrors.length > 0) {
                        dispatch(addNotification(responseErrors[0].message, false))
                    } else {
                        if (task?.uuid) {
                            dispatch(addNotification(`La tâche a été correctement modifié.`, true))
                        } else {
                            dispatch(addNotification(`La tâche '${values.title}' à bien été ajouté à la liste '${list.name}'.`, true))
                        }
                    }

                    setDisplayTaskForm(() => false)
                    if (task) handleIsUpdating(task.uuid)
                    refetch()
                }}
            >
                {({ isSubmitting, values, errors, touched }) => (
                    <Form className="grid grid-cols-1 w-full text-[#282c34]">
                        <div className="p-3">
                            <label htmlFor="title">Titre de la tâche<span className="text-red-600">*</span></label>
                            <Field
                                id="title"
                                data-testid="taskTitleInput"
                                name="title"
                                type="text"
                                placeholder="Titre de la tâche"
                                className={classNames({
                                    "border-gray-400 border-2 rounded-2xl h-9 w-full pl-2 focus:outline-none": true,
                                    "border-gray-400": !errors.title,
                                    "border-red-600": errors.title && touched.title
                                })}
                            />
                            {errors.title && touched.title ? <p className="text-red-600 text-xs">{errors.title}</p> : <></>}
                        </div>
                        <div className="p-3">
                            <label htmlFor="description">Description de la tâche<span className="text-red-600">*</span></label>
                            <Field
                                id="description"
                                data-testid="taskDescriptionInput"
                                name="description"
                                type="text"
                                className={classNames({
                                    "border-gray-400 border-2 rounded-2xl h-9 w-full pl-2 focus:outline-none": true,
                                    "border-gray-400": !errors.description,
                                    'border-red-600': errors.description && touched.description
                                })}
                                placeholder="Description de la tâche"
                            />
                            {errors.description && touched.description ? <p className="text-red-600 text-xs">{errors.description}</p> : <></>}
                        </div>
                        <div className="text-white flex p-3 gap-3">
                            <button data-testid="taskSubmitButton" type="submit" disabled={isSubmitting} className="bg-cyan-400 font-bold hover:bg-cyan-500 rounded-md p-2">Valider</button>
                            <button
                                data-testid="taskCancelButton"
                                type="button"
                                className="font-bold p-2 bg-[#282c34] hover:bg-[#181c24] rounded-md"
                                onClick={() => {
                                    if (values.title == "" && values.description == "") {
                                        setDisplayTaskForm(() => false)
                                        return 
                                    }

                                    openModal({
                                        title: "Annuler la saisis d'une tâche",
                                        description: "Les informations du formulaire ne seront pas enregistrées.",
                                        function: function () {
                                            if (task) handleIsUpdating(task.uuid)

                                            setDisplayTaskForm(() => false)
                                            closeModal()
                                        }
                                    })
                                }}
                            >Annuler</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </section>
    )
}