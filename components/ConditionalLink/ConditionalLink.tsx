import Link from "next/link"
import { ReactNode } from "react"


export default function ConditionalLink({href, disabled, children, className ,style} :{
    href: string
    disabled?: boolean
    children?: ReactNode
    className?: string
    style?: {
        color?: string
    }
}){

    if(disabled){
        return <span className={className}>{children}</span>
    }

    return (
        <Link style={style} href={href} className={className}>
            {children}
        </Link>
    )

}