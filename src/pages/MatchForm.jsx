import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const MatchForm = () => {
  const [match, setMatch] = useState({
    MatchID: "",
    Date: "",
    Opponent: "",
    Results: "",
    GoalsScored: "",
    GoalsConceded: "",
    Location: "",
  });
  const history = useNavigate();
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (id) {
      axios
        .get(
          `https://football-dashboard-a58827323ebf.herokuapp.com/matches.php?MatchID=${id}`
        )
        .then((response) => {
          const data = response.data;
          setMatch({
            MatchID: data.MatchID || "",
            Date: data.Date || "",
            Opponent: data.Opponent || "",
            Results: data.Results || "",
            GoalsScored: data.GoalsScored || "",
            GoalsConceded: data.GoalsConceded || "",
            Location: data.Location || "",
          });
        })
        .catch((error) => console.error(error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const val = type === "number" ? Number(value) : value;
    setMatch({ ...match, [name]: val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = id
      ? `https://football-dashboard-a58827323ebf.herokuapp.com/matches.php?MatchID=${id}`
      : "https://football-dashboard-a58827323ebf.herokuapp.com/matches.php";

    const method = id ? "put" : "post";

    axios({
      method: method,
      url: url,
      data: match,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.data.error) {
          setErrorMessage(response.data.error);
        } else {
          history("/matches", { replace: true });
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  return (
    <div className="max-w-7xl md:mx-auto px-5 md:px-10 lg:px-20">
      <div className="flex items-center justify-center flex-col my-6">
        <h2 className="text-center text-4xl mb-1">
          {id ? "Edit Match" : "Add New Match"}
        </h2>
      </div>
      {errorMessage && (
        <p className="text-center text-lg text-red-500 pt-3">{errorMessage}</p>
      )}
      <form
        className="py-2 md:flex md:flex-row md:flex-wrap md:gap-5"
        onSubmit={handleSubmit}
      >
        {/* Form fields here */}
        <div className="flex flex-col gap-1 mt-4 md:w-[48%]">
          <label>Date</label>
          <input
            className="text-center bg-transparent border-2 py-2 outline-none border-blue-500"
            type="date"
            name="Date"
            value={match.Date}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-1 mt-4 md:w-[48%]">
          <label>Opponent</label>
          <input
            className="text-center bg-transparent border-2 py-2 outline-none border-blue-500"
            type="text"
            name="Opponent"
            value={match.Opponent}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-1 mt-4 md:w-[48%]">
          <label>Location</label>
          <input
            className="text-center bg-transparent border-2 py-2 outline-none border-blue-500"
            type="text"
            name="Location"
            value={match.Location}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-1 mt-4 md:w-[48%]">
          <label>Results</label>
          <input
            className="text-center bg-transparent border-2 py-2 outline-none border-blue-500"
            type="text"
            name="Results"
            value={match.Results}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-1 mt-4 md:w-[48%]">
          <label>GoalsScored</label>
          <input
            name="GoalsScored"
            className="text-center bg-transparent border-2 py-2 outline-none border-blue-500"
            type="number"
            value={match.GoalsScored}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-1 mt-4 md:w-[48%]">
          <label>GoalsConceded</label>
          <input
            name="GoalsConceded"
            className="text-center bg-transparent border-2 py-2 outline-none border-blue-500"
            type="number"
            value={match.GoalsConceded}
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

export default MatchForm;
