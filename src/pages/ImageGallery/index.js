import React from 'react';
import './styles.css';
 
const ImageGallery = ({ imgData }) => {
    return (

        <div className='image-container'>
            {imgData &&
            imgData.hits.map((image) => (
                    <div key={image.id}>
                        <div className="card imagecard">
                        <img id='imagesize' src={image.webformatURL} alt='..' />
                            <div className="card-body">
                                <h6 className="card-title"> Tag: {image.tags[0].toUpperCase()+image.tags.slice(1)}</h6>
                                <h6 className="card-title fst-italic"> Shared by: {image.user}</h6> 
                                <i onClick={()=>console.log('clicked')} className="bi bi-star" > Add to Favorite </i>                               

                            </div>
                        </div>
                    </div>
                ))}
        </div>

    );
}

export default ImageGallery;
