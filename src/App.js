import { useContext,  useState } from 'react'
import axios from 'axios'
import { Routes, Route } from 'react-router-dom'


//context component
import UserContext from './context/Usercontext';

import './App.css';
import FotoGallery from './pages/FotoGallery';
import ImageGallery from './pages/ImageGallery';
import VideoGallery from './pages/VideoGallery';
import Favorites from './pages/Favorites';
import LogIn from './pages/Login';
import Navigatepage from './components/NavigatePage';

function App() {
  const user = useContext(UserContext);  
  const [userLogin,setUserLogin] = useState(user)
  const [imgData, setImageData] = useState('')
  const [userInput, setUserInput] = useState('')
  const [videoData, setVideoData] = useState('')   
  const [favorites,setFavorites]= useState([])

  const addToFavorites = (images) => {
    console.log('Liked')
    setFavorites([...favorites,images])
  }

  const imageGalleryURL = `https://pixabay.com/api/?key=25458026-1cedfff5e31c1c4038fe36056&q=${userInput}&image_type=photo&pretty=true`
  const videoGalleryURL = `https://pixabay.com/api/videos/?key=25458026-1cedfff5e31c1c4038fe36056&q=${userInput}`

  const handleInput = event => {
    console.log('Userinput', event.target.value)
    setUserInput(event.target.value)
  }

  const fetchURL = async () => {

    // console.log('inside fetch', userInput)
    try {
      const imageResponse = await axios.get(imageGalleryURL)
      setImageData(imageResponse.data)
      // console.log(imgData)
      const videoResponse = await axios.get(videoGalleryURL)
      setVideoData(videoResponse.data)
      // console.log(videoData)
      
    }
    catch (error) {
      console.log(error)
    }
  }

  // useEffect(() => {
  //   fetchURL()
  // },[])

  return (
    <div className="App">
      <UserContext.Provider value={user}>
         
        <Navigatepage handleInput={handleInput} fetchURL={fetchURL} userLogin={userLogin}/>
        <Routes>
          <Route path='/' element={<FotoGallery/>} />
          <Route path='/photos' element={<ImageGallery imgData={imgData} userInput={userInput} addToFavorites={addToFavorites} />} />
          <Route path='/videos' element={<VideoGallery videoData={videoData} />} />
          <Route path='/login' element={<LogIn setUserLogin={setUserLogin} />} />
          <Route path='/favorites' element={<Favorites favorites={favorites} />}/>
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
