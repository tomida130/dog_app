import AppLayout from '@/components/Layouts/AppLayout'
import { Box, Card, CardActionArea, CardMedia, Grid, IconButton } from '@mui/material';
import axios from 'axios';
import Head from 'next/head'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import FavoriteICon from '@mui/icons-material/Favorite';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import laravelAxios from '@/lib/laravelAxios';

const Home = () => {

    const[dogimage,setDogImage] = useState("");
    const [isFavorited,setIsFavorited] = useState(false);

    const handleToggleFavorite = async() =>{
        try{
            const response = await laravelAxios.post(`api/favorites`,{
                dog_img: dogimage,
            })
            setIsFavorited(response.data.status == "added")
        }catch(err){
            console.log(err)

        }
    }

    const handleimgChage = async(dogimage)=>{
        console.log(dogimage)
        const favoriteResponse = await laravelAxios.get(`api/favorites/status`,{params:{dog_img: dogimage}});
                console.log(favoriteResponse.data);
                setIsFavorited(favoriteResponse.data);
    }

    useEffect(() => {
        const fetchDogs = async()=>{
            try {
                const response = await fetch('https://dog.ceo/api/breeds/image/random');
                const res = await response.json();
                setDogImage(res.message);
                handleimgChage(res.message);

            
            }catch(err){
                console.log(err);
            }
         }

         fetchDogs();
    }, [])

    const changeDogImage = async() => {
        fetch('https://dog.ceo/api/breeds/image/random')
          .then(res => res.json())
          .then(json => {setDogImage(json.message); handleimgChage(json.message);})
          
          
          
      }

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    ホーム
                </h2>
            }>
            <Box 
            sx={{position: 'relative',
            top: "20px",
            left: "35%",
            zIndex: 5,}}>
                {dogimage? (
                    <>
                
                <img src={dogimage} alt='犬'  width="600" height="500" onChange={handleimgChage}/>
                <Grid sx={{display: 'flex'}} >
                <IconButton style={{color: isFavorited ? "red" : "black"}} onClick={handleToggleFavorite}>
                <FavoriteICon sx={{fontSize: "30px"}} />
                </IconButton>
                <IconButton onClick={changeDogImage}>
                <ChangeCircleIcon sx={{fontSize: "30px"}} />
                </IconButton>
                </Grid>
                </>)
                :
                (<div>loda...</div>)}
            </Box>

            
        </AppLayout>
    )
}

export default Home
