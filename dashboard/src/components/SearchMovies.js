import React, { useEffect, useState, useRef } from 'react';

function SearchMovies() {
    const keyword = useRef('');
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState('');
    const apiKey = 'f66d663e';

    const fetchData = async () => {
        try {
            const response = await fetch(`https://www.omdbapi.com/?s=${keyword.current}&apikey=${apiKey}`);
            const data = await response.json();
            if (data.Response === "False") {
                setMovies([]);
                setError('No se encontraron resultados para tu búsqueda.');
            } else {
                setError('');
                setMovies(data.Search);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Hubo un error al buscar películas. Por favor, intentalo de nuevo.");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const searchKeyword = e.target.elements.keyword.value.trim();
        keyword.current = searchKeyword;
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container-fluid">
            {apiKey !== '' ? (
                <>
                    <div className="row my-4">
                        <div className="col-12 col-md-6">
                            {/* Buscador */}
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="">Buscar por título:</label>
                                    <input type="text" className="form-control" name="keyword" />
                                </div>
                                <button className="btn btn-info" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h2>Películas para la palabra: {keyword.current}</h2>
                        </div>
                        {/* Listado de películas */}
                        {error ? (
                            <div className="alert alert-warning text-center">{error}</div>
                        ) : (
                            movies.length > 0 ? (
                                movies.map((movie, i) => (
                                    <div className="col-sm-6 col-md-3 my-4" key={i}>
                                        <div className="card shadow mb-4">
                                            <div className="card-header py-3">
                                                <h5 className="m-0 font-weight-bold text-gray-800">{movie.Title}</h5>
                                            </div>
                                            <div className="card-body">
                                                <div className="text-center">
                                                    <img
                                                        className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                                                        src={movie.Poster}
                                                        alt={movie.Title}
                                                        style={{ width: '90%', height: '400px', objectFit: 'cover' }}
                                                    />
                                                </div>
                                                <p>{movie.Year}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="alert alert-info text-center">Tu búsqueda no coincide con ningún resultado.</div>
                            ))
                        }
                    </div>
                </>
            ) : (
                <div className="alert alert-danger text-center my-4 fs-2">Eyyyy... ¿PUSISTE TU APIKEY?</div>
            )}
        </div>
    );
}

export default SearchMovies;
