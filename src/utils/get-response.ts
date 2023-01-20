/**
 *
 * @param {boolean} status - The response status.
 * @param {string} message - The response message.
 * @param {any} data - The response data.
 * @returns {object}
 */
export function getResponse(status: boolean, message: string, data: any): object {
  return {
    status,
    message,
    data,
  };
}
