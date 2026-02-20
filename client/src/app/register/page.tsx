'use client'

import { useRouter } from "next/navigation"
import { Form, Formik, Field } from "formik"
import classNames from "classnames"
import { useMutation } from "@apollo/client"

import TextTitle from "@/components/text"
import { addNotification, useNotification } from "@/components/notifications/notificationProvider"

import client from "../graphql-api"

import { initialValues, schemaValidation } from "./api"
import { createUserMutation } from "./graphql"

function RegsiterPage() {
  const router = useRouter()

  const [mutateFunction, { loading }] = useMutation(createUserMutation, { client })
  const { dispatch } = useNotification()

  return (
    <main className="h-screen flex place-content-center place-items-center">
      <section data-testid="registerFormSection" className="w-1/3 bg-[#282c34] rounded-lg">
        <TextTitle/>
        <Formik
          initialValues={initialValues}
          validationSchema={schemaValidation}
          onSubmit={async values => {
            const response = await mutateFunction({ variables: { input: values } })
            const responseErrors = response.data.createUser.errors
            
            if (responseErrors.length > 0) {
              dispatch(addNotification(responseErrors[0].message, false))
            } else {
              router.push("/")
              dispatch(addNotification("Votre compte a bien été créé.", true))
            }
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="grid grid-cols-1 gap-y-10 w-full text-white">
              <div className="grid grid-cols-2 gap-x-5 px-5">
                <p>
                  <label className="bg-transparent" htmlFor="firstname">Prénom <span className="text-red-600">*</span></label>
                  <Field
                    className={classNames({
                      "bg-transparent border-2 rounded-2xl h-9 w-full mt-3 pl-2 focus:outline-none": true,
                      "border-red-600": errors.firstname && touched.firstname,
                      "border-white": !errors.firstname
                    })}
                    id="firstname"
                    data-testid="firstnameInput"
                    type="text"
                    placeholder="Prénom"
                    name="firstname"
                  />
                  { errors.firstname && touched.firstname ? <div data-testid="firstnameInputErrorText" className="text-red-600 text-xs -mb-4">{ errors.firstname }</div> : <></> }
                </p>
                <p>
                  <label className="bg-transparent" htmlFor="lastname">Nom <span className="text-red-600">*</span></label>
                  <Field
                    className={classNames({
                      "bg-transparent border-2 rounded-2xl h-9 w-full mt-3 pl-2 focus:outline-none": true,
                      "border-red-600": errors.lastname && touched.lastname,
                      "border-white": !errors.lastname
                    })}
                    id="lastname"
                    data-testid="lastnameInput"
                    type="text"
                    placeholder="Nom"
                    name="lastname"
                  />
                  { errors.lastname && touched.lastname ? <div data-testid="lastnameInputErrorText" className="text-red-600 text-xs -mb-4">{ errors.lastname }</div> : <></> }
                </p>
              </div>
              <div className="grid grid-cols-2 gap-x-5 px-5">
                <p>
                  <label className="bg-transparent" htmlFor="email">Adresse email <span className="text-red-600">*</span></label>
                  <Field
                    className={classNames({
                      "bg-transparent border-2 rounded-2xl h-9 w-full mt-3 pl-2 focus:outline-none": true,
                      "border-red-600": errors.email && touched.email,
                      "border-white": !errors.email
                    })}
                    id="email"
                    data-testid="emailRegisterInput"
                    type="text"
                    placeholder="Adresse email"
                    name="email"
                  />
                  { errors.email && touched.email ? <div data-testid="emailRegisterInputErrorText" className="text-red-600 text-xs -mb-4">{ errors.email }</div> : <></> }
                </p>
                <p>
                  <label className="bg-transparent" htmlFor="username">Nom d'utilisateur</label>
                  <Field
                    className="bg-transparent border-white border-2 rounded-2xl h-9 w-full mt-3 pl-2 focus:outline-none"
                    id="username"
                    data-testid="usernameInput"
                    type="text"
                    placeholder="Nom d'utilisateur"
                    name="username"
                  />
                </p>
              </div>
              <div className="grid grid-cols-2 gap-x-5 px-5">
                <p>
                  <label className="bg-transparent" htmlFor="password">Mot de passe <span className="text-red-600">*</span></label>
                  <Field
                    className={classNames({
                      "bg-transparent border-2 rounded-2xl h-9 w-full mt-3 pl-2 focus:outline-none": true,
                      "border-red-600": errors.password && touched.password,
                      "border-white": !errors.password
                    })}
                    id="password"
                    data-testid="passwordRegisterInput"
                    type="password"
                    placeholder="Mot de passe"
                    name="password"
                    autoComplete="on"
                  />
                  { errors.password && touched.password ? <div data-testid="passwordRegisterInputErrorText" className="text-red-600 text-xs -mb-4">{ errors.password }</div> : <></> }
                </p>
                <p>
                  <label className="bg-transparent" htmlFor="confirmationPassword">Confirmation du mot de passe <span className="text-red-600">*</span></label>
                  <Field
                    className={classNames({
                      "bg-transparent border-2 rounded-2xl h-9 w-full mt-3 pl-2 focus:outline-none": true,
                      'border-red-600': errors.confirmationPassword && touched.confirmationPassword,
                      "border-white": !errors.confirmationPassword
                    })}
                    id="confirmationPassword"
                    data-testid="confirmationPasswordInput"
                    type="password"
                    placeholder="Confirmation du mot de passe"
                    name="confirmationPassword"
                    autoComplete="on"
                  />
                  { errors.confirmationPassword && touched.confirmationPassword ? <div data-testid="confirmationPasswordInputErrorText" className="text-red-600 text-xs -mb-4">{ errors.confirmationPassword }</div> : <></> }
                </p>
              </div>
              <p className="flex justify-center pb-6 space-x-10">
                <button data-testid="submitRegisterButton" disabled={isSubmitting || loading} type="submit" className="bg-cyan-400 font-bold hover:bg-cyan-500 rounded-md p-2">Valider</button>
                <button data-testid="cancelRegisterButton" type="button" onClick={() => router.push("/")} className="font-bold p-2 border-white hover:bg-[#181c24] border-2 rounded-md">Annuler</button>
              </p>
            </Form>
          )}
        </Formik>
      </section>
    </main>
  )
}

export default RegsiterPage