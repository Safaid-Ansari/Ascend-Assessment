import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "../styles/SignUp.css";
function Task() {
  const [taskDescription, setTaskDescription] = useState("");
  const [listId, setListId] = useState("");
  const navigate = useNavigate();

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  // Handling the email change
  const handletaskDescription = (e) => {
    setTaskDescription(e.target.value);
    console.log(e.target.value);
    setSubmitted(false);
  };

  // Handling the password change
  const handlelistId = (e) => {
    setListId(e.target.value);
    console.log(e.target.value);
    setSubmitted(false);
  };

  // Handling the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!(taskDescription && listId)) {
      setError(true);
    } else {
      let data = { taskDescription, listId };
      console.log(data);
      let result = await fetch("http://localhost:3000/task/create", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      result = await result.json();
      console.log(result);
      setSubmitted(true);
      setError(false);
      navigate("/");
    }
  };

  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <h1 style={{ marginLeft: "95px" }}>User successfully Login!!</h1>
      </div>
    );
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <h1 style={{ marginLeft: "95px" }}>Please enter all the fields</h1>
      </div>
    );
  };

  return (
    <div
      className="form"
      style={{
        height: "40%",
        top: "33%",
        left: "33%",
      }}
    >
      <div>
        <h1 className="heading" style={{ marginLeft: "11rem" }}>
          Task Management
        </h1>
      </div>

      {/* Calling to the methods */}
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>

      <form>
        <label className="label">Task Description</label>
        <input
          onChange={handletaskDescription}
          className="input"
          placeholder="Enter Task here..."
          value={taskDescription}
          type="text"
        />
        <label className="label">ListId</label>
        <input
          onChange={handlelistId}
          className="input"
          placeholder="Enter ListId here..."
          value={listId}
          type="text"
        />

        <button onClick={handleSubmit} className="btn" type="submit">
          Add Task
        </button>
      </form>
    </div>
  );
}

export default Task;
