import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.tsx';
import FilmSearch from './pages/movieSearch.tsx';
import WatchList from './pages/WatchList.tsx';
import SeenIt from './pages/SeenIt.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import Login from './pages/Login.tsx';
import SignUp from './pages/SignUp.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: '/watchList',
        element: <WatchList />,
      },
      {
        path: '/seenIt',
        element: <SeenIt />,
      },
      {
        path: '/FilmSearch',
        element: <FilmSearch/>,
      },
      {
        path: '/SignUp',
        element: <SignUp/>,
      },
    ],
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
