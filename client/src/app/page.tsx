'use client'

import { useRouter } from 'next/navigation'
import { ApolloProvider } from '@apollo/client'

import Sidebar from '../components/sidebar'

import client from "./graphql-api"

function Home() {
  const router = useRouter()

  return (
    <ApolloProvider client={client}>
      <Sidebar />
      <div className="absolute inline space-x-4 right-0 mx-5 my-5 text-white">
        <button onClick={() => router.push("/login")} className="bg-[#282c34] font-bold rounded-md p-2">Se connecter</button>
        <button onClick={() => router.push("/register")} className="bg-cyan-400 font-bold hover:bg-cyan-500 rounded-md p-2">S'inscrire</button>
      </div>
    </ApolloProvider>
  )
}

export default Home
