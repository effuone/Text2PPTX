import About from "../pages/About";
import TextToPPTX from "../pages/TextToPptx";
import VideoToPptx from "../pages/VideoToPptx";
export const publicRoutes = [
    {path: '/*', element: <About/>, exact: false},
    {path: '/text-to-pptx', element: <TextToPPTX/>, exact: false},
    {path: '/video-to-pptx', element: <VideoToPptx/>, exact: false},

]