import { useNavigate } from "react-router-dom";
import {Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, Typography} from "@mui/material";
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from '@mui/material/Tooltip';
import {Favorite} from "@mui/icons-material";



export function BookCardComponent({ name, author,bookCategory,image,bookId }: { name: string, author: string, bookCategory: string , image? :string ,bookId:number}) {
  
    const userType = localStorage.getItem("userType");
    const navigate = useNavigate();
    const handleNavigate =()=>{
        navigate(`/all-books/${bookId}`);
    }

    return (
        // @ts-ignore
        //@ts-expect-error
        <Card xs={12} 
        sx={{ 
            width: 0.9, 
            borderRadius: "20px", 
            fontFamily: "Cairo, sans-serif", 
            maxHeight: '380px',
            minHeight: '380px',
            position: "relative",
           
            "&:hover .hover-box": { 
                opacity: 1,
                transform: "translateY(0)"
            },
            "&:hover .hover-image": {
                 filter: "brightness(0.6)"
            }
            
        }}
    >
        {/* صورة الكتاب */}
        <CardMedia className="hover-image" 
            sx={{
                marginX: 2, 
                marginY: 3,
                objectFit: "cover", 
                width: '90%', 
                transition: "all 0.3s ease-in-out",
                filter: "brightness(1)",
               
            }}
            component="img"
            image={image}
            alt="Service Image"
        />
    
        <Box className="hover-box" 
            sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "100%",
                opacity: 0,
                transform: "translateY(100%)", 
                transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
                display: "flex",
                flexDirection: "column",
                justifyContent: "end"
            }}
        >
           
            <CardHeader
                sx={{
                    background: "rgba(255, 255, 255, 0.8)",
                    padding: "10px",
                    transition: "all 0.3s ease-in-out"
                }}
                avatar={
                    <Avatar 
                    sx={{ 
                        bgcolor: '#4b7fb2', 
                        width: 56,
                        height: 56, 
                    }} 
                    aria-label="recipe"
                >
                    <img 
                        src="/public/fav_icon.png" 
                        alt="Avatar" 
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "50%"
                        }}
                    />
                </Avatar>
                
                }
                title={
                    <Typography variant="h6" sx={{ fontFamily: "Cairo, sans-serif", fontSize: '20px' }}>
                        {name}
                    </Typography>
                }
            />
    
        
            <CardContent sx={{
                direction: "rtl",
                background: "rgba(255, 255, 255, 0.8)",
                padding: "10px",
                transition: "all 0.3s ease-in-out"
            }}>
                <Typography variant="body1" color="text.primary" sx={{ fontFamily: "Cairo, sans-serif" }}>
                    المؤلف : {author}
                </Typography>
                <Typography variant="body1" color="text.primary" sx={{ fontFamily: "Cairo, sans-serif" }}>
                    نوع الكتاب : {bookCategory}
                </Typography>
            </CardContent>
    
            <CardActions sx={{
                background: "rgba(255, 255, 255, 0.8)",
                padding: "10px",
                display: "flex",
                justifyContent: "center",
                transition: "all 0.3s ease-in-out"
            }}>
                {userType === "admin" && (
                       <>
                       <Tooltip title="حذف الكتاب">
                           <IconButton aria-label="add" onClick={handleNavigate}>
                               <DeleteIcon />
                           </IconButton>
                       </Tooltip>
                       <Tooltip title="تعديل الكتاب">
                           <IconButton aria-label="add" onClick={handleNavigate}>
                               <EditIcon />
                           </IconButton>
                       </Tooltip>
                       </>
                )}
                <Tooltip title="تفاصيل الكتاب">
                    <IconButton aria-label="add" onClick={handleNavigate}>
                        <ReadMoreIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="إضافة إلى المفضلة">
                    <IconButton aria-label="favorite">
                        <Favorite />
                    </IconButton>
                </Tooltip>
                <Tooltip title="إضافة إلى مقروءة">
                    <IconButton aria-label="favorite">
                        <Favorite />
                    </IconButton>
                </Tooltip>
            </CardActions>
        </Box>
    </Card>
    
        
        
    );
}