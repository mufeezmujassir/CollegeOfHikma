import React from 'react'
import HeroSlider from '../Home/HeroSlider'
import ManagementMessage from '../Home/ManagementMessage'
import NewsLayer from '../Home/NewsLayer'
import UpcommingEvent from './UpcommingEvent'
import PopupBox from './PopupBox'
const Home = () => {
  return (
    <>
        <PopupBox/>
        <HeroSlider/>
        <UpcommingEvent/>
        
        <ManagementMessage/>
        <NewsLayer/>
        
    </>
  )
}

export default Home
