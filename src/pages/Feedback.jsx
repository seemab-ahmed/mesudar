import React from 'react'
import Header from '../components/Header'
import SuggestionForm from '../admin/pages/SuggestionForm'
import Footer2 from '../components/Footer2'
import { Link } from 'react-router-dom'

export const Feedback = () => {
  return (
    <div className='mt-10'>
        <Header />
         <SuggestionForm />
        <Footer2 /> 
      </div>
  )
}
