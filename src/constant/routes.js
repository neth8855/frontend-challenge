import ErrorPage from "../container/ErrorPage";
import Main from "../container/Main";
import SearchHistory from "../container/SearchHistory";

export const routes = [
    {
        path: "/",
        element: <Main />,
        errorElement: <ErrorPage />
    },
    {
        path: "/history",
        element: <SearchHistory />
    }
]