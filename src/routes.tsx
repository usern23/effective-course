import { Navigate } from "react-router-dom";
import Layout from "./Layout";
import ComicsPage from "./pages/Comics/Comics";
import FavoritesPage from "./pages/Favorites/Favorites";
import ComicDetails from "./pages/ComicDetails/ComicDetails";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
        { path: "/", element: <Navigate to="/comics" replace /> },
        { path: "comics", element: <ComicsPage /> },
        { path: "favorites", element: <FavoritesPage /> },
        { path: "comics/:id", element: <ComicDetails /> },
    ],
  },
];

export default routes;
