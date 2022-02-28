import React from 'react'
import {Link} from 'react-router-dom'
import { useLocation} from 'react-router-dom'
import YouTube from 'react-youtube';
export default function Video() {
  const location = useLocation()
  let { id, title, releasedate, poster, ratings, language, country, overview } = location.state
  const [movievideo, setMovieVideo] = React.useState([])
  const [similar, setSimilar] = React.useState([])
  console.log(id)
  React.useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=1d1f5b1737638d866a6fb0d69e5a1f28`)
      .then(data => {
        return data.json()
      }).then(all => {
        setMovieVideo(prev=>all.results)

      })
      .catch((err) => {
        console.log(err.message);
      })

  }, [id]) 

  React.useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=1d1f5b1737638d866a6fb0d69e5a1f28&page=1`)
      .then(data => {
        return data.json()
      }).then(same => {
        setSimilar(same.results)

      })
      .catch((err) => {
        console.log(err.message);
      })

  }, [id]) 



  return (
    <>
   
      {movievideo.filter((item, index) => index < 1).map(video=> (
          <div id="youtube">
            <h2>{title}</h2>
            <YouTube videoId={video.key} />
          </div>
         ))}
         <div id="details">
           <div id="moviedata">
            <img src={"https://image.tmdb.org/t/p/original/" + poster} alt={title} />
            <div id="media_type">
              <h1>{title}</h1>
              <p><span>&#9733; {ratings} </span>    <span> {releasedate}</span></p>
              <p className="overview">{overview}</p>
              <p>Country: {country || "unknown"}</p>
              <p>Language: {language || "unknown"}</p>

            </div>
          </div>
          <div id="related">
        <h3>You may also like:</h3>
        <div >
        {similar.map(related => (
                <div id="related-card" key={related.id}>
                    <Link to={"/Video/"+related.id} state={{
                        id: related.id,
                        title: related.original_title || related.original_name,
                        releasedate: related.release_date || related.first_air_date,
                        poster: related.poster_path,
                        ratings: related.vote_average,
                        language: related.original_language,
                        country: related.origin_country,
                        overview: related.overview
                    }}>
                        <img src={"https://image.tmdb.org/t/p/original/" + related.poster_path} alt={related.original_title} /></Link>

                </div>
            ))}
        </div>
      </div> 
      </div>
      
    </>
  )
}

