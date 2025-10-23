import { Field, Form, Formik } from "formik"
import { Dispatch, SetStateAction } from "react"

import { useModal } from "../confirmationModal/ModalProvider"

import {
    initialValues,
    validationSchema
} from "./api"
import classNames from "classnames"

interface AddTaskFormProps {
    setDisplayTaskForm: Dispatch<SetStateAction<boolean>>
}

export default function AddTaskForm(props: AddTaskFormProps) {
    const { openModal, closeModal } = useModal()

    return (
        <div className="border-2 border-gray-400 rounded-lg">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={() => {}}
            >
                {({ isSubmitting, values, errors, touched }) => (
                    <Form className="grid grid-cols-1 w-full text-[#282c34]">
                        <div className="p-3">
                            <div>
                                <label htmlFor="title">Titre de la tâche<span className="text-red-600">*</span></label>
                            </div>
                            <Field
                                id="title"
                                name="title"
                                type="text"
                                placeholder="Titre de la tâche"
                                className={classNames({
                                     "border-gray-400 border-2 rounded-2xl h-9 w-full pl-2 focus:outline-none": true,
                                    "border-gray-400": !errors.title,
                                    "border-red-600": errors.title && touched.title
                                })}
                            />
                            {errors.title && touched.title ? <div className="text-red-600 text-xs">{errors.title}</div> : <></>}
                        </div>
                        <div className="p-3">
                            <div>
                                <label htmlFor="description">Description de la tâche<span className="text-red-600">*</span></label>
                            </div>
                            <Field
                                id="description"
                                name="description"
                                type="text"
                                className={classNames({
                                    "border-gray-400 border-2 rounded-2xl h-9 w-full pl-2 focus:outline-none": true,
                                    "border-gray-400": !errors.description,
                                    'border-red-600': errors.description && touched.description
                                })}
                                placeholder="Description de la tâche"
                            />
                            {errors.description && touched.description ? <div className="text-red-600 text-xs">{errors.description}</div> : <></>}
                        </div>
                        <div className="text-white flex p-3 gap-3">
                            <button type="submit" disabled={isSubmitting} className="bg-cyan-400 font-bold hover:bg-cyan-500 rounded-md p-2">Valider</button>
                            <button
                                type="button"
                                className="font-bold p-2 bg-[#282c34] hover:bg-[#181c24] rounded-md"
                                onClick={() => {
                                    if (values.title === "" && values.description === "") {
                                        props.setDisplayTaskForm(() => false)
                                        return
                                        
                                    }
                                    openModal({
                                            title: "Annuler la saisis d'une tâche",
                                            description: "Les informations du formulaire ne seront pas enregistrées.",
                                            function: function () {
                                                props.setDisplayTaskForm(() => false)
                                                closeModal()
                                            }
                                        })
                                }}
                            >Annuler</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}