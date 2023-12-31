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
    PrivateRoute, AdminRoute
} from './pages';
import {AddProduct, AllProducts, Profile, Stats, Clients} from "./pages/dashboard";
import PublicLayout from "./pages/PublicLayout";
import AdminLayout from "./pages/AdminLayout";
import Register from "./pages/Register";
import Orders from "./components/Orders";


function App() {
    return (

        <Router>
            <Routes>
                <Route path="/" element={<PublicLayout/>}>
                    <Route index element={<Home/>}/>
                    <Route path='products' element={<Products/>}/>
                    <Route path='orders' element={<PrivateRoute><Orders/> </PrivateRoute>}/>
                    <Route path='about' element={<About/>}/>
                    <Route path='login' element={<Register/>}/>
                    <Route path='cart' element={<Cart/>}/>
                    <Route path='products/:id' element={<SingleProduct/>}/>
                </Route>
                {/* Admin Routes */}

                <Route path="admin/*" element={<AdminRoute><AdminLayout/> </AdminRoute>}>
                    <Route path='stats' element={<Stats/>}/>
                    <Route path='all-products' element={<AllProducts/>}></Route>
                    <Route path='add-product' element={<AddProduct/>}></Route>
                    <Route path='clients' element={<Clients/>}></Route>
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
