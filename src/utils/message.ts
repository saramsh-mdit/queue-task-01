export function generateMessage(message: string, isError: boolean = false) {
  if (isError)
    return {
      message,
      type: "error",
    };
  return {
    message,
  };
}
