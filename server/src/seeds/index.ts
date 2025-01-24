import { Movie } from '../models/movie';


const movieSeed = async () => {
  await Movie.bulkCreate([
    {
      title: 'Inception',
      genre: 'Sci-Fi',
      description: 'A skilled thief is given a chance at redemption if he can successfully perform an inception.',
      releaseDate: '2010-07-16',
      streamingStatus: 'Available on Netflix',
    },
    {
      title: 'The Matrix',
      genre: 'Action',
      description: 'A hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
      releaseDate: '1999-03-31',
      streamingStatus: 'Available on HBO Max',
    },
    {
      title: 'The Dark Knight',
      genre: 'Action',
      description: 'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.',
      releaseDate: '2008-07-18',
      streamingStatus: 'Available on Disney+',
    },
  ]);
  console.log('Movies seeded!');
};

export default movieSeed;
