// src/composables/useCrypto.js
export function useCrypto() {
  const ALFABETO = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
  const MOD = 27;

  const normalizarTexto = (texto) => {
    return texto
      .toUpperCase()
      .replace(/\s+/g, '')
      .replace(/Á/g, 'A')
      .replace(/É/g, 'E')
      .replace(/Í/g, 'I')
      .replace(/Ó/g, 'O')
      .replace(/Ú/g, 'U')
      .replace(/Ü/g, 'U');
  };

  const letraANum = (letra) => {
    const pos = ALFABETO.indexOf(letra);
    return pos === -1 ? -1 : pos;
  };

  const numALetra = (num) => {
    const pos = ((num % MOD) + MOD) % MOD;
    return ALFABETO[pos];
  };

  const validarEntrada = (mensaje, clave, esCesar) => {
    if (!mensaje || mensaje.length === 0) return 'El mensaje no puede estar vacío';
    if (mensaje.length > 30) return 'El mensaje no puede tener más de 30 caracteres';
    if (!clave || clave.length === 0) return 'La clave no puede estar vacía';

    const mensajeNorm = normalizarTexto(mensaje);
    for (let letra of mensajeNorm) {
      if (letraANum(letra) === -1) return `Carácter no válido: "${letra}". Solo se permiten letras A-Z y Ñ`;
    }

    if (esCesar) {
      const claveNum = parseInt(clave);
      if (isNaN(claveNum)) return 'Para César, la clave debe ser un número';
    } else {
      const claveNorm = normalizarTexto(clave);
      for (let letra of claveNorm) {
        if (letraANum(letra) === -1) return `Carácter no válido en clave: "${letra}"`;
      }
    }

    return null;
  };

  const cifrarCesar = (mensaje, k) => {
    const mensajeNorm = normalizarTexto(mensaje);
    let resultado = '';
    for (let letra of mensajeNorm) {
      const p = letraANum(letra);
      const c = (p + k) % MOD;
      resultado += numALetra(c);
    }
    return resultado;
  };

  const descifrarCesar = (mensaje, k) => {
    const mensajeNorm = normalizarTexto(mensaje);
    let resultado = '';
    for (let letra of mensajeNorm) {
      const c = letraANum(letra);
      const p = (c - k + MOD) % MOD;
      resultado += numALetra(p);
    }
    return resultado;
  };

  const cifrarVigenere = (mensaje, clave) => {
    const mensajeNorm = normalizarTexto(mensaje);
    const claveNorm = normalizarTexto(clave);
    let resultado = '';
    for (let i = 0; i < mensajeNorm.length; i++) {
      const letraMensaje = mensajeNorm[i];
      const letraClave = claveNorm[i % claveNorm.length];
      const p = letraANum(letraMensaje);
      const k = letraANum(letraClave);
      const c = (p + k) % MOD;
      resultado += numALetra(c);
    }
    return resultado;
  };

  const descifrarVigenere = (mensaje, clave) => {
    const mensajeNorm = normalizarTexto(mensaje);
    const claveNorm = normalizarTexto(clave);
    let resultado = '';
    for (let i = 0; i < mensajeNorm.length; i++) {
      const letraMensaje = mensajeNorm[i];
      const letraClave = claveNorm[i % claveNorm.length];
      const c = letraANum(letraMensaje);
      const k = letraANum(letraClave);
      const p = (c - k + MOD) % MOD;
      resultado += numALetra(p);
    }
    return resultado;
  };

  const generarFuncionCripto = (metodo, mensajeOriginal, resultado, clave) => {
    const mensajeNorm = normalizarTexto(mensajeOriginal);
    if (metodo === 'cesar-cifrar') return `e_${clave}("${mensajeNorm}") = "${resultado}"`;
    if (metodo === 'cesar-descifrar') return `d_${clave}("${mensajeNorm}") = "${resultado}"`;
    if (metodo === 'vigenere-cifrar') return `e_${normalizarTexto(clave)}("${mensajeNorm}") = "${resultado}"`;
    if (metodo === 'vigenere-descifrar') return `d_${normalizarTexto(clave)}("${mensajeNorm}") = "${resultado}"`;
  };

  const procesarMensaje = (metodo, mensaje, clave) => {
    const esCesar = metodo.includes('cesar');
    const error = validarEntrada(mensaje, clave, esCesar);
    if (error) throw new Error(error);

    let resultado;
    if (metodo === 'cesar-cifrar') {
      resultado = cifrarCesar(mensaje, parseInt(clave));
    } else if (metodo === 'cesar-descifrar') {
      resultado = descifrarCesar(mensaje, parseInt(clave));
    } else if (metodo === 'vigenere-cifrar') {
      resultado = cifrarVigenere(mensaje, clave);
    } else if (metodo === 'vigenere-descifrar') {
      resultado = descifrarVigenere(mensaje, clave);
    }

    return {
      funcionCripto: generarFuncionCripto(metodo, mensaje, resultado, clave),
      mensajeOriginal: normalizarTexto(mensaje),
      mensajeProcesado: resultado
    };
  };

  return {
    procesarMensaje,
    normalizarTexto,
    validarEntrada
  };
}