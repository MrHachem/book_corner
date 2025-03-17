import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {Box,Card,CardContent,CardActions,Typography,Grid,Rating,IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from '@mui/material/Tooltip';
import {Favorite} from "@mui/icons-material";
import { BookOpenCheck } from 'lucide-react';
import { BookLock } from 'lucide-react';


interface BookDetails {
    id: number;
    title: string;
    author: string;
    bookCategory:string;
    image:string;
    discreption: string;
   
  }

  export function BookCardDetails(){
    
    const navigate = useNavigate();
    const {bookId} = useParams();
    const [book, setBook] = useState<BookDetails>({
      id: 0,
      title: "",
      author: "",
      bookCategory:"",
      image:"",
      discreption: ""
    });
    const [loading, setLoading] = useState(true);
    const [ratingValue, setRatingValue] =useState<number | null>(2);

    //get book from bookId
    useEffect(()=>{
        const fetchData = async()=>{
          try{
            const response = await fetch(`https://676524c952b2a7619f5e8abb.mockapi.io/books/${bookId}`);
            if (!response.ok) {

              if(response.status === 404)
              {
                navigate('*');
              }
              else{
                throw new Error("Book not found");
              }
              
              
            }
            const data = await response.json();
            setBook(data);

          } catch(error){
            console.log(error)

          } finally {
              setLoading(false)
          }
       
        }
        fetchData();

    },[bookId,navigate]);

  //Edit the rateing
    useEffect(()=>{

      const fetchData=()=>{

          console.log("ratingValue",ratingValue);

      }
      fetchData();
    },[ratingValue])


    return loading ? (
      <div>
        Loading...
      </div>
     ) : (
      <>
          <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="start"
                  justifyContent="flex-end"
                
                  sx={{
                    marginTop:1,
                    position: 'relative',
                    height: '40%', // Adjust as needed
                    width: '100%',
                    backgroundImage: 'url("/public/bg.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: '58%;',
                    backgroundRepeat: 'no-repeat',
                    opacity: 1, // Overall image opacity
                    transition: '.3s all ease-in-out',
                    borderRadius:'20px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.72)', // Default shadow
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darken effect
                      backgroundBlendMode: 'darken',
                    },

                  }}
                >
                
                  {/* Content on top of the background */}
                  <Box
                    sx={{
                      position: 'relative',
                      color: 'white',
                      zIndex: 2,
                      padding: 2,
                      marginTop:4,
                      textAlign: 'end'
                    }}
                  >
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                    صاحب الظل الطويل    
                    </Typography>
                    <Typography variant="body1">
                      المؤلف : سدرا حرب
                    </Typography>
                    <Typography variant="body1">
                      Rating: {10} / 5
                    </Typography>
                  </Box>
          </Box>
          <Grid container spacing={3} sx={{marginTop:1}}>

            <Grid item xs={12} md={4} >
                  <Card sx={{borderRadius:'9px',textAlignLast: "center"}}>
                    <CardContent>
                      <Box display="flex" flexDirection="column" alignItems="center" sx={{margin: '3px'}}>
                        <Box
                          sx={{
                            
                            maxWidth: '290px',
                            minWidth:'240px',
                            maxHeight: '290px',
                            minHeight:'290px', 
                            backgroundImage: `url(${book.image})`,
                            backgroundPosition: 'center',
                            transition: '.3s all ease-in-out',
                            borderRadius: '20px',
                            transform: 'scale(1)',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)', // Default shadow
                            '&:hover': {
                              transform: 'scale(1.04)',
                              boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.5)', // Dynamic shadow
                            },
                            }}>
                        </Box>
                        <Box sx={{ '& > legend': { mt: 2 } }}>
                          <Typography variant="h6">
                            {book.title}
                          </Typography>
                          <hr></hr>
                          <Typography variant="h6">
                            {book.author}
                          </Typography>
                          <Typography component="legend">تقييم الكتاب</Typography>
                          <Rating
                            name="book_rating"
                            onChange={(event, newValue) => {
                              setRatingValue(newValue);
                            }}
                            defaultValue={2}
                          />
                        </Box>

                      </Box>
                               
                    </CardContent>
                  </Card>
            </Grid>

            <Grid item xs={12} md={8}>
              <Card sx={{textAlignLast: "start",direction:'rtl'}}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {book.title}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      تاريخ النشر
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      دار النشر
                    </Typography>
                    <hr></hr>
                    
                    <Typography variant="h6" gutterBottom>
                      {/* {book.discreption} */}
                      كتب هذا الكتاب عام 2010 للكاتب الاديب الفيلسوف عبد الحليم حافظ وذلك اثناء الحرب العالمية العاشرة الذي وعد بها ابناء شعبه العظيم المبارك ومن ثم نجحت الرواية في حصد العقول الساذجة الى هراء الافكار والابعاد الديموغرافية 
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Tooltip title="تعديل">
                        <IconButton aria-label="edit" sx={{color: "#455769"}}>
                            <EditIcon/>
                        </IconButton>
                    
                    </Tooltip>
                
                    <Tooltip title="حذف" >
                        <IconButton aria-label="delete" sx={{color: "#455769"}}>
                            <DeleteIcon/>
                        </IconButton>  
                    </Tooltip>
                    <Tooltip title="إضافة إلى المفضلة">
                        <IconButton aria-label="favorite" 
                        sx={{
                          color: "#455769",
                          '&:focus': {
                            color: "#F8D96ACF",
                          }
                        }}>
                            <Favorite/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="تمت قرائتها" >
                        <IconButton aria-label="favorite" sx={{color: "#455769"}}>
                            <BookOpenCheck/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="اكملها لاحقاً" sx={{color: "#455769"}}>
                        <IconButton aria-label="favorite">
                            <BookLock/>
                        </IconButton>
                    </Tooltip>
                </CardActions>
              </Card>  
            </Grid>

          </Grid>
      </>
    );}
    