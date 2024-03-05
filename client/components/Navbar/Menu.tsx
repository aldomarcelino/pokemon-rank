/* eslint-disable @next/next/no-img-element */
import { useContext, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Maybe, Media } from '../../types';
import { CaretDown } from '../../utils/icons';
import styles from '../../styles/Navbar.module.scss';
import useDimensions from '../../hooks/useDimensions';
import { ModalContext } from '../../context/ModalContext';
import { getLocalStorage } from '../../utils/storage';

const Dialog = dynamic(import('../Dialog'));

const browseList = ['My Favorite'];

export default function Menu() {
  const pokemonFav = getLocalStorage('pokemonFav') || '';
  const [media, setMedia] = useState<Media>();
  const { setModalData, setIsModal } = useContext(ModalContext);
  const [loading, setLoading] = useState(false);
  const { isMobile, isTablet } = useDimensions();
  const menuRef = useRef<Maybe<HTMLDivElement>>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const onMenu = (): void => {
    setIsVisible(true);
  };
  const onClose = (): void => {
    setIsVisible(false);
  };

  const caretAnimation = {
    animate: isVisible ? 'up' : 'down',
    variants: {
      up: {
        rotate: 180
      },
      down: {
        rotate: 0
      }
    },
    transition: { duration: 0.25 }
  };

  const getMedia = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(JSON.parse(pokemonFav));
      setMedia(data);
      setModalData({
        id: data.id,
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
        url: JSON.parse(pokemonFav)
      });
      setIsModal(true);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <Image src='/assets/poke_logo_1.png' alt='' width={90} height={60} className={styles.nfLogo} />
      {isTablet || isMobile ? (
        <>
          <div className={styles.browse}>
            <div className={styles.options} onMouseOver={onMenu}>
              browse
            </div>
            <motion.div {...caretAnimation}>
              <CaretDown />
            </motion.div>
          </div>
          <Dialog dialogRef={menuRef} onClose={onClose} classname={styles.menu} visible={isVisible}>
            {browseList.map((item, index) => (
              <div key={index} className={styles.options}>
                {item}
              </div>
            ))}
          </Dialog>
        </>
      ) : (
        <>
          {pokemonFav != 'null' && (
            <div className={styles.options} onClick={getMedia}>
              My Favorite
            </div>
          )}
        </>
      )}
    </>
  );
}
