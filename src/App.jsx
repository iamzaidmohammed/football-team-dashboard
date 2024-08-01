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
import GoalForm from "./pages/GoalForm.jsx";
import GoalList from "./pages/GoalList.jsx";
import MatchForm from "./pages/MatchForm.jsx";
import MatchList from "./pages/MatchList.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<PlayerList />} />
      <Route path="/managers" element={<ManagerList />} />
      <Route path="/matches" element={<MatchList />} />
      <Route path="/goals" element={<GoalList />} />
      <Route path="/add-player" element={<PlayerForm />} />
      <Route path="/add-manager" element={<ManagerForm />} />
      <Route path="/add-match" element={<MatchForm />} />
      <Route path="/add-goal" element={<GoalForm />} />
      <Route path="/edit-player/:id" element={<PlayerForm />} />
      <Route path="/edit-manager/:id" element={<ManagerForm />} />
      <Route path="/edit-match/:id" element={<MatchForm />} />
      <Route path="/edit-goal/:id" element={<GoalForm />} />
      <Route path="*" element={<h1>NotFound</h1>} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
