import "./App.css";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function App() {
  const [form, setForm] = useState(true);
  const [submit, setSubmit] = useState(false);
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");

  const { handleSubmit, register } = useForm();

  useEffect(() => {
    if (first) {
      if (last) setSubmit(true);
    } else {
      setSubmit(false);
    }
  }, [first]);
  useEffect(() => {
    if (last) {
      if (first) setSubmit(true);
    } else {
      setSubmit(false);
    }
  }, [last]);

  function onSubmitNameForm(data) {
    console.log(data.firstName);
    console.log(data.lastName);
  }

  return (
    <>
      <div className="container">
        <div className="name">
          <form onSubmit={handleSubmit(onSubmitNameForm)} className="nameForm">
            <br />

            <p className="firstName">First Name</p>

            <input
              {...register("firstName")}
              onChange={(e) => setFirst(e.target.value)}
              type="text"
              className="inputFirst"
              placeholder="First Name"
            />
            <br />
            <br />
            <p className="lastName">Last Name</p>
            <input
              {...register("lastName")}
              onChange={(e) => setLast(e.target.value)}
              type="text"
              className="inputLast"
              placeholder="Last Name"
            />
            <br />
            <br />
            <br />
            <button className="nameSubmit" disabled={!submit}>
              Next
            </button>
          </form>
        </div>
        <div className="wheels"></div>
        <div className="type"></div>
        <div className="model"></div>
        <div className="date"></div>
      </div>
    </>
  );
}

export default App;
