import React, { useState, useEffect } from "react"
import Link from 'next/link'
import styled, {createGlobalStyle} from "styled-components"


const StyledLink = styled(Link)`
    decoration:none;
    color: grey;
    `
    const CardContainer = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr ;
    grid-template-columns: 1fr 1fr;
    width:580px;
    
    grid-gap: 45px;
    margin:auto;
    @media(max-width : 600px){
        width:540px;
        
        grid-gap: 10px;
      }
    `

    export const StyledSpan = styled.span`
    decoration:none;
    color: grey;
    cursor:pointer;
    font-size: 20px;
    &:hover {
        color: #e5e5e5; 
      }
    `
    const PickCard = styled.div`
    width:260px;
    height:200px;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content: space-around;
    @media(max-width : 600px){
        width:150px
        height:80px;
      }
    
    `
    const PickCardImage = styled.div`
    height:120px;
    width:95%;
    background:${(props) => "url(" + props.imgUrl + ")"};
    background-size:cover;
    background-repeat: no-repeat;
    border-radius:4px;
    background-position:center;
    
    
    `
   export const Button = styled.button`
    width:100px;
    background: #229bf2;
    color:white;
    border:none;
    border-radius:4px;
    cursor:pointer;
    &:hover {
        background: #b3bfff; 
      }
      &:disabled {
        background: #817e91; 
      }
    
    `
    const ButtonBlock = styled.div`
    display:flex;
    width:20%;
    margin:auto;
    margin-top: 30px;
    margin-bottom: 30px;
    justify-content:space-between;
    @media(max-width : 600px){
        width:300px;
        
        margin-left:40%;
        align-self: center;
        ;
      }
    `

export default function Pagination({ itemsPerPage, items, fromFilters, getLastIndex, toFirst }) {
    const [currentPage, setCurrentPage] = useState(1)
    const [upperPageBound, setUpperPageBound] = useState(3)
    const [lowerPageBound, setLowerPageBound] = useState(0)
    const [pageBound, setPageBound] = useState(3)
    const [isPrevActive, setIsPrevActive] = useState(false)
    const [isNextActive, setIsNextActive] = useState(true)

    useEffect(() => {
        if (Math.ceil(items.length / itemsPerPage) > 0) {
            if (currentPage >= Math.ceil(items.length / itemsPerPage)) {
                setIsNextActive(false)
            }

            if (currentPage > 1) {
                setIsPrevActive(true)
            }

            if (currentPage < Math.ceil(items.length / itemsPerPage)) {
                setIsNextActive(true)
            }

            if (currentPage === 1) {
                setIsPrevActive(false)
            }
        }

        if (items.length === 0) {
            setIsNextActive(false)
        }

        if (toFirst) {
            setCurrentPage(1)
        }
    }, [currentPage, items])

    const prev = () => {
        if (isPrevActive) {
            if ((currentPage - 1) % pageBound === 0) {
                setUpperPageBound(upperPageBound - pageBound)
                setLowerPageBound(lowerPageBound - pageBound)
            }

            setCurrentPage(currentPage - 1)
        }
    }

    const next = () => {
        if (isNextActive) {
            if (currentPage + 1 > upperPageBound) {
                setUpperPageBound(upperPageBound + pageBound)
                setLowerPageBound(lowerPageBound + pageBound)
            }

            getLastIndex(currentPage * itemsPerPage)
            setCurrentPage(currentPage + 1)
        }
    }


    

    const renderItems = () => {
        const indexOfLastTodo = currentPage * itemsPerPage
        const indexOfFirstTodo = indexOfLastTodo - itemsPerPage
        const currentItems = items.slice(indexOfFirstTodo, indexOfLastTodo)

        return (
        <CardContainer>{currentItems && currentItems.map(i => 
            
            <PickCard>
                <PickCardImage imgUrl={i.images[0]}></PickCardImage>
        <StyledLink href={`/details/${i.id}`}><StyledSpan>{i.product}</StyledSpan></StyledLink>
        </PickCard>
        
        ) 
    }</CardContainer>
        )}

    return (
        <div>
            {renderItems()}
            <ButtonBlock>
                <Button disabled={!isPrevActive}  onClick={prev}>
                     Previous
                </Button>
                <Button disabled={!isNextActive}  onClick={next}>
                    Next 
                </Button>
            </ButtonBlock>
        </div>
    )
}