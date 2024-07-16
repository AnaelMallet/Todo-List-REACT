'use client'

import { useRouter } from 'next/navigation'
import { ApolloProvider } from '@apollo/client'

import NotificationProvider from '../components/notifications/NotificationProvider'
import Sidebar from '../components/sidebar'

import client from "./graphql-api"

export function Providers({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ApolloProvider client={client}>
      <NotificationProvider>
        {children}
      </NotificationProvider>
    </ApolloProvider>
  )
}

function Home() {
  const router = useRouter()

  return (
    <>
      <Sidebar />
      <div className="absolute inline space-x-4 right-0 m-5 text-white">
        <button onClick={() => router.push("/login")} className="bg-[#282c34] font-bold rounded-md p-2">Se connecter</button>
        <button onClick={() => router.push("/register")} className="bg-cyan-400 font-bold hover:bg-cyan-500 rounded-md p-2">S'inscrire</button>
      </div>
    </>
  )
}

export default Home
