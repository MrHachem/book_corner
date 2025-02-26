import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Avatar,
  Grid,
  // List,
  // ListItem,
  // ListItemText,
  IconButton,
} from "@mui/material";
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import { BookOpenCheck } from 'lucide-react';
import { Star } from 'lucide-react';
import { BookX } from 'lucide-react';

export function ProfilePage(){
    const [editMode, setEditMode] = useState(false);

    const [profile, setProfile] = useState({
      name: "sedra harb",
      email: "sedraharb58@gmail.com",
      phone:"094668909098",
      password_confirmation:"msmdls",
      password:"kmkk"
    });
  
    // const [favoriteBooks, setFavoriteBooks] = useState([
    //   "احببتك اكثر مما ينبغي",
    //   "شيفرة دافنشي",
    //   "اين المفر",
    // ]);
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setProfile({ ...profile, [name]: value });
    };
  
    const toggleEditMode = () => {
      setEditMode(!editMode);
    };
  
    return (
      <Box p={3}>
        <Grid container spacing={3}>
          {/* Left Panel: Profile */}
              <Grid item xs={12} md={5}>
                <Card>
                  <CardContent>
                    <Box display="flex" flexDirection="column" alignItems="center" sx={{margin: '33px'}}>
                      <Avatar
                        sx={{ width: 100, height: 100, mb: 2 }}
                        src="../../../public/user.png"
                        alt="User Avatar"
                      />
                      {editMode?(
                         <>
                         <TextField
                           fullWidth
                           label="Name"
                           name="name"
                           value={profile.name}
                           onChange={handleInputChange}
                           sx={{ mb: 2 }}
                         />
                         <TextField
                           fullWidth
                           label="Email"
                           name="email"
                           value={profile.email}
                           onChange={handleInputChange}
                           sx={{ mb: 2 }}
                         />
                         
                         <TextField
                           fullWidth
                           label="phone"
                           name="phone"
                           value={profile.phone}
                           onChange={handleInputChange}
                           sx={{ mb: 2 }}
                         />
                           <TextField
                           fullWidth
                           label="password"
                           name="password"
                           value={profile.password}
                           onChange={handleInputChange}
                           sx={{ mb: 2 }}
                         />
                           <TextField
                           fullWidth
                           label="password confirmation"
                           name="password_confirmation"
                           value={profile.password_confirmation}
                           onChange={handleInputChange}
                           sx={{ mb: 2 }}
                         />
                         
                       </> 
                      ):
                      (
                        <>
                          <Typography variant="h6">{profile.name}</Typography>
                          <Typography color="textSecondary">{profile.email}</Typography>
                          <Typography color="textSecondary">{profile.phone}</Typography>
                          <Typography color="textSecondary">password : {profile.password}</Typography>
                        </>
                      )}
                     

                        <Button
                        variant="contained"
                        sx={{ mt: 2}}
                        
                        onClick={toggleEditMode}
                      >
                        {editMode ? "Save" : "Edit Profile"}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            
          {/* Right Panel: Favorite Books */}
          <Grid item xs={12} md={7}>
            <Card sx={{textAlignLast: 'end'}}>
              <CardContent>
              <Typography variant="h6" gutterBottom>
                <IconButton sx={{ color: "rgb(255 231 80)" }}>
                  <BookOpenCheck/>
                </IconButton>
                  الكتب المقروءة
                
                </Typography>
                {/* <List>
                  {favoriteBooks.map((book, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={book} />
                    </ListItem>
                  ))}
                </List> */}
              </CardContent>
              <CardContent>
              <Typography variant="h6" gutterBottom>
                <IconButton sx={{ color: "rgb(255 231 80)" }}>
                  <BookX/>
                </IconButton>
                  الكتب التي لم يتم انهائها
                
                </Typography>
                {/* <List>
                  {favoriteBooks.map((book, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={book} />
                    </ListItem>
                  ))}
                </List> */}
             {`كتاب`}
              </CardContent>
              <CardContent>
              <Typography variant="h6" gutterBottom>
                <IconButton sx={{ color: "rgb(255 231 80)" }}>
                  <Star/>
                </IconButton>
                  الكتب التي تم تقييمها
                
                </Typography>
                {/* <List>
                  {favoriteBooks.map((book, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={book} />
                    </ListItem>
                  ))}
                </List> */}
              </CardContent>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                <IconButton sx={{ color: "rgb(255 128 80" }}>
                  <FavoriteTwoToneIcon></FavoriteTwoToneIcon>
                </IconButton>
                  المفضلة 
                
                </Typography>
                {/* <List>
                  {favoriteBooks.map((book, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={book} />
                    </ListItem>
                  ))}
                </List> */}
                
              </CardContent>
              
            </Card>
            
          </Grid>
          
        </Grid>
      </Box>
    );
  };