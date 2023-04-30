import AddRecipe from "./pages/AddRecipe/AddRecipe";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Nav from "./components/Nav/Nav";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import RecipeDetail from "./pages/RecipeDetail/RecipeDetail";
import "./App.css";
import SideBar from "./components/Sidebar/SideBar";
function App() {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname !== "/login" && <Nav />}
      <div className="homeContainer">
        {location.pathname === "/home"   && <SideBar />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/addRecipe" element={<AddRecipe />} />
          <Route path="/detail/:id" element={<RecipeDetail />} />

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
      {location.pathname !== "/login" && <Footer />}
    </div>
  );
}

export default App;
