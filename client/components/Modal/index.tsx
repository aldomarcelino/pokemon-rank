/* eslint-disable @next/next/no-img-element */
import React, { useContext } from 'react';
import styles from '../../styles/Modal.module.scss';
import { ModalContext } from '../../context/ModalContext';
import { Play, Love, AddFav } from '../../utils/icons';
import Button from '../Button';
import { Genre, Move } from '../../types';

export default function Modal() {
  const { modalData, setIsModal, isModal } = useContext(ModalContext);
  const { title, banner, rating, overview, poster, abilities, moviecast, height, weight, name, stats, moves } =
    modalData;

  return (
    <div className={styles.container} style={{ display: isModal ? 'flex' : 'none' }}>
      <div className={styles.overlay} onClick={() => setIsModal(false)}></div>
      <div className={styles.modal}>
        <div className={styles.spotlight}>
          {banner ? (
            <img src={banner} alt='spotlight' className={styles.spotlight__image} />
          ) : (
            <img src={poster} alt='spotlight' className={styles.poster} />
          )}

          <div className={styles.details}>
            <div className={styles.title}>{name}</div>
            <div style={{ padding: '4px 0px' }}>
              Height : <span style={{ color: '#FFF4A3' }}>{`${height / 10} M`}</span>, Weight :{' '}
              <span style={{ color: '#FFF4A3' }}>{`${weight / 10} Kg`}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div className={styles.buttonRow}>
                <Button Icon={Love} rounded />
                <div className={styles.greenText}>{rating}</div>
              </div>
              <div className={styles.buttonRow}>
                <Button label='Add to Favorite' filled Icon={AddFav} />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.cross} onClick={() => setIsModal(false)}>
          &#10005;
        </div>
        <div className={styles.bottomContainer}>
          <div className={styles.column}>
            <h3 style={{ marginBottom: '6px' }}>Stats</h3>
            {stats &&
              stats.map((item: { stat: { name: string }; base_stat: number }, idx) => (
                <div className={styles.statRow} style={{ marginBottom: '1px' }} key={`stat-${idx}`}>
                  <div style={{ width: '150px', textTransform: 'capitalize' }}>{item.stat.name}</div>:
                  <div style={{ marginLeft: '8px', color: '#FFF4A3' }}>{item.base_stat}</div>
                </div>
              ))}
          </div>
          <div className={styles.column}>
            <div className={styles.genre}>Moves: {renderMove(moves)} </div>
            {abilities?.length ? (
              <div className={styles.genre} style={{ marginTop: '8px' }}>
                Abilities:
                <div className={styles.CastCast}>
                  {abilities.map((item: { ability: { name: string } }, id) => (
                    <div key={id + '-ability'} className={styles.row}>
                      <span>&nbsp;{item.ability.name}</span>
                      {id !== abilities.length - 1 && <div>,</div>}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function renderMove(move: Move[]) {
  return (
    <div className={styles.row}>
      {move.map((item, index) => {
        const isLast = index === 29;
        if (index < 30)
          return (
            <div key={index} className={styles.row}>
              <span>&nbsp;{item.move.name}</span>
              {!isLast && <div>,</div>}
            </div>
          );
        return null;
      })}
    </div>
  );
}
