import * as Yup from "yup"

export const initialValues = {
    title : "",
    description: ""
}

export const validationSchema = Yup.object().shape({
    title: Yup
        .string()
        .required("Le titre est obligatoire."),
    description: Yup
        .string()
        .required("La description est obligatoire.")
})