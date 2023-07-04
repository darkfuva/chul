import Link from 'next/link';
import styles from './navbar.module.scss';
import InsightsIcon from '@mui/icons-material/Insights';
import HomeIcon from '@mui/icons-material/Home';
import ViewListIcon from '@mui/icons-material/ViewList';
import HistoryIcon from '@mui/icons-material/History';
import logo from '../../../public/foretail-logo.svg'
import { useAppSelector } from '@/app/store/hooks';
import { ClickAwayListener } from '@mui/material';
import { useDispatch } from 'react-redux';
import { showNavbar } from '@/app/store/slices/leftNavbarSlice';
const linksList = [
  { href: '/dashboard', label: 'Home', icon:  HomeIcon},
  { href: '/quotations', label: 'Track Quotations', icon: InsightsIcon },
  { href: '/ordersRaised', label: 'Track Orders', icon: ViewListIcon },
  { href: '/pastActivity', label: 'Past Activity', icon: HistoryIcon },
];

export default function LeftNavbar() {
  const dispatch=useDispatch();
  const isNavbarOpen = useAppSelector((state)=>state.leftNavbar.isOpen)
  return (
    <ClickAwayListener onClickAway={()=>dispatch(showNavbar({isOpen:false}))}>
    <div className={`${styles.leftNavbarContainer} ${isNavbarOpen?styles.showNavbarClass: styles.hideNavbarClass}`} >
      <div className={styles.leftNavbar}>
        <div className={styles.imageWrapper}>
          <img height={100} src={logo.src} width={200} alt="Website Logo"></img>
        </div>

        <div className={styles.linksContainer}>
          {linksList.map((val, index) => (
            <ul key={index}>
              <val.icon style={{margin:"0 10px"}}></val.icon>
              <Link href={val.href}>{val.label}</Link></ul>
          ))}
        </div>
      </div>
    </div>
    </ClickAwayListener>
  );
}
