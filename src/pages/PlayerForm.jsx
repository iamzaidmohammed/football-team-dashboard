import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const PlayerForm = () => {
  const [player, setPlayer] = useState({
    PlayerID: null,
    PlayerName: "",
    Position: "",
    Goals: 0,
    Assists: 0,
    MatchesPlayed: 0,
    Department: "",
    Programme: "",
  });
  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .get(
          `https://football-dashboard-a58827323ebf.herokuapp.com/player.php?PlayerID=${id}`
        )
        .then((response) => {
          const data = response.data;
          setPlayer({
            PlayerID: data.PlayerID || null,
            PlayerName: data.PlayerName || "",
            Position: data.Position || "",
            Goals: data.Goals || 0,
            Assists: data.Assists || 0,
            MatchesPlayed: data.MatchesPlayed || 0,
            Department: data.Department || "",
            Programme: data.Programme || "",
          });
        })
        .catch((error) => console.error(error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const val = type === "number" ? Number(value) : value;
    setPlayer({ ...player, [name]: val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      axios
        .put(
          `https://football-dashboard-a58827323ebf.herokuapp.com/player.php`,
          player,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(() => history("/", { replace: true }))
        .catch((error) => console.error(error));
    } else {
      axios
        .post(
          `https://football-dashboard-a58827323ebf.herokuapp.com/player.php`,
          player,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(() => history("/", { replace: true }))
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className="max-w-7xl md:mx-auto px-5 md:px-10 lg:px-20">
      <div className="flex items-center justify-center flex-col my-6">
        <h2 className="text-center text-4xl mb-1">
          {id ? "Edit Player" : "Add New Player"}
        </h2>
      </div>
      <form
        className="py-2 md:flex md:flex-row md:flex-wrap md:gap-5"
        onSubmit={handleSubmit}
      >
        {/* Form fields here */}
        <div className="flex flex-col gap-1 mt-4 md:w-full">
          <label>Player Name</label>
          <input
            className="text-center bg-transparent border-2 py-2 outline-none border-blue-500"
            type="text"
            name="PlayerName"
            value={player.PlayerName}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-1 mt-4 md:w-[48%]">
          <label>Position</label>
          <input
            className="text-center bg-transparent border-2 py-2 outline-none border-blue-500"
            type="text"
            name="Position"
            value={player.Position}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-1 mt-4 md:w-[48%]">
          <label>Goals</label>
          <input
            className="text-center bg-transparent border-2 py-2 outline-none border-blue-500"
            type="number"
            name="Goals"
            value={player.Goals}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-1 mt-4 md:w-[48%]">
          <label>Assists</label>
          <input
            className="text-center bg-transparent border-2 py-2 outline-none border-blue-500"
            type="number"
            name="Assists"
            value={player.Assists}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-1 mt-4 md:w-[48%]">
          <label>Matches Played</label>
          <input
            className="text-center bg-transparent border-2 py-2 outline-none border-blue-500"
            type="number"
            name="MatchesPlayed"
            value={player.MatchesPlayed}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-1 mt-4 md:w-[48%]">
          <label>Department</label>
          <input
            className="text-center bg-transparent border-2 py-2 outline-none border-blue-500"
            type="text"
            name="Department"
            value={player.Department}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-1 mt-4 md:w-[48%]">
          <label>Programme</label>
          <input
            className="text-center bg-transparent border-2 py-2 outline-none border-blue-500"
            type="text"
            name="Programme"
            value={player.Programme}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 w-full py-2 text-white mt-5 mb-2 rounded-md"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default PlayerForm;
