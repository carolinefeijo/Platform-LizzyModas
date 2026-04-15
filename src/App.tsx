import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Header from "./components/Header";
import Sidebar from "./components/SideBar";
import Home from "./pages/home";
import Users from "./pages/users";
import Products from "./pages/products";
import Posts from "./pages/posts";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthRequest } from "./store/features/login/loginSlice";
import type { UserState } from "./store/features/user/userSlice";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(
    (state: { login: UserState }) => state.login,
  );

  useEffect(() => {
    dispatch(checkAuthRequest());
  }, [dispatch]);

  // if (!isAuthenticated && !user && location.pathname !== "/login") {
  //   return (
  //     <div className="loading-screen">
  //       <Loading />
  //     </div>
  //   );
  // }

  return (
    <BrowserRouter>
      {isAuthenticated ? (
        <>
          <Sidebar />
          <div className="content-wrapper">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/users" element={<Users />} />
                <Route path="/products" element={<Products />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="*" element={<Navigate to="/home" />} />
              </Routes>
            </main>
          </div>
        </>
      ) : (
        <div className="app-container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
