import React from "react"
import { Button } from "react-bootstrap"

const MyButton = ({children, ...props}) => {
    return (
        <Button {...props}>
            {children}
        </Button>
    )
}
export default MyButton