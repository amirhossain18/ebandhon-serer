import logo from './logo.svg';
import './App.css';
import HomePage from './Components/HomePage/HomePage';
import ProductUploadPage from './Components/ProductUploadPage/ProductUploadPage';
import './responsive.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import SignIn from './Components/SignIn/SignIn';
import { createContext, useEffect, useState } from 'react';
import BrandUploadPage from './Components/BrandUploadPage/BrandUploadPage';
import Productview from './Components/Productview/Productview';
import Category from './Components/Category/Category'
import BrandPage from './Components/BrandPage/BrandPage'
import CartPage from './Components/CartPage/CartPage'
import useLocalStorage from './Components/LocalStorage/LocalStorage';
import { ToastProvider, useToasts } from 'react-toast-notifications';
import LuckyWinnerForm from './Components/LuckyWinnerForm/LuckyWinnerForm';
import LuckyWinnerRegisterData from './Components/LuckyWinnerRegisterData/LuckyWinnerRegisterData';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

export const CategoryData = createContext()
export const UserData = createContext()
export const CartProducts = createContext()
export const CartSubTotal = createContext()

function App() {
  const [categories, setCategories] = useState(null)
  const [signedInUser, setSignedInUser] = useState({isSignedIn: false})
  const [cartInfo, setCartInfo] = useState(null)
  const [cartSubTotal, setCartSubTotal] = useState([])
  const [loginData, setLoginData] = useLocalStorage('user_data', {})

  useEffect(() => {
    fetch(`https://bandhon-ecommerce.herokuapp.com/get-categories`)
    .then(res => res.json())
    .then(data => {
      setCategories(data)
      }
    )

    fetch('https://bandhon-ecommerce.herokuapp.com/get-user-data')
      .then(response => response.json())
      .then(data => {
        if(loginData) {
            const myData = data?.find(user => user.email === loginData.email)
            setCartInfo(myData)
        }
    })
  }, [loginData])

  return (
    <UserData.Provider value={[signedInUser, setSignedInUser]}>
      <CategoryData.Provider value={[categories, setCategories]}>
        <CartProducts.Provider value={[cartInfo, setCartInfo]}>
          <CartSubTotal.Provider value={[cartSubTotal, setCartSubTotal]}>
            <ToastProvider>
              <Router>
                <Switch>
                  <Route exact path="/">
                    <HomePage></HomePage>
                  </Route>
                  <Route path="/SignIn" >
                    <SignIn></SignIn>
                  </Route>
                  <PrivateRoute path="/admin/upload/product">
                    <ProductUploadPage></ProductUploadPage>
                  </PrivateRoute>
                  <PrivateRoute path="/admin/upload/brand">
                    <BrandUploadPage></BrandUploadPage>
                  </PrivateRoute>
                  <Route path="/product/:catName/:productId">
                    <Productview></Productview>
                  </Route>
                  <Route path="/category/:catName" >
                    <Category></Category>
                  </Route>
                  <Route path="/brand/:catName/:brandName">
                    <BrandPage></BrandPage>
                  </Route>
                  <PrivateRoute path="/page/cart">
                    <CartPage></CartPage>
                  </PrivateRoute>
                  <Route path="/lucky-winner-page">
                    <LuckyWinnerForm/>
                  </Route>
                  <PrivateRoute path="/admin/register-data" >
                    <LuckyWinnerRegisterData/>
                  </PrivateRoute>
                </Switch>
              </Router>
            </ToastProvider>
          </CartSubTotal.Provider>
        </CartProducts.Provider>
      </CategoryData.Provider>
    </UserData.Provider>
  );
}

export default App;
