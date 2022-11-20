import { useState } from "react";

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import api from "./api";
import "./App.css";

function App() {
  const [lance, setLance] = useState(0);
  const [isOpenList, setIsOpenList] = useState(false);
  const [list, setList] = useState([]);
  const [menor, setMenor] = useState(0);

  async function onSubmit(event) {
    event.preventDefault();
   
    api
      .get(`/add/${lance}`)
      .then((response) => toast.success("Lance Enviado!"))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }

  async function handleListNumber(event) {
    setIsOpenList(true);
    api
      .get("/list")
      .then((response) => {
        const data = response.data;
        setList([...data.lances]);
        setMenor(data.menor);
        console.log("response", response);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }

  return (
    <div className="App">
         <ToastContainer />
      {!isOpenList ? (
        <section className="section-main">
          <h1>Servidor do lance mínimo</h1>

          <div className="section-main-form">
            <form>
              <div className="section-main-form-div">
                <label>Faça seu lance:</label>
                <input
                  className="input-name"
                  type="text"
                  value={lance}
                  onChange={(event) => setLance(event.target.value)}
                />
                <br />
                <br />
              </div>
              <button
                className="submit"
                type="submit"
                onClick={(event) => onSubmit(event)}
              >
                Enviar
              </button>
            </form>
            <div className="results">
              <button onClick={handleListNumber}>
                Confira os resultados ->
              </button>
            </div>
          </div>
        </section>
      ) : (
        <section className="section-main">
          <label className="title-list" for="lance">
            Lista de jogadas:
          </label>
          <ul className="listNumbers">
            {list.map((numberList) => {
              return <li>{numberList}</li>;
            })}
          </ul>
          <div className="title-list-sub">
            <label className="unic" for="lance">
              Menor único:{" "}
            </label>
            <p>{menor}</p>
          </div>
          <div className="results">
            <button onClick={() => setIsOpenList(false)}>
              ---- Novo lance ----{" "}
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
