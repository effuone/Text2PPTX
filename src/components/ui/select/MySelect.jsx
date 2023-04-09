import React from "react";
import { Form } from "react-bootstrap";

const MySelect = ({options, defaultValue, value, onChange}) => {
 return(
     <Form.Select style={{width:'50%'}}
     value={value}
     onChange={event=>onChange(event.target.value)}
     >
         <option disabled value="">{defaultValue}</option>
         {options.map(option=>
            <option key={option.value} value={option.value}>
                {option.name}
            </option>
         )}
     </Form.Select>
 )
}
export default MySelect;