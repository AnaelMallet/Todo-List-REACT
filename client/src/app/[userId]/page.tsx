'use client'

import TextTitle from "@/components/text"
import { useUser } from "@/components/users/UserProvider"
import { useMutation } from "@apollo/client"
import { addNotification, useNotification } from "@/components/notifications/NotificationProvider"
import { Field, Form, Formik } from "formik"
import classNames from "classnames"
import { useRouter } from "next/navigation"
import { useState } from "react"
import * as Yup from "yup"
import { Pencil, CircleX } from 'lucide-react'

import client from "../graphql-api"

import { updateUserMutation } from "./graphql"

function UserPage() {
  const { userId, user, refetch, setUser, userContext } = useUser()
  const { dispatch } = useNotification()
  const router = useRouter()

  const [mutateFunction, { loading }] = useMutation(updateUserMutation, { client, context: userContext })

  const [ isChangingFirstname, setIsChangingFirstname ] = useState<boolean>(false)
  const [ isChangingLastname, setIsChangingLastname ] = useState<boolean>(false)
  const [ isChangingEmail, setIsChangingEmail ] = useState<boolean>(false)
  const [ isChangingUsername, setIsChangingUsername ] = useState<boolean>(false)
  const [ isChangingPassword, setIsChangingPassword ] = useState<boolean>(false)

  if (!user) return <></>

  const initialValues = {
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    username: user.username ? user.username : "",
    password: "",
    confirmationPassword: ""
  }
  const validationSchema = Yup.object().shape({
    firstname: Yup
      .string()
      .test("isChangingFirstname", "Le prénom est obligatoire.", (value) => {
        if (value) {
          return true
        }

        return !isChangingFirstname
      }),
    lastname: Yup
      .string()
      .test("isChangingLastname", "Le nom est obligatoire.", (value) => {
        if (value) {
          return true
        }

        return !isChangingLastname
      }),
    email: Yup
      .string()
      .matches(
        /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/g,
        "L'adresse email n'est pas valide."
      )
      .test("isChangingEmail", "L'adresse email est obligatoire.", (value) => {
        if (value) {
          return true
        }

        return !isChangingEmail
      }),
    username: Yup.string(),
    password: Yup
      .string()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g,
        "Le mot de passe n'est pas valide."
      )
      .test("isChangingPassword", "Le mot de passe est obligatoire.", (value) => {
        if (value) {
          return true
        }

        return !isChangingPassword
      }),
    confirmationPassword: Yup
      .string()
      .oneOf([Yup.ref("password")], "La confirmation du mot de passe n'est pas identique.")
      .test("isChangingPassword", "La confirmation du mot de passe est obligatoire.", (value) => {
        if (value) {
          return true
        }

        return !isChangingPassword
      })
  })

  return (
    <main className="h-screen flex place-content-center place-items-center">
      <section className="w-2/5 bg-[#282c34] rounded-lg">
        <TextTitle/>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async values => {
            const sendValues = {
              uuid: userId,
              firstname: values.firstname !== user.firstname ? values.firstname : null,
              lastname: values.lastname !== user.lastname ? values.lastname : null,
              email: values.email !== user.email ? values.email : null,
              username: values.username !== user.username ? values.username : null,
              password: values.password !== user.password ? values.password : null
            }

            const response = await mutateFunction({ variables: { input: sendValues } })
            const responseErrors = response.data.updateUser.errors

            if (responseErrors.length > 0) {
              dispatch(addNotification(responseErrors[0].message, false))
            } else {
              dispatch(addNotification("Utilisateur mis à jour", true))
              setIsChangingFirstname(false)
              setIsChangingLastname(false)
              setIsChangingEmail(false)
              setIsChangingUsername(false)
              setIsChangingPassword(false)

              const response = await refetch({ userId })
              const data = response.data.me.values
              setUser(data)
            }
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="grid grid-cols-1 gap-y-10 w-full text-white">
              <div className="grid grid-cols-2 gap-x-5 px-5 place-items-center">
                <p>
                  <div className="flex place-items-center gap-3">
                    <button type="button" onClick={() => setIsChangingLastname(!isChangingLastname)}className="rounded-md p-0.5">{isChangingLastname === false ? <Pencil/> : <CircleX className="text-red-600"/>}</button>
                    <label htmlFor="lastname" className="bg-transparent">Nom</label>
                  </div>
                  <Field
                    className={classNames({
                      "bg-transparent rounded-2xl h-9 w-full mt-3 pl-2 focus:outline-none": true,
                      "border-2 border-red-600": isChangingLastname && errors.lastname && touched.lastname,
                      "border-2 border-white": isChangingLastname && !errors.lastname,
                      "border-2 border-transparent": !isChangingLastname
                    })}
                    id="lastname"
                    type="text"
                    placeholder="Nom"
                    name="lastname"
                    disabled={!isChangingLastname}
                  />
                  { isChangingLastname && errors.lastname && touched.lastname ? <div className="text-red-600 text-xs -mb-4">{ errors.lastname }</div> : <></> }
                </p>
                <p>
                  <p className="flex place-items-center gap-3">
                    <button type="button" onClick={() => setIsChangingFirstname(!isChangingFirstname)}className="rounded-md p-0.5">{ isChangingFirstname === false ? <Pencil/> : <CircleX className="text-red-600"/> }</button>
                    <label htmlFor="firstname" className="bg-transparent">Prénom</label>
                  </p>
                  <Field
                    className={classNames({
                      "bg-transparent rounded-2xl h-9 w-full mt-3 pl-2 focus:outline-none": true,
                      "border-2 border-red-600": isChangingFirstname && errors.firstname && touched.firstname,
                      "border-2 border-white": isChangingFirstname && !errors.firstname,
                      "border-2 border-transparent": !isChangingFirstname
                    })}
                    id="firstname"
                    type="text"
                    placeholder="Prénom"
                    name="firstname"
                    disabled={!isChangingFirstname}
                  />
                  { isChangingFirstname && errors.firstname && touched.firstname ? <div className="text-red-600 text-xs -mb-4">{ errors.firstname }</div> : <></> }
                </p>
              </div>
              <div className="grid grid-cols-2 gap-x-5 px-5 place-items-center">
                <p>
                  <div className="flex place-items-center gap-3">
                    <button type="button" onClick={() => setIsChangingEmail(!isChangingEmail)} className="rounded-md p-0.5">{ isChangingEmail === false ? <Pencil/> : <CircleX className="text-red-600"/> }</button>
                    <label htmlFor="email" className="bg-transparent">Adresse email</label>
                  </div>
                  <Field
                    className={classNames({
                      "bg-transparent rounded-2xl h-9 w-full mt-3 pl-2 focus:outline-none": true,
                      "border-2 border-red-600": isChangingEmail && errors.email && touched.email,
                      "border-2 border-white": isChangingEmail && !errors.email,
                      "border-2 border-transparent": !isChangingEmail
                    })}
                    id="email"
                    type="text"
                    placeholder="Adresse email"
                    name="email"
                    disabled={!isChangingEmail}
                  />
                  { isChangingEmail && errors.email && touched.email ? <div className="text-red-600 text-xs -mb-4">{ errors.email }</div> : <></> }
                </p>
                <p>
                  <p className="flex place-items-center gap-3">
                    <button type="button" onClick={() => setIsChangingUsername(!isChangingUsername)}className="rounded-md p-0.5">{ isChangingUsername === false ? <Pencil/> : <CircleX className="text-red-600"/> }</button>
                    <label htmlFor="username" className="bg-transparent">Nom d'utilisateur</label>
                  </p>
                  <Field
                    className={classNames({
                      "bg-transparent rounded-2xl h-9 w-full mt-3 pl-2 focus:outline-none": true,
                      "border-2 border-white": isChangingUsername,
                      "border-2 border-transparent": !isChangingUsername
                    })}
                    id="username"
                    type="text"
                    placeholder={isChangingUsername ? "Nom d'utilisateur" : ""}
                    name="username"
                    disabled={!isChangingUsername}
                  />
                </p>
              </div>
              <p className="flex justify-center space-x-10">
                <button type="button" disabled={isSubmitting} onClick={() => setIsChangingPassword(!isChangingPassword)} className="font-bold p-2 border-white hover:bg-[#181c24] border-2 rounded-md">Changer de mot de passe</button>
              </p>
              {
                isChangingPassword === true ?
                <section className="grid grid-cols-2 gap-x-5 px-5">
                  <p>
                    <label className="bg-transparent" htmlFor="password">Mot de passe</label>
                    <Field
                      className={classNames({
                        "bg-transparent border-2 rounded-2xl h-9 w-full mt-3 pl-2 focus:outline-none": true,
                        "border-red-600": isChangingPassword && errors.password && touched.password,
                        "border-white": isChangingPassword && !errors.password
                      })}
                      id="password"
                      type="password"
                      placeholder="Mot de passe"
                      name="password"
                      autoComplete="on"
                    />
                    { isChangingPassword && errors.password && touched.password ? <div className="text-red-600 text-xs -mb-4">{ errors.password }</div> : <></> }
                  </p>
                  <p>
                    <label className="bg-transparent" htmlFor="confirmationPassword">Confirmation du mot de passe</label>
                      <Field
                        className={classNames({
                          "bg-transparent border-2 rounded-2xl h-9 w-full mt-3 pl-2 focus:outline-none": true,
                          'border-red-600': isChangingPassword && errors.confirmationPassword && touched.confirmationPassword,
                          "border-white": isChangingPassword && !errors.confirmationPassword
                        })}
                        id="confirmationPassword"
                        type="password"
                        placeholder="Confirmation du mot de passe"
                        name="confirmationPassword"
                        autoComplete="on"
                      />
                      { isChangingPassword && errors.confirmationPassword && touched.confirmationPassword ? <div className="text-red-600 text-xs -mb-4">{ errors.confirmationPassword }</div> : <></> }
                  </p>
                </section> : 
                <></>
              }
              <p className="flex justify-center pb-6 space-x-10">
                <button disabled={isSubmitting ||loading} type="submit" className="bg-cyan-400 font-bold hover:bg-cyan-500 rounded-md p-2">Valider</button>
                <button type="button" onClick={() => (router.push("/"))} className="font-bold p-2 border-white hover:bg-[#181c24] border-2 rounded-md">Annuler</button>
              </p>
            </Form>
          )}
        </Formik>
      </section>
    </main>
  )
}

export default UserPage