import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';

import { Media } from '../../types';
import styles from '../../styles/Cards.module.scss';

const Cards = dynamic(import('./Cards'));
const FeatureCard = dynamic(import('./FeatureCards'));

interface ListProps {
  defaultCard?: boolean;
  original?: boolean;
  heading: string;
  topList?: boolean;
  endpoint: string;
}

export default function List({
  defaultCard = true,
  heading,
  topList = false,
  endpoint,
  original = false
}: ListProps): React.ReactElement {
  const [media, setMedia] = useState<Media[]>([]);

  console.log(endpoint, '<endpoint');

  async function getEndpoint() {
    try {
      const { data } = await axios.get('http://localhost:3000/pokemons-fav');
      setMedia(data);
    } catch (error) {}
  }

  useEffect(() => {
    getEndpoint();
  }, []);

  return (
    <div className={styles.listContainer}>
      <strong className={styles.category}>{heading}</strong>
      <div className={styles.cardRow}>
        {media?.map((item, index) => {
          if (topList) {
            if (index < 10) {
              return <FeatureCard key={index} index={index + 1} item={item} />;
            }
          } else {
            return <Cards key={index} defaultCard={defaultCard} item={item} original={original} />;
          }
        })}
      </div>
    </div>
  );
}
