import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Banner from './components/Banner'
import LoadingScreen from './components/Loading'
import './assets/home.scss'

const Home = () => {
  const [Loading,setLoading]= useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000)
  }, [])
  return (
    <>
    { Loading == false ?
      ( <div className='home'>
          <Navbar></Navbar>
          <Banner></Banner>
      </div>
      )
      :(<LoadingScreen></LoadingScreen>)

}
</>
);
}
export default Home