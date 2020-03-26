import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import { ProductsContext } from './ProductsProvider'
import { CartContext } from './CartProvider'
import { Link} from 'gatsby'
import {ArrowBack} from "@styled-icons/boxicons-regular/ArrowBack"
import styled from "styled-components"
const ProductPage = ({ productId }) => {
  const { products } = useContext(ProductsContext)
  const { add, toggle } = useContext(CartContext)

  const product = products[productId]

  return (
    <StyledDiv style={{ margin: '0 auto', maxWidth: 500 }}>
      <div style={{ margin: '3rem auto', maxWidth: 300 }}>
        {product.localFiles && (
          <Img fluid={product.localFiles[0].childImageSharp.fluid} />
        )}
      </div>
      <h2 style={{textAlign:"center"}}>{product.name}</h2>
      <div style={{textAlign:"center",fontWeight:"600"}} >{product.caption}</div>
      <br style={{margin:1}} />
      <div style={{ textAlign: 'justify' }}>{product.description}</div>
      <StyledArrow to='/home' className="goback"><ArrowBack size="45"/>Go Home</StyledArrow>
      <button
        style={{ margin: '2rem auto' }}
        onClick={() => {
          add(product.skus[0].id)
          toggle(true)
        }}
      >
        Add To Cart
      </button>    

    </StyledDiv>
  )
}

ProductPage.propTypes = {
  productId: PropTypes.string.isRequired
}

export default ProductPage

const StyledArrow = styled(Link) `
position: relative;
display: inline;
margin-right: 1rem;
text-decoration: none;
&:hover{
  color: #679436;
}
`
const StyledDiv = styled.div `
  font-family: "Poppins", sans-serif;
`