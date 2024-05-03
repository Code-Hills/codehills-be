export const filterValidationError = (errors) => {
  let errorsArray = errors.map((error) => ({
    key: error.path[0].key,
    message: error.message,
  }));
  return errorsArray;
};
