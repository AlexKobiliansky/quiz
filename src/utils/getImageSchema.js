export const getImageSchema = (file) => (file && {
  file: file,
  type: file.type,
  name: file.name
});