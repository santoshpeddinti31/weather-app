import "./App.css";
import { useEffect, useState } from "react";
import Weather from "./Weather";
import { Dimmer, Loader } from "semantic-ui-react";

function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);
  let REACT_APP_API_URL = "https://api.openweathermap.org/data/2.5";
  let REACT_APP_API_KEY = "6f7dcb1aab11555b39be629b9b129c47";
  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      await fetch(
        `${REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${REACT_APP_API_KEY}`
      )
        .then((res) => res.json())
        .then((result) => {
          setData(result);
          console.log(result);
        });
    };
    fetchData();
  });
  return (
    <div className="App">
      {typeof data.main != "undefined" ? (
        <Weather weatherData={data} />
      ) : (
        <div>
          <Dimmer active>
            <Loader>Loading..</Loader>
          </Dimmer>
        </div>
      )}
    </div>
  );
}
export default App;
