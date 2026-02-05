import { FaRegClipboard as IconCopia } from "react-icons/fa6";
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
          // console.log("caracteres Posibles: ", caracteresPosibles);
          // console.log("indice Azar: ", indiceAzar);
          c.push(caracteresPosibles[indiceAzar]);

          // setPassword(c.join(""));
          // console.log(password);
        }
      }
    }
    //Funcion para desordenar elementos
    // c = c.sort(() => Math.random() - 0.5);
    let cant = c.length - cantidadLongitud;

    // console.log("veces girando: ", a);
    console.log("contenido: ", c);
    // if (!c.includes(caracteresEspeciales)) {
    //   // console.log("longitud anterior: ", c.length);
    //   // console.log("longitud: ", c.length - 1);
    //   // console.log("elemento eliminado: ", c.pop(c.length - 1));

    //   c.pop(c.length - 1);
    //   c.push(
    //     caracteresEspeciales[
    //       Math.trunc(Math.random() * caracteresEspeciales.length - 1)
    //     ],
    //   );

    //   c[c.length - 2] =
    //     caracteresEspeciales[
    //       Math.trunc(Math.random() * caracteresEspeciales.length - 1)
    //     ];

    //   // c.push(
    //   //   caracteresEspeciales[
    //   //     Math.trunc(Math.random() * caracteresEspeciales.length - 1)
    //   //   ],
    //   // )(
    //   //   c.push(caracteresEspeciales[Math.trunc(Math.random() * 10)]),
    //   //   (c[c.length - 2] =
    //   //     caracteresEspeciales[Math.trunc(Math.random() * 19)]),
    //   // );
    // }
    // Desordena la posicion de los elementos del Array
    c = c.sort(() => Math.random() - 0.5);
    // if (!c.includes(mayusculas)) {
    //   c.pop(c.length - 1);
    //   c.push(
    //     caracteresEspeciales[
    //       Math.trunc(Math.random() * mayusculas.length - 1)
    //     ],
    //   );
    //   c[c.length - 2] =
    //     mayusculas[Math.trunc(Math.random() * mayusculas.length - 1)];
    // }
    // bk de longitud exacta
    // if (c.length > cantidadLongitud) {
    //   // c = c.slice(0, cantidadLongitud);
    //   if (c.length > cantidadLongitud) {
    //     c = c.splice(0, cantidadLongitud);
    //   }
    // }

    // c = c.slice(0, cantidadLongitud);

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

    if (!contieneCEspecial && estadoCaracEsp) {
      c.pop();
      c.push(
        caracteresEspeciales[
          Math.trunc(Math.random() * caracteresEspeciales.length)
        ],
      );
    }
    if (!contieneMayusculas && estadoMayusculas) {
      c.pop();
      c.push(mayusculas[Math.trunc(Math.random() * mayusculas.length)]);
    }

    // c.pop(a);

    c = c.sort(() => Math.random() - 0.5).join("");
    console.log("tipo cantidadLongitud: ", typeof cantidadLongitud);
    // console.log("resultado de cant: ", cant);
    // console.log("contenido c: ", c);
    console.log("resultado final: ", c);
    setPassword(c);

    // console.log("esto es contenido: ", contenido.pop(2));
    // console.log("contenido despues de pop: ", contenido);
    console.log(password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  p-4 bg-gray-900">
      <div className="max-w-md w-95">
        <h1 className="text-red-400 text-2xl font-bold mb-4 text-center">
          Password Generator
        </h1>

        <div className="bg-gray-800 flex flex-col rounded-xl p-5 shadow-lg">
          <div className="p-4 flex justify-center items-center bg-gray-700 rounded-lg mb-4">
            <span className="flex-grow text-center font-mono text-white">
              {password || "nada"}
            </span>
            <div className="p-2 bg-blue-100 cursor-pointer hover:bg-blue-200 rounded transition-colors">
              <IconCopia />
            </div>
          </div>

          <div className="space-y-2 text-white text- ">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 accent-blue-600"
                onChange={handleLetras}
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
            <div className="flex gap-5">
              <span>Longitud:</span>
              <input
                type="number"
                min="4"
                max="16"
                defaultValue="4"
                className="bg-white rounded-lg text-black text-center"
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
