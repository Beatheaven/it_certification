import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleMegamenuOverlay } from 'helpers';

// components
import { H4, TextBody, Links, SystemIcon } from 'components/atoms';
import MENUS from './_menuItem';

// styles
import './styles.scss';

// component declaration
const MegaMenu = () => {
  // hooks
  const dispatch = useDispatch();
  const isMegaMenuOpen = useSelector((state) => state.ui.megamenu);
  const outsideRef = useRef(null);

  // event handlers
  const toggleMegaMenu = () => {
    dispatch({ type: 'ui/TOGGLE_MEGAMENU' });
    toggleMegamenuOverlay(!isMegaMenuOpen);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (outsideRef.current && !outsideRef.current.contains(event.target)) {
        dispatch({ type: 'ui/TOGGLE_MEGAMENU' });
        toggleMegamenuOverlay(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outsideRef]);

  return (
    isMegaMenuOpen && (
      <div className="o-megamenu" ref={outsideRef}>
        <div className="container">
          <div className="row">
            <div className="col">
              <H4>Usaha Mikro, Kecil, dan Menengah</H4>
            </div>
            {MENUS.map((menu) => (
              <div className="col" key={menu.name}>
                <H4 className="a-category">{menu.name}</H4>
                {menu.links.map((link, index) => (
                  <Links key={index} to={link.href} onClick={toggleMegaMenu}>
                    <TextBody>{link.text}</TextBody>
                    <SystemIcon name="simple-right" color="primary" />
                  </Links>
                ))}
              </div>
            ))}
            <div className="col" />
          </div>
        </div>
      </div>
    )
  );
};

MegaMenu.propTypes = {};

export default MegaMenu;
