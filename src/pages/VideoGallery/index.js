import React from 'react';
import './styles.css' 


const VideoGallery = ({videoData}) => {  
    console.log ("in video",videoData)
    return (
        
        <div className= 'video-container'>
             {videoData &&
                videoData.hits.map((video,i) =>
                <div className="card" id="videocard" key={video.id}>
                    <video width='100%' height='100%' controls >
                        <source src={video.videos.medium.url} type="video/mp4" />
                    </video>
                    <div className="card-body">
                    <h6 className="card-title"> Tag: {video.tags[0].toUpperCase()+video.tags.slice(1)} </h6>
                    <h6 className="card-title fst-italic"> Shared by: {video.user} </h6>                               
                    </div>
                </div>
                )}
        </div>
    );
    
}

export default VideoGallery;

 