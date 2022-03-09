import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './styles.css';


const Favorites = ({ userLogin }) => {

  const [favorites, setFavorites] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [editTag, setEditTag] = useState(false);
  const [editFoto, setEditFoto] = useState([]);
  const [viewers, setViewers] = useState(false);

  //console.log('my fav:', favorites)
  // console.log('userLogin:', userLogin)

  // Read from postgres table Favorites of user logged in 

  const fetchFav = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/user/favorites/${userLogin}`)
      setFavorites(response.data)
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

  //Set the edit tag to true to display the textbox and foto to be edited
  const fotoToEdit = (foto) => {
    setEditTag(true)
    setEditFoto(foto)     
  }

  const updateFav = async () => {

    const editFavorite = editFoto;
    editFavorite.fototag = newTag;
    console.log(" Inside updateFav Foto edited: ", editFavorite.id)

    try {
      const response = await axios.put(`http://localhost:8080/api/v1/user/favorites/edit/${editFavorite.id}`, editFavorite)
      // console.log(response.message);
      if (response.status === 200) {
        setEditTag(false);
        fetchFav();       
        setNewTag('');
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (userLogin === '') {
      setViewers(true)
    }
    fetchFav()
  }, [])

  return (
    <div className='favorite-page'>

      <div className="edit-div" >
        {(editTag) ?
          <div className="mb-3 ">
            <label htmlFor="exampleInputTag" className="tag-label"> Tag Description </label>
            <input
              type="text" className="form-control" id="exampleInputTag"
              value={newTag}
              onChange={e => setNewTag(e.target.value)}
            />
            <button onClick={() => updateFav()} > Save </button>
          </div>
          : console.log("Edit Foto ", editTag)
        }
      </div>

      <div className='foto-div'>
        {
          viewers
            ? <div className='message-div'>
              <div>
                <h1 className="msg-heading"> Welcome to Foto-Gallery Favorites! </h1>
                <h3 className="msg-heading"> Please Login/Signup to view and save favorites </h3>
              </div>
            </div>
            :
            favorites &&
            favorites.map((foto, i) => (

              <div key={i} >
                <div className="card imagecard">
                  <img id='imagesize' src={foto.fotourl} alt='..' />

                  <div className="card-body">
                    <h6 className="card-title">  Tag: {foto.fototag[0].toUpperCase() + foto.fototag.slice(1)}</h6>
                    <h6 className="card-title fst-italic"> Shared by: {foto.sharedby}</h6>
                    <div className='edit-delete-icons'>
                      <i className="bi bi-trash " onClick={() => deleteFav(foto.id)}> </i>
                      <i className="bi bi-pencil-square" onClick={() => fotoToEdit(foto)}> </i>

                    </div>
                  </div>

                </div>
              </div>
            ))
        }
      </div>

    </div>
  );
}

export default Favorites;