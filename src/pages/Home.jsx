import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Footer2 from '../components/Footer2'
import Workstarting from '../components/workstarting'
import Learnmore from '../components/learnMore'
// import Footer from '../components/Footer'
import { Category } from './Category'
export const Home = () => {
  return (
    <div>
        <Header />
        < Hero />
        <Category />
        <Learnmore/>
        <Workstarting />
        <Footer2 /> 
    </div>
  )
}
