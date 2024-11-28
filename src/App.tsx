import {Routes, Route} from 'react-router-dom';
import AllBooksPage from "./pages/allBooks/all-books.tsx";
import LoginPage from "./pages/auth/login/login.tsx";



function App() {
    return(
        <>
            <Routes>
                    <Route path="/auth/login" element={<LoginPage/>}/>
                    <Route path="/all-books" element={<AllBooksPage/>}/>
            </Routes>
        </>
    )
}

export default App


