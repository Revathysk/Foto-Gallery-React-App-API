import React from 'react';

const Favorites = ({favorites}) => {
  console.log('my fav:',favorites)
    return (
        <div className='image-container'> 

                {favorites &&                         
                        favorites.map((image,i) => (
                        <div key={i}>
                            <div className="card imagecard">
                                <img id='imagesize' src={image.webformatURL} alt='..' />
                                <div className="card-body">
                                    <h6 className="card-title"> Tag: {image.tags[0].toUpperCase() + image.tags.slice(1)}</h6>
                                    <h6 className="card-title fst-italic"> Shared by: {image.user}</h6>

                                </div>
                            </div>
                        </div>
                    ))}
            </div>
    );
}

export default Favorites;
