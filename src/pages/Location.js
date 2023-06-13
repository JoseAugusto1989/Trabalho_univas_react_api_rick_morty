import axios from "axios";
import { useEffect, useState } from "react"
import { Card } from "../components/card/Card";
import { InputGroup } from "../components/filter/category/InputGroup";


export const Location = () => {
  const [result, setResult] = useState([]);
  const [info, setInfo] = useState([]);
  const [number, setNumber] = useState(1);
  const { dimension, type, name } = info;
  const api = `https://rickandmortyapi.com/api/location/${number}`;

  useEffect(() => {
    (async function () {
      let response = await axios.get(api);
      let data = response.data;
      setInfo(data);
  
      let promises = data.residents.map((x) => axios.get(x));
      let results = await Promise.all(promises);
      let resultsData = results.map((res) => res.data);
      setResult(resultsData);
    })();
  }, [api]);

  return (
    <div className="container">
    <div className="row mb-3">
      <h1 className="text-center mb-3">
        Location :
        <span className="text-primary">
          {" "}
          {name === "" ? "Unknown" : name}
        </span>
      </h1>
      <h5 className="text-center">
        Dimension: {dimension === "" ? "Unknown" : dimension}
      </h5>
      <h6 className="text-center">Type: {type === "" ? "Unknown" : type}</h6>
    </div>
    <div className="row">
      <div className="col-lg-3 col-12 mb-4">
        <h4 className="text-center mb-4">Pick Location</h4>
        <InputGroup name="Location" changeID={setNumber} total={126} />
      </div>
      <div className="col-lg-8 col-12">
        <div className="row">
          <Card page="/location/" results={result} />
        </div>
      </div>
    </div>
  </div>
  )
}