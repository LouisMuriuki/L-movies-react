import React from "react"
// import Hover from "./Hover"
import { Link } from "react-router-dom"
export default function Card() {
    const [all, setAll] = React.useState([])
    const [movie, setMovie] = React.useState(false)
    const [tv, setTv] = React.useState(false)
    const [allmovies, setAllMovies] = React.useState([])
    const [tvshows, setTvshows] = React.useState([])
    // const {id}=useParams()

    React.useEffect(() => {
        fetch('https://api.themoviedb.org/3/trending/all/week?api_key=1d1f5b1737638d866a6fb0d69e5a1f28')
            .then(data => {
                return data.json()
            }).then(all => {
                setAll(all.results)
            })
            .catch((err) => {
                console.log(err.message);
            })

    }, [])
    React.useEffect(() => {
        fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=1d1f5b1737638d866a6fb0d69e5a1f28')
            .then(data => {
                return data.json()
            }).then(movies => {
                setAllMovies(movies.results)
            })
            .catch((err) => {
                console.log(err.message);
            })
    }, [])

    React.useEffect(() => {
        fetch('https://api.themoviedb.org/3/trending/tv/week?api_key=1d1f5b1737638d866a6fb0d69e5a1f28')
            .then(data => {
                return data.json()
            }).then(tv => {
                setTvshows(tv.results)
                console.log(tvshows)
            })
            .catch((err) => {
                console.log(err.message);
            })

    }, [])
    function toggleMovie() {
        setMovie(Movieprev => !Movieprev)
        if (movie === true) {
            setAll(allmovies)
        }
    }
    function toggleTv() {
        setTv(Tvprev => !Tvprev)
        if (tv === true) {
            setAll(tvshows)
        }
    }
    const [windowSize, setWindowSize] = React.useState(null)
    React.useEffect(()=>{
        const handleResize=()=>{
            setWindowSize(window.innerWidth)

        }
        window.addEventListener('resize',handleResize)
        return () => window.removeEventListener('resize', handleResize)
    },[])
    return (
        <>
            <header id='watch'>
                <h3>
                    Watch Free Movies Online
                </h3>
               {
                   windowSize > 768 &&

                   <p>If you want to watch free movies online, L Movies is the right place. It allows you watch free movies online for free. No registration is required, fast streaming servers, update daily. We're confident L Movies is the best free movies streaming website in the space that you can't simply miss!
                    The biggest motivation to help us to make the site better is sharing the site to your friends. Thanks!</p>
               }
                {
                   windowSize < 768 &&

                   <p>If you want to watch free movies online, L Movies is the right place. It allows you watch free movies online for free. Thanks!</p>
               }
                
            </header>
            <div id="top">
                <h1>Recommended</h1>
                <button onClick={toggleMovie}>Movies</button>
                <button onClick={toggleTv}> Shows</button>
            </div>
            {all.map(one => (
                <div id="movie-card" key={one.id}>
                    <Link to={"/Video/"+one.id} state={{
                        id: one.id,
                        title: one.original_title || one.original_name,
                        releasedate: one.release_date || one.first_air_date,
                        poster: one.poster_path,
                        ratings: one.vote_average,
                        language: one.original_language,
                        country: one.origin_country,
                        overview: one.overview
                    }}>
                        <img src={"https://image.tmdb.org/t/p/original/" + one.poster_path} alt={one.original_title} /></Link>
                    <div id="media_type">
                        <h5>{one.original_title || one.original_name}</h5>
                        <h6>{one.media_type}</h6>
                    </div>
                    <h6>{one.release_date || one.first_air_date}</h6>
                </div>
            ))}
            {/* <div id="hover">
            <Hover data={one}/>
            </div> */}
        </>
    )
}