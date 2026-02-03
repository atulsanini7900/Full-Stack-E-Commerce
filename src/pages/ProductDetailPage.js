import React from 'react'
import Navbar from '../features/navbar/Navbar'
import ProductList from '../features/product-list/components/ProductList'
import ProductDetail from '../features/product-list/components/ProductDetails'

const ProductDetailPage = () => {
  return (
    <Navbar>
        <ProductDetail></ProductDetail>
    </Navbar>
  )
}

export default ProductDetailPage