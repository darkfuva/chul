import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import styles from "./navbar.module.scss"
import { showNavbar } from "@/app/store/slices/leftNavbarSlice";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

export default function HeaderNavbar() {
  const dispatch = useAppDispatch()
  const selector = useAppSelector((state)=>state.leftNavbar.isOpen)
  return (
    <div
      className={`${styles.headerNavbar} ${selector? styles.shiftHeader:styles.unshiftHeader}`}
    >
      <span onClick={()=>dispatch(showNavbar({isOpen: !selector}))} style={{ color: "white", fontSize:"50px",display: "flex", alignItems:'center'}}>
        <MenuOpenIcon style={{transform:"scaleX(-1)"}} fontSize="70px"></MenuOpenIcon>
      </span>
    </div>
  );
}
