import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const PlayerForm = () => {
  const [player, setPlayer] = useState({
    PlayerName: "",
    Position: "",
    Goals: "",
    Assists: "",
  });
  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost/football_dashboard/player.php?PlayerID=${id}`)
        .then((response) => setPlayer(response.data))
        .catch((error) => console.error(error));
    }
  }, [id]);

  const handleChange = (e) => {
    setPlayer({ ...player, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      axios
        .put(`http://localhost/football_dashboard/player.php`, player)
        .then(() => history.push("/"))
        .catch((error) => console.error(error));
    } else {
      axios
        .post(`http://localhost/football_dashboard/player.php`, player)
        .then(() => history.push("/"))
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className="max-w-7xl md:mx-auto px-5 md:px-10 lg:px-20">
      <div className="md:flex md:items-center md:gap-10">
        <form
          className="py-2 md:flex md:flex-wrap md:gap-5"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-1 mt-4 md:w-[48%]">
            <label>Player Name</label>
            <input
              className="text-center bg-transparent border-2 py-2 outline-none border-primary"
              type="text"
              name="PlayerName"
              value={player.PlayerName}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1 mt-4 md:w-[48%]">
            <label>Position</label>
            <input
              className="text-center bg-transparent border-2 py-2 outline-none border-primary"
              type="text"
              name="Position"
              value={player.Position}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1 mt-4 md:w-[48%]">
            <label>Goals</label>
            <input
              className="text-center bg-transparent border-2 py-2 outline-none border-primary"
              type="number"
              name="Goals"
              value={player.Goals}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1 mt-4 md:w-[48%]">
            <label>Assists</label>
            <input
              className="text-center bg-transparent border-2 py-2 outline-none border-primary"
              type="number"
              name="Assists"
              value={player.Assists}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlayerForm;
