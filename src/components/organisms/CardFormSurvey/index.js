import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Links, StepperFormVertikal, Loading } from 'components/atoms';
import classname from 'classnames';

// style
import './styles.scss';

class CardFormSurvey extends Component {
  render() {
    const { mSideBar, contentCard, sidebarCard, loading } = this.props;

    const classNames = classname('o-card-form-vertikal', {});
    return (
      <div className={classNames}>
        <div className="o-card-form-vertikal__sidebar gray">
          <div className="o-card-form-vertikal__sidebar__text-content-sidebar--d">
            {sidebarCard.map((data) => (
              <div key={data.id62}>
                <StepperFormVertikal
                  key={data.id62}
                  status={data.status}
                  value={data.value}
                  text={data.text}
                  onClick={data.onClick}
                />
                {data.withLine ? <div className="line-v" /> : ''}
              </div>
            ))}
          </div>
          <div className="o-card-form-vertikal__sidebar__text-content-sidebar--m">
            <div className="text-left-page">1 dari 13</div>
            <div className="title-left">
              {sidebarCard.map((data) => (
                <div key={data.id62}>
                  <StepperFormVertikal
                    key={data.id62}
                    status={data.status}
                    value={data.value}
                    text={data.text}
                    onClick={data.onClick}
                  />
                  {data.withLine ? <div className="line-v" /> : ''}
                </div>
              ))}
            </div>
            <div className="title-right">
              <Links
                underline
                className=""
                to={mSideBar}
                variant="links-additional-info"
                color="red"
                tabIndex="-1"
                type="link"
              >
                LIHAT SEMUA
              </Links>
            </div>
          </div>
        </div>
        <div className="o-card-form-vertikal__content">
          <Loading loading={loading} />
          {contentCard}
        </div>
      </div>
    );
  }
}

CardFormSurvey.propTypes = {
  loading: PropTypes.bool,
  mSideBar: PropTypes.string,
  contentCard: PropTypes.object,
  sidebarCard: PropTypes.array
};

CardFormSurvey.defaultProps = {
  loading: false,
  mSideBar: '',
  contentCard: null,
  sidebarCard: [{}]
};

export default CardFormSurvey;
