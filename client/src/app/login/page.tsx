'use client'

import { useRouter } from "next/navigation"
import { Field, Form, Formik } from "formik"
import classNames from "classnames"
import { useMutation } from "@apollo/client"

import TextTitle from "@/components/text"
import { addNotification, useNotification } from "@/components/notifications/NotificationProvider"
import { setLocalStorage } from "@/components/utils"
import { useUser } from "@/components/users/userProvider"

import client from "../graphql-api"

import { initialValues, validationSchema } from "./api"
import { loginUserMutation } from "./graphql"

function LoginPage() {
  const { login } = useUser()
  const router = useRouter()
  const [mutateFunction, { loading }] = useMutation(loginUserMutation, { client })
  const { dispatch } = useNotification()

  return (
    <main className="h-screen flex place-items-center place-content-center">
      <section data-testid="loginFormSection" className="w-1/3 bg-[#282c34] rounded-lg">
        <TextTitle/>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async values => {
              const response = await mutateFunction({ variables: { input: values } })
              const responseErrors = response.data.login.errors

              if (responseErrors.length > 0) {
                dispatch(addNotification(responseErrors[0].message, false))
              } else {
                dispatch(addNotification("Vous êtes maintenant connecté !", true))

                const userId = response.data.login.values.userId
                const accessToken = response.data.login.values.accessToken

                setLocalStorage("userId", userId)
                setLocalStorage("token", accessToken)
                
                login()
                router.push("/")
              }
            }}
          >
          {({ isSubmitting, errors, touched }) => (
            <Form className="grid grid-cols-1 gap-y-10 w-full text-white">
              <p className="px-5">
                <label className="bg-transparent" htmlFor="login">Adresse email <span className="text-red-600">*</span></label>
                <Field
                  className={classNames({
                    "bg-transparent border-2 rounded-2xl h-9 w-full mt-3 pl-2 focus:outline-none": true,
                    "border-red-500": errors.login && touched.login,
                    "border-white": !errors.login
                  })}
                  id="login"
                  data-testid="emailLoginInput"
                  name="login"
                  type="text"
                  placeholder="adresse email"
                />
                { errors.login && touched.login ? <div data-testid="emailLoginInputErrorText" className="text-red-600 text-xs -mb-4">{ errors.login }</div> : <></> }
              </p>
              <p className="px-5">
                <label className="bg-transparent" htmlFor="password">Mot de passe <span className="text-red-600">*</span></label>
                <Field
                  className={classNames({
                    "bg-transparent border-2 rounded-2xl h-9 w-full mt-3 pl-2 focus:outline-none": true,
                    "border-red-500": errors.password && touched.password,
                    "border-white": !errors.password
                  })}
                  id="password"
                  data-testid="passwordLoginInput"
                  name="password"
                  type="password"
                  placeholder="Mot de passe"
                  autoComplete="on"
                />
                { errors.password && touched.password ? <div data-testid="passwordLoginInputErrorText" className="text-red-600 text-xs -mb-4">{ errors.password }</div> : <></> }
              </p>
              <p className="flex justify-center text-white pb-6 space-x-10">
                <button data-testid="submitLoginButton" type="submit" disabled={isSubmitting || loading} className="bg-cyan-400 font-bold hover:bg-cyan-500 rounded-md p-2">Valider</button>
                <button data-testid="cancelLoginButton" type="button" onClick={() => router.push("/")} className="font-bold p-2 border-white hover:bg-[#181c24] border-2 rounded-md">Annuler</button>
              </p>
            </Form>
          )}
        </Formik>
      </section>
    </main>
  )
}

export default LoginPage