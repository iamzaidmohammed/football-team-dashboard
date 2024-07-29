import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaSearch, FaPlus } from "react-icons/fa";

const PlayerList = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost/football_dashboard/player.php")
      .then((response) => setPlayers(response.data))
      .catch((error) => console.error(error));
  }, []);

  const deletePlayer = (id) => {
    axios
      .delete(`http://localhost/football_dashboard/player.php?PlayerID=${id}`)
      .then(() =>
        setPlayers(players.filter((player) => player.PlayerID !== id))
      )
      .catch((error) => console.error(error));
  };

  return (
    <div className="max-w-7xl md:mx-auto px-5 mt-10 md:px-10 lg:px-20">
      <div>
        <h2 className="text-3xl tracking-wider font-semibold mb-5 leading-tight">
          PLAYERS
        </h2>
      </div>
      <div className="my-2 flex items-center gap-2 w-full">
        <div className="relative w-full">
          <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
            <FaSearch />
          </span>
          <input
            placeholder="Search"
            className="appearance-none w-full rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:border-blue-500 focus:border-2 focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
          />
        </div>
        {/* Mobile btn */}
        <Link
          to="/add-player"
          className="bg-blue-500 text-white py-2 px-4 rounded-r sm:hidden"
        >
          <FaPlus />
        </Link>
        {/* Desktop btn */}
        <Link
          to="/add-player"
          className="bg-blue-500 text-white hidden sm:block sm:py-2 text-center sm:px-4 sm:w-[150px] sm:rounded-r"
        >
          Add Player
        </Link>
      </div>
      {/* Table to display players */}
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
                      Position
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Goals
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Assists
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Matches Played
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Programme
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody>
                  {players.map((player) => (
                    <tr key={player.PlayerID}>
                      <td className="px-5 py-5 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {player.PlayerName}
                        </p>
                      </td>
                      <td className="px-5 py-5 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap text-center">
                          {player.Position}
                        </p>
                      </td>
                      <td className="px-5 py-5 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap text-center">
                          {player.Goals}
                        </p>
                      </td>
                      <td className="px-5 py-5 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap text-center">
                          {player.Assists}
                        </p>
                      </td>
                      <td className="px-5 py-5 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap text-center">
                          {player.MatchesPlayed}
                        </p>
                      </td>
                      <td className="px-5 py-5 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {player.Department}
                        </p>
                      </td>
                      <td className="px-5 py-5 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {player.Programme}
                        </p>
                      </td>
                      <td className="px-5 py-5 bg-white text-sm">
                        <Link
                          to={`/edit-player/${player.PlayerID}`}
                          className="bg-blue-500 text-white py-2 px-4 rounded-md"
                        >
                          Edit
                        </Link>
                      </td>
                      <td className="px-5 py-5 bg-white text-sm">
                        <button
                          onClick={() => deletePlayer(player.PlayerID)}
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
                  Showing {players.length} players
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerList;
