/* eslint-disable @next/next/no-img-element */
import dynamic from 'next/dynamic';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import styles from '../styles/Gen.module.scss';
import { ModalContext } from '../context/ModalContext';
import { Gene } from '../types';
import { Add } from '../utils/icons';

const Layout = dynamic(import('../components/Layout'));
const Modal = dynamic(import('../components/Modal'));
const Button = dynamic(import('../components/Button'));

export default function Generation(): React.ReactElement {
  const [media, setMedia] = useState<Gene[]>([]);
  const { isModal } = useContext(ModalContext);

  const getGent = async () => {
    try {
      const { data } = await axios.get('https://pokeapi.co/api/v2/generation');
      setMedia(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getGent();
  }, []);

  return (
    <>
      {isModal && <Modal />}
      <Layout>
        <div style={{ margin: '40px 80px' }}>
          {media &&
            media.map((item, index) => (
              <div key={index + '-gen'} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className={styles.button}>
                  <Button Icon={Add} rounded />
                  {`${index + 1} - ${item.name}`}
                </div>
              </div>
            ))}
        </div>
      </Layout>
    </>
  );
}
