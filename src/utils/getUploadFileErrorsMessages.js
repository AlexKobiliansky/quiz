export const getUploadFileErrorsMessages = (errors) => {
  const result = [];
  errors && Array.isArray(errors) && errors.forEach((value) => {
    if (typeof(value) === 'string') {
      result.push(value)
    } else {
      Object.values(value).forEach((error) => {result.push(error)})
    }
  })
  return result
}