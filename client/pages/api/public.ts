import { NextApiResponse, NextApiRequest } from 'next';
import axios from 'axios';

import { Media } from '../../types';

interface Response {
  type: 'Success' | 'Error';
  data: Media[] | Error;
}

export default async function handler(request: NextApiRequest, response: NextApiResponse<Response>) {
  try {
    const { data } = await axios.get('https://clean-gold-bracelet.cyclic.app/public', { timeout: 10000 });

    const result = data.map(v => ({
      ...v,
      rating: v.rating / 10,
      overview: v.synopsis,
      poster: v.id > 20 ? v.imgUrl : `https://image.tmdb.org/t/p/w500${v.poster_path}`,
      banner: v.id > 20 ? v.imgUrl : `https://image.tmdb.org/t/p/original${v.imgUrl}`,
      genre: v.GenreMovies.map(i => i.Genre),
      moviecast: v.MovieCasts.map(t => t.Cast)
    }));

    response.status(200).json({ type: 'Success', data: result });
  } catch (error) {
    console.log(error, '<<errror');
    response.status(500).json({ type: 'Error', data: error.data });
  }
}
