import * as Yup from "yup"

const initialValues = {
  firstname: "",
  lastname: "",
  email:"",
  username: "",
  password: "",
  confirmationPassword: ""
}

const schemaValidation = Yup.object().shape({
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
    .required("Le mot de passe est obligatoire.")
    .min(8, "Le mot de passe doit contenir au moins 8 caractères.")
    .matches(/[A-Z]/g, "Le mot de passe doit contenir au moins une majuscule.")
    .matches(/[a-z]/g, "Le mot de passe doit contenir au moins une minuscule.")
    .matches(/[0-9]/g, "Le mot de passe doit contenir au moins un chiffre")
    .matches(/[!@#$%^&*=+?~]/g, "Le mot de passe doit contenir au moins un caractère spécial parmi: !@#$%^&*=+?~"),
  confirmationPassword: Yup
    .string()
    .oneOf([Yup.ref("password")], "La confirmation du mot de passe n'est pas identique.")
    .required("La confirmation du mot de passe est obligatoire.")
})

export {
  initialValues,
  schemaValidation
}