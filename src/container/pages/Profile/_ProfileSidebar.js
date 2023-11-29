import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { H4, SideBarMenu } from 'components/atoms';

// assets
import emptyAvatar from '../../../assets/images/default-avatar-m.png';

const ProfileSidebar = ({ menus }) => {
  const user = useSelector((state) => state.user);
  const { profile, survey } = user ?? {};

  return (
    <aside className="o-profile__card">
      <div className="o-profile__sidebar">
        <div className="a-avatars">
          <img
            src={profile?.profile?.avatar ?? emptyAvatar}
            alt={profile?.full_name ?? ''}
          />
        </div>
        <div className="text-wrapper">
          <H4 weight="bold">{profile?.full_name ?? ''}</H4>
          <div className="text-wrapper__subs">
            <H4 weight="bold" color="primary" className="mb-0">
              {survey?.sub_category ?? ''}
            </H4>
          </div>
        </div>
      </div>
      <div className="o-profile__sidebar">
        {menus.map((menu, index) => (
          <div className="sidebar-menu" key={index}>
            <SideBarMenu
              key={index}
              icon={menu.icon}
              status={menu.status}
              text={menu.text}
              onClick={menu.onClick}
            />
          </div>
        ))}
      </div>
    </aside>
  );
};

ProfileSidebar.propTypes = {
  menus: PropTypes.array
};

ProfileSidebar.defaultProps = {
  menus: []
};

export default ProfileSidebar;
