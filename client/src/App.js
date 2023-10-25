import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Footer} from './components/';
import {
    Home,
    SingleProduct,
    Cart,
    Checkout,
    Error,
    About,
    Products,
    PrivateRoute,
} from './pages';
import {AddJob, AllJobs, Profile, Stats} from "./pages/dashboard";
import PublicLayout from "./pages/PublicLayout";
import AdminLayout from "./pages/AdminLayout";
import Register from "./pages/Register";


function App() {
    return (

        <Router>
            <Routes>
                <Route path="/" element={<PublicLayout/>}>
                    <Route index element={<Home/>}/>
                    <Route path='products' element={<Products/>}/>
                    <Route path='about' element={<About/>}/>
                    <Route path='login' element={<Register/>}/>
                    <Route path='cart' element={<Cart/>}/>
                    <Route path='products/:id' element={<SingleProduct/>}/>
                </Route>
                {/* Admin Routes */}
                <Route path="admin/*" element={<AdminLayout/>}>
                    <Route path='stats' element={<Stats/>}/>
                    <Route path='all-jobs' element={<AllJobs/>}></Route>
                    <Route path='add-job' element={<AddJob/>}></Route>
                    <Route path='profile' element={<Profile/>}></Route>
                </Route>


                <Route
                    path='checkout'
                    element={
                        <PrivateRoute>
                            <Checkout/>
                        </PrivateRoute>
                    }
                />

                <Route path='*' element={<Error/>}/>
            </Routes>
            <Footer/>
        </Router>

    );
}

export default App;
