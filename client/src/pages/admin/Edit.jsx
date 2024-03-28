import React from 'react'
import { useParams } from 'react-router-dom'

const Edit = () => {
  const params = useParams()
  console.log(params);

  return (
    <div>Product</div>
  )
}

export default Edit