// TODO: This component needs to be re-factored @Vedansh
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import image from "../../assets/images/client/05.jpg";
import * as Icon from "react-feather";
import {
  FiPhone,
  FiEdit,
  FaArrowRight,
  AiOutlineUser,
  AiOutlineDashboard,
  LiaSignOutAltSolid,
  RiMapPinLine,
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosBasket,
} from "../../assets/icons/icons";
import styles from "./customer-dashboard.module.css";
import { AuthContext } from "../../context/auth-context";
import axios from "axios";
import { useCookies } from "react-cookie";
const CustomerDashboard = () => {
  const [isOpenTab, setisOpen] = useState(0);
  const { user } = useContext(AuthContext);
  const [cookies] = useCookies(["pfAuthToken"]);
  const [isLoading, setIsLoading] = useState(false);

  const handleTabClick = (index) => {
    if (index == 1) {
      setIsLoading(true);
      getIndividualData();
    } else if (index == 2) {
      setIsLoading(true);
      getBulkOrders();
    }
    setisOpen(index);
  };

  const [isOpenAccordion, setIsOpenAccordion] = useState(false);
  let [individualOrders, setIndividualOrders] = useState([]);
  const [bulkOrders, setBulkOrders] = useState([]);

  const toggleAccordion = () => {
    setIsOpenAccordion(!isOpenAccordion);
  };
  const getIndividualData = () => {
    axios
      ?.get("/api/my-order-individual-api", {
        headers: {
          Authorization: `Bearer ${cookies?.pfAuthToken}`,
        },
      })
      ?.then((res) => setIndividualOrders(res?.data?.rows))
      ?.catch((err) => console?.error(err))
      ?.finally(() => setIsLoading(false));
  };

  const getBulkOrders = () => {
    axios
      ?.get("/api/get-order-bulk-api", {
        headers: {
          Authorization: `Bearer ${cookies?.pfAuthToken}`,
        },
      })
      ?.then((res) => setBulkOrders(res?.data?.rows))
      ?.catch((err) => console?.error(err))
      ?.finally(() => setIsLoading(false));
  };

  return (
    <>
      <section className="relative md:py-24 py-16 bg-gray-50 dark:bg-slate-800">
        <div className="container">
          <div className="grid lg:grid-cols-12 md:grid-cols-2 grid-cols-1 gap-[30px]">
            <div className="lg:col-span-3 md:col-span-5">
              <div className="flex items-center">
                <img
                  src={image}
                  className="h-16 w-16 rounded-full shadow dark:shadow-gray-800"
                  alt=""
                />
                <div className="ms-2">
                  <p className="font-semibold text-slate-400">Hello,</p>
                  {user && (
                    <h5 className="text-lg font-semibold">
                      {user?.customerName}
                    </h5>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-9 md:col-span-7">
           
            </div>

            <div className="lg:col-span-3 md:col-span-5">
              <div className="sticky top-20">
                <ul
                  className="flex-column p-6 bg-white dark:bg-slate-900 shadow dark:shadow-gray-800 rounded-md"
                  id="myTab"
                  data-tabs-toggle="#myTabContent"
                  role="tablist"
                >
                  <li role="presentation">
                    <button
                      onClick={() => handleTabClick(0)}
                      className={`${
                        isOpenTab === 0
                          ? "text-white bg-indigo-600 hover:text-white"
                          : ""
                      } px-4 py-2 text-start font-semibold rounded-md w-full mt-3 hover:text-indigo-600 transition-all duration-500 ease-in-out flex items-center`}
                      id="dashboard-tab"
                      data-tabs-target="#dashboard"
                      type="button"
                      role="tab"
                      aria-controls="dashboard"
                      aria-selected="false"
                    >
                      <AiOutlineDashboard className="text-[20px] me-2 align-middle" />
                      Dashboard
                    </button>
                  </li>
                  <li role="presentation">
                    <li role="presentation">
                      <button
                        onClick={toggleAccordion}
                        className={`${
                          isOpenAccordion
                            ? "text-white bg-indigo-600 hover:text-white"
                            : ""
                        } px-4 py-2 text-start font-semibold rounded-md w-full mt-3 hover:text-indigo-600 transition-all duration-500 ease-in-out flex items-center`}
                        id="dashboard-tab"
                        data-tabs-target="#dashboard"
                        type="button"
                        role="tab"
                        aria-controls="dashboard"
                        aria-selected={isOpenAccordion}
                      >
                        <IoIosBasket className="text-[20px] me-2 align-middle" />
                        My Orders{" "}
                        {isOpenAccordion ? (
                          <IoIosArrowUp className="text-[18px] me-2 align-middle" />
                        ) : (
                          <IoIosArrowDown className="text-[18px] me-2 align-middle" />
                        )}
                      </button>
                      {isOpenAccordion && (
                        <div className={styles.accordioncontent}>
                          <p
                            className={styles.individual}
                            onClick={() => handleTabClick(1)}
                          >
                            Individual Order
                          </p>
                          <p
                            className={styles.bulk}
                            onClick={() => handleTabClick(2)}
                          >
                            Bulk Order
                          </p>
                        </div>
                      )}
                    </li>
                  </li>

                  <li role="presentation">
                    {user && user?.customerName ? (
                      <button
                        className={`${
                          isOpenTab === 4
                            ? "text-white bg-indigo-600 hover:text-white"
                            : ""
                        } px-4 py-2 text-start font-semibold rounded-md w-full mt-3 hover:text-indigo-600 transition-all duration-500 ease-in-out flex items-center`}
                        id="dashboard-tab"
                        data-tabs-target="#dashboard"
                        type="button"
                        role="tab"
                        aria-controls="dashboard"
                        aria-selected="false"
                      >
                        <AiOutlineUser className="text-[20px] me-2 align-middle" />
                        Change Password
                      </button>
                    ) : (
                      <button
                        onClick={() => handleTabClick(4)}
                        className={`${
                          isOpenTab === 4
                            ? "text-white bg-indigo-600 hover:text-white"
                            : ""
                        } px-4 py-2 text-start font-semibold rounded-md w-full mt-3 hover:text-indigo-600 transition-all duration-500 ease-in-out flex items-center`}
                        id="dashboard-tab"
                        data-tabs-target="#dashboard"
                        type="button"
                        role="tab"
                        aria-controls="dashboard"
                        aria-selected="false"
                      >
                        <AiOutlineUser className="text-[20px] me-2 align-middle" />
                        My Account
                      </button>
                    )}
                  </li>

                  <li role="presentation">
                    <Link
                      to="/auth-login"
                      onClick={() => handleTabClick(5)}
                      className={`${
                        isOpenTab === 5
                          ? "text-white bg-indigo-600 hover:text-white"
                          : ""
                      } px-4 py-2 text-start font-semibold rounded-md w-full mt-3 hover:text-indigo-600 transition-all duration-500 ease-in-out flex items-center`}
                      id="dashboard-tab"
                      data-tabs-target="#dashboard"
                      type="button"
                      role="tab"
                      aria-controls="dashboard"
                      aria-selected="false"
                    >
                      <LiaSignOutAltSolid className="text-[20px] me-2 align-middle" />
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-9 md:col-span-7">
              <div
                id="myTabContent"
                className="p-6 bg-white dark:bg-slate-900 shadow dark:shadow-gray-800 rounded-md"
              >
                {isOpenTab === 1 ? (
                  <div id="order" role="tabpanel" aria-labelledby="order-tab">
                    <div className="relative overflow-x-auto shadow dark:shadow-gray-800 rounded-md">
                      <h1 className={styles.individualthead}>
                        Individual Order
                      </h1>
                      <table className="w-full text-start text-slate-500 dark:text-slate-400">
                        <thead className="text-sm uppercase bg-slate-50 dark:bg-slate-800">
                          <tr className="text-start">
                            <th scope="col" className="px-2 py-3 text-start">
                              Order Id
                            </th>
                            <th scope="col" className="px-2 py-3 text-start">
                              Order Number
                            </th>
                            <th scope="col" className="px-2 py-3 text-start">
                              Payment Method
                            </th>
                            <th scope="col" className="px-2 py-3 text-start">
                              Sub Total
                            </th>
                            <th scope="col" className="px-2 py-3 text-start">
                              Transaction Fee
                            </th>
                            <th scope="col" className="px-2 py-3 text-start">
                              Order Total
                            </th>
                            <th scope="col" className="px-2 py-3 text-start">
                              Order Status
                            </th>
                            <th scope="col" className="px-2 py-3 text-start">
                              Date
                            </th>
                            <th scope="col" className="px-2 py-3 text-start">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        {isLoading ? (
                          <h1>Loading...</h1>
                        ) : (
                          <tbody>
                            {individualOrders?.map((item, idx) => {
                              return (
                                <tr
                                  className="bg-white dark:bg-slate-900 text-start"
                                  key={idx}
                                >
                                  <th
                                    className="px-2 py-3 text-start"
                                    scope="row"
                                  >
                                    {item?.id}
                                  </th>
                                  <td className="px-2 py-3 text-start">
                                    {item?.order_number}
                                  </td>
                                  <td className="px-2 py-3 text-start ">
                                    {item?.payment_method}
                                  </td>
                                  <td className="px-2 py-3 text-start ">
                                    {item?.order_subtotal}
                                  </td>
                                  <td className="px-2 py-3 text-start ">
                                    {item?.transaction_fee}
                                  </td>
                                  <td className="px-2 py-3 text-start ">
                                    {item?.order_total}
                                  </td>
                                  <td className="px-2 py-3 text-start ">
                                    {item?.order_status}
                                  </td>
                                  <td className="px-2 py-3 text-start ">
                                    {item?.order_date}
                                  </td>

                                  <td className="px-2 py-3 text-start">
                                    <Link className="text-indigo-600 flex items-center">
                                      View{" "}
                                      <FaArrowRight className="ms-2 text-[10px]" />
                                    </Link>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        )}
                      </table>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {isOpenTab === 2 ? (
                  <div id="order" role="tabpanel" aria-labelledby="order-tab">
                    <div className="relative overflow-x-auto shadow dark:shadow-gray-800 rounded-md">
                      <h1 className={styles.bulkthead}>Bulk Order</h1>
                      <table className="w-full text-start text-slate-500 dark:text-slate-400">
                        <thead className="text-sm uppercase bg-slate-50 dark:bg-slate-800">
                          <tr className="text-start">
                            <th scope="col" className="px-2 py-3 text-start">
                              Order Id
                            </th>
                            <th scope="col" className="px-2 py-3 text-start">
                              Order Number
                            </th>
                            <th scope="col" className="px-2 py-3 text-start">
                              Payment Method
                            </th>
                            <th scope="col" className="px-2 py-3 text-start">
                              Sub Total
                            </th>
                            <th scope="col" className="px-2 py-3 text-start">
                              Transaction Fee
                            </th>
                            <th scope="col" className="px-2 py-3 text-start">
                              Order Total
                            </th>
                            <th scope="col" className="px-2 py-3 text-start">
                              Order Status
                            </th>
                            <th scope="col" className="px-2 py-3 text-start">
                              Date
                            </th>
                            <th scope="col" className="px-2 py-3 text-start">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        {isLoading ? (
                          <h1>Loading...</h1>
                        ) : (
                          <tbody>
                            {bulkOrders?.map((item, idx) => {
                              return (
                                <tr
                                  className="bg-white dark:bg-slate-900 text-start"
                                  key={idx}
                                >
                                  <th
                                    className="px-2 py-3 text-start"
                                    scope="row"
                                  >
                                    {item?.id}
                                  </th>
                                  <td className="px-2 py-3 text-start">
                                    {item?.order_number}
                                  </td>
                                  <td className="px-2 py-3 text-start ">
                                    {item?.payment_method}
                                  </td>
                                  <td className="px-2 py-3 text-start ">
                                    {item?.order_subtotal}
                                  </td>
                                  <td className="px-2 py-3 text-start ">
                                    {item?.transaction_fee}
                                  </td>
                                  <td className="px-2 py-3 text-start ">
                                    {item?.order_total}
                                  </td>
                                  <td className="px-2 py-3 text-start ">
                                    {item?.order_status}
                                  </td>
                                  <td className="px-2 py-3 text-start ">
                                    {item?.order_date}
                                  </td>

                                  <td className="px-2 py-3 text-start">
                                    <Link className="text-indigo-600 flex items-center">
                                      View{" "}
                                      <FaArrowRight className="ms-2 text-[10px]" />
                                    </Link>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        )}
                      </table>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {isOpenTab === 3 ? (
                  <div
                    id="address"
                    role="tabpanel"
                    aria-labelledby="address-tab"
                  >
                    <h6 className="text-slate-400 mb-0">
                      The following addresses will be used on the checkout page
                      by default.
                    </h6>
                    <div className="md:flex mt-6">
                      <div className="md:w-1/2 md:px-3">
                        <div className="flex items-center mb-4 justify-between">
                          <h5 className="text-xl font-semibold">
                            Billing Address:
                          </h5>
                          <Link to="/#" className="text-indigo-600 text-lg">
                            <FiEdit />
                          </Link>
                        </div>
                        <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                          <p className="text-lg font-semibold mb-2">
                            Cally Joseph
                          </p>

                          <ul className="list-none">
                            <li className="flex items-start">
                              <RiMapPinLine className="me-2 mt-1" />
                              <p className="text-slate-400">
                                C/54 Northwest Freeway, Suite 558, <br />{" "}
                                Houston, USA 485
                              </p>
                            </li>

                            <li className="flex items-center mt-1">
                              <FiPhone className="me-2 text-lg" />
                              <p className="text-slate-400">+123 897 5468</p>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="md:w-1/2 md:px-3 mt-[30] md:mt-0">
                        <div className="flex items-center mb-4 justify-between">
                          <h5 className="text-xl font-semibold">
                            Shipping Address:
                          </h5>
                          <Link to="/#" className="text-indigo-600 text-lg">
                            <FiEdit />
                          </Link>
                        </div>
                        <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                          <p className="text-lg font-semibold mb-2">
                            Cally Joseph
                          </p>

                          <ul className="list-none">
                            <li className="flex items-start">
                              <RiMapPinLine className="me-2 mt-1" />
                              <p className="text-slate-400">
                                C/54 Northwest Freeway, Suite 558, <br />{" "}
                                Houston, USA 485
                              </p>
                            </li>

                            <li className="flex items-start mt-1">
                              <FiPhone className=" text-lg me-2" />
                              <p className="text-slate-400">+123 897 5468</p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {isOpenTab === 4 ? (
                  <div
                    id="accountdetail"
                    role="tabpanel"
                    aria-labelledby="accountdetail-tab"
                  >
                    <h5 className="text-lg font-semibold mb-4">
                      Personal Detail :
                    </h5>
                    <form>
                      <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                        <div>
                          <label className="form-label font-medium">
                            First Name : <span className="text-red-600">*</span>
                          </label>
                          <div className="form-icon relative mt-2">
                            <Icon.User className="w-4 h-4 absolute top-3 start-4"></Icon.User>
                            <input
                              type="text"
                              className="form-input ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0"
                              placeholder="First Name:"
                              id="firstname"
                              name="name"
                              required=""
                            />
                          </div>
                        </div>
                        <div>
                          <label className="form-label font-medium">
                            Last Name : <span className="text-red-600">*</span>
                          </label>
                          <div className="form-icon relative mt-2">
                            <Icon.UserCheck className="w-4 h-4 absolute top-3 start-4"></Icon.UserCheck>
                            <input
                              type="text"
                              className="form-input ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0"
                              placeholder="Last Name:"
                              id="lastname"
                              name="name"
                              required=""
                            />
                          </div>
                        </div>
                        <div>
                          <label className="form-label font-medium">
                            Your Email : <span className="text-red-600">*</span>
                          </label>
                          <div className="form-icon relative mt-2">
                            <Icon.Mail className="w-4 h-4 absolute top-3 start-4"></Icon.Mail>
                            <input
                              type="email"
                              className="form-input ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0"
                              placeholder="Email"
                              name="email"
                              required=""
                            />
                          </div>
                        </div>
                        <div>
                          <label className="form-label font-medium">
                            Occupation :{" "}
                          </label>
                          <div className="form-icon relative mt-2">
                            <Icon.Bookmark className="w-4 h-4 absolute top-3 start-4"></Icon.Bookmark>
                            <input
                              name="name"
                              id="occupation"
                              type="text"
                              className="form-input ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0"
                              placeholder="Occupation :"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1">
                        <div className="mt-5">
                          <label className="form-label font-medium">
                            Description :{" "}
                          </label>
                          <div className="form-icon relative mt-2">
                            <Icon.MessageCircle className="w-4 h-4 absolute top-3 start-4"></Icon.MessageCircle>
                            <textarea
                              name="comments"
                              id="comments"
                              className="form-input ps-11 w-full py-2 px-3 h-28 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0"
                              placeholder="Message :"
                            ></textarea>
                          </div>
                        </div>
                      </div>

                      <input
                        type="submit"
                        id="submit"
                        name="send"
                        className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md mt-5"
                        value="Save Changes"
                      />
                    </form>

                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 mt-6">
                      <div>
                        <h5 className="text-lg font-semibold mb-4">
                          Contact Info :
                        </h5>

                        <form>
                          <div className="grid grid-cols-1 gap-5">
                            <div>
                              <label className="form-label font-medium">
                                Phone No. :
                              </label>
                              <div className="form-icon relative mt-2">
                                <Icon.Phone className="w-4 h-4 absolute top-3 start-4"></Icon.Phone>
                                <input
                                  name="number"
                                  id="number"
                                  type="number"
                                  className="form-input ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0"
                                  placeholder="Phone :"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="form-label font-medium">
                                Website :
                              </label>
                              <div className="form-icon relative mt-2">
                                <Icon.Globe className="w-4 h-4 absolute top-3 start-4"></Icon.Globe>
                                <input
                                  name="url"
                                  id="url"
                                  type="url"
                                  className="form-input ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0"
                                  placeholder="Url :"
                                />
                              </div>
                            </div>
                          </div>

                          <button className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md mt-5">
                            Add
                          </button>
                        </form>
                      </div>

                      <div>
                        <h5 className="text-lg font-semibold mb-4">
                          Change password :
                        </h5>
                        <form>
                          <div className="grid grid-cols-1 gap-5">
                            <div>
                              <label className="form-label font-medium">
                                Old password :
                              </label>
                              <div className="form-icon relative mt-2">
                                <Icon.Key className="w-4 h-4 absolute top-3 start-4"></Icon.Key>
                                <input
                                  type="password"
                                  className="form-input ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0"
                                  placeholder="Old password"
                                  required=""
                                />
                              </div>
                            </div>

                            <div>
                              <label className="form-label font-medium">
                                New password :
                              </label>
                              <div className="form-icon relative mt-2">
                                <Icon.Key className="w-4 h-4 absolute top-3 start-4"></Icon.Key>
                                <input
                                  type="password"
                                  className="form-input ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0"
                                  placeholder="New password"
                                  required=""
                                />
                              </div>
                            </div>

                            <div>
                              <label className="form-label font-medium">
                                Re-type New password :
                              </label>
                              <div className="form-icon relative mt-2">
                                <Icon.Key className="w-4 h-4 absolute top-3 start-4"></Icon.Key>
                                <input
                                  type="password"
                                  className="form-input ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0"
                                  placeholder="Re-type New password"
                                  required=""
                                />
                              </div>
                            </div>
                          </div>

                          <button className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md mt-5">
                            Save password
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export { CustomerDashboard };
