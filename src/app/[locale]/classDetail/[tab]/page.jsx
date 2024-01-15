import React from 'react'
import StudentsPage from './students/page'


const page = ({params}) => {
  return (
    <>
      <StudentsPage params={params} />
    </>
  )
}

export default page