// utils/handleErrorResponses.ts

type TypeErrorResponse = {
  status?: string
  message: string
}

export const errorResponse = ({ status = "error", message }: TypeErrorResponse) => {
  return {
    status,
    message,
  }
}
