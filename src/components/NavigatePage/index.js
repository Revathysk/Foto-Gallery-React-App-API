import {Link} from 'react-router-dom';
import './styles.css';
import { useContext } from 'react';
import UserContext from '../../context/Usercontext';

 
const Navigatepage = ({handleInput, fetchURL}) => {   
    
    const user=useContext(UserContext);
    return (
            <nav className="navbar navbar-expand-lg navbar-light nav-bgcolor">
                <div className="container-fluid" >
                    <Link className="navbar-brand" to="/">Foto Gallery</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon">Foto Gallery</span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="photos" > Photos</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="videos" > Videos</Link>
                            </li>
                                                        
                            <li className="nav-item">
                            <Link className="nav-link" to="login">Login</Link> 
                              </li>  
                             
                             {!user? null:
                            <li className="nav-item">
                                <Link className="nav-link" to="favorites"> Favorites </Link>
                            </li>  }
                        </ul>                        
                    </div>
                    
                    <div className='searchbar'>                        
                        <div id='viewer'> <h6> Hi {user} </h6>  </div>
                        <input className="form-control me-2" type="search" placeholder= "search..." onChange={handleInput}/>
                        <button className="btn btn-outline-success" onClick={fetchURL}> Search </button>

                    </div>
                 
                </div>
            </nav>
    );
}

export default Navigatepage;
