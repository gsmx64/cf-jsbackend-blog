import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

import Home from "../views/Home";
import Error404 from "../views/Error404";
import Post from "../views/Post";
import Profile from "../views/Profile";
import User from "../views/User";
import Users from "../views/Users";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <Error404 />
    },
    {
        path: '/post/:postId',
        element: <Post />
    },
    {
        path: '/profile',
        element: <Profile />,
        /*children: [
            {
                path: 'my-info',
                element: <MyInfo />
            }, {
                path: 'liked-posts',
                element: <LikedPosts />
            }
        ],*/
    },
    {
        path: '/user/:userId',
        element: <User />
    },
    {
        path: '/users',
        element: <Users />
    }
]);

const MyRoutes = () => <RouterProvider router={router} />;

export default MyRoutes;