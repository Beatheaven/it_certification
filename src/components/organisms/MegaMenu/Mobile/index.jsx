import React from 'react';
import PropTypes from 'prop-types';

import { SystemIcon, TextTopNav } from 'components/atoms';

import MenuItem from './_Item';
import MENUS from '../_menuItem';

const MegaMenuMobile = ({ handleBack }) => {
  return (
    <div className="o-megamenu--mobile">
      <div className="m-row-wrapper">
        <TextTopNav
          to="#"
          color="white"
          className="mobile-submenu"
          onClick={handleBack}
        >
          <SystemIcon name="simple-left" className="mr-16" />
          <div>UMKM</div>
        </TextTopNav>
      </div>
      {MENUS.map((menu, i) => (
        <MenuItem key={i} item={menu} />
      ))}
    </div>
  );
};

MegaMenuMobile.propTypes = {
  handleBack: PropTypes.func
};

MegaMenuMobile.defaultProps = {
  handleBack: () => {}
};

export default MegaMenuMobile;
