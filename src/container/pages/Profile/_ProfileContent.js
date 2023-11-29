import React from 'react';
import PropTypes from 'prop-types';

import ProfileAccount from './_ProfileAccount';
import ProfileBusiness from './_ProfileBusiness';
import ProfileTraining from './_ProfileTraining';

const ProfileContent = ({ activeContent, onSave }) => {
  const ActiveContent = () => {
    switch (activeContent) {
      case 1:
        return <ProfileBusiness onSave={() => onSave('business')} />;
      case 2:
        return <ProfileTraining />;
      case 0:
        return (
          <ProfileAccount
            onSaveAccount={() => onSave('account')}
            onSavePIN={() => onSave('pin')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <main className="o-profile__card">
      <ActiveContent />
    </main>
  );
};

ProfileContent.propTypes = {
  activeContent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSave: PropTypes.func
};

ProfileContent.defaultProps = {
  activeContent: '',
  onSave: () => {}
};

export default ProfileContent;
