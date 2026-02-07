import { FaRegClipboard as IconCopia } from "react-icons/fa6";
import { FaClipboardCheck as IconPasswordCopiado } from "react-icons/fa";
import { use, useState, useSyncExternalStore } from "react";

export default function PasswordGenerator() {
  const numeroRandom = Math.trunc(Math.random() * 26);
  const abecedario = "abcdefghijklmnopqrstuvwxyz";
  const mayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const caracteresEspeciales = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
  const [password, setPassword] = useState("");
  const [estadoLetras, setEstadoLetras] = useState(false);
  const [estadoNumeros, setEstadoNumeros] = useState(false);
  const [estadoMayusculas, setEstadoMayusculas] = useState(false);
  const [estadoCaracEsp, setEstadoCaraEsp] = useState(false);
  const [cantidadLongitud, setCantidadLongitud] = useState(4);
  const [copiado, setCopiado] = useState("");

  const handleLetras = (e) => {
    // esto es para obtener el value y setEstadoLetras es para enviar a value para 'estadoLetras'
    const checkLetras = e.target.checked;
    setEstadoLetras(checkLetras);
  };

  const handleNumeros = (e) => {
    const checkNumeros = e.target.checked;
    setEstadoNumeros(checkNumeros);
  };

  const handleMayusculas = (e) => {
    const checkMayusculas = e.target.checked;
    setEstadoMayusculas(checkMayusculas);
  };

  const handleCaracterEspecial = (e) => {
    const checkCaracEsp = e.target.checked;
    setEstadoCaraEsp(checkCaracEsp);
  };

  const handleCantidadLongitud = (e) => {
    const n = e.target.value;
    setCantidadLongitud(n);
  };

  //accion de boton
  const btnGenerarPass = () => {
    const arr = ["Letras", "Numeros", "Mayusculas", "CaracEsp"];
    const numerosLista = "0123456789";
    //Guardar los valores de los checkboxs
    let valoresCheckbox = {
      Letras: estadoLetras,
      Numeros: estadoNumeros,
      Mayusculas: estadoMayusculas,
      CaracEsp: estadoCaracEsp,
    };

    let valoresCaracteres = {
      Letras: abecedario,
      Numeros: numerosLista,
      Mayusculas: mayusculas,
      CaracEsp: caracteresEspeciales,
    };
    //almacena los caracteres que será la contraseña
    let c = [];
    //arr.length = 4
    for (let i = 0; i < arr.length; i++) {
      if (valoresCheckbox[arr[i]] == true) {
        for (let x = 0; x < cantidadLongitud; x++) {
          const caracteresPosibles = valoresCaracteres[arr[i]];
          const indiceAzar = Math.trunc(
            Math.random() * caracteresPosibles.length,
          );

          c.push(caracteresPosibles[indiceAzar]);
        }
      }
    }
    c.sort(() => Math.trunc(Math.random() - 0.5));

    if (c.length > cantidadLongitud) {
      c = c.splice(0, cantidadLongitud);
    }

    const contieneCEspecial = c.some((caracter) =>
      caracteresEspeciales.includes(caracter),
    );
    const contieneMayusculas = c.some((caracter) =>
      mayusculas.includes(caracter),
    );
    const contieneNumeros = c.some((caracter) =>
      "0123456789".includes(caracter),
    );
    const contieneLetras = c.some((caracter) => abecedario.includes(caracter));

    let cantidadLetras = 0;
    let cantidadMayus = 0;
    let cantidadNumeros = 0;
    let cantidadEspeciales = 0;

    // Corregimos a: cant++
    for (let cant = 0; cant < c.length; cant++) {
      // Usamos .includes() sobre el abecedario completo, pasándole el caracter de la contraseña
      if (abecedario.includes(c[cant])) {
        cantidadLetras++;
      } else if (mayusculas.includes(c[cant])) {
        cantidadMayus++;
      } else if ("0123456789".includes(c[cant])) {
        cantidadNumeros++;
      } else if (caracteresEspeciales.includes(c[cant])) {
        cantidadEspeciales++;
      }
    }

    const cantidadMayor = Math.max(
      cantidadLetras,
      cantidadMayus,
      cantidadNumeros,
      cantidadEspeciales,
    );

    if (cantidadMayor === cantidadLetras) {
      let ultimoElemento = c.findLastIndex((char) => abecedario.includes(char));

      if (estadoMayusculas && !contieneMayusculas) {
        c[ultimoElemento] =
          mayusculas[Math.trunc(Math.random() * mayusculas.length)];
      }
      if (estadoCaracEsp && !contieneCEspecial) {
        c[c.findLastIndex((char) => abecedario.includes(char))] =
          caracteresEspeciales[
            Math.trunc(Math.random() * caracteresEspeciales.length)
          ];
      }
      if (estadoNumeros && !contieneNumeros) {
        c[c.findLastIndex((char) => abecedario.includes(char))] = Math.trunc(
          Math.random() * 10,
        );
      }
      c.sort(() => Math.trunc(Math.random() - 0.5));
    }
    if (cantidadMayor == cantidadNumeros) {
      console.log("dentor de if de numero");
      if (estadoLetras && !contieneLetras) {
        c[c.findLastIndex((char) => "0123456789".includes(char))] =
          abecedario[Math.trunc(Math.random() * abecedario.length)];
        console.log("numeros - estado de letras");
      }
      if (estadoMayusculas && !contieneMayusculas) {
        c[c.findLastIndex((char) => "0123456789".includes(char))] =
          mayusculas[Math.trunc(Math.random() * mayusculas.length)];
        console.log("numeros - estado de mayusculas");
      }
      if (estadoCaracEsp && !contieneCEspecial) {
        c[c.findLastIndex((char) => "0123456789".includes(char))] =
          caracteresEspeciales[
            Math.trunc(Math.random() * caracteresEspeciales.length)
          ];
        console.log("numeros - estado de caracteres");
      }
    }
    if (cantidadMayor == cantidadMayus) {
      if (estadoLetras && !contieneLetras) {
        c[c.findLastIndex((char) => mayusculas.includes(char))] =
          abecedario[Math.trunc(Math.random() * abecedario.length)];
        console.log("numeros - estado de letras");
      }
      if (estadoNumeros && !contieneNumeros) {
        c[c.findLastIndex((char) => mayusculas.includes(char))] = Math.trunc(
          Math.random() * 10,
        );
      }
      if (estadoCaracEsp && !contieneCEspecial) {
        c[c.findLastIndex((char) => mayusculas.includes(char))] =
          caracteresEspeciales[
            Math.trunc(Math.random() * caracteresEspeciales.length)
          ];
      }
    }
    if (cantidadMayor == cantidadEspeciales) {
      if (estadoLetras && !contieneLetras) {
        c[c.findLastIndex((char) => "0123456789".includes(char))] =
          abecedario[Math.trunc(Math.random() * abecedario.length)];
        console.log("numeros - estado de letras");
      }
      if (estadoNumeros && !contieneNumeros) {
        c[c.findLastIndex((char) => abecedario.includes(char))] = Math.trunc(
          Math.random() * 10,
        );
      }
      if (estadoMayusculas && !contieneMayusculas) {
        c[c.findLastIndex((char) => "0123456789".includes(char))] =
          mayusculas[Math.trunc(Math.random() * mayusculas.length)];
        console.log("numeros - estado de mayusculas");
      }
    }

    //desordenar de nuevo
    c = c.sort(() => Math.random() - 0.5).join("");

    setPassword(c);
  };

  const colorCaracter = (pass) => {
    if ("0123456789".includes(pass)) return "text-orange-500";
    if (mayusculas.includes(pass)) return "text-green-500";
    if (caracteresEspeciales.includes(pass)) return "text-red-500";
  };

  const copiarPassowrd = () => {
    navigator.clipboard.writeText(password);
    setCopiado(true);

    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-900">
      <div className="w-full max-w-md md:w-95">
        <h1 className="text-red-400 text-2xl font-bold mb-4 text-center">
          Password Generator
        </h1>

        <div className="bg-gray-800 flex flex-col rounded-xl p-5 shadow-lg">
          <div className="p-4 flex justify-center items-center bg-gray-700 rounded-lg mb-4">
            <span className="flex-grow text-center font-mono text-white break-all">
              {(password &&
                password.split("").map((caracter, index) => (
                  <span key={index} className={colorCaracter(caracter)}>
                    {caracter}
                  </span>
                ))) ||
                "Seleccione una opción"}
            </span>
            <div
              onClick={copiarPassowrd}
              className={`p-2 rounded transition-all duration-500 cursor-pointer flex-shrink-0 ${
                copiado
                  ? "bg-green-500 text-white scale-110"
                  : "bg-blue-100 hover:bg-blue-200 text-blue-600"
              }`}
            >
              {copiado ? (
                <IconPasswordCopiado className="animate-in fade-in zoom-in duration-300" />
              ) : (
                <IconCopia />
              )}
            </div>
          </div>

          <div className="text-white flex flex-col md:flex-row gap-6 md:gap-9">
            <div className="space-y-2 text-white">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-blue-600"
                  onChange={handleLetras}
                  //defaultChecked={true}
                />
                <span className="text-lg font-medium">Letras</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-blue-600"
                  onChange={handleNumeros}
                />
                <span className="text-lg font-medium">Números</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-blue-600"
                  onChange={handleMayusculas}
                />
                <span className="text-lg font-medium">Mayúsculas</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-blue-600"
                  onChange={handleCaracterEspecial}
                />
                <span className="text-lg font-medium">C. Especiales</span>
              </div>
            </div>

            <div className="flex flex-row md:flex-row gap-2 md:gap-5 h-full items-center md:items-start">
              <span>Longitud:</span>
              <input
                type="number"
                min="4"
                max="16"
                defaultValue="4"
                className="bg-white rounded-lg text-black text-center w-16"
                onChange={handleCantidadLongitud}
              />
            </div>
          </div>

          <button
            className="mt-6 bg-blue-500 hover:bg-blue-600 p-3 rounded-xl text-white font-bold uppercase transition-all"
            onClick={btnGenerarPass}
          >
            Generar
          </button>
        </div>
      </div>
    </div>
  );
}
