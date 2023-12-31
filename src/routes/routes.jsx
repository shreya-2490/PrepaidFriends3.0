import React from "react"
import { createBrowserRouter } from "react-router-dom"
import "../assets/libs/@mdi/font/css/materialdesignicons.min.css"
import Homepage from "../pages/pf-home"
import Sample from "../pages/sample"
import Layout from "../component/layout"
import { URLs } from "./urls"
import LoginPage from "../pages/pf-login"
import Contact from "../pages/pf-contact"
import SingleOrder from "../pages/pf-single-order/singleorder.container"
import BulkOrder from "../pages/pf-bulk-order"
import OrderInvoice from "../pages/pf-order-invoice"
import Payment from "../pages/pf-payment"
import SignUp from "../pages/pf-signup"
import CustomerDashboard from "../pages/pf-customer-dashboard"
import HowItWorks from "../pages/pf-how-it-works"
import ForgotPassword from "../pages/pf-forgot-password"
import OrderConfirmation from "../pages/pf-order-confirmation"
import PagePrivacy from "../pages/pf-policy"
import PageTerms from "../pages/pf-terms"

const router = createBrowserRouter([
  {
    path: URLs.BASE,
    element: <Layout />,
    children: [
      {
        path: URLs.BASE,
        element: <Homepage />,
      },
      {
        path: URLs.LOGIN,
        element: <LoginPage />,
      },
      {
        path: URLs.SIGN_UP,
        element: <SignUp />,
      },
      {
        path: URLs.FORGOT_PASSWORD,
        element: <ForgotPassword />,
      },
      {
        path: URLs.CONTACT,
        element: <Contact />,
      },
      {
        path: URLs.SAMPLE,
        element: <Sample />,
      },
      {
        path: URLs.SINGLE_ORDER,
        element: <SingleOrder />,
      },
      {
        path: URLs.PAYMENT,
        element: <Payment />,
      },
      {
        path: URLs.BULK_ORDER,
        element: <BulkOrder />,
      },
      {
        path: URLs.ORDER_INVOICE,
        element: <OrderInvoice />,
      },
      {
        path: URLs.ORDER_CONFIRMATION,
        element: <OrderConfirmation />,
      },
      {
        path: URLs.DASHBOARD,
        element: <CustomerDashboard />,
      },
      {
        path: URLs.HOW_IT_WORKS,
        element: <HowItWorks />,
      },
      {
        path: URLs.PRIVACY_POLICY,
        element: <PagePrivacy />,
      },
      {
        path: URLs.TERMS_AND_CONDITIONS,
        element: <PageTerms />,
      },
    ],
  },
])

export default router
