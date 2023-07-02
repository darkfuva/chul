import Link from 'next/link';
import styles from './navbar.module.scss';
import InsightsIcon from '@mui/icons-material/Insights';
import HomeIcon from '@mui/icons-material/Home';
import ViewListIcon from '@mui/icons-material/ViewList';
import HistoryIcon from '@mui/icons-material/History';
const linksList = [
  { href: '/dashboard', label: 'Home', icon:  HomeIcon},
  { href: '/quotations', label: 'Track Quotations', icon: InsightsIcon },
  { href: '/ordersRaised', label: 'Track Orders', icon: ViewListIcon },
  { href: '/pastActivity', label: 'Past Activity', icon: HistoryIcon },
];

export default function LeftNavbar() {
  return (
    <div className={styles.leftNavbarContainer}>
      <div className={styles.leftNavbar}>
        <div className={styles.imageWrapper}>
          <img height={100} width={100} alt="Website Logo"></img>
        </div>
        <div className={styles.websiteTitle}>
          <span>Website Name</span>
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
  );
}
