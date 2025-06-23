import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Footer2 from '../components/Footer2'
import Workstarting from '../components/workstarting'
import LearnMore from '../components/LearnMore';
// import Footer from '../components/Footer'
import { Category } from './Category'
import SuggestionForm from '../admin/pages/SuggestionForm'
export const Home = () => {
  return (
    <div>
        <Header />
        < Hero />
        <Category />
        <Footer2 /> 
    </div>
  )
}
