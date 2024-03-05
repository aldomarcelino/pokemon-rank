/* eslint-disable @next/next/no-img-element */
import dynamic from 'next/dynamic';
import { useContext, useState } from 'react';
import axios from 'axios';
import { NextRouter, useRouter } from 'next/router';
import styles from '../../styles/Cards.module.scss';
import { Media } from '../../types';
import { ModalContext } from '../../context/ModalContext';
import { Add, Down } from '../../utils/icons';
import { getLocalStorage, setLocalStorage } from '../../utils/storage';

const Button = dynamic(import('../Button'));

interface FeatureCardProps {
  index: number;
  item: Media;
  reFetchFav: any;
}

export default function FeatureCard({ index, item, reFetchFav }: FeatureCardProps): React.ReactElement {
  const router: NextRouter = useRouter();
  const { poster, banner, vote, height, weight, url, name } = item;
  const pokemonFav = getLocalStorage('pokemonFav') || '';
  const accessToken = getLocalStorage('access_token');

  const { setModalData, setIsModal } = useContext(ModalContext);
  const [media, setMedia] = useState<Media>();
  const [loading, setLoading] = useState(false);

  const getMedia = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(url);

      setModalData({
        id: data.id || 1,
        name: name,
        banner: banner,
        poster: poster,
        title: '',
        overview: '',
        rating: 0,
        vote: vote,
        height: height,
        weight: weight,
        genre: [],
        moviecast: [],
        stats: data.stats,
        moves: data.moves,
        abilities: data.abilities,
        url: url,
        reFetchFav
      });
      setIsModal(true);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleAddFav = async () => {
    try {
      setLoading(true);
      if (!accessToken) router.push('/');
      else {
        const { data } = await axios.put(
          'http://localhost:3000/update-pokemon-fav',
          { pokemonFavorite: url, idBefore: JSON.parse(pokemonFav) },
          {
            headers: {
              access_token: JSON.parse(accessToken),
              'Content-Type': 'application/json'
            }
          }
        );

        if (data) {
          setIsModal(false);
          setLoading(false);
          setLocalStorage('pokemonFav', data.favoriteId);
          reFetchFav();
        }
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.rank}>{index}</div>

      <div className={styles.featureCard}>
        <img src={banner || poster} alt='img' className={styles.poster} />

        <div className={styles.info}>
          <div className={styles.actionRow}>
            {`"${url}"` != pokemonFav ? (
              <div className={styles.actionRow}>
                <Button Icon={Add} rounded onClick={handleAddFav} />
              </div>
            ) : (
              <div>{''}</div>
            )}
            <Button
              Icon={Down}
              rounded
              onClick={() => {
                getMedia();
              }}
            />
          </div>
          <div className={styles.textDetails}>
            <strong>{name}</strong>
            <div className={styles.row}>
              <span className={styles.greenText}>{vote} Users</span>
              {/* <span className={styles.regularText}>length </span> */}
            </div>
            <div style={{ padding: '4px 0px' }}>
              Height : <span style={{ color: '#FFF4A3' }}>{`${height / 10} M`}</span>, Weight :{' '}
              <span style={{ color: '#FFF4A3' }}>{`${weight / 10} Kg`}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
