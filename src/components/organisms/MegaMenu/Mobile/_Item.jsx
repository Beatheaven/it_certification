import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { SystemIcon, TextTopNav } from 'components/atoms';

const MenuItem = (props) => {
  const { item, history } = props;
  const [showLink, setShowLink] = useState(false);

  return (
    <>
      <div key={item.name} className="m-row-wrapper">
        <TextTopNav
          to="#"
          color="white"
          className="mobile-menu"
          onClick={() => setShowLink(!showLink)}
        >
          <div>{item.name}</div>
          <SystemIcon name={!showLink ? 'simple-right' : 'arrow-simple-up'} />
        </TextTopNav>
      </div>
      {showLink ? (
        <div className="m-list-link">
          {item.links.map((link, i) => (
            <div
              key={i}
              className="m-list-link__item cursor-pointer"
              onClick={() => history.push(link.href)}
            >
              {link.text}
              <SystemIcon name="simple-right" />
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

MenuItem.propTypes = {
  history: PropTypes.object,
  item: PropTypes.object
};

MenuItem.defaultProps = {
  history: { push: '/' },
  item: {}
};

export default withRouter(MenuItem);
