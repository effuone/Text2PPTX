import React from "react";
import MySelect from "./ui/select/MySelect";
import MyInput from "./ui/input/MyInput";
const CategoryFilter = ({filter,setFilter}) => {
    return(
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center', marginBottom: '30px'}}>
            <MyInput
                value={filter.query}
                onChange={e=>setFilter({...filter, query: e.target.value})}
                placeholder="Search"
            />
            <MySelect
                value={filter.sort}
                onChange={selectedSort => setFilter({...filter, sort:selectedSort})}
                defaultValue="Sorting"
                options={[
                    {value:'category', name:'By category', selected: 'true'},
                    {value:'name', name:'By name'},
                ]}
            />
        </div>
    )
}
export default CategoryFilter