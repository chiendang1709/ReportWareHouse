import React from 'react'
import Navbar from './components/Navbar'
import Banner from './components/Banner'
import 'pages/Home/home.scss'

const Home = () => {
  return (
    <div>
        <Navbar></Navbar>
        <Banner></Banner>
    </div>
  )
}

export default Home