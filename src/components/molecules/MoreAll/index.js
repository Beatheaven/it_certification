import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';
import { Button, H3 } from 'components/atoms';

// style
import './styles.scss';

const MoreAll = ({
  className,
  variant,
  titleCard,
  titleButton,
  actionButton,
  hideActionButton
}) => {
  const classNames = classname('o-more-all', className, variant);
  return (
    <div className={classNames}>
      <div className="o-more-all__wrapper">
        <div className="text__wrapper">
          <H3 weight="bold" color="" className="desktop-only">
            {titleCard}
          </H3>
        </div>
        {!hideActionButton && (
          <div className="button__wrapper">
            <Button variant="primary" onClick={actionButton}>
              {titleButton}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

MoreAll.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.string,
  titleCard: PropTypes.string,
  titleButton: PropTypes.string,
  actionButton: PropTypes.func,
  hideActionButton: PropTypes.bool
};

MoreAll.defaultProps = {
  className: '',
  variant: '',
  titleCard: '',
  titleButton: '',
  actionButton: () => {},
  hideActionButton: false
};

export default MoreAll;
