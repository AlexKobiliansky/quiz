import axios from "axios";

export const uploadImage = async (uploadedFile) => {
  const formData = new FormData();
  formData.append("file", uploadedFile);
  formData.append('folder', 'app-quiz');
  formData.append('upload_preset', 'pzva5yxj-quiz');

  return axios.post('https://api.cloudinary.com/v1_1/do1zs5utw/image/upload', formData).then(({data}) => {
    return data.url;
  }).catch(e => alert(e.message));
}