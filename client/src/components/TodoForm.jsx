import { React, useState } from "react";
import axios from "axios";

const TodoForm = (props) => {
  const [form, setForm] = useState({
    name: "",
    isComplete: false,
  });

  const [errors, setErrors] = useState(null);

  const onChangeHandler = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const formReset = () => {
    setForm({
      name: "",
      isComplete: false,
    });
  };

  const formHandler = async e => {
    e.preventDefault();
  
    try {
      const addItem = await axios.post(
        "https://localhost:7191/api/todoitems", // Correct backend API URL
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      props.triggerUpdate();
  
      formReset();
  
      setErrors(null);
  
      console.log("success");
    } catch (err) {
      setErrors(err.response.data.errors?.Name);
      console.log("fail");
    }
  };
  

  return (
    <div>
        <h2>Add a Task</h2>
        <form onSubmit={formHandler}>
            <div>
                <label htmlFor="name">Task Name:</label>
                <input type="text" name="name" onChange={onChangeHandler} value={form.name} />
                <div>
                    {errors ? <span className="text-danger">{errors}</span> : ""}
                </div>
            </div>
            <div>
                <input type="submit" value="Add Task" />
            </div>
        </form>
    </div>
  )
};

export default TodoForm;
