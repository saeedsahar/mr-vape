import React from 'react'
import { useSelector } from 'react-redux'
import ProductDisplay from '../../Component/HomePage/Product/ProductDisplay'

function ProductList(props) {
 let productState = useSelector((state) => state.product)

  return (
    <div className="tab-content">
    <div id="latest-item" className="tab-pane fade show active">
      <div className="row g-4">
        {productState.products?.map((product) => {
          return <ProductDisplay product={product}/>
        })}
       
      </div>
    </div>
  </div>
  )
}

export default ProductList