import React, { useEffect, useState, useRef } from "react";
import Navbar from "./Navbar/Navbar.jsx";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CookiesProvider, useCookies, Cookies } from "react-cookie";
import { setInitialState } from "./Features/authSlice.js";
import useTodoDummy from "./useDummyTodos.js";
import AddTodoForm from "./components/AddTodoFrom/AddTodoForm.jsx";
import {
  getTodosOfUser,
  deleteTodo,
  updateStatusOfTodo,
} from "./Features/todoAction.js";

function getStatusColor(status) {
  switch (status) {
    case "completed":
      return "#4caf50"; // Green color for completed
    case "ongoing":
      return "#ffeb3b"; // Yellow color for ongoing
    case "incomplete":
      return "#f44336"; // Red color for incomplete
    default:
      return "#e0e0e0"; // Default color
  }
}

function Home() {
  const navigate = useNavigate();
  const { todos } = useSelector((state) => state.todo);
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo.id;
  const [firstLoad, setFirstLoad] = useState(true);
  const fir = useRef(true);
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(["accessToken"]);
  const [trigger, setTrigger] = useState(false);
  const [t, setT] = useState(todos);

  useEffect(() => {
    const accessToken = cookies.accessToken;
    if (!accessToken) {
      dispatch(setInitialState());
      navigate("/login");
    } else {
      if (userId) {
        const getTodoOfUser = async (userId) => {
          console.log(todos);
          dispatch(getTodosOfUser({ id: userId }));
        };
        getTodoOfUser(userId);
      }
    }
  }, []);
  const handleTodoStatusChange = (event, todoId) => {
    dispatch(
      updateStatusOfTodo({ option: event.target.value, todoId: todoId })
    );
  };
  const performDeletTodo = (id) => {
    dispatch(deleteTodo({ userId: userId, todoId: id }));
  };
  return (
    <div className="home-container">
      <Navbar />
      {/* Grid system  */}
      <div className="addTodoButton">
        <button onClick={(e) => setTrigger(true)}>Add Todo</button>
        <AddTodoForm trigger={trigger} setTrigger={setTrigger} />
      </div>
      <div></div>
      <div className="grid-container">
        {/* Individual Todo */}
        {todos.length > 0 &&
          todos.map((e, index) => (
            <div key={`${e.id}`} className="todo-main">
              <div>{e.title}</div>
              <div className="todo-description ">{e.description}</div>
              <div>{e.date}</div>

              <div className="todo-footer">
                <div className="todo-container">
                  <select
                    defaultValue={e.status}
                    disabled={e.status === "completed"}
                    onChange={(event) => handleTodoStatusChange(event, e.id)}
                    className="todo-dropdown"
                    style={{ backgroundColor: getStatusColor(e.status) }}
                  >
                    <option value="DEFAULT" disabled>
                      Choose ...
                    </option>
                    <option value={"completed"}>Completed</option>
                    <option value={"ongoing"}>Ongoing</option>
                    <option value={"incomplete"}>Incomplete</option>
                  </select>
                </div>
                {/* <div className="todo-options"> */}
                <div>
                  <img
                    id="bin-img"
                    src="./public/bin.png"
                    onClick={() => performDeletTodo(e.id)}
                  />
                </div>
                <div>{"M"}</div>
                {/* </div> */}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
