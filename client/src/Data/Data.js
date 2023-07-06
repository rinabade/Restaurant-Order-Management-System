// Sidebar imports


// Analytics Cards imports
import { FaBars,FaCalendarMinus, FaUserAlt, FaHome, FaUsers, FaClipboard, FaClipboardList, FaCubes, FaHandshake, FaChevronCircleRight, FaRegCreditCard, FaMoneyCheck } from "react-icons/fa";
import header from "../imgs/header.jpg";


// Sidebar Data
export const SidebarData = [
  {
    icon: FaHome,
    heading: "Dashboard",
    path: "/admin/Maindash",
  },

  {
    icon: FaUsers,
    heading: "Employee",
    path: "/admin/Employees",
  
  },
  {
    icon: FaClipboard,
    heading: "Category",
    path: "/admin/Category",
  },
  {
    icon: FaCalendarMinus,
    heading: "Menu",
    path: "/admin/AdminMenu",
  },
  {
    icon: FaClipboard,
    heading: "AdminRole",
    path: "/admin/AdminRole",
  },
  {
    icon: FaClipboard,
    heading: "Permission",
    path: "/admin/Permission",
  },
  {
    icon: FaClipboardList,
    heading: "Orders",
    path: "/admin/Orders",
  },
  {
    icon: FaCubes,
    heading: "Inventory",
    path: "/admin/Inventory",
  },
  {
    icon: FaHandshake,
    heading: "Suppliers",
    path: "/admin/Suppliers",
  },
  {
    icon: FaClipboard,
    heading: "Feedback",
    path: "/admin/Feedback",
  },
  {
    icon: FaRegCreditCard,
    heading: "Payment",
    path: "/admin/Payment",
  },
  {
    icon: FaMoneyCheck,
    heading: "Suppliers Payment",
    path: "/admin/Suppliers_payment",
  },
  {
    icon: FaUserAlt,
    heading: "Admin Profile",
    path: "/admin/Admin_profile",
  },
];

export const KitchenSidebarData = [
  {
    icon: FaHome,
    heading: "Dashboard",
    path: "/Kitchen/Kitchendash",
  },
];

export const CashierSidebarData = [
  {
    icon: FaHome,
    heading: "Dashboard",
    path: "/Cashier/Cashierdash",
  },
];

// Analytics Cards Data
export const cardsData = [
  {
    title: "Sales",
    color: {
      backGround: " linear-gradient(to right top, #d16b6b, #d57070, #da7575, #de7a7a, #e27f7f, #e67e7e, #e97e7e, #ed7d7d, #f17676, #f56f6e, #f86767, #fb5f5f)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 70,
    value: "25,970",
    png: FaClipboard,
    series: [
      {
        name: "Sales",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
  },
  {
    title: "Revenue",
    color: {
      backGround: "linear-gradient(to right top, #50c273, #55c879, #5acf7f, #5fd586, #64dc8c, #63de8f, #61e193, #60e396, #58e296, #50e197, #47df97, #3dde98)",
      boxShadow: "0px 10px 20px 0px #FDC0C7",
    },
    barValue: 80,
    value: "14,270",
    png: FaClipboard,
    series: [
      {
        name: "Revenue",
        data: [10, 100, 50, 70, 80, 30, 40],
      },
    ],
  },
  {
    title: "Expenses",
    color: {
      backGround:
        "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
      boxShadow: "0px 10px 20px 0px #F9D59B",
    },
    barValue: 60,
    value: "4,270",
    png: FaClipboard,
    series: [
      {
        name: "Expenses",
        data: [10, 25, 15, 30, 12, 15, 20],
      },
    ],
  },
];



// Recent Update Card Data
export const cartItems = [
  {
    id: 1,
    title: "Omlete",
    discription:"fcsdfd" ,
    price: 89,
    img: require("../imgs/header.jpg"),
    amount: 1,
    category: "breakfast",
  },
  {
    id: 2,
    title: "Chowmien",
    discription:"" ,
    price: 98,
    img: require("../imgs/header.jpg"),
    amount: 1,
    category: "lunch",
  },
  {
    id: 3,
    title: "Burger",
    discription:"" ,
    price: 143,
    img: require("../imgs/header.jpg"),
    amount: 1,
    category: "dinner",
  },
  {
    id: 4,
    title: "sausage",
    discription:"" ,
    price: 57,
    img:require("../imgs/header.jpg"),
    amount: 1,
    category: "snacks",
  },
  {
    id: 5,
    title: "meatball",
    discription:"" ,
    price: 149,
    img: require("../imgs/header.jpg"),
    amount: 1,
    category: "snacks",
  },
  {
    id: 6,
    title: "sandwhich",
    discription:"" ,
    price: 135,
    img: require("../imgs/header.jpg"),
    amount: 1,
    category: "breakfast",
  },
  {
    id: 7,
    title: "Pizza ",
    discription:"" ,
    price: 693,
    img: require("../imgs/header.jpg"),
    amount: 1,
  },
  {
    id: 8,
    title: "momo",
    discription:"" ,
    price: 289,
    img: require("../imgs/header.jpg"),
    amount: 1,
  },
];
