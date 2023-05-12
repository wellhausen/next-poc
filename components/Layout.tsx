import React, { ReactNode, CSSProperties } from 'react';
import styles from './layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

interface LayoutStyles {
  container: CSSProperties;
}

export default function Layout({ children }: {children: ReactNode}) {
  return <div className={styles.container}>{children}</div>;
}