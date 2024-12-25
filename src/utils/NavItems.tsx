import { MdSpaceDashboard } from "react-icons/md";
import { GrAnnounce } from "react-icons/gr";
import { PiUsersThreeFill } from "react-icons/pi";
import { HiOutlineTrophy } from "react-icons/hi2";
import { FaSitemap } from "react-icons/fa6";

interface ListItemsType {
    name: string,
    link: string,
    icon: React.ReactNode,
}

export const ListItems: ListItemsType[] = [
    {
        name: "dashboard",
        link: "/",
        icon: <MdSpaceDashboard size={20} />,
    },
    {
        name: "Products",
        link: "/products",
        icon: <FaSitemap size={20} />,
    },
    {
        name: "orders",
        link: "/orders",
        icon: <HiOutlineTrophy size={20} />,
    },
    {
        name: "users",
        link: "/users",
        icon: <PiUsersThreeFill size={20} />,
    },
]; 