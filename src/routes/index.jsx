import { createBrowserRouter} from "react-router-dom";


import { Navigation } from "../layouts/navigation/navigation";


import Settings  from "../pages/settings/index";
import { Chat } from "../pages/chat/index";
import { NotFoundPage } from "../pages/404/index";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Navigation />,
        children: [
            {
                index: true,
                element: <Chat />,
            },
            {
                path: "activities",
                element: <div>Activities</div>,
            },
            {
                path: "settings",
                element: <Settings/>,
            },
            {
                path: "*",
                element: <NotFoundPage/>,
            },
        ],
    },


]);