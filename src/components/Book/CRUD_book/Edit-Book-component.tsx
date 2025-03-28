import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { booksServices } from "../../../ services/books/booksServices";
import { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

interface OpenState {
  open: boolean;
  onClose: () => void;
  bookId: number;
  onUpdate:() => Promise<void>
}
interface BookDetails {
  title: string;
  description: string;
  published_at: string;
}
export default function EditBook(props: OpenState) {
  const [book, setBook] = useState<BookDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [newDescription, setNewDescription] = useState(book?.description);
  const [newTitle, setNewTitle] = useState(book?.title);
  const [newPublishedAt, setNewPublishedAt] = useState<Dayjs | null>(
    book?.published_at ? dayjs(book.published_at) : null
  );
  console.log("book?.published_at",book?.published_at)

  console.log("newPublishedAt",newPublishedAt)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await booksServices.showBook(Number(props.bookId));
        const data = response?.data;
        if (response?.status === 200) {
          setBook(data?.book);
        }
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [props.bookId]);

  const handleKeyUp = (event: any) => {
    let keyName = event.target.name;
    switch (keyName) {
      case "description":
        setNewDescription(event.target.value);
        break;
      case "title":
        setNewTitle(event.target.value);
        break;
      default:
        break;
    }
  };
  const handleSubmit = async () => {
    let data: Partial<BookDetails> = {};
    console.log(newDescription, newPublishedAt?.format("YYYY-MM-DD"), newTitle);

    if (newDescription && newDescription !== book?.description) {
      data.description = newDescription;
    }
    if (newTitle && newTitle !== book?.title) {
      data.title = newTitle;
    }
    if (
      newPublishedAt &&
      newPublishedAt.format("YYYY-MM-DD") !==
        dayjs(book?.published_at).format("YYYY-MM-DD")
    ) {

      data.published_at = newPublishedAt.format("YYYY-MM-DD");
      console.log( dayjs(book?.published_at).format("YYYY-MM-DD"), newPublishedAt.format("YYYY-MM-DD"))
    }
    if (Object.keys(data).length > 0) {
      setLoading(true);
      console.log("data",data)
      try {
        const response = await booksServices.updateBook(props.bookId,data);
        if(response?.status === 200){
          console.log("✅ تم تعديل الكتاب بنجاح");
          props.onUpdate(); // ✅ تحديث قائمة الكتب
          props.onClose(); 
        }
      } catch (error) {
        setLoading(false);
        props.onUpdate(); // ✅ تحديث قائمة الكتب
        props.onClose(); 
      } finally {
        setLoading(false);
      }
    }
  };
  const handleOnClose = ()=>{
    props.onClose(); 
  }
  return (
    <>
      <Dialog
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        open={props.open}
        onClose={props.onClose}
      >
        <DialogTitle sx={{ lineHeight: 1.6, color: "#162680" }}>
          Edit book
        </DialogTitle>
        <DialogContent>
          {loading ? (
            <Grid container maxWidth="lg" justifyContent={"center"} spacing={1}>
              <Grid item xs={12} sm={6}>
                <CircularProgress />
              </Grid>
            </Grid>
          ) : (
            <Grid container maxWidth="lg" spacing={1}>
              <Grid item xs={12} sm={12}>
                <TextField
                  margin="normal"
                  onKeyUp={handleKeyUp}
                  name="title"
                  defaultValue={`${book?.title || ""}`}
                  fullWidth
                  id="title"
                  label="title"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  margin="normal"
                  onKeyUp={handleKeyUp}
                  name="description"
                  defaultValue={`${book?.description || ""}`}
                  fullWidth
                  id="description"
                  label="description"
                />
              </Grid>
              <Grid>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      sx={{ width: "100%" }}
                      label="published At"
                      name="published_at"
                      value={newPublishedAt}
                      onChange={(newValue) => setNewPublishedAt(newValue)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOnClose}>cancel</Button>
          <Button onClick={handleSubmit}>Edit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
