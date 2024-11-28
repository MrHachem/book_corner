import {BookCardComponent} from "../../components";
import {Box, Grid} from "@mui/material";

export default function AllBooksPage() {

    return (
        <Box className={'w-100'}
             sx={{
                 width: '100%',
        px:1
        }}
        >
            <Grid container spacing={2} justifyContent={"center"}>
                <Grid item xs={12} sm={6} md={4} lg={3} sx={{
                    marginY: 3
                }}> <BookCardComponent
                    name={"عقدك النفسية سجنك الأبدي"}
                    author={"د.يوسف"}
                    type={"نفسي"}
                    image={"../../../public/undraw_forgot_password_re_hxwm.svg"}
                /></Grid>

                <Grid item xs={12} sm={6} md={4} lg={3} sx={{
                    marginY: 3
                }}> <BookCardComponent
                    name={"كاردل"}
                    author={"د.يوسف"}
                    type={"خيالي"}
                    image={"../../../public/Sign up.gif"}
                /></Grid>

                <Grid item xs={12} sm={6} md={4} lg={3} sx={{
                    marginY: 3
                }}> <BookCardComponent
                    name={"مئة عام من العزلة"}
                    author={"د.نمي"}
                    type={"رومنسي"}
                    image={"../../../public/Curious-bro.svg"}
                /></Grid>

                <Grid item xs={12} sm={6} md={4} lg={3} sx={{
                    marginY: 3
                }}> <BookCardComponent
                    name={"أرض السافلين"}
                    author={"د.يوسف"}
                    type={"خيالي علمي"}
                    image={"../../../public/logo-color.ico"}
                /></Grid>

                <Grid item xs={12} sm={6} md={4} lg={3} sx={{
                    marginY: 3
                }}> <BookCardComponent
                    name={"عقدك النفسية سجنك الأبدي"}
                    author={"د.يوسف"}
                    type={"نفسي"}
                    image={"../../../public/vite.svg"}
                /></Grid>

            </Grid>
        </Box>

    );
}
