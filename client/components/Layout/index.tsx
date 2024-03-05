import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

import useScrollLimit from '../../hooks/useScrollLimit';
import styles from '../../styles/Browse.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getLocalStorage } from '../../utils/storage';
import { selectIsLoggedIn, setIsLoggedIn } from '../../store/slice/useSlice';

const Footer = dynamic(import('../Footer'));
const Navbar = dynamic(import('../Navbar'));

interface Layout {
  children: React.ReactNode;
}

const SCROLL_LIMIT: number = 80;

export default function Layout({ children }: Layout) {
  const isScrolled: boolean = useScrollLimit(SCROLL_LIMIT);
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const accessToken = getLocalStorage('access_token');

  useEffect(() => {
    if (accessToken) {
      dispatch(setIsLoggedIn(true));
    }
  }, [accessToken, dispatch, isLoggedIn]);

  return (
    <div className={styles.container}>
      <Navbar isScrolled={isScrolled} />
      {children}
      <Footer />
    </div>
  );
}
