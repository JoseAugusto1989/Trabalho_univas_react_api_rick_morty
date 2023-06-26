import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Container, Pagination } from "react-bootstrap";
import Navbar from "./components/Navbar";
import 'bootstrap/dist/css/bootstrap.css';

import CharacterList from "./components/CharacterList";

function App() {
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState({});
  const url = "https://rickandmortyapi.com/api/character";

  const fetchCharacters = (url) => {
    axios
      .get(url)
      .then((data) => {
        setCharacters(data.data.results);
        setInfo(data.data.info);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleNextPage = () => {
    fetchCharacters(info.next);
    window.scrollTo(0, 0);
  };

  const handlePreviousPage = () => {
    fetchCharacters(info.prev);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    fetchCharacters(url);
  }, []);

  return (
    <>
      <Navbar brand="Rick and Morty App" />

      <Container className="py-5">
        <Pagination className="justify-content-center">
          {info.prev && (
            <Pagination.Item>
              <Button variant="link" onClick={handlePreviousPage}>
                Anterior
              </Button>
            </Pagination.Item>
          )}
          {info.next && (
            <Pagination.Item>
              <Button variant="link" onClick={handleNextPage}>
                Próximo
              </Button>
            </Pagination.Item>
          )}
        </Pagination>
      </Container>

      <CharacterList characters={characters} />

      <Container className="pb-5">
        <Pagination className="justify-content-center">
          {info.prev && (
            <Pagination.Item>
              <Button variant="link" className="page-link" onClick={handlePreviousPage}>
                Anterior
              </Button>
            </Pagination.Item>
          )}
          {info.next && (
            <Pagination.Item>
              <Button variant="link" className="page-link" onClick={handleNextPage}>
                Próximo
              </Button>
            </Pagination.Item>
          )}
        </Pagination>
      </Container>
    </>
  );
}

export default App;
