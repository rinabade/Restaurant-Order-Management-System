// Sidebar imports


// Analytics Cards imports
import { FaBars,FaCalendarMinus, FaUserAlt, FaHome, FaUsers, FaClipboard, FaClipboardList, FaCubes, FaHandshake, FaChevronCircleRight, FaRegCreditCard, FaMoneyCheck } from "react-icons/fa";



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

  {
    icon: FaClipboard,
    heading: "Order",
    path: "/Kitchen/KitchenOrder",
  
  },
  {
    icon: FaUserAlt,
    heading: "Profile",
    path: "/Kitchen/Kitchen_profile",
  },
];

// Analytics Cards Data
export const cardsData = [
  {
    title: "Sales",
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
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
      backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
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
