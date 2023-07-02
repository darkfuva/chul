'use client'
import LeftNavbar from '@/components/navbar/leftNavbar';
import './globals.css';
// import { mulish } from './font';
import styles from "./page.module.css"
import HeaderNavbar from '@/components/navbar/headerNavbar';
import { mulish } from './font';
import { StyledEngineProvider } from '@mui/styled-engine';
export const metadata = {
  title: 'JPL Portal',
  description: 'JSSI Parts and Leasing - Ecommerce Application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={mulish.className}>
      <StyledEngineProvider injectFirst>
        <main className={styles.main}>
          <div style={{ display: 'flex' }}>
            <LeftNavbar></LeftNavbar>
            <HeaderNavbar></HeaderNavbar>
            <div className={styles.contentContainer}>
                {children}
            </div>
          </div>
        </main>
        </StyledEngineProvider>
      </body>
    </html>
  );
}
