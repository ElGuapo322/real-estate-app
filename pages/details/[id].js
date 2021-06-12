 import React from "react";
 import {useEffect, useState} from "react";
import { useRouter } from "next/router";
import styled, {createGlobalStyle} from "styled-components"
import {Button} from '../../components/Pagination'

const MainBlock = styled.div`
    margin-top: 20px;
    width:90%;
    height:90%;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    margin: 0 auto;
    padding:15px;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    @media(max-width : 600px){
      width:190%;
    })
    `;
    const MainContent = styled.div`
    width:100%;
    height:100%;
    display: flex;
    flex-direction: row;
    @media(max-width : 600px){
      flex-direction:column;
    })
    `
    const Title = styled.div`
    font-weight: bold;
    font-size:22px;
    margin-top:20px;
    `

    

    const AddressBlock = styled.div`
    font-size:16px;
    display: flex;
    flex-direction: row;
    margin-bottom:12px;
    `

    const DataBlock = styled.div`
    width:50%;
    display:flex;
    flex-direction: row;
    width:500px;
    justify-content:space-between;
    margin-top:20px;
    height:80px;
    
    
    `

    const DataBlockItem = styled.div`
    
    display:flex;
    flex-direction: column;
    height:50px;
    `
    const DataBlockItemData = styled.div`
    font-size:20px;
    font-weight: bold;
    justify-content:center;
    display:flex;
    align-items: center;
    height:45px;
    `

    const DataBlockItemDescr = styled.div`
    font-size:14px;
    color: grey;
    `
    const TextBlock = styled.div`
    border-top: 1px solid grey;
    font-size:14px;
    padding-top:12px;
    `
    
    const ImageBlock= styled.div`
    width:100%;
    height:400px;
    background-image:${(props) => "url(" + props.imgUrl + ")"};
    background-size:cover;
    background-repeat: no-repeat;
    image-size:100%;
    display:block;
    margin:auto;
    background-position:center
    `
    const LeftBlock = styled.div`
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    height: 80%;
    width:50%;
    padding:10px;
    @media(max-width : 600px){
      width:95%;
      margin: 0 auto;
    }
    `
    const BuyBlock = styled.div`
    height:300px;
    width:500px;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    display:flex;
    flex-direction: column;
    margin-left:50px;
    @media(max-width : 600px){
        margin:0 auto;
        margin-top:20px;
      }
    `
    const PriceBlock = styled.div`
    
    font-size:32px;
    font-weight: bold;
    height:33%;
    display: flex;
    align-items: center;
    justify-content: center;
    `
    const PhoneBlock = styled.div`
    display: flex;
    flex-direction: column;
    padding:10px;
    width:100%;
    justify-content: space-between;
    height:33%;
    align-items: center;
    `

    const Phone = styled.div`
    display: flex;
    align-items: center;
    justify-content:center;
    font-weight: bold;
    font-size:22px;
    `
    const ShowPhone = styled.div`
    color:white;
    background: #229bf2;
    border-radius: 20px;
    width:200px;
    height:40px;
    display: flex;
    align-items: center;
    justify-content:center;
    cursor: pointer;
    align-self: center;
    
  &:hover {
    background: #b3bfff; 
  }
    `

    const Product = styled.div`
    height:33%;
    border-top: 1px solid #e5e5e5;
    width:100%;
    display: flex;
    align-items: center;
    justify-content:center;
    font-size:20px;
    `
    

 export default function Id(){
     const router = useRouter();
     const { id } = router.query;
    const [house, setHouse] = useState(null);
    const [number, setNumber] = useState(false)

    const showMoreBtn = () =>{
        if(number){
            setNumber(false)
        } else {
            setNumber(true)
        }
    }

    
    

     useEffect(() => {
        if(id)
         {fetch(`/api/details/${id}`)
        .then((res) => res.json())
         .then((res) => setHouse(res));
         }
     }, [id])
     
     const BackBtn = (e) =>{
        router.push('/listings')
      }

 return(
  <MainBlock> 
     {house && 
     
     <MainContent>
         
         <LeftBlock>
         <Button onClick={BackBtn}>Back</Button>
             <Title>{house.builder}</Title>
         <AddressBlock> {house.address.city}, {house.address.state}, {house.address.street}, {house.address.zip}</AddressBlock>
     <ImageBlock imgUrl={house.images[0]}/>
     <DataBlock>
     <DataBlockItem>
         <DataBlockItemData>{house.square} м<sup>2</sup></DataBlockItemData>
         <DataBlockItemDescr>square</DataBlockItemDescr>
     </DataBlockItem>
     <DataBlockItem>
         <DataBlockItemData>{house.garage}</DataBlockItemData>
         <DataBlockItemDescr>garages</DataBlockItemDescr>
     </DataBlockItem>
     <DataBlockItem>
         <DataBlockItemData>{house.bedrooms}</DataBlockItemData>
         <DataBlockItemDescr>bedrooms</DataBlockItemDescr>
     </DataBlockItem>
     <DataBlockItem>
         <DataBlockItemData>{house.type}</DataBlockItemData>
         <DataBlockItemDescr>type</DataBlockItemDescr>
     </DataBlockItem>
     </DataBlock>
     <TextBlock>
         {house.description}
     </TextBlock>
</LeftBlock>
<BuyBlock>
    <PriceBlock>{house.price} $</PriceBlock>
    <PhoneBlock>
    <ShowPhone onClick={showMoreBtn}>ShowPhone</ShowPhone>
    <Phone>{number ? (<div>{house.phone}</div>):(<div></div>)}</Phone>
    </PhoneBlock>
    <Product>{house.product}</Product>
    
</BuyBlock>
</MainContent>
     }
     
 </MainBlock> 
 )

 }
