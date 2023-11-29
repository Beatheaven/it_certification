import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';

import { H3, TextBody, Button } from 'components/atoms';

import ImgEmptyContent from '../../../assets/images/illustrations/empty-content.svg';

import './styles.scss';

const EmptyContent = ({
  title,
  description,
  showAction,
  actionClicked,
  titleAction
}) => {
  const classNames = classname('empty-content', {});
  return (
    <div className={classNames}>
      <img
        src={ImgEmptyContent}
        className="empty-content__image"
        alt="empty-content"
      />
      <div className="empty-content__text">
        <H3>{title}</H3>
        <TextBody color="gray" weight="light">
          {description}
        </TextBody>
        {showAction ? (
          <div className="empty-content__action">
            <Button variant="primary" onClick={actionClicked}>
              {titleAction}
            </Button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

EmptyContent.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  showAction: PropTypes.bool,
  actionClicked: PropTypes.func,
  titleAction: PropTypes.string
};

EmptyContent.defaultProps = {
  title: 'Mohon Maaf, Konten Belum Tersedia',
  description: '',
  showAction: false,
  actionClicked: () => {},
  titleAction: 'Kembali'
};

export default EmptyContent;
