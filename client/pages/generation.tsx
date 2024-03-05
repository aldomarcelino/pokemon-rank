/* eslint-disable @next/next/no-img-element */
import dynamic from 'next/dynamic';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import styles from '../styles/Gen.module.scss';
import { ModalContext } from '../context/ModalContext';
import { Gene } from '../types';
import { Add, Love } from '../utils/icons';

const Layout = dynamic(import('../components/Layout'));
const Modal = dynamic(import('../components/Modal'));
const Button = dynamic(import('../components/Button'));

export default function Generation(): React.ReactElement {
  const [media, setMedia] = useState<Gene[]>([]);
  const { isModal } = useContext(ModalContext);

  const handleShort = (arr: any) => arr.sort((a: any, b: any) => b.vote - a.vote);

  const getGent = async () => {
    try {
      const { data } = await axios.get('https://pokeapi.co/api/v2/generation');
      const temp =
        data &&
        data.results.map((item: { name: string; url: string }, index: number) => ({ ...item, vote: 100 - index }));

      setMedia(handleShort(temp));
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = (name: string) => {
    const find = media.find(item => item.name === name);
    const temp = media.filter(item => item.name !== name);
    if (find && temp) {
      const result = handleShort([...temp, { ...find, vote: find?.vote + 1 }]);
      setMedia(result);
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
                  <Button Icon={Add} rounded onClick={() => handleAdd(item.name)} />
                  {`${index + 1} - ${item.name}`}
                  <div
                    style={{
                      display: 'flex',
                      border: '1px solid white',
                      padding: '4px',
                      borderRadius: '8px',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '70px',
                      gap: '4px'
                    }}>
                    <Love /> {item.vote}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </Layout>
    </>
  );
}
