import {
  Button,
  Dialog,
  DialogActions,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Box, TextField, MenuItem } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import DialogTitle from "@mui/material/DialogTitle";
import styles from "./book.module.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { showNotifications } from "../../../utils/notifications";
import { FileRejection, useDropzone } from "react-dropzone";
import { authorsServices } from "../../../ services/authors/authorsServices";
import { categoriesServices } from "../../../ services/categories/categoriesServices";
import { booksServices } from "../../../ services/books/booksServices";
import Select from "@mui/material/Select";

interface OpenState {
  open: boolean;
  onClose: () => void;
  onUpdate:() => Promise<void>

}
interface Book {
  title?: string;
  description?: string;
}
interface Authors {
  id: number;
  name: string;
}
interface Categories {
  id: number;
  name: string;
}
export function AddBook(props: OpenState) {
  const[display,setDisplay]=useState(false);
  const [openDialog, setOpenDialog] = useState<boolean>(props.open);
  const [authors, setAuthors] = useState<Authors[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<string>(" ");
  const [isCustom, setIsCustom] = useState(false);
  const [customAuthor, setCustomAuthor] = useState("");
  const [categories, setCategories] = useState<Categories[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(" ");
  const [customCategory, setCustomCategory] = useState("");
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [pdf, setPdf] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);
  const [publishedAt, setPublishedAt] = useState<Dayjs | null>(
    dayjs("2025-3-11")
  );
  const [book, setBook] = useState<Book>({
    title: "",
    description: "",
  });
  const [coverFileRejections, setCoverFileRejections] = useState<
    FileRejection[]
  >([]);
  const [pdfFileRejections, setPdfFileRejections] = useState<FileRejection[]>(
    []
  );

  const { getRootProps: getCoverRootProps, getInputProps: getCoverInputProps } =
    useDropzone({
      accept: {
        "image/png": [".png"],
        "image/jpeg": [".jpeg", ".jpg"],
      },
      maxSize: 5 * 1024 * 1024,
      multiple: false,
      onDrop: (acceptedFiles, fileRejections) => {
        setCover(acceptedFiles[0] || null);
        setCoverFileRejections(fileRejections);
      },
    });

  //for pdf Upload
  const { getRootProps: getPdfRootProps, getInputProps: getPdfInputProps } =
    useDropzone({
      accept: {
        "application/pdf": [".pdf"],
      },
      maxSize: 10 * 1024 * 1024,
      multiple: false,
      onDrop: (acceptedFiles, fileRejections) => {
        setPdf(acceptedFiles[0] || null);
        setPdfFileRejections(fileRejections);
      },
    });
  //Get All Authors
  useEffect(() => {
    const fetchData = async () => {
      const response = await authorsServices.allAuthors();
      const data = await response?.data;
      console.log(data);
      if (response?.status === 200) {
        setAuthors(data?.authors);
      } else {
        setAuthors([]);
        
      }
    };
    fetchData();
  }, [props.open]);

  //Get All Categories
  useEffect(() => {
    const getCategories = async () => {
      const response = await categoriesServices.allCategories();
      const data = await response?.data;
      console.log(data);
      if (response?.status === 200) {
        setCategories(data?.categories);
      } else {
        setCategories([]);
      }
    };
    getCategories();
  }, [props.open]);

  useEffect(() => {
    setOpenDialog(props.open);
    if (props.open === false) {
      setBook({
        title: "",
        description: "",
      });
      setCover(null);
      setPdf(null);
      setIsCustom(false);
      setCustomAuthor("");
      setSelectedAuthor("");
      setIsCustomCategory(false);
      setCustomCategory("");
      setSelectedCategory("");
      setCoverFileRejections([]);
      setPdfFileRejections([]);
    
    }
  }, [props.open]);

  const handleSelectionAuthors = (
    event: React.ChangeEvent<{ value: unknown }> | any
  ) => {
    const value = event.target.value as string;
    if (value === "other") {
      setIsCustom(true);
      setSelectedAuthor("");
    } else {
      setIsCustom(false);
      setSelectedAuthor(value);
    }
  };
  const handleSelectionCategory = (
    event: React.ChangeEvent<{ value: unknown }> | any
  ) => {
    const value = event.target.value as string;
    if (value === "other") {
      setIsCustomCategory(true);
      setSelectedCategory("");
    } else {
      setIsCustomCategory(false);
      setSelectedCategory(value);
    }
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setBook((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!pdf) {
      showNotifications(
        "PLEASE UPLOAD THE BOOK FILE BEFORE ADDING.",
        "warning"
      );
      return;
    }
    if (!cover) {
      showNotifications(
        "PLEASE UPLOAD THE BOOK COVER BEFORE ADDING. ",
        "warning"
      );
      return;
    }

    if (!book.title || !book.description) {
      showNotifications("PLEASE FILL IN ALL REQUIRED INFORMATION", "warning");
      return;
    }
    const formData = new FormData();
    if (isCustom) {
      formData.append("author_name", customAuthor);
    } else {
      formData.append("author_id", selectedAuthor);
    }
    if (isCustomCategory) {
      formData.append("category_name", customCategory);
    } else {
      formData.append("category_id", selectedCategory);
    }
    formData.append("pdf", pdf);
    formData.append("title", book.title);
    formData.append("description", book.description);
    formData.append("cover", cover);
    formData.append(
      "published_at",
      publishedAt ? publishedAt.format("YYYY-MM-DD") : ""
    );

    try {
      setDisplay(true);
      const response = await booksServices.createBook(formData);
      if (response?.status === 200) {
        showNotifications("The Book has been added successfully", "success");
        props.onUpdate();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setBook({ title: "", description: "" });
      setPdf(null);
      setCover(null);
      setIsCustom(false);
      setCustomAuthor("");
      setSelectedAuthor("");
      setIsCustomCategory(false);
      setCustomCategory("");
      setSelectedCategory("");
      setDisplay(false);
      props.onUpdate();

    }
  };

  return (
    <>
      <Dialog
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        sx={{
          zIndex: 1,
          marginTop: "75px",
          maxHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
        open={openDialog}
        onClose={props.onClose}
      >
        <DialogTitle sx={{ lineHeight: 1.6, color: "#162680" }}>
          Add new book
        </DialogTitle>
        <Box sx={{ flexGrow: 1, paddingLeft: "30px", paddingRight: "30px" }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Book title"
            autoComplete="title"
            value={book.title}
            onChange={handleInputChange}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            multiline
            id="description"
            label="Book description"
            autoComplete="description"
            value={book.description}
            onChange={handleInputChange}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                sx={{ width: "100%" }}
                label="published At"
                name="published_at"
                value={publishedAt}
                onChange={(newValue) => setPublishedAt(newValue ?? null)}
              />
            </DemoContainer>
          </LocalizationProvider>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              width: "100%",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="selecte-author-label">selecte author</InputLabel>
              <Select
                labelId="selecte-author-label"
                id="selecte-author"
                value={selectedAuthor}
                label="selecte author"
                onChange={handleSelectionAuthors}
              >
                {authors.map((author) => (
                  <MenuItem key={author.id} value={author.id}>
                    {author.name}
                  </MenuItem>
                ))}
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            {isCustom && (
              <TextField
                label="Enter author name"
                variant="outlined"
                value={customAuthor}
                onChange={(e) => setCustomAuthor(e.target.value)}
              />
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              width: "100%",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="selecte-category-label">
                selecte category
              </InputLabel>
              <Select
                labelId="selecte-category-label"
                id="selecte-category"
                value={selectedCategory}
                label="selecte category"
                onChange={handleSelectionCategory}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            {isCustomCategory && (
              <TextField
                label="Enter category name"
                variant="outlined"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
              />
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "2px",
            }}
          >
            {/* Upload image */}
            <div className={styles.dropzoneApp}>
              <div {...getCoverRootProps()} className={styles.dropzone}>
                <input {...getCoverInputProps()} />
                <CloudUploadIcon />
                <br />
                Insert or drag book cover image
                {cover && (
                  <p style={{ color: "green", fontFamily: "Cairo,sans-serif" }}>
                    The cover has been uploaded: {cover.name} ✅
                  </p>
                )}
                {coverFileRejections.length > 0 && (
                  <p style={{ color: "#e83f30" }}>
                    The file is in an unsupported format or too large❌
                  </p>
                )}
              </div>
            </div>

            {/* Upload pdf */}
            <div className={styles.dropzoneApp}>
              <div {...getPdfRootProps()} className={styles.dropzone}>
                <input {...getPdfInputProps()} />
                <CloudUploadIcon />
                <br />
                Insert or drag book pdf file
                {pdf && (
                  <p style={{ color: "green" }}>
                    <br />
                    The PDF has been uploaded: {pdf.name} ✅
                  </p>
                )}
                {pdfFileRejections.length > 0 && (
                  <p style={{ color: "#e83f30" }}>
                    The file is in an unsupported format or too large ❌
                  </p>
                )}
              </div>
            </div>
          </div>
        </Box>
        <DialogActions>
          <Button onClick={props.onClose}>cancle</Button>
          <Button onClick={handleSubmit} disabled={display}>ADD</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
