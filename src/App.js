import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import callApi from "./actions/callApi";

function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    callApi()
      .then(({ success, data }) => {
        console.log("data ", data);
        if (success) {
          //setProducts(data);
          setLoaded(true);
        } else console.log("Sucedio un error");
      })
      .catch((e) => console.log(e));
  }, []);

  const options = [
    {
      name: "Select…",
      value: null,
    },
    {
      name: "bitcoin",
      value: "bitcoin",
    },
    {
      name: "dolar",
      value: "dolar",
    },
    {
      name: "euro",
      value: "euro",
    },
  ];

  const [rut, setRut] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [moneda, setMoneda] = useState(options[0].value);
  const formRef = useRef(null);
  const [valorActual, setValorActual] = useState(0);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState([]);
  const [formSuccess, setFormSuccess] = useState(false);

  const [formInfo, setFormInfo] = useState({
    rut: "",
    nombre: "",
    apellido: "",
    email: "",
    cantidad: "",
  });

  const showError = (errores) => {
    formRef.current
      .querySelectorAll(`[data-error-de]`)
      .forEach((span) => (span.innerText = ""));
    errores.forEach((err) => {
      const { location, msg } = err;
      const span = formRef.current.querySelector(
        `[data-error-de="${location}"]`
      );

      span.innerText = msg;
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setFormSuccess(true);
    axios
      .get("https://mindicador.cl/api", {})
      .then((res) => {
        console.log("res.data: ", res.data);
        // const result = res.data.mensaje;
        // setValorActual(res.data.moneda.valor)
        //console.log("res.data.moneda.valor: ", res.data.moneda.valor);
        const bitcoin = res.data.bitcoin.valor;
        const dolar = res.data.dolar.valor;
        const euro = res.data.euro.valor;

        console.log("moneda: ", moneda);

        if (moneda == "dolar") {
          setValorActual(dolar);
        } else if (moneda == "euro") {
          setValorActual(euro);
        } else if (moneda == "bitcoin") {
          setValorActual(bitcoin*dolar);
        }

        //setMessage(result);
        // formRef.current.style.display = "none";
        if (res.status == 200) {
          alert("sucess");
        }
      })
      .catch((err) => console.log(err));
  };

  const getFormData = (target) => {
    const form = target.closest("form");
    const formData = new FormData(form);
    const data = {};
    for (let [key, value] of formData.entries()) data[key] = value;
    return data;
  };

  const onChange = (e) => {
    e.preventDefault();
    const data = getFormData(e.target);
    setFormInfo(data);
    // const { errores } = verify(data);
    //showError(errores);
  };

  const handleChange = (event) => {
    event.preventDefault();
    setMoneda(event.target.value);
  };

  return (
    <>
      <h1
        className="h1"
        style={{ display: "flex", justifyContent: "center", padding: "20px" }}
      >
        Valores de Entrada
      </h1>
      <form
        onSubmit={onSubmitHandler}
        ref={formRef}
        onChange={onChange}
        className="table-style"
      >
        <table className="addPetForm-style">
          <tbody>
            <tr>
              <td className="addPettd-style">
                <label htmlFor="rut">Rut: </label>
              </td>
              <td>
                <input
                  id="rut"
                  type="text"
                  name="rut"
                  placeholder="Ingresa rut"
                  onChange={(e) => setRut(e.target.value)}
                />
              </td>
              <td>
                <span data-error-de="rut" className="errorSentence"></span>
              </td>
            </tr>
            <tr>
              <td className="addPettd-style">
                <label htmlFor="type">Nombre: </label>
              </td>
              <td>
                <input
                  id="nombre"
                  type="text"
                  name="nombre"
                  placeholder="Ingresa nombre"
                  onChange={(e) => setNombre(e.target.value)}
                />
              </td>
              <td>
                <span data-error-de="nombre" className="errorSentence"></span>
              </td>
            </tr>
            <tr>
              <td className="addPettd-style">
                <label htmlFor="apellido">Apellido:</label>
              </td>
              <td>
                <input
                  id="apellido"
                  type="text"
                  name="apellido"
                  placeholder="Ingresa apellido"
                  onChange={(e) => setApellido(e.target.value)}
                />
              </td>
              <td>
                <span data-error-de="apellido" className="errorSentence"></span>
              </td>
            </tr>
            <tr>
              <td className="addPettd-style">
                <label htmlFor="email">Correo: </label>
              </td>
              <td>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Ingresa tu correo"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </td>
              <td>
                <span data-error-de="email" className="errorSentence"></span>
              </td>
            </tr>
            <tr>
              <td className="addPettd-style">
                <label htmlFor="cantidad">Monedas a cambiar: </label>
              </td>
              <td>
                <input
                  id="cantidad"
                  type="number"
                  name="cantidad"
                  placeholder="Ingresa cantidad"
                  onChange={(e) => setCantidad(e.target.value)}
                />
              </td>
              <td>
                <span data-error-de="cantidad" className="errorSentence"></span>
              </td>
            </tr>
            <tr>
              <td className="addPettd-style">
                <label htmlFor="moneda">Monedas disponible: </label>
              </td>
              <td>
                <select onChange={handleChange} value={moneda}>
                  {options.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <span data-error-de="cantidad" className="errorSentence"></span>
              </td>
            </tr>
          </tbody>
        </table>
        <input
          type="submit"
          value="Guardar"
          className="btn btn-outline-primary"
        />
      </form>

      <table className="addPetForm-style">
        <tbody>
          <tr>
            <td className="addPettd-style">
              <label htmlFor="rut">Rut: </label>
            </td>
            <td>{rut}</td>
            <td>
              <span data-error-de="rut" className="errorSentence"></span>
            </td>
          </tr>
          <tr>
            <td className="addPettd-style">
              <label htmlFor="type">Nombre: </label>
            </td>
            <td>{nombre}</td>
            <td>
              <span data-error-de="nombre" className="errorSentence"></span>
            </td>
          </tr>
          <tr>
            <td className="addPettd-style">
              <label htmlFor="apellido">Apellido:</label>
            </td>
            <td>{apellido}</td>
            <td>
              <span data-error-de="apellido" className="errorSentence"></span>
            </td>
          </tr>
          <tr>
            <td className="addPettd-style">
              <label htmlFor="email">Correo: </label>
            </td>
            <td>{email}</td>
            <td>
              <span data-error-de="email" className="errorSentence"></span>
            </td>
          </tr>
          <tr>
            <td className="addPettd-style">
              <label htmlFor="totalenpesos">Total en pesos: </label>
            </td>
            <td>{cantidad * valorActual}</td>
            <td>
              <span
                data-error-de="totalenpesos"
                className="errorSentence"
              ></span>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="align-text">{message}</div>
    </>
  );
}

export default App;
