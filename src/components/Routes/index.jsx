import { Routes, Route } from "react-router-dom";
import Category from "../../Pages/Category";
export default function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Category />}></Route>
        <Route path="/:catrgoryId" element={<Category />}></Route>
      </Routes>
    </div>
  );
}
