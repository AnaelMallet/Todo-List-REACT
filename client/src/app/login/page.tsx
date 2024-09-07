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
  const router = useRouter()
  const [mutateFunction, { loading }] = useMutation(loginUserMutation, { client })
  const { dispatch } = useNotification()
  const { setAccessToken } = useUser()

  return (
    <main className="h-screen flex place-items-center place-content-center">
      <div className="w-1/3 bg-[#282c34] rounded-lg">
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
                setAccessToken(accessToken)
                
                location.replace("/")
              }
            }}
          >
          {({ isSubmitting, errors, touched }) => (
            <Form className="grid grid-cols-1 gap-y-10 w-full text-white">
              <div className="px-5">
                <label className="bg-transparent" htmlFor="login">Adresse email/Nom d'utilisateur <span className="text-red-600">*</span></label>
                <Field
                  className={classNames({
                    "bg-transparent border-2 rounded-2xl h-9 w-full mt-3 pl-2 focus:outline-none": true,
                    "border-red-500": errors.login && touched.login,
                    "border-white": !errors.login
                  })}
                  id="login"
                  name="login"
                  type="text"
                  placeholder="adresse email/nom d'utilisateur"
                />
                { errors.login && touched.login ? <div className="text-red-500 text-xs -mb-4">{ errors.login }</div> : <></> }
              </div>
              <div className="px-5">
                <label className="bg-transparent" htmlFor="password">Mot de passe <span className="text-red-600">*</span></label>
                <Field
                  className={classNames({
                    "bg-transparent border-2 rounded-2xl h-9 w-full mt-3 pl-2 focus:outline-none": true,
                    "border-red-500": errors.password && touched.password,
                    "border-white": !errors.password
                  })}
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Mot de passe"
                  autoComplete="on"
                />
                { errors.password && touched.password ? <div className="text-red-500 text-xs -mb-4">{ errors.password }</div> : <></> }
              </div>
              <div className="flex justify-center text-white pb-6 space-x-10">
                <button type="submit" disabled={isSubmitting || loading} className="bg-cyan-400 font-bold hover:bg-cyan-500 rounded-md p-2">Valider</button>
                <button type="button" onClick={() => router.push("/")} className="font-bold p-2 border-white border-2 rounded-md">Annuler</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  )
}

export default LoginPage