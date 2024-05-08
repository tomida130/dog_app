import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const MediaCard = ({dogimg}) => {
  console.log(dogimg)
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card>
            <CardActionArea>
                <CardMedia 
                component={"img"}
                sx={{ aspectRatio: "1/1"}}
                image={dogimg}
                />
                
                
            </CardActionArea>
        </Card>
    </Grid>
  )
}

export default MediaCard