import * as Yup from "yup"

const initialValues = {
  login:"",
  password: ""
}

const validationSchema = Yup.object().shape({
  login: Yup
    .string()
    .matches(
      /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/g,
      "L'adresse email n'est pas valide."
    )
    .required("L'adresse email est obligatoire."),
  password: Yup
    .string()
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g,
      "Le mot de passe n'est pas valide."
    )
    .required("Le mot de passe est obligatoire.")
})

export {
  initialValues,
  validationSchema
} 