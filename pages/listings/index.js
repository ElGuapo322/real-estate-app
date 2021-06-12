import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Pagination from "../../components/Pagination";
import styled, {createGlobalStyle} from "styled-components"
import {useRouter} from 'next/router'
import {Button} from '../../components/Pagination'


const Select = styled.select`
  width:100px;
  height: 25px;
  border-radius: 4px;
  `
  const Input = styled.input`
  width:100px;
  height:19px;
  `
  const FilterBlock = styled.div`
  width:30%;
  margin: auto;
  display:flex;
  justify-content:space-between;
  margin-bottom:20px;
  margin-top: 50px;
  @media(max-width : 600px){
  width: 530px;
  
  }
  `
const InputBlock = styled.div`
display:flex;
width:45%;
justify-content:space-between;
border-radius: 4px;
@media(max-width : 600px){

}

`
const ListingContainer = styled.div`

margin:auto;

`



export default function Listings() {
  const [listings, setListings] = useState([]);
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(20);
  const [bedroom, setBedroom] = useState("");
  const [square, setSquare] = useState("");
  const router = useRouter();


  useEffect(() => {
    fetch(
      `api/listings?skip=${skip}&take=${take}&bedroom=${bedroom}&square=${square}`
    )
      .then((res) => res.json())
      .then((result) => {
        setListings([...listings, ...result]);
      });
  }, [skip, take, bedroom, square]);

  const getLastIndex = (num) => {
    if (num === listings.length - 10) {
      setSkip(skip + 20);
      setTake(take + 20);
    }
  };

  const filterBedrooms = ({ target }) => {
    setBedroom(target.value);
    setListings([]);
  };

  const changeSquare = ({ target }) => {
    setSquare(target.value);
    setListings([]);
  };
const BackBtn = (e) =>{
  router.push('/')
}
 
   
  return (
    <ListingContainer>
      <Head>
        <title>Houses for Sale</title>
      </Head>
      
      <FilterBlock>
      <Button onClick={BackBtn}>Back</Button>
      <Select onChange={filterBedrooms}>
        <option value="">All</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </Select>
      <InputBlock>
      <label htmlFor="squareInput">Max square:</label>
      <Input value={square} onChange={changeSquare} name="squareInput" />
      </InputBlock>
      </FilterBlock>
      <div>
        
        <Pagination
          getLastIndex={getLastIndex}
          itemsPerPage={10}
          items={listings}
          toFirst={false}
        />
        
      </div>
    </ListingContainer>
  );
}