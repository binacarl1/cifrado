import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

function CifradoCesar() {
  const [mensaje, setMensaje] = useState('');
  const [resultado, setResultado] = useState('');
  const [accion, setAccion] = useState('cifrar'); // 'cifrar' o 'descifrar'

  const cifrarDescifrarCesar = (mensaje, desplazamiento, accion) => {
    const abecedario = 'abcdefghijklmnñopqrstuvwxyz';
    let textoResultado = '';

    for (let i = 0; i < mensaje.length; i++) {
      const caracter = mensaje[i];

      if (/[a-zA-ZñÑ]/.test(caracter)) {
        let indice = abecedario.indexOf(caracter.toLowerCase());

        if (accion === 'descifrar') {
          indice = ((indice - desplazamiento) + abecedario.length) % abecedario.length;
        } else {
          if (caracter.toLowerCase() === 'ñ') {
            indice = ((indice + desplazamiento) - 1) % abecedario.length;
          } else {
            indice = (indice + desplazamiento) % abecedario.length;
          }
        }

        const resultadoCaracter = abecedario.charAt(indice);
        textoResultado += caracter === caracter.toLowerCase() ? resultadoCaracter : resultadoCaracter.toUpperCase();
      } else {
        textoResultado += caracter;
      }
    }

    return textoResultado;
  };

  const handleCifrarDescifrar = () => {
    const desplazamiento = 5; // desplazamientos
    const textoResultado = cifrarDescifrarCesar(mensaje, desplazamiento, accion);
    setResultado(textoResultado);
  };

  return (
    <div className="container">
      <h1 className="mt-5">Cifrado César</h1>
      <div className="form-group mt-4">
        <label htmlFor="mensaje">Ingrese el mensaje:</label>
        <textarea
          id="mensaje"
          className="form-control"
          rows="4"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          style={{ border: '2px solid #ccc', borderRadius: '5px' }}
        />
      </div>
      <div className="form-check mt-3">
        <input
          type="radio"
          id="cifrarRadio"
          className="form-check-input"
          value="cifrar"
          checked={accion === 'cifrar'}
          onChange={() => setAccion('cifrar')}
        />
        <label className="form-check-label" htmlFor="cifrarRadio">Cifrar</label>
      </div>
      <div className="form-check">
        <input
          type="radio"
          id="descifrarRadio"
          className="form-check-input"
          value="descifrar"
          checked={accion === 'descifrar'}
          onChange={() => setAccion('descifrar')}
        />
        <label className="form-check-label" htmlFor="descifrarRadio">Descifrar</label>
      </div>
      <button className="btn btn-primary mt-3" onClick={handleCifrarDescifrar}>
        {accion === 'cifrar' ? 'Cifrar' : 'Descifrar'}
      </button>
      <div className="form-group mt-4">
        <label>Texto {accion === 'cifrar' ? 'cifrado' : 'descifrado'}:</label>
        <textarea
          className="form-control"
          rows="4"
          value={resultado}
          readOnly
          style={{ border: '2px solid #ccc', borderRadius: '5px' }}
        />
      </div>
    </div>
  );
}

export default CifradoCesar;
