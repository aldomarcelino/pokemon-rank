/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';

import Button from '../Button';
import { Media } from '../../types';
import { Poke } from '../../utils/icons';
import { ModalContext } from '../../context/ModalContext';
import styles from '../../styles/Banner.module.scss';

export default function Banner() {
  const [media, setMedia] = useState<Media>();
  const [random, setRandom] = useState<number>();
  const { setModalData, setIsModal } = useContext(ModalContext);
  const [loading, setLoading] = useState(false);

  const onClick = () => {
    setIsModal(true);
    setLoading(false);
  };

  const getMedia = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${random}`);
      setMedia(data);
      setModalData({
        id: random || 1,
        name: data.name,
        banner: data.sprites.other.dream_world.front_default,
        poster: data.sprites.front_default,
        title: '',
        overview: '',
        rating: 0,
        vote: 0,
        height: data.height,
        weight: data.weight,
        genre: [],
        moviecast: [],
        stats: data.stats,
        moves: data.moves,
        abilities: data.abilities,
        url: `https://pokeapi.co/api/v2/pokemon/${random}`
      });
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (media) {
      onClick();
    }
  }, [media]);

  useEffect(() => {
    if (random) getMedia();
  }, [random]);

  return (
    <div className={styles.spotlight}>
      <img src='https://cdn.wallpapersafari.com/35/16/dZ7U0L.jpg' alt='spotlight' className={styles.spotlight__image} />
      <div className={styles.spotlight__details}>
        <div className={styles.title}>Pokemon Universe</div>
        <div className={styles.synopsis}>
          Pokémon is a portmanteau of two Japanese words: poketto (ポケット), meaning pocket, and monsutā (モンスター),
          meaning monster. The term essentially translates to pocket monsters. Pokémon refers to the creatures that
          inhabit the Pokémon world, each with its unique characteristics, abilities, and types. Trainers, human
          characters in the Pokémon universe, capture and train these creatures to battle each other for sport and to
          become Pokémon Masters
        </div>
        <div className={styles.buttonRow}>
          <Button
            label={loading ? 'Loading...' : 'Get Your Pokemon'}
            filled
            Icon={Poke}
            onClick={() => setRandom(Math.floor(Math.random() * 1302))}
            disabled={loading}
          />
          {/* {media && <Button label='More Info' Icon={Info} onClick={() => onClick(media)} />} */}
        </div>
      </div>
    </div>
  );
}
