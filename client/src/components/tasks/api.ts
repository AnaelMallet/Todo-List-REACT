import * as Yup from "yup"

const initialValues = {
    title: "",
    description: ""
}

const validationSchema = Yup.object().shape({
    title: Yup
        .string()
        .required("Le titre est obligatoire."),
    description: Yup
        .string()
        .required("La description est obligatoire.")
})

export {
    initialValues,
    validationSchema
}