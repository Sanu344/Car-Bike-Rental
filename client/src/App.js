import "./App.css";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import DateRangePicker from "rsuite/DateRangePicker";
import "rsuite/DateRangePicker/styles/index.css";
let model = ["A", "B", "C", "D", "E"];
let vehicles = ["a", "b", "c", "d", "e", "f", "g"];
function App() {
  const [form, setForm] = useState(true);
  const [wheels, setWheels] = useState(false);
  const [vehicleType, setVehicleType] = useState(false);
  const [models, setModels] = useState(false);
  const [datePicker, setDatePicker] = useState(false);
  const [w, setW] = useState();
  const [type, setType] = useState();
  const [vehicle, setVehicle] = useState();
  const [submit, setSubmit] = useState(false);
  const [submitWheel, setSubmitWheel] = useState(false);
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [disableDate, setDisableDate] = useState(false);
  const [disableSubmitType, setDisableSubmitType] = useState(false);
  const [modelSubmitType, setModelSubmitType] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [vlist, setVlist] = useState([]);
  const [modelList, setModalList] = useState([]);
  const { handleSubmit, register } = useForm();

  useEffect(() => {
    fetch("http://localhost:3030/api/list")
      .then((data) => data.json())
      .then((response) => {
        console.table(response);
        localStorage.setItem(
          "carTypeList",
          JSON.stringify(response.carTypesList)
        );
        localStorage.setItem(
          "bikeTypeList",
          JSON.stringify(response.bikeTypeList)
        );
        localStorage.setItem(
          "vehicleList",
          JSON.stringify(response.vehicleList)
        );
        localStorage.setItem(
          "bookedVehicles",
          JSON.stringify(response.bookedVehicles)
        );
      });
  }, []);

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
    const name = data.firstName + " " + data.lastName;
    localStorage.setItem("name", JSON.stringify(name));
    setForm(false);
    setWheels(true);
  }

  function onWheelsRadio(data) {
    const wh = w;
    localStorage.setItem("wheels", JSON.stringify(wh));
    if (w === 2) {
      setVlist(JSON.parse(localStorage.getItem("bikeTypeList")));
    } else {
      setVlist(JSON.parse(localStorage.getItem("carTypeList")));
    }

    setWheels(false);
    setVehicleType(true);
  }

  function onSelectType() {
    const t = type;
    localStorage.setItem("type", JSON.stringify(t));
    const unfilterdList = JSON.parse(localStorage.getItem("vehicleList"));
    if (unfilterdList) {
      const wh = JSON.parse(localStorage.getItem("wheels"));
      if (wh === 2) {
        const filtered = unfilterdList.filter((e) => e.bikeType === t);
        if (filtered) setModalList(filtered.map((e) => e.vehicles));
        console.log(filtered.map((e) => e.vehicles));
      } else {
        const filtered = unfilterdList.filter((e) => e.carType === t);
        if (filtered) setModalList(filtered.map((e) => e.vehicle));
        console.log(filtered.map((e) => e.vehicle));
      }
    }
    setVehicleType(false);
    setModels(true);
  }
  function onSelectVehicle() {
    const v = vehicle.toUpperCase();
    localStorage.setItem("vehicle", JSON.stringify(v));

    setModels(false);
    setDatePicker(true);
  }

  const Label = (props) => {
    return <label style={{ display: "block", marginTop: 10 }} {...props} />;
  };

  function isWithinRange(date, startDate, endDate) {
    return date >= startDate && date <= endDate;
  }

  function handleDateRangeChange(d) {
    if (d) {
      setSelectedStartDate(d[0]);
      setSelectedEndDate(d[1]);
      localStorage.setItem("startDate", JSON.stringify(d[0]));
      localStorage.setItem("endDate", JSON.stringify(d[1]));
      setDisableDate(true);
    } else {
      setDisableDate(false);
      localStorage.removeItem("startDate");
      localStorage.removeItem("endDate");
    }
  }

  function handleDataSubmit() {
    const body = {
      wheels: JSON.parse(localStorage.getItem("wheels")),
      vehicle: JSON.parse(localStorage.getItem("vehicle")),
      minDate: JSON.parse(localStorage.getItem("startDate")),
      maxDate: JSON.parse(localStorage.getItem("endDate")),
      user: JSON.parse(localStorage.getItem("name")),
    };
    console.table(body);
  }

  return (
    <>
      <div className="container">
        {form && (
          <div className="name">
            <form
              onSubmit={handleSubmit(onSubmitNameForm)}
              className="nameForm"
            >
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
              <button type="submit" className="nameSubmit" disabled={!submit}>
                Next
              </button>
            </form>
          </div>
        )}
        {wheels && (
          <div className="wheels">
            <form onSubmit={handleSubmit(onWheelsRadio)} className="wheelForm">
              <br />
              <br />
              <label>Number of wheels:</label>
              <br />
              <br />
              <input
                type="radio"
                id="twoWheels"
                name="wheels"
                value="2"
                onChange={() => {
                  setSubmitWheel(true);
                  setW(2);
                }}
              />
              <label htmlFor="twoWheels">2</label>
              <br />
              <br />

              <input
                type="radio"
                id="fourWheels"
                name="wheels"
                value="4"
                onChange={() => {
                  setSubmitWheel(true);
                  setW(4);
                }}
              />
              <label htmlFor="fourWheels">4</label>
              <br />
              <br />

              <button
                type="submit"
                className="nameSubmit"
                disabled={!submitWheel}
              >
                Next
              </button>
            </form>
          </div>
        )}
        {vehicleType && (
          <div className="type">
            <form onSubmit={handleSubmit(onSelectType)} className="vehicleType">
              <br />
              <label>Vehicle Type</label>
              <br />
              <div className="insideType">
                {vlist.map((e) => {
                  return (
                    <div key={"div" + e}>
                      <br key={"linebreak1" + e} />
                      <input
                        type="radio"
                        id={e}
                        name="vehicleType"
                        value={e}
                        key={e}
                        onChange={() => {
                          setType(e);
                          setDisableSubmitType(true);
                        }}
                      />
                      <label htmlFor={e} key={"label" + e}>
                        {e}
                      </label>
                      <br key={"linebreak2" + e} />
                    </div>
                  );
                })}
              </div>
              <button disabled={!disableSubmitType} className="typeSubmit">
                Next
              </button>
            </form>
          </div>
        )}
        {models && (
          <div className="model">
            <form
              onSubmit={handleSubmit(onSelectVehicle)}
              className="vehicleType"
            >
              <br />
              <label>Vehicles Available</label>
              <br />
              <div className="insideType">
                {modelList.map((e) => {
                  return (
                    <div key={"div" + e}>
                      <br key={"linebreak1" + e} />
                      <input
                        type="radio"
                        id={e}
                        name="models"
                        value={e}
                        key={e}
                        onChange={() => {
                          setVehicle(e);
                          setModelSubmitType(true);
                        }}
                      />
                      <label key={"label" + e}>{e}</label>
                      <br key={"linebreak2" + e} />
                    </div>
                  );
                })}
              </div>
              <button disabled={!modelSubmitType} className="typeSubmit">
                Next
              </button>
            </form>
          </div>
        )}
        {datePicker && (
          <div className="date">
            <br />
            <label>Select Date Range</label>
            <br />
            <DateRangePicker
              onChange={handleDateRangeChange}
              shouldDisableDate={(date) => {
                const startDates = [
                  new Date(),
                  new Date(2024, 5, 1),
                  new Date(2024, 7, 1),
                ];

                const endDates = [
                  new Date(),
                  new Date(2024, 5, 7),
                  new Date(2024, 7, 7),
                ];

                for (let i = 0; i < startDates.length; i++) {
                  if (isWithinRange(date, startDates[i], endDates[i])) {
                    return true;
                  }
                }

                return false;
              }}
            />
            <button
              disabled={!disableDate}
              onClick={handleDataSubmit}
              className="date"
            >
              Book Vehicle
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
