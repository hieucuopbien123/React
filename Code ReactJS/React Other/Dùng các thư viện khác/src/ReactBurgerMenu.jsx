// # Các thư viện components / react-burger-menu
// # Basic / Có thể thêm style thuần css dạng component trong React

import { bubble as Menu } from 'react-burger-menu';
import { Fragment, useState } from "react";
import menuicon from "./assets/menuicon.svg";

// Phải chỉnh css 
var styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    right: '36px',
    top: '36px'
  },
  bmBurgerBars: {
    background: '#373a47'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px',
    top: "10px",
    left: "20px",
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenuWrap: {
    position: 'fixed',
  },
  bmMenu: {
    background: '#373a47',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em',
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    padding: '0.8em',
    height: "fit-content"
  },
  bmItem: {
    display: 'block',
    padding: "10px",
    textDecoration: "none",
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}

const ReactBurgerMenu = () => {

  // Khi cần ấn nút điều khiển bật tắt
  const [isOpenMenu, setOpenMenu] = useState(false);
  const closeAllMenusOnEsc = (e) => {
    e = e || window.event;
  
    if (e.key === 'Escape' || e.keyCode === 27) {
      setOpenMenu(false);
    }
  };

  // K dùng pageWrapId và outerContainerId tránh lỗi, bị giới hạn với 1 vài loại animation
  return(
    <Fragment>
      <Menu styles={ styles } width={ 280 } right customOnKeyDown={closeAllMenusOnEsc} isOpen={isOpenMenu}
        customBurgerIcon={ <img src={menuicon} /> }>
        <a id="home" href="/">Home</a>
        <a id="about" href="/about">About</a>
        <a id="contact" href="/contact">Contact</a>
        <a id="setting" href="/setting">Settings</a>
      </Menu>

      {/* Trong docs, muốn custom đủ mọi thứ phải chọc vào từng class vì code js k làm đc điều này */}
      <style jsx>{`
        .bm-item{
          color: #b8b7ad;
        }
        .bm-item:hover{
          color: red;
        }
      `}</style>
      {/* Với style global */}
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </Fragment>
  );
};

export default ReactBurgerMenu;
