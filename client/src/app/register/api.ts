import * as Yup from "yup"

const initialValues = {
  firstname: "",
  lastname: "",
  email:"",
  username: "",
  password: "",
  confirmationPassword: ""
}

const validationSchema = Yup.object().shape({
  firstname: Yup
    .string()
    .required("Le prénom est obligatoire."),
  lastname: Yup
    .string()
    .required("Le nom de famille est obligatoire."),
  email: Yup
    .string()
    .matches(
      /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/g,
      "L'adresse email n'est pas valide."
    )
    .required("L'adresse email est obligatoire."),
  username: Yup.string(),
  password: Yup
    .string()
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g,
      "Le mot de passe n'est pas valide."
    )
    .required("Le mot de passe est obligatoire."),
  confirmationPassword: Yup
    .string()
    .oneOf([Yup.ref("password")], "La confirmation du mot de passe n'est pas identique.")
    .required("La confirmation du mot de passe est obligatoire.")
})

export {
  initialValues,
  validationSchema
} 