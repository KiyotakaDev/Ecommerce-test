import { Link } from 'react-router-dom'

const Products = () => {
  return (
    <div>
      <Link to={'/admin/products/new'} className='bg-emerald-500 text-white rounded-md py-1 px-2'>Add new product</Link>
    </div>
  )
}

export default Products