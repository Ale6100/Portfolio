// lib\utils.ts

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
