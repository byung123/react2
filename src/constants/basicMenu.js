import { IoCreateOutline, IoSearchOutline, IoRemoveCircleOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";

export const basic_Menu = [
    {
        id: 1,
        name: "POST요청",
        path: "/async/basic/post",
        icon: <IoCreateOutline></IoCreateOutline>
    },
    {
        id: 2,
        name: "GET요청",
        path: "/async/basic/get",
        icon: <IoSearchOutline></IoSearchOutline>
    },
    {
        id: 3,
        name: "PUT요청",
        path: "/async/basic/put",
        icon: <CiEdit></CiEdit>
    },
    {
        id: 4,
        name: "DELETE요청",
        path: "/async/basic/delete",
        icon: <IoRemoveCircleOutline></IoRemoveCircleOutline>
    },
];