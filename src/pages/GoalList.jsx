import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaSearch, FaPlus } from "react-icons/fa";

const GoalList = () => {
  const [goals, setGoals] = useState([]);
  const [filteredGoals, setFilteredGoals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost/football_dashboard/goals.php?fetchGoals=true")
      .then((response) => {
        setGoals(response.data);
        setFilteredGoals(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term !== "") {
      const filtered = goals.filter((goal) =>
        goal.PlayerName.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredGoals(filtered);
    } else {
      setFilteredGoals(goals);
    }
  };

  const deleteGoal = (id) => {
    axios
      .delete(`http://localhost/football_dashboard/goals.php?GoalID=${id}`)
      .then(() => {
        const updatedGoals = goals.filter((goal) => goal.GoalID !== id);
        setGoals(updatedGoals);
        setFilteredGoals(updatedGoals);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="max-w-7xl md:mx-auto px-5 mt-10 md:px-10 lg:px-20">
      <div>
        <h2 className="text-3xl tracking-wider font-semibold mb-5 leading-tight">
          GOALS
        </h2>
      </div>
      <div className="my-2 flex items-center gap-2 w-full">
        <div className="relative w-full">
          <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
            <FaSearch />
          </span>
          <input
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search"
            className="appearance-none w-full rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:border-blue-500 focus:border-2 focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
          />
        </div>
        <Link
          to="/add-goal"
          className="bg-blue-500 text-white py-2 px-4 rounded-r sm:hidden"
        >
          <FaPlus />
        </Link>
        <Link
          to="/add-goal"
          className="bg-blue-500 text-white hidden sm:block sm:py-2 text-center sm:px-4 sm:w-[150px] sm:rounded-r"
        >
          Add Goal
        </Link>
      </div>
      <div className="mx-auto">
        <div className="py-8 px-4 md:px-8">
          <div className="-mx-4 sm:-mx-8 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Player Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Opponents
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      TimeScored
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGoals.map((goal) => (
                    <tr key={goal.GoalID}>
                      <td className="px-5 py-5 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {goal.PlayerName}
                        </p>
                      </td>
                      <td className="px-5 py-5 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap text-center">
                          {goal.Opponent}
                        </p>
                      </td>
                      <td className="px-5 py-5 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap text-center">
                          {goal.Date}
                        </p>
                      </td>
                      <td className="px-5 py-5 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap text-center">
                          {goal.TimeScored}
                        </p>
                      </td>
                      <td className="px-5 py-5 bg-white text-sm">
                        <Link
                          to={`/edit-goal/${goal.GoalID}`}
                          className="bg-blue-500 text-white py-2 px-4 rounded-md"
                        >
                          Edit
                        </Link>
                      </td>
                      <td className="px-5 py-5 bg-white text-sm">
                        <button
                          onClick={() => deleteGoal(goal.GoalID)}
                          className="bg-red-500 text-white py-2 px-4 rounded-md"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="px-5 py-5 bg-white border-t">
                <span className="text-xs xs:text-sm text-gray-900">
                  Showing {filteredGoals.length} goals
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalList;
