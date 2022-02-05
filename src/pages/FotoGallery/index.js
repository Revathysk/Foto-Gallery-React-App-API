import React from 'react';
import './styles.css'
const FotoGallery = () => {
    return (
        <div className='foto-container'>
            <div className= 'about'>
            <h3> Foto Gallery is designed as part of coding bootcamp using Pixabay API </h3>

            <h3> Use seacrh tab,  to get stunning free Images and  Videos shared by users of Pixabay  </h3>

            <h3> Over 2.5 million+ high quality stock images, videos and music shared by our talented community. </h3>

            <a href="https://pixabay.com/" >
                <img src="https://pixabay.com/static/img/public/leaderboard_b.png" alt="Pixabay" />
            </a>
            </div>
        </div>
    );
}

export default FotoGallery;
