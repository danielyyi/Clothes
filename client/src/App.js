import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/AuthRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import NoProfile from "./pages/NoProfile";
import CreatePost from "./pages/CreatePost";
import SinglePost from "./pages/SinglePost";
import Clothes from "./pages/Clothes";
import SingleUser from "./pages/SingleUser";
import Men from "./pages/Men";
import Brands from "./pages/Brands";
import Women from "./pages/Women";
import EditProfile from "./pages/EditProfile";
import About from "./pages/About";
import Explore from "./pages/Explore";
import TagPage from "./pages/TagPage";
import Register2 from "./pages/Register2";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/register2" element={<Register2 />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/brands" element={<Brands/>} />
          <Route exact path="/men" element={<Men />} />
          <Route exact path="/explore" element={<Explore />} />
          <Route exact path="/explore/:tag" element={<TagPage />} />
          <Route exact path="/clothes" element={<Clothes />} />
          <Route exact path="/women" element={<Women />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/posts/:postId" element={<SinglePost />} />
          <Route exact path="/brands/:userId" element={<SingleUser />} />
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/profile"
            element={
              <AuthRoute redirectTo="/login">
                <Profile />
              </AuthRoute>
            }
          />

          <Route exact path="/noprofile" element={<NoProfile />} />
          <Route exact path="/register" element={<Register />} />
          <Route
            exact
            path="/profile/create"
            element={
              <AuthRoute redirectTo="/">
                <CreatePost />
              </AuthRoute>
            }
          />
          <Route
            exact
            path="/profile/edit"
            element={
              <AuthRoute redirectTo="/">
                <EditProfile />
              </AuthRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
