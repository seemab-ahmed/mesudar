import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Footer2 from '../components/Footer2'
import Workstarting from '../components/workstarting'
import LearnMore from '../components/LearnMore';
// import Footer from '../components/Footer'
import { Category } from './Category'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div>
        <Header />
        < Hero />
        <Category />
        <div  className="px-5 mb-4">
          <Link to="/feedback" 
          className="bg-[#535252] text-white font-semibold rounded-[10px] px-14 py-4 text-[26px] hover:bg-[#89c497] transition-colors">Feedback and Suggestions</Link>
        </div>
        <Footer2 /> 
    </div>
  )
}
