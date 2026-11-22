import Link from "next/link";
import { ReactNode } from "react";


export default function NavLink({children, href, isActive} : {
    children: ReactNode
    href: string
    isActive: boolean
}){

    let active = {
         backgroundColor: "#E8F0FE"
    }

    return (
        <Link style={isActive ? active : {}} href={href}>{children}</Link>
    )

}