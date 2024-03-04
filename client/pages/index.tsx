import Head from 'next/head';
import Image from 'next/image';
import { NextRouter, useRouter } from 'next/router';

import styles from '../styles/Login.module.scss';
import LoginBg from '../public/assets/loginBg.jpg';
import { ROUTES } from '../config/route';
import { useEffect, useState } from 'react';

export default function Home(): React.ReactElement {
  const router: NextRouter = useRouter();
  const status = router.query.status || '';

  const [isShow, setIsShow] = useState(false);
  const [isRegisterd, setIsregisterd] = useState(false);

  useEffect(() => {
    if (isRegisterd) {
      setTimeout(() => {
        setIsregisterd(false);
        router.push('/');
      }, 3000);
    }
  }, [isRegisterd]);

  const onSignIn = () => {
    router.push(ROUTES.BROWSE);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>MyPokemon</title>
        <meta name='description' content='Netflix clone, made using Next.js' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <Image src={LoginBg} alt='background image' placeholder='blur' layout='fill' className={styles.main__bgImage} />
        {status !== 'signup' ? (
          <div className={styles.main__card}>
            <h1>MyPokemon</h1>
            <div className={styles.wrapInput}>
              <input className={styles.textField} placeholder='Email or Phone Number' type='text' />
              <input className={styles.textField} placeholder='Password' type='password' />
            </div>
            <p>A simple Netflix clone built using Next.js</p>
            <div className={styles.button} onClick={onSignIn}>
              Sign in
            </div>
            <div className={styles.signUp} onClick={() => router.push('/?status=signup')}>
              Sign Up
            </div>
          </div>
        ) : (
          <div className={styles.containSecond}>
            {isRegisterd ? (
              <p className={styles.message}>Your Account Registered Succesfully You Can Now Sign In with it</p>
            ) : (
              <>
                <h1>Sign Up</h1>
                <div className={styles.wrapInput}>
                  <input className={styles.textField} placeholder='Name' type='text' />
                  <input className={styles.textField} placeholder='Email' type='text' />
                  <input className={styles.textField} placeholder='Phone Number' type='text' />
                  <input className={styles.textField} placeholder='Password' type={isShow ? 'test' : 'password'} />
                  <input className={styles.textField} placeholder='Re Password' type={isShow ? 'test' : 'password'} />
                </div>
                <p className={styles.showpass} onClick={() => setIsShow(!isShow)}>
                  {isShow ? 'Hide Password' : 'Show Password'}
                </p>
              </>
            )}
            {!isRegisterd && (
              <>
                <div className={styles.button} onClick={() => setIsregisterd(true)}>
                  Submit
                </div>
                <div className={styles.signUp} onClick={() => router.push('/')}>
                  Sign In
                </div>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
