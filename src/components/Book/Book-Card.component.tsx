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
        <Card xs={12} 
        sx={{ 
            width: 1, 
            borderRadius: "20px", 
            fontFamily: "Cairo, sans-serif", 
            maxHeight: '484px',
            minHeight: '480px',
            position: "relative",
           
            "&:hover .hover-box": { // عند تمرير المؤشر على الكارد
                opacity: 1,
                transform: "translateY(0)"
            },
            "&:hover .hover-image": { // عند تمرير المؤشر على الكارد
                 filter: "brightness(0.6)"
            }
            
        }}
    >
        {/* صورة الكتاب */}
        <CardMedia className="hover-image" 
            sx={{
                margin: 2, 
                objectFit: "contain", 
                width: '90%', 
                transition: "all 0.3s ease-in-out",
                filter: "brightness(1)",
               
            }}
            component="img"
            image={image}
            alt="Service Image"
        />
    
        {/* الصندوق الذي يحوي المحتوى ويظهر عند hover */}
        <Box className="hover-box" 
            sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "100%",
                opacity: 0, // إخفاء افتراضيًا
                transform: "translateY(100%)", // يبدأ من الأسفل
                transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
                display: "flex",
                flexDirection: "column",
                justifyContent: "end"
            }}
        >
            {/* العنوان */}
            <CardHeader
                sx={{
                    background: "rgba(255, 255, 255, 0.8)", // شفافية خفيفة للخلفية
                    padding: "10px",
                    transition: "all 0.3s ease-in-out"
                }}
                avatar={
                    <Avatar 
                    sx={{ 
                        bgcolor: '#4b7fb2', 
                        width: 56, // يمكنك ضبط الحجم حسب الحاجة
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
    
            {/* محتوى البطاقة */}
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
    
            {/* الأزرار */}
            <CardActions sx={{
                background: "rgba(255, 255, 255, 0.8)",
                padding: "10px",
                display: "flex",
                justifyContent: "center",
                transition: "all 0.3s ease-in-out"
            }}>
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