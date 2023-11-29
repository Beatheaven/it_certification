import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, TextBody } from 'components/atoms';
import classname from 'classnames';
import moment from 'moment';

// style
import './styles.scss';

const formatDate = (date) => moment(date).format('DD MMMM YYYY');
const isDateValid = (date) => moment(date).isValid();

class CardSimpleButton extends Component {
  render() {
    const { date, titleCard, titleButton, actionButton, disabled } = this.props;

    const classNames = classname('o-card-simple-button', {});

    return (
      <div className={classNames}>
        <div className="o-card-simple-button_wrapper">
          <div className="title-card-wrapper">
            <TextBody color="black" weight="regular">
              {titleCard}
            </TextBody>
          </div>
          <div className="date-wrapper">
            <TextBody color="primary" weight="bold">
              {isDateValid(date) && formatDate(date)}
            </TextBody>
          </div>
          {titleButton && (
            <div className="a-button-wrapper">
              <Button
                variant="primary"
                disabled={disabled}
                onClick={actionButton}
              >
                {titleButton}
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

CardSimpleButton.propTypes = {
  date: PropTypes.string,
  titleCard: PropTypes.string,
  titleButton: PropTypes.string,
  disabled: PropTypes.bool,
  actionButton: PropTypes.func
};

CardSimpleButton.defaultProps = {
  date: '',
  titleCard: '',
  titleButton: '',
  disabled: false,
  actionButton: () => {}
};

export default CardSimpleButton;
