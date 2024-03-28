import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Edit = () => {
  const { id } = useParams()
  
  useEffect(() => {
    const editProduct = async () => {
      const response = await axios.patch(`http://localhost:3000/api/product/${id}`)
    }

    editProduct()
  }, [id])
  

  return (
    <div>Product</div>
  )
}

export default Edit