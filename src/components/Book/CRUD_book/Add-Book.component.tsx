import { Button, Dialog, DialogActions} from "@mui/material";
import { useState,useEffect } from "react";
import {Box,TextField} from "@mui/material";
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';



interface OpenState{
    open : boolean,
    onClose:any
}
interface Book{

    title?:string;
    author?:string;
    category?:string;
    test?:string;
}

export function AddBook(props: OpenState) {
    const [book , setBook] = useState<Book>({title:"", author: "", category: ""})
    const [pdf , setPdf] = useState<File | null>(null);
    const [openDialog, setOpenDialog] = useState<boolean>(props.open);

    useEffect(() => {
        setOpenDialog(props.open);
    }, [props.open]);

    const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>)=>{

        const {id , value} = event.target;
        setBook((prev)=>({
            ...prev,
            [id]:value,
        }));

    };

    const handleFileChange=(event : React.ChangeEvent<HTMLInputElement>)=>{

       const file = event.target.files?.[0];
       if(file){
            if(file.type !== 'application/pdf'){

                alert("فقط ملفات ذات اللاحقة pdf مسموحة");
                return;
            }
            if(file.size > 5 * 1024 * 1024){
                alert("يجب ان يكون حجم الملف اقل من 5mb");
                return;
            }
            setPdf(file);
       }
       
    };

    const handleSubmit = async()=>{
       if(!pdf){

            alert("يرجى رفع ملف الكتاب قبل الاضافة");
            return;

        }
       

        if (!book.title || !book.author || !book.category) {
            alert("Please fill in all the required fields.");
            return;
        }
        const formData = new FormData();
        formData.append("file",pdf);
        formData.append("title",book.title);
        formData.append("author",book.author);
        formData.append("category",book.category);

        try{
           // const response = await  
           for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }
            await console.log("formData",formData.values);
            

        }catch(error){
            console.log(error);
        }
        finally
        {
            setBook({ title: "", author: "", category: "" });
            setPdf(null);
        }
    }

    // useEffect(()=>{
    //     console.log("pdf", pdf)
    // },[pdf])
    
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      });
  

    return (
        <>
            <Dialog sx={{zIndex:100000,textAlign: 'right'}}
                open={openDialog}
                onClose={props.onClose}
            >
                <DialogTitle sx={{textAlign: 'right'}}>إضافة كتاب</DialogTitle>
                <DialogContent>
                    <Box component="form"  onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                        noValidate sx={{ mt: 1 }}>
                              <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="title"
                                label="عنوان الكتاب"
                                autoComplete="title"
                                value={book.title}
                                onChange={handleInputChange}
                                autoFocus
                            />
                               <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="author"
                                label="المؤلف"
                                autoComplete="author"
                                value={book.author}
                                onChange={handleInputChange}
                            />
                               <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="category"
                                label="نوع الكتاب"
                                autoComplete="category"
                                value={book.category}
                                onChange={handleInputChange}
                               
                            />
                             
                         <div style={{justifySelf:'center', marginTop:20}}>
                         <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                            >
                            Upload files
                            <VisuallyHiddenInput
                                type="file"
                                onChange={handleFileChange}
                                multiple
                            />
                           
                            </Button>
                         </div>
                    </Box>
                </DialogContent>
                <DialogActions>
                <Button onClick={props.onClose}>cancle</Button>
                <Button onClick={handleSubmit}>إضافة</Button>
                </DialogActions>
              
            </Dialog>
        </>
    );
}