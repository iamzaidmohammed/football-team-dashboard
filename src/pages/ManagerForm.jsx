import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ManagerForm = () => {
  const [manager, setManager] = useState({
    ManagerID: null,
    ManagerName: "",
    Position: "",
  });
  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .get(
          `https://football-dashboard-a58827323ebf.herokuapp.com/manager.php?ManagerID=${id}`
        )
        .then((response) => {
          const data = response.data;
          setManager({
            ManagerID: data.ManagerID || null, // Set ManagerID from response
            ManagerName: data.ManagerName || "",
            Position: data.Position || "",
          });
        })
        .catch((error) => console.error(error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const val = type === "number" ? Number(value) : value;
    setManager({ ...manager, [name]: val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      axios
        .put(
          `https://football-dashboard-a58827323ebf.herokuapp.com/manager.php`,
          manager,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(() => history("/managers", { replace: true }))
        .catch((error) => console.error(error));
    } else {
      axios
        .post(
          `https://football-dashboard-a58827323ebf.herokuapp.com/manager.php`,
          manager,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(() => history("/managers", { replace: true }))
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className="max-w-7xl md:mx-auto px-5 md:px-10 lg:px-20">
      <div className="flex items-center justify-center flex-col my-6">
        <h2 className="text-center text-4xl mb-1">
          {id ? "Edit Manager" : "Add New Manager"}
        </h2>
      </div>
      <form
        className="py-2 md:flex md:flex-row md:flex-wrap md:gap-5"
        onSubmit={handleSubmit}
      >
        {/* Form fields here */}
        <div className="flex flex-col gap-1 mt-4 md:w-[48%]">
          <label>Manager Name</label>
          <input
            className="text-center bg-transparent border-2 py-2 outline-none border-blue-500"
            type="text"
            name="ManagerName"
            value={manager.ManagerName}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-1 mt-4 md:w-[48%]">
          <label>Position</label>
          <input
            className="text-center bg-transparent border-2 py-2 outline-none border-blue-500"
            type="text"
            name="Position"
            value={manager.Position}
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

export default ManagerForm;
