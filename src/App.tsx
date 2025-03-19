import {Routes, Route} from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllBooksPage from "./pages/allBooks/all-books.tsx";
import LoginPage from "./pages/auth/login/login.tsx";
import {Layout}   from "./components/Layout/Layout.component.tsx"
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme.ts';
import SignUpPage from './pages/auth/sign-up/signUp.tsx';
import { ProfilePage } from './pages/profile/profile.tsx';
import { Error404Component } from './components/Errors/Error404.component.tsx';
import { BookCardDetails } from './components/index.ts';
import { ChatButton } from './components/Chat/Button_Chat.component.tsx';
import { UsersAccountsPage } from './pages/usersAccounts/users-accounts.tsx';


function App() {
    return(
        <ThemeProvider theme={theme}>
                <CssBaseline />
                <ToastContainer />
                <Routes>
                        <Route path="/auth/login" element={<LoginPage/>}/>
                        <Route path="/auth/sign-up" element={<SignUpPage/>}/>
                        <Route path='*' element={<Error404Component/>}/>
                        <Route element={<Layout/>}>
                            <Route element={<ChatButton/>}>
                                <Route path="/" element={<AllBooksPage/>}/>   
                                <Route path="/profile" element={<ProfilePage/>}/>
                                <Route path="/all-books" element={<AllBooksPage/>}/>
                                <Route path="/all-books/book/:bookId" element={<BookCardDetails/>}/>
                                <Route path="/all-books/booksType/:booksState" element={<AllBooksPage/>}/>
                                <Route path="/users-accounts" element={<UsersAccountsPage/>}/>
                            
                            </Route>
                        </Route>
                        
                </Routes>
            </ThemeProvider>
    
    )
}

export default App


