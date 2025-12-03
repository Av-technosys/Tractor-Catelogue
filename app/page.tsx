
import Footer from '@/src/components/Footer'
import Header from '@/src/components/Header'
import Link from 'next/link'
import React from 'react'

const Home = () => {
  return (
    <div>
      <Header/>
       <Link href="/register">
       
      </Link>
      <Link href="/login">
     
      </Link>
      <Link href="/forget">
      </Link>
       <Link href="/new-password">
      </Link>
      <Footer/>
    </div>
  )
}

export default Home