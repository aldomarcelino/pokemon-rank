import { NextApiResponse, NextApiRequest } from 'next';

import { Media } from '../../types';

import { encryptPassword } from '../../utils/encryption';
import axios from 'axios';

interface Response {
  type: 'Success' | 'Error';
  data: Media[] | Error;
}

export default async function handler(request: NextApiRequest, response: NextApiResponse<Response>) {
  // const axios = getInstance();
  const { email, password } = request.body;

  try {
    const { data } = await axios.post(process.env.BASE_URL + '/signin', { email, password: encryptPassword(password) });

    response.status(200).json({ type: 'Success', data });
  } catch (error: any) {
    console.error('Axios error:', error.message);
    console.error('Axios error details:', error.toJSON());
    response.status(400).json({ type: 'Error', data: error.data });
  }
}
