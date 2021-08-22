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
import PaymentSuccess from './Components/PaymentStatus/PaymentSuccess/PaymentSuccess';
import PaymentFail from './Components/PaymentStatus/PaymentFail/PaymentFail';
import Privacy from './Components/Footer/PrivacyPolicy/Privacy';
import CookiesPolicy from './Components/Footer/CookiesPolicy/CookiesPolicy';
import TermsConditions from './Components/Footer/TermsConditions/TermsConditions';
import CampaignPage from './Components/CampaignPage/CampaignPage';
import CampaignPageUpload from './Components/CampaignPage/CampaignPageUpload/CampaignPageUpload';
import ProfilePage from './Components/ProfilePage/ProfilePage';

export const CategoryData = createContext()
export const UserData = createContext()
export const CartProducts = createContext()
export const CartSubTotal = createContext()
export const CategoryOpen = createContext()

function App() {
  const [categories, setCategories] = useState(null)
  const [signedInUser, setSignedInUser] = useState({isSignedIn: false})
  const [cartInfo, setCartInfo] = useState(null)
  const [cartSubTotal, setCartSubTotal] = useState([])
  const [loginData, setLoginData] = useLocalStorage('user_data', {})
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [cartFormDetails, setCartFormDetails] = useLocalStorage('cart_form', {})
  const [paymentData, setPaymentData] = useLocalStorage('payment_data', {})
  const [campaignPaymentData, setCampaignPaymentData] = useLocalStorage('campaign_payment_data', {})
  // console.log(categories)

  useEffect(() => {
    fetch(`https://bandhon-ecommerce.herokuapp.com/get-categories`)
    .then(res => res.json())
    .then(data => {
      setCategories(data)
      }
    )

    if(loginData.isSignedIn) {
      fetch(`https://bandhon-ecommerce.herokuapp.com/get-user-data/id?id=${loginData.uid}`)
      .then(response => response.json())
      .then(data => {
        if(loginData.isSignedIn) {
          setCartInfo(data)
        }
      })
    }
    if(signedInUser.isSignedIn) {
      fetch(`https://bandhon-ecommerce.herokuapp.com/get-user-data/id?id=${loginData.uid}`)
      .then(response => response.json())
      .then(data => {
        if(loginData.isSignedIn) {
          setCartInfo(data)
        }
      })
    }

  }, [loginData, signedInUser])

  return (
    <UserData.Provider value={[signedInUser, setSignedInUser]}>
      <CategoryData.Provider value={[categories, setCategories]}>
        <CategoryOpen.Provider value={[categoryOpen, setCategoryOpen]}>
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
                    <PrivateRoute path="/payment/success">
                      <PaymentSuccess></PaymentSuccess>
                    </PrivateRoute>
                    <PrivateRoute path="/payment/fail">
                      <PaymentFail></PaymentFail>
                    </PrivateRoute>
                    <Route path="/privacy-policy">
                      <Privacy></Privacy>
                    </Route>
                    <Route path="/cookie-policy">
                      <CookiesPolicy></CookiesPolicy>
                    </Route>
                    <Route path="/terms-conditions">
                      <TermsConditions></TermsConditions>
                    </Route>
                    <Route path="/campaign">
                      <CampaignPage></CampaignPage>
                    </Route>
                    <PrivateRoute path="/admin/upload/campaign">
                      <CampaignPageUpload/>
                    </PrivateRoute>
                    <PrivateRoute path="/profile">
                      <ProfilePage/>
                    </PrivateRoute>
                  </Switch>
                </Router>
              </ToastProvider>
            </CartSubTotal.Provider>
          </CartProducts.Provider>
        </CategoryOpen.Provider>
      </CategoryData.Provider>
    </UserData.Provider>
  );
}

export default App;
