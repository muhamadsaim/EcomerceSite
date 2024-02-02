import { Routes, Route } from "react-router-dom";
import Home from "../../Pages/Home";
import Category from "../../Pages/Category";
export default function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:catrgoryId" element={<Category />}></Route>
      </Routes>
    </div>
  );
}
