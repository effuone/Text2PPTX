import React from "react"
import { Form } from "react-bootstrap"
import classes from './MyInput.module.css'


const MyInput = React.forwardRef((props, ref) => {
    return (
        <Form.Control ref={ref} className={classes.myInput}{...props}/>
    )
})
export default MyInput