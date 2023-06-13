import axios from "axios";
import { useEffect } from "react";
import { useState } from "react"
import { Card } from "../components/card/Card";
import { InputGroup } from "../components/filter/category/InputGroup";


export const Episodes = () => {
  const [result, setResult] = useState([]);
  const [info, setInfo] = useState([]);
  const { air_date, episode, name } = info;
  const [id, setId] = useState(1);
  const api = `https://rickandmortyapi.com/api/episode/${id}`;
  
  useEffect(() => {
    (async function () {
      let response = await axios.get(api);
      let data = response.data;
      setInfo(data);
  
      let promises = data.characters.map((x) => axios.get(x));
      let results = await Promise.all(promises);
      let resultsData = results.map((res) => res.data);
      setResult(resultsData);
    })();
  }, [api]);
  
  return (
    <div className="container">
    <div className="row mb-3">
      <h1 className="text-center mb-3">
        Episode name :{" "}
        <span className="text-primary">{name === "" ? "Unknown" : name}</span>
      </h1>
      <h5 className="text-center">
        Air Date: {air_date === "" ? "Unknown" : air_date}
      </h5>
    </div>
    <div className="row">
      <div className="col-lg-3 col-12 mb-4">
        <h4 className="text-center mb-4">Pick Episode</h4>
        <InputGroup name="Episode" changeID={setId} total={51} />
      </div>
      <div className="col-lg-8 col-12">
        <div className="row">
          <Card page="/episodes/" results={result} />
        </div>
      </div>
    </div>
  </div>
  )
}