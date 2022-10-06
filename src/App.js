import {useEffect, useState} from "react"
import './App.css'
import axios from 'axios'
import Movie from "./components/Movie" //importerar movie komponenten för att visa filmer i array format
import Youtube from 'react-youtube' //Importerar "youtube" för att visa trailern. Använder youtubes api för att visa film trailern.

function App() { //skapar app funktionen
    const MOVIE_API = "https://api.themoviedb.org/3/"
    const SEARCH_API = MOVIE_API + "search/movie"
    const DISCOVER_API = MOVIE_API + "discover/movie"
    const API_KEY = "1cf50e6248dc270629e802686245c2c8"
    const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280"
    const LANGUAGE = "SE-SE"

 
  


    const [playing, setPlaying] = useState(false) //kollar om filmen spelas eller inte
    const [trailer, setTrailer] = useState(null) //kollar om trailern finns eller inte för filmen
    const [movies, setMovies] = useState([])
    const [searchKey, setSearchKey] = useState("")
    const [movie, setMovie] = useState({title: "Laddar filmer..."})

    useEffect(() => { //hämtar filmer från API:et
        fetchMovies()
    }, [])

    const fetchMovies = async (event) => {
        if (event) {
            event.preventDefault()
        }

        const {data} = await axios.get(`${searchKey ? SEARCH_API : DISCOVER_API}`, {
            params: {
                api_key: API_KEY,
                query: searchKey
            }
        })

        console.log(data.results[0])
        setMovies(data.results)
        setMovie(data.results[0])

        if (data.results.length) {
            await fetchMovie(data.results[0].id)
        }
    }

    const fetchMovie = async (id) => {
        const {data} = await axios.get(`${MOVIE_API}movie/${id}`, {
            params: {
                api_key: API_KEY,
                append_to_response: "videos"
            }
        })

        if (data.videos && data.videos.results) {
            const trailer = data.videos.results.find(vid => vid.name === "Official Trailer")
            setTrailer(trailer ? trailer : data.videos.results[0])
        }

        setMovie(data)
    }


    const selectMovie = (movie) => {
        fetchMovie(movie.id)
        setPlaying(false)
        setMovie(movie)
        window.scrollTo(0, 0)
    }

    const renderMovies = () => (
        movies.map(movie => (
            <Movie
                selectMovie={selectMovie}
                key={movie.id}
                movie={movie}
            />
        ))
    )
   //make a button that scrolls to top
   
    return (
        <div className="App">
            <header className=" header">
                <span className={"brand"}><div class="site-branding">
  <div class="ast-site-identity">
    <h1 class="site-title">Din film hemsida</h1>
  </div>
</div></span>
                <form className="form" onSubmit={fetchMovies}>
                    <input className="search" type="text" id="search"
                           onInput={(event) => setSearchKey(event.target.value)}/>
                    <button className="submit-search" type="submit"><i className="fa fa-search"></i></button>
                </form>
            </header>
            
            {movies.length ?
                <main>
                    
                    {movie ?
                        <div className="poster"
                             style={{backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(12, 16, 34, 1)
), url(${BACKDROP_PATH}${movie.backdrop_path})`}}>
                            {playing ?
                                <>
                                
                                    <Youtube
                                        videoId={trailer.key}
                                        className={"youtube amru"}
                                        containerClassName={"youtube-container amru"}
                                        opts={
                                            {
                                                width: '100%',
                                                height: '100%',
                                                playerVars: {
                                                    autoplay: 1,
                                                    controls: 0,
                                                    cc_load_policy: 0,
                                                    fs: 0,
                                                    iv_load_policy: 0,
                                                    modestbranding: 0,
                                                    rel: 0,
                                                    showinfo: 1,
                                                },
                                            }
                                        }
                                    />
                                    <button onClick={() => setPlaying(false)} className={"button close-video"}>Stäng video
                                    </button>
                                </> :
                     
                                <div className="center-max-size">
                                    <h1>Kolla på {movie.title}!!</h1>
                                    <div className="poster-content">
                                        {trailer ?
                                            <button className={"button play-video"} onClick={() => setPlaying(true)}
                                                    type="button">Spela
                                                Trailer</button>
                                            : 'Sorry, no trailer available'}
                                        <h1>{movie.title}</h1>
                                        
                                        <p>{movie.overview}</p>
                                    </div>
                                </div>
                            }
                        </div>
                        : null}
                        <div className="lol">
                            <h1 class="Titel">De populäraste filmerna just nu</h1>
                            </div>

                    <div className={"center-max-size container"}>
                        
                        {renderMovies()}
                    </div>
                </main>
                : 'Sorry, no movies found'}
        </div>
    );
}


export default App;
