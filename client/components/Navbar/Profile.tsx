/* eslint-disable @next/next/no-img-element */
import React from 'react';
import router from 'next/router';

import styles from '../../styles/Navbar.module.scss';
import { getLocalStorage, removeLocalStorage } from '../../utils/storage';

export default function Profile(): React.ReactElement {
  const accessToken = getLocalStorage('access_token');

  const onSignout = () => {
    removeLocalStorage('access_token');
    removeLocalStorage('pokemonFav');
    router.push('/');
  };

  return (
    <div className={styles.profile}>
      <img src='../../assets/avatar.png' alt='user' className={styles.user} />
      {accessToken ? (
        <div className={styles.signout}>
          <div onClick={onSignout}>Sign out</div>
        </div>
      ) : (
        <div className={styles.signin}>
          <div onClick={() => router.push('/')}>Sign In</div>
        </div>
      )}
    </div>
  );
}
