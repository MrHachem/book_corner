import { useNavigate } from "react-router-dom";
import {Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Typography} from "@mui/material";
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from '@mui/material/Tooltip';
import {Favorite} from "@mui/icons-material";



export function BookCardComponent({ name, author,bookCategory,image,bookId }: { name: string, author: string, bookCategory: string , image? :string ,bookId:number}) {
    const navigate = useNavigate();
    const handleNavigate =()=>{
        navigate(`/all-books/${bookId}`);
    }
    return (
        // @ts-ignore
        <Card xs={12} sx={{width: 1, borderRadius: "20px" ,fontFamily:"Cairo, sans-serif",maxHeight: '533px',
            minHeight: '524px'}}>
            <CardMedia
                sx={{marginY: 2, borderRadius: "20px"}}
                component="img"
                height="225"
                image={image}
                alt="Service sd;"
            />
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor: '#4b7fb2', padding: 3}} aria-label="recipe">
                        BC
                    </Avatar>
                }
                title={<Typography variant="h6" sx={{fontFamily:"Cairo, sans-serif",fontSize:'20px'}}>
                    {name}
                </Typography>}
            />
            <CardContent sx={{direction: "rtl"}}>
                <Typography variant="body1" color="text.primary" sx={{fontFamily:"Cairo, sans-serif"}}>
                     المؤلف : {author}
                </Typography>
                <Typography variant="body1" color="text.primary" sx={{fontFamily:"Cairo, sans-serif"}}>
                   نوع الكتاب :    {bookCategory}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                    <Tooltip title="تعديل">
                        <IconButton aria-label="edit" sx={{color: "#455769"}}>
                            <EditIcon/>
                        </IconButton>
                    
                    </Tooltip>
                
                    <Tooltip title="حذف">
                        <IconButton aria-label="delete">
                            <DeleteIcon/>
                        </IconButton>  
                    </Tooltip>
                    <Tooltip title="تفاصيل الكتاب">
                        <IconButton aria-label="add" onClick={handleNavigate}>
                            <ReadMoreIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="إضافة إلى المفضلة">
                    <IconButton aria-label="favorite">
                        <Favorite/>
                    </IconButton>   
                    </Tooltip>
               
            </CardActions>
        </Card>
    );
}