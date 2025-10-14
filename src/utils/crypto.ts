// Alfabeto español con Ñ (27 letras)
export const ALFABETO = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
const MOD = 27;

// Normalizar texto: eliminar espacios, acentos y convertir a mayúsculas
export function normalizarTexto(texto: string): string {
    return texto
        .toUpperCase()
        .replace(/\s+/g, '')
        .replace(/Á/g, 'A')
        .replace(/É/g, 'E')
        .replace(/Í/g, 'I')
        .replace(/Ó/g, 'O')
        .replace(/Ú/g, 'U')
        .replace(/Ü/g, 'U');
}

// Convertir letra a número (A=0, B=1, ..., Ñ=14, ..., Z=26)
export function letraANum(letra: string): number {
    const pos = ALFABETO.indexOf(letra);
    return pos === -1 ? -1 : pos;
}

// Convertir número a letra
export function numALetra(num: number): string {
    const pos = ((num % MOD) + MOD) % MOD;
    return ALFABETO[pos];
}

// Validar entrada
export function validarEntrada(mensaje: string, clave: string, esCesar: boolean): string | null {
    if (!mensaje || mensaje.length === 0) {
        return 'El mensaje no puede estar vacío';
    }
    if (mensaje.length > 30) {
        return 'El mensaje no puede tener más de 30 caracteres';
    }
    if (!clave || clave.length === 0) {
        return 'La clave no puede estar vacía';
    }
    
    if (esCesar) {
        const desplazamiento = parseInt(clave);
        if (isNaN(desplazamiento)) {
            return 'La clave para César debe ser un número';
        }
        if (desplazamiento < 1 || desplazamiento > 26) {
            return 'El desplazamiento debe estar entre 1 y 26';
        }
    }
    
    return null;
}

// Tipos de operaciones de cifrado
export type CipherOperation = 'cesar-cifrar' | 'cesar-descifrar' | 'vigenere-cifrar' | 'vigenere-descifrar';

// Interfaz para el resultado del cifrado/descifrado
export interface CipherResult {
    resultado: string;
    funcionCripto: string;
    mensajeOriginal: string;
}
