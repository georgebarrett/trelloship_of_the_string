import React, { useState } from "react";
import axios from "axios";

const ImageUpload = () => {
  const [newUser, setNewAuthor] = useState({
    photo: "",
  });

  const handlePhoto = (event) => {
    setNewAuthor({ ...newUser, photo: event.target.files[0] });
    console.log(newUser.photo);
  };

  const handleSubmit = (event) => {
    // event.preventDefault()
    const formData = new FormData()
    formData.append('photo', newUser.photo)

    console.log(newUser.photo)

    axios.post('http://localhost:3000/users/add', formData)
      .then(res => {
        console.log(res)
      })
      .catch(error => {
        console.log(error)
      });
  }

  return (
    <form onSubmit={handleSubmit} encType="multiPart/form-data">
      <input
        type="file"
        accept=".png, .jpg, .jpeg"
        name="photo"
        onChange={handlePhoto}
      />

      <div class="bg"></div>

      <input type="submit" />
    </form>
  );
};

export default ImageUpload;