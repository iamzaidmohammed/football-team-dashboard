import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import PlayerList from "./components/PlayerList.jsx";
import PlayerForm from "./components/PlayerForm.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<PlayerList />} />
      <Route path="/add-player" element={<PlayerForm />} />
      <Route path="/edit-player/:id" element={<PlayerForm />} />
      <Route path="*" element={<h1>NotFound</h1>} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
