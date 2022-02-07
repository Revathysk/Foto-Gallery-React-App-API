import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import './styles.css';

const ImageGallery = ({ imgData, userInput, addToFavorites }) => {

    const [imageArray, setImageArray] = useState(imgData)    
    const [itemOffset, setItemOffset] = useState(1);     

    useEffect(() => {        
        try{        
        const imageURL = `https://pixabay.com/api/?key=25458026-1cedfff5e31c1c4038fe36056&q=${userInput}&image_type=photo&pretty=true&page=${itemOffset}` 
        console.log(imageURL)
        imageDisplay(imageURL)
        } catch(error){
        console.log(error)
        }

    }, [itemOffset , userInput]); // ItemOffset or UserInput -> indicates Axios call to be done only when page number or user input changingis changing/new page clicked



    const handlePageClick = (event) => {
        const newOffset = event.selected + 1;
        console.log(
            `User requested page number ${event.selected} newOffset ${newOffset} `
        );
        setItemOffset(newOffset);
    };

    const imageDisplay = async(imageURL) => {
        console.log("inside image display", imageURL)
         try {
            const response = await axios.get(imageURL)
            setImageArray(response.data)
            // console.log(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }

 
    const ImageCard =() => {
        
    return (        
            <div className='image-container'> 
                {imageArray &&
                    imageArray.hits.map((image) => (
                        <div key={image.id}>
                            <div className="card imagecard">
                                <img id='imagesize' src={image.webformatURL} alt='..' />
                                <div className="card-body">
                                    <h6 className="card-title"> Tag: {image.tags[0].toUpperCase() + image.tags.slice(1)}</h6>
                                    <h6 className="card-title fst-italic"> Shared by: {image.user}</h6>

                                    {/* <i onClick={() => console.log('clicked')} className="bi bi-star" > Add to Favorite </i> */}
                                    <i id= 'icon' className="bi bi-star-full" > 
                                        <button onClick={ ()=> {addToFavorites(image) }}> Add to Favorite </button>  
                                    </i>

                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        )
    }


    return (
        <div id=' imagepage'>
             
             <ImageCard/>   
             <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                marginPagesDisplayed={2}
                pageCount={25}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
            />
        </div>
    );
}

export default ImageGallery;
