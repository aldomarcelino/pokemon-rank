/* eslint-disable @next/next/no-img-element */
import dynamic from 'next/dynamic';
import { useContext, useState } from 'react';

import styles from '../../styles/Cards.module.scss';
import { Genre, Media } from '../../types';
import { ModalContext } from '../../context/ModalContext';
import { Add, Play, Down, Like, Dislike } from '../../utils/icons';

const Button = dynamic(import('../Button'));

interface FeatureCardProps {
  index: number;
  item: Media;
}

export default function FeatureCard({ index, item }: FeatureCardProps): React.ReactElement {
  const { title, poster, banner, rating, vote, height, weight } = item;

  const { setModalData, setIsModal } = useContext(ModalContext);

  const onClick = (data: Media) => {
    setModalData(data);
    setIsModal(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.rank}>{index}</div>

      <div className={styles.featureCard}>
        <img src={banner || poster} alt='img' className={styles.poster} />

        <div className={styles.info}>
          <div className={styles.actionRow}>
            <div className={styles.actionRow}>
              <Button Icon={Add} rounded />
            </div>
            <Button Icon={Down} rounded onClick={() => onClick(item)} />
          </div>
          <div className={styles.textDetails}>
            <strong>{title}</strong>
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

function renderGenre(genre: Genre[]) {
  return (
    <div className={styles.row}>
      {genre.map((item, index) => {
        const isLast = index === genre.length - 1;
        return (
          <div key={index} className={styles.row}>
            <span className={styles.regularText}>{item.name}</span>
            {!isLast && <div className={styles.dot}>&bull;</div>}
          </div>
        );
      })}
    </div>
  );
}
