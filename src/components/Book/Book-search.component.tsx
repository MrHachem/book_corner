import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SearchOffOutlinedIcon from '@mui/icons-material/SearchOffOutlined';
type SearchParams = {
  author: string;
  category: string;
  title: string;
};

type BookSearchProps = {
  onSearch: (params: SearchParams) => void;
  searchState: boolean;
  onReset: () => void;
};

const BookSearch: React.FC<BookSearchProps> = ({
  onSearch,
  searchState,
  onReset,
}) => {
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [display, setDisplay] = useState(false);

  const handleSearch = () => {
    console.log(author, category, title);
    onSearch({ author, category, title });
  };
  const Isdisplay = display ? "flex" : "none";
  return (
    <Box p={2}>
      <Grid container spacing={2} sx={{ display: Isdisplay }}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="اسم الكتاب"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="المؤلف"
            variant="outlined"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="النوع"
            variant="outlined"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            color="primary"
            disabled={searchState}
            onClick={handleSearch}
          >
            search
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            onClick={onReset}
            sx={{ mx: "4px" }}
          >
            All
          </Button>
          <Tooltip title="search close">
            <IconButton
              onClick={() => setDisplay(false)}
            >
              <SearchOffOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Grid>
       
      </Grid>
      <Tooltip title="search">
        <IconButton
          sx={{ display: display ? "none" : "flex", bgcolor: "#afc1ce" }}
          onClick={() => setDisplay(true)}
        >
          <SearchOutlinedIcon />
        </IconButton>
      </Tooltip>

    </Box>
  );
};

export default BookSearch;
