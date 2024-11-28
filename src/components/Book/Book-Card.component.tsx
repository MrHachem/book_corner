import {Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Typography} from "@mui/material";
// import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import {AddBox, Favorite} from "@mui/icons-material";



export function BookCardComponent({ name, author,type,image }: { name: string, author: string, type: string , image? :string }) {

    return (
        // @ts-ignore
        <Card xs={12} sx={{width: 1, borderRadius: "20px" ,fontFamily:"Cairo, sans-serif"}}>
            <CardMedia
                sx={{marginY: 2, borderRadius: "20px"}}
                component="img"
                height="225"
                image={image}
                alt="Service sd;"
            />
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor: '#5c778c', padding: 3}} aria-label="recipe">
                        BC
                    </Avatar>
                }
                title={<Typography variant="h6" sx={{fontFamily:"Cairo, sans-serif"}}>
                    {name}
                </Typography>}
            />
            <CardContent sx={{direction: "rtl"}}>
                <Typography variant="body1" color="text.primary" sx={{fontFamily:"Cairo, sans-serif"}}>
                     المؤلف : {author}
                </Typography>
                <Typography variant="body1" color="text.primary" sx={{fontFamily:"Cairo, sans-serif"}}>
                   نوع الكتاب :    {type}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="edit" sx={{color: "#455769"}}>
                    <EditIcon/>
                </IconButton>
                <IconButton aria-label="edit">
                    <DeleteIcon/>
                </IconButton>
                <IconButton aria-label="add">
                    <AddBox/>
                </IconButton>
                <IconButton aria-label="favorite" sx={{color: "#F8D96ACF"}}>
                    <Favorite/>
                </IconButton>
            </CardActions>
        </Card>
    );
}