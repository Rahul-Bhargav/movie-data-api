function sortMovieActors (actors) {
  const movieActors = []
  actors.forEach((actor) => {
    const movies = actor.movies
    movies.forEach((movie) => {
     movieActors.push({actorName: actor.actorName, movieName: movie})
   })
  })
  return movieActors
}

const actors = [
  {
    'actorName': 'Actor 1',
    'movies': [
      'Movie 1',
      'Movie 2',
      'Movie 5'
    ]
  },
  {
    'actorName': 'Actor 2',
    'movies': [
      'Movie 2',
      'Movie 3'
    ]
  },
  {
    'actorName': 'Actor 3',
    'movies': [
      'Movie 1',
      'Movie 2',
      'Movie 3',
      'Movie 5',
      'Movie 6'
    ]
  }
]

console.log(sortMovieActors(actors))
