import Head from 'next/head'
import Link from 'next/link'
import styled, {createGlobalStyle} from "styled-components"
import React from "react"
import {StyledSpan} from '../components/Pagination'



 const Container = styled.div`
   
   border: 1px solid #e5e5e5;
   box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
   border-radius: 4px;
   width: 50%;
   height:500px;
   margin: 0 auto;
   margin-top:100px;
   display:flex;
   flex-direction:column;
   justify-content: center;
   align-items: center;
   tex-align:center;
   @media(max-width : 600px){
  width:95%;
  margin-top:10px;
  
  }
 `;
 const HeadTitle = styled.div`
 font-size:60px;
 @media(max-width : 600px){
  font-size:40px;
  
  
}
 `
const CustomLink = styled.div`
decoration: none;
cursor:pointer;
color: grey:
&:hover {
  color: #e5e5e5; 
}
  
`

export default function Home() {
  return (
    
    
    <Container>
       <Head>
        <title>Real Estate App</title>
      </Head> 
      <section>
        <HeadTitle>Real Estate App</HeadTitle>
        <p>
          Here are available <Link href="/listings"><StyledSpan>listings</StyledSpan></Link>.
        </p>
      </section>
      <section>
      </section>
    </Container>
    
  )
}

