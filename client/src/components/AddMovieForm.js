import axios from 'axios';
import React, {useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom';

const initialMovie = {
    id: Date.now(),
    title:"",
    director: "",
    genre: "",
    metascore: 9001,
    description: ""
};

const AddMovieForm = (props) => {
    const [movie, setMovie] = useState(initialMovie);
    const {push} = useHistory();
    const {id} = useParams();
    const {setMovies} = props

    


    const handleChangle = (e) => {
        setMovie({
            ...movie, [e.target.name]: e.target.value
        });
    }

    const subMitt = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/api/movies`, movie)
        .then(res => {
            console.log('resAMF:', res)
            setMovies(res.data)
            push('/movies')
        })
        .catch(err => {
            console.log('errAMF', err)
        })
    }

    const { title, director, genre, metascore, description } = movie;

    return (
        <div>
            <h2>Know of a super cool movie that we forgot?</h2>
            <h4> Add it now!</h4>
            <form onSubmit={subMitt}>
                <div>
						<label>Title</label>
						<input value={title} onChange={handleChangle} name="title" type="text" className="form-control" 
                        placeholder='Sharknado'
                        />
					</div>
					<div className="form-group">
						<label>Director</label>
						<input value={director} onChange={handleChangle} name="director" type="text" className="form-control"
                        placeholder='Jerry Jones'
                        />
					</div>
					<div className="form-group">
						<label>Genre</label>
						<input value={genre} onChange={handleChangle} name="genre" type="text" className="form-control"
                        placeholder='Documentary'
                        />
					</div>
					<div className="form-group">
						<label>Metascore</label>
						<input value={metascore} onChange={handleChangle} name="metascore" type="number" className="form-control"
                        
                        />
					</div>		
					<div className="form-group">
						<label>Description</label>
						<input value={description} onChange={handleChangle} name="description" className="form-control"
                         placeholder='Sharks + Tornados, need we say more?'
                         />
					</div>
                    <div className="modal-footer">			    
					<input type="submit" className="btn btn-info" value="Save"/>
					<Link to={`/movies`}><input type="button" className="btn btn-default" value="Cancel"/></Link>
				</div>
							

            </form>
            
        </div>
    )
}

export default AddMovieForm
