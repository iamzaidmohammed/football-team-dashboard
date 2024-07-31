import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const GoalForm = () => {
  const [goal, setGoal] = useState({
    GoalID: "",
    PlayerID: "",
    MatchID: "",
    PlayerName: "",
    Opponent: "",
    Date: "",
    TimeScored: "",
  });
  const history = useNavigate();
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost/football_dashboard/goals.php?GoalID=${id}`)
        .then((response) => {
          const data = response.data;
          setGoal({
            GoalID: data.GoalID || "",
            PlayerID: data.PlayerID || "",
            MatchID: data.MatchID || "",
            PlayerName: data.PlayerName || "",
            Opponent: data.Opponent || "",
            Date: data.Date || "",
            TimeScored: data.TimeScored || "",
          });
        })
        .catch((error) => console.error(error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const val = type === "number" ? Number(value) : value;
    setGoal({ ...goal, [name]: val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = id
      ? `http://localhost/football_dashboard/goals.php?GoalID=${id}`
      : "http://localhost/football_dashboard/goals.php";

    const method = id ? "put" : "post";

    axios({
      method: method,
      url: url,
      data: goal,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.data.error) {
          setErrorMessage(response.data.error);
        } else {
          history("/goals", { replace: true });
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
          {id ? "Edit Goal" : "Add New Goal"}
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
          <label>PlayerID</label>
          <input
            className="text-center bg-transparent border-2 py-2 outline-none border-blue-500"
            type="number"
            name="PlayerID"
            value={goal.PlayerID}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-1 mt-4 md:w-[48%]">
          <label>MatchID</label>
          <input
            className="text-center bg-transparent border-2 py-2 outline-none border-blue-500"
            type="number"
            name="MatchID"
            value={goal.MatchID}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-1 mt-4 md:w-[48%]">
          <label>Date</label>
          <input
            className="text-center bg-transparent border-2 py-2 outline-none border-blue-500"
            type="date"
            name="Date"
            value={goal.Date}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-1 mt-4 md:w-[48%]">
          <label>TimeScored</label>
          <input
            className="text-center bg-transparent border-2 py-2 outline-none border-blue-500"
            type="text"
            name="TimeScored"
            value={goal.TimeScored}
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

export default GoalForm;
