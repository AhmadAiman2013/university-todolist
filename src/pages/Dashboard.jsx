import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

export default function Dashboard() {
  const [username, setUsername] = useState("")
  const [showModal, setShowModal] = useState(true);
  const [todoList, setTodoList] = useState([
    {
      category: "school",
      tasks: [
        { task: "assignment 1", checked: false },
        { task: "assignment 2", checked: false },
      ],
      color: "primary",
    },
    {
      category: "personal",
      tasks: [
        { task: "task 1", checked: false },
        { task: "task 2", checked: false },
      ],
      color: "secondary",
    },
    {
      category: "school",
      tasks: [
        { task: "assignment 1", checked: false },
        { task: "assignment 2", checked: false },
      ],
      color: "accent",
    },
    {
      category: "personal",
      tasks: [
        { task: "task 1", checked: false },
        { task: "task 2", checked: false },
      ],
      color: "success",
    },
  ]);

  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setShowModal(true);

    return () => setShowModal(false);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/auth");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const handleCloseModal = (e) => {
    e.preventDefault()
    setShowModal(false);   
  };

 
  const handleTaskCheckboxChange = (categoryIndex, taskIndex) => {
    const updatedTodoList = [...todoList];
    updatedTodoList[categoryIndex].tasks[taskIndex].checked =
      !updatedTodoList[categoryIndex].tasks[taskIndex].checked;
    setTodoList(updatedTodoList);
  };

  return (
    <>
      {showModal && (
        <dialog className="modal bg-secondary" open>
          <form method="dialog" className="modal-box" onSubmit={handleCloseModal}>
            <h3 className="font-bold text-lg">Enter your username!</h3>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs my-4" onChange={(e) => setUsername(e.target.value)}/>
            <div className="modal-action">
              <button className="btn">
                Close
              </button>
            </div>
          </form>
        </dialog>
      )}

      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <a className="btn btn-ghost normal-case text-xl">Dashboard</a>
        </div>
        <div className="navbar-end">
          <button className="btn btn-outline" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="flex justify-center">
        <p className="text-3xl mt-5 mb-3">Hello{" "}{username}</p>
      </div>

      <div className="flex justify-center">
        <div className="container w-96">
          {todoList.map((item, categoryIndex) => (
            <div
              className="collapse collapse-plus bg-base-200 mb-3"
              key={categoryIndex}
            >
              <input type="checkbox" name={`my-accordion-${categoryIndex}`} />
              <div className={`collapse-title font-bold text-${item.color}`}>
                {item.category}
              </div>
              <div className="collapse-content my-1">
                {item.tasks.map((task, taskIndex) => (
                  <div
                    key={taskIndex}
                    className="form-control flex items-start"
                  >
                    <label className="label cursor-pointer">
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={task.checked}
                        onChange={() =>
                          handleTaskCheckboxChange(categoryIndex, taskIndex)
                        }
                      />
                      <span
                        className={`label-text ml-2 text-${item.color}`}
                        style={{
                          textDecoration: task.checked
                            ? "line-through"
                            : "none",
                        }}
                      >
                        {task.task}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
