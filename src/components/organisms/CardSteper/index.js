import React, { Component } from 'react';
import { StepperForm } from 'components/atoms';
import PropTypes from 'prop-types';
import classname from 'classnames';

// style
import './styles.scss';

class CardSteper extends Component {
  render() {
    const {
      props: { dataStepper, contentCard }
    } = this;
    const classNames = classname('o-card-stepper', {});
    // const classSteps = classname('o-card-stepper__step-wrapper', {});
    const classContent = classname('o-card-stepper__content-wrapper', {});
    return (
      <div className={classNames}>
        {/* <div className={classSteps}>
          {dataStepper.map((data, index) => (
            <StepperForm
              key={index}
              withLine={data.withLine}
              status={data.status}
              value={data.value}
              text={data.text}
              onClick={data.onClick}
            />
          ))}
        </div> */}
        <div className={classContent}>{contentCard}</div>
      </div>
    );
  }
}

CardSteper.propTypes = {
  dataStepper: PropTypes.array,
  contentCard: PropTypes.instanceOf(Object)
};

CardSteper.defaultProps = {
  dataStepper: [{}],
  contentCard: {}
};

export default CardSteper;
