import { publicRoutes } from "../router"
import { Routes, Route } from "react-router-dom"
const AppRouter = () => {
    return (
        <Routes>
                {publicRoutes.map((route)=>
                    <Route 
                        exact = {route.exact} 
                        path = {route.path}
                        element={route.element}
                        key= {route.path}
                    />
                )}
        </Routes>
    )
}
export default AppRouter