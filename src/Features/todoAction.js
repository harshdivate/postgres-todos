import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:4500",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": true,
  },
});

export const postTodo = async (
  title,
  description,
  date,
  userId,
  status = "incomplete"
) => {
  try {
    const data = await instance.post(
      "/api/v1/todo/inserttodo",
      title,
      description,
      date,
      userId,
      status
    );
    console.log(data.status);

    if (data.status == "200") {
      return true;
    }
  } catch (err) {
    console.log(err);
  }
};
