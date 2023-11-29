/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import queryString from 'query-string';

import { withRouter } from 'react-router-dom';
import TabEdit from './_ProfileAccountEdit';
import TabPIN from './_ProfileAccountPIN';

const tabs = ['Profile Saya', 'Ubah PIN'];

// component declaration
const ProfileAccount = ({ onSaveAccount, onSavePIN, location }) => {
  // states
  const [activeTab, setActiveTab] = useState(0);

  const query = queryString.parse(location.search);
  useEffect(() => {
    if (query.tab === 'change-pin') {
      setActiveTab(1);
    }
  }, [query.tab]);

  // event handlers
  const handleChangeTab = (tab) => setActiveTab(tab);

  // getters
  const accountTabs = tabs.map((text, key) => ({
    key,
    text,
    className: classnames('a-tab-nav__item', { active: activeTab === key }),
    onClick: () => handleChangeTab(key)
  }));

  const ActiveContent = () => {
    switch (activeTab) {
      case 1:
        return <TabPIN onSave={onSavePIN} />;
      case 0:
      default:
        return <TabEdit onSave={onSaveAccount} />;
    }
  };

  return (
    <>
      <div className="o-profile__tabs">
        <div className="a-tab-nav">
          {accountTabs.map((tab) => (
            <span key={tab.key} className={tab.className} onClick={tab.onClick}>
              {tab.text}
            </span>
          ))}
        </div>
      </div>
      <div className="o-profile__content">
        <ActiveContent />
      </div>
    </>
  );
};

ProfileAccount.propTypes = {
  onSaveAccount: PropTypes.func,
  onSavePIN: PropTypes.func,
  location: PropTypes.object
};

ProfileAccount.defaultProps = {
  onSaveAccount: () => {},
  onSavePIN: () => {},
  location: {}
};

export default withRouter(ProfileAccount);
