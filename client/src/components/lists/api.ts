import * as Yup from "yup"

const initialValues = {
  name: ""
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
})

export {
  initialValues,
  validationSchema
}