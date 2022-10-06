import React from 'react'; //Importerar React

const Movie = ({movie, selectMovie}) => { //Skapar en funktion som tar emot två props, movie och selectMovie. SelectMovie är funktionen som händer när man klickar på filmen
    const IMAGE_PATH = "https://image.tmdb.org/t/p/w342" //Importerar bilden från filmen

    return ( //Inuti denna div finns tre  element: en för varje film (poster_path, title, voting).
        <div onClick={() => selectMovie(movie)} className={"movie"}> 
            <div className="movie-title">
            <h2 class="info">Klicka för mer info</h2>
            
                {movie.poster_path &&
                
                <img src={IMAGE_PATH + movie.poster_path} alt={movie.title}/> //Varje del av data har sin egen img-tagg med alt-text inställd för att matcha vad som finns i deras respektive egenskaper.
                
                }
                <div className={"flex between movie-infos"}>
                    <h5 className={"movie-title"}>{movie.title}</h5>
                    
                    {movie.vote_average ? <span className={"movie-voting"}>{movie.vote_average}</span> : null}
                </div>
            </div>
        </div>
    );
}; //Koden kommer att återge en lista över filmer, var och en med sin egen bild och titel.


export default Movie;