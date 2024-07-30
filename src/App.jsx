import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import PlayerList from "./pages/PlayerList.jsx";
import ManagerList from "./pages/ManagerList.jsx";
import PlayerForm from "./pages/PlayerForm.jsx";
import ManagerForm from "./pages/ManagerForm.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<PlayerList />} />
      <Route path="/managers" element={<ManagerList />} />
      <Route path="/add-player" element={<PlayerForm />} />
      <Route path="/add-manager" element={<ManagerForm />} />
      <Route path="/edit-player/:id" element={<PlayerForm />} />
      <Route path="/edit-manager/:id" element={<ManagerForm />} />
      <Route path="*" element={<h1>NotFound</h1>} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
