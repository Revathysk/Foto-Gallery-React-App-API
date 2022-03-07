import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './styles.css';

const Favorites = ({ userLogin }) => {

  const [favorites, setFavorites] = useState([]);  
  const [newTag,setNewTag] = useState([]);
  const [editTag,setEditTag] = useState(false);

  // console.log('my fav:', favorites)
  // console.log('userLogin:', userLogin)

  // Read from postgres table Favorites of user logged in 

  const fetchFav = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/user/favorites/${userLogin}`)
      setFavorites(response.data)
     // console.log(response.data)
    }
    catch (error) {
      console.log(error)
    }
  }

  // Delete selected picture with passing the id (primary key) from postgres table Favorites

  const deleteFav = async (id) => {    
    try {
      const response = await axios.delete(`http://localhost:8080/api/v1/user/favorites/delete/${id}`)      
      fetchFav();
      setTimeout(() => {
        alert(response.data);  
      }, 200);      
    }
    catch (error) {
      console.log(error)
    }
  }

  // Update Foto tag for favorites saved for userlogin
  const updateFav = async (image) => {
       
    const editfav = {
      username: userLogin,
      fotourl: image.fotourl,
      fototag: newTag,
      sharedby: image.sharedby
    }
    
    try {
      const response = await axios.put(`http://localhost:8080/api/v1/user/favorites/edit/${image.id}`)      
      fetchFav();
      console.log(response.data);
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => { fetchFav() }, [])

  return (
    <div className='image-container'>
       

      {favorites &&
        favorites.map((image, i) => (

          <div key={i}>
            <div className="card imagecard">
              <img id='imagesize' src={image.fotourl} alt='..' />

              <div className="card-body">
                 <h6 className="card-title"> Tag: {image.fototag[0].toUpperCase() + image.fototag.slice(1)}</h6>
                 <h6 className="card-title fst-italic"> Shared by: {image.sharedby}</h6> 
                  <div className='edit-delete'>
                  <i className="bi bi-trash " onClick={ ()=> deleteFav(image.id) }> </i>
                  <i className="bi bi-pencil-square" onClick={ ()=> setEditTag(true)  }> </i>
                  </div>                         
              </div>

            </div>            
          </div>
        ))}       

    </div>
  );
}

export default Favorites;
