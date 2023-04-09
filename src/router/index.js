import About from "../pages/About";
import TextToPPTX from "../pages/TextToPptx";

export const publicRoutes = [
    {path: '/*', element: <About/>, exact: false},
    {path: '/text-to-pptx', element: <TextToPPTX/>, exact: false}
]