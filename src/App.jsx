import { Routes, Route } from "react-router-dom";
import {Home} from "./pages/Home";
import { Category } from "./pages/Category";
import { AdminLayout } from './admin/components/AdminLayout';
import { CategoriesPage } from './admin/pages/CategoriesPage';
import { SubCategoriesPage } from './admin/pages/SubCategoriesPage';
import { TasksPage } from './admin/pages/TasksPage';
import SuggestionsList from "./admin/pages/SuggestionPage";
import PasswordGate from "./components/PasswordGate";
import GoogleAnalytics from "./components/GoogleAnalytics";
import { Feedback } from "./pages/Feedback";

export default function App() {
  return (
  <>
    <GoogleAnalytics />
    {/* <PasswordGate> */}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category" element={<Category />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/admin" element={<AdminLayout />}>
      <Route path="/admin/suggestion" element={<SuggestionsList />} />
          <Route index element={<CategoriesPage />} />
          <Route path="categories" element={<CategoriesPage />}>
            <Route path="new" element={<CategoriesPage />} />
            <Route path="edit/:catId" element={<CategoriesPage />} />
          </Route>
          <Route path="subcategories" element={<CategoriesPage />} />
          <Route path="subcategories/:catId" element={<SubCategoriesPage />}>
            <Route path="new" element={<SubCategoriesPage />} />
            <Route path="edit/:subCatId" element={<SubCategoriesPage />} />
          </Route>
          <Route path="tasks/:catId/:subCatId" element={<TasksPage />}>
            <Route path="new" element={<TasksPage />} />
            <Route path="edit/:taskId" element={<TasksPage />} />
          </Route>
        </Route>
    </Routes>
    {/* </PasswordGate> */}
  </>
  );
}
