// lib\utils.ts

import { TypeResponse } from "@/types/fetch";
import { errorResponse } from "@/utils/handleErrorResponses";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Retorna un color RGB al azar
 * @param {Object} options Opciones para generar el color
 * @param {number} options.min Valor mínimo para los componentes RGB (por defecto 0)
 * @param {number} options.max Valor máximo para los componentes RGB (por defecto 255)
 * @param {number} options.disableRed Valor fijo para el componente rojo, anula la generación aleatoria
 * @param {number} options.disableGreen Valor fijo para el componente verde, anula la generación aleatoria
 * @param {number} options.disableBlue Valor fijo para el componente azul, anula la generación aleatoria
 * @returns {`rgb(${number}, ${number}, ${number})`} Retorna un string con el formato "rgb(red, green, blue)" donde red, green y blue son números enteros entre min y max
 */
export const colorRandom = ({
  min = 0,
  max = 255,
  disableRed,
  disableGreen,
  disableBlue
}: {
  min?: number;
  max?: number;
  disableRed?: number;
  disableGreen?: number;
  disableBlue?: number;
} = {}): `rgb(${number}, ${number}, ${number})` => {
  if (typeof min !== 'number' || isNaN(min) || min < 0 || min > 255) {
    throw new Error(`El valor mínimo debe ser un número entre 0 y 255. Se recibió ${min}`);
  }
  if (typeof max !== 'number' || isNaN(max) || max < 0 || max > 255) {
    throw new Error(`El valor máximo debe ser un número entre 0 y 255. Se recibió ${max}`);
  }
  if (min > max) {
    throw new Error(`El valor mínimo debe ser menor o igual al máximo. Se recibió min: ${min}, max: ${max}`);
  }

  if (disableRed !== undefined && (typeof disableRed !== 'number' || isNaN(disableRed) || disableRed < 0 || disableRed > 255)) {
    throw new Error(`disableRed debe ser un número entre 0 y 255. Se recibió ${disableRed}`);
  }
  if (disableGreen !== undefined && (typeof disableGreen !== 'number' || isNaN(disableGreen) || disableGreen < 0 || disableGreen > 255)) {
    throw new Error(`disableGreen debe ser un número entre 0 y 255. Se recibió ${disableGreen}`);
  }
  if (disableBlue !== undefined && (typeof disableBlue !== 'number' || isNaN(disableBlue) || disableBlue < 0 || disableBlue > 255)) {
    throw new Error(`disableBlue debe ser un número entre 0 y 255. Se recibió ${disableBlue}`);
  }

  const red = disableRed ?? Math.floor(Math.random() * (max - min + 1)) + min
  const green = disableGreen ?? Math.floor(Math.random() * (max - min + 1)) + min
  const blue = disableBlue ?? Math.floor(Math.random() * (max - min + 1)) + min
  return `rgb(${red}, ${green}, ${blue})`
}

/**
 * Recibe dos números `num1` y `num2` donde `num1` <= `num2`. Devuelve un número al azar entre ellos (no incluye al `num2`)
 * @param {number} num1 Primer número
 * @param {number} num2 Segundo número (debe ser mayor o igual que el primero)
 * @throws {error} Si alguno de los parámetros no es un número
 * @returns {number} Un número al azar entre `num1` y `num2` (sin incluir al `num2`)
 */
export const numeroAlAzar = (num1: number, num2: number): number => {
  if (typeof num1 !== 'number' || typeof num2 !== 'number' || isNaN(num1) || isNaN(num2)) throw new Error(`numeroAlAzar requiere números válidos. Se recibió ${num1} y ${num2}`);
  if (num1 > num2) throw new Error(`num1 debe ser <= num2. Se recibió ${num1} y ${num2}`);
  return num1 + Math.random() * (num2 - num1);
}

/**
 * Recibe un array y retorna un elemento al azar
 * @param {T[]} array Array del cual se quiere seleccionar un elemento al azar
 * @returns {T} Retorna un elemento al azar del array
 * @throws {TypeError} Si el argumento no es un array
 */
export const elementoAlAzar = <T>(array: T[]): T => {
  if (!Array.isArray(array)) throw new TypeError(`elementoAlAzar debe recibir un array. Se ha recibido ${JSON.stringify(array)} (${typeof array})`)
  return array[Math.floor(Math.random()*array.length)]
}

/**
 * Maneja una respuesta de API parseando su contenido JSON y retornando una respuesta tipada.
 * Si la respuesta no es exitosa, retorna una respuesta de error con un mensaje traducido o el mensaje por defecto.
 *
 * @template T - El tipo de los datos esperados en la respuesta.
 * @param {Response} response - El objeto Response de la API fetch a manejar.
 * @param {string} defaultMessage - Mensaje de error por defecto si no hay traducción disponible.
 * @returns {Promise<TypeResponse<T>>} Una promesa que resuelve a un objeto de respuesta tipado.
 */
export async function handleApiJson<T>(response: Response, defaultMessage: string = ""): Promise<TypeResponse<T>> {
  const res: TypeResponse<T> = await response.json();
  if (!response?.ok) {
    return errorResponse({ status: "error", message: res.message ?? defaultMessage });
  }
  return res;
}
