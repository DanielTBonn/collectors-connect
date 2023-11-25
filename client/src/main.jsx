import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App.jsx";
import IndexPage from "./pages/IndexPage";
import ProfilePage from "./pages/ProfilePage.jsx";
import TestPage from "./pages/TestPage";
import TestImage from "./pages/TestImage.jsx";
import Search from "./pages/SearchPage";
import Created from "./pages/CreateCollection.jsx";
import CreateCollection from "./pages/CreateCollection.jsx";
import ViewMyCollections from "./pages/ViewMyCollections.jsx";
import SingleCollectionById from "./pages/SingleCollectionById.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1 className="display-2">Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <IndexPage />,
      },
      {
        path: "/me",
        element: <ProfilePage />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/createcollection",
        element: <CreateCollection />,
      },
      {
        path: "/mycollections",
        element: <ViewMyCollections />,
      },
      {
        path: "/mycollections/:collectionId",
        element: <SingleCollectionById />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
