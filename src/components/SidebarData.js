import React from "react";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "product",
    path: "/productshow",
    icon: <FaIcons.FaHouseDamage />,
    cName: "nav-text",
  },
  {
    title: "Add Products",
    path: "./products",
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text",
  },
  {
    title: "Category",
    path: "/Category",
    icon: <IoIcons.IoMdList />,
    cName: "nav-text",
  },
  {
    title: "Subcategory",
    path: "/Subcategory",
    icon: <FaIcons.FaList />,
    cName: "nav-text",
  },
  {
    title: "Save Product",
    path: "/saveproduct",
    icon: <FaIcons.FaHouseDamage/>,
    cName: "nav-text",
  },
  {
    title: 'Addcart',
    path: '/addcart',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
    // {
    //   title: 'Order Detail',
    //   path: '/order_tracker',
    //   icon: <FaIcons.FaCartPlus />,
    //   cName: 'nav-text'
    // },
  {
    title: "Profile",
    path: "/profile",
    icon: <FaIcons.FaUser />,
    cName: "nav-text",
  },
  {
    title: "Login",
    path: "/Login",
    icon: <FaIcons.FaUser />,
    cName: "nav-text",
  },
];
