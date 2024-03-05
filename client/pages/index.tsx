import Head from 'next/head';
import Image from 'next/image';
import { NextRouter, useRouter } from 'next/router';
import axios from 'axios';

import styles from '../styles/Login.module.scss';
import LoginBg from '../public/assets/pokemon.jpeg';
import { ROUTES } from '../config/route';
import { ChangeEvent, SetStateAction, useEffect, useState } from 'react';
import { setIsLoggedIn } from '../store/slice/useSlice';
import { useDispatch } from 'react-redux';
import { getLocalStorage, setLocalStorage } from '../utils/storage';
import { HidePass, Poke, ShowPass } from '../utils/icons';

export default function Home(): React.ReactElement {
  const router: NextRouter = useRouter();
  const status = router.query.status || '';
  const dispatch = useDispatch();
  const accessToken = getLocalStorage('access_token');

  // Initialize
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [userName, setUserName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState();
  const [isShow, setIsShow] = useState(false);
  const [isRegisterd, setIsregisterd] = useState(false);
  const [error, setError] = useState('');

  const handleClear = () => {
    setEmail(undefined);
    setPassword(undefined);
    setUserName(undefined);
    setPhoneNumber(undefined);
    setAddress(undefined);
    setError('');
  };

  const handleChange = (
    setValue: { (value: SetStateAction<undefined>): void; (arg0: any): void },
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setError('');
    setValue(e.target.value);
  };

  const onSignIn = async () => {
    if (!email) {
      setError('email is required.');
      return;
    }
    if (!password) {
      setError('password is required.');
      return;
    }
    try {
      const { data } = await axios.post('http://localhost:3000/signin', { email, password });

      if (data) {
        setLocalStorage('access_token', data.accessToken);
        setLocalStorage('pokemonFav', data.user.favoriteId);
        dispatch(setIsLoggedIn(true));
        router.push(ROUTES.BROWSE);
      }
    } catch (error: any) {
      setError(error.response && error.response.data && error.response.data.message);
    }
  };

  const handleRegister = async () => {
    if (!email) {
      setError('email is required.');
      return;
    }
    if (!password) {
      setError('password is required.');
      return;
    }
    if (!phoneNumber) {
      setError('phone number is required.');
      return;
    }
    try {
      const { data } = await axios.post('http://localhost:3000/signup', {
        username: userName,
        email,
        password,
        phoneNumber,
        address
      });

      if (data) {
        setIsregisterd(true);
      }
    } catch (error: any) {
      setError(error.response && error.response.data && error.response.data.message);
    }
  };

  useEffect(() => {
    if (accessToken) {
      dispatch(setIsLoggedIn(true));
      router.push(ROUTES.BROWSE);
    }
  }, [accessToken]);

  useEffect(() => {
    if (isRegisterd) {
      setTimeout(() => {
        setIsregisterd(false);
        router.push('/');
      }, 3000);
    }
  }, [isRegisterd]);

  return (
    <div className={styles.container}>
      <Head>
        <title>MyPokemon</title>
        <meta name='description' content='Netflix clone, made using Next.js' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <Image src={LoginBg} alt='background image' placeholder='blur' layout='fill' className={styles.bgLogin} />
        {status !== 'signup' ? (
          <div className={styles.main__card} style={{ height: '430px' }}>
            <div
              style={{ display: 'flex', gap: '4px', alignItems: 'center', cursor: 'pointer', width: '220px' }}
              onClick={() => router.push('/browse')}>
              <Poke style={{ fontSize: '45px' }} />
              <h1>MyPokemon</h1>
            </div>
            <div className={styles.wrapInput}>
              <input
                className={styles.textField}
                placeholder='Email'
                type='text'
                value={email}
                onChange={e => handleChange(setEmail, e)}
              />
              <input
                className={styles.textField}
                placeholder='Password'
                type={isShow ? 'test' : 'password'}
                value={password}
                onChange={e => handleChange(setPassword, e)}
              />
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'end',
                marginTop: '8px',
                marginRight: '4px',
                fontSize: '18px'
              }}>
              {isShow ? (
                <ShowPass onClick={() => setIsShow(false)} style={{ cursor: 'pointer' }} />
              ) : (
                <HidePass onClick={() => setIsShow(true)} style={{ cursor: 'pointer' }} />
              )}
            </div>

            {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

            <p>A simple Pokemon Rank built using Next.js</p>
            <div className={styles.button} onClick={onSignIn}>
              Sign in
            </div>
            <div
              className={styles.signUp}
              onClick={() => {
                router.push('/?status=signup');
                handleClear();
              }}>
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
                  <input
                    className={styles.textField}
                    placeholder='Name'
                    type='text'
                    value={userName}
                    onChange={e => handleChange(setUserName, e)}
                  />
                  <input
                    className={styles.textField}
                    placeholder='Email'
                    type='text'
                    value={email}
                    onChange={e => handleChange(setEmail, e)}
                  />
                  <input
                    className={styles.textField}
                    placeholder='Password'
                    type={isShow ? 'test' : 'password'}
                    value={password}
                    onChange={e => handleChange(setPassword, e)}
                  />
                  <input
                    className={styles.textField}
                    placeholder='Phone Number'
                    type='text'
                    value={phoneNumber}
                    onChange={e => handleChange(setPhoneNumber, e)}
                  />
                  <input
                    className={styles.textField}
                    placeholder='Address'
                    type='test'
                    value={address}
                    onChange={e => handleChange(setAddress, e)}
                  />
                </div>
                <p className={styles.showpass} onClick={() => setIsShow(!isShow)}>
                  {isShow ? 'Hide Password' : 'Show Password'}
                </p>
              </>
            )}
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
            {!isRegisterd && (
              <>
                <div className={styles.button} onClick={handleRegister}>
                  Submit
                </div>
                <div
                  className={styles.signUp}
                  onClick={() => {
                    router.push('/');
                    handleClear();
                  }}>
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
