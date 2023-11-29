import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classname from 'classnames';
import moment from 'moment';
import 'moment/locale/id';

import { H3, TextBody, Links } from 'components/atoms';

import './styles.scss';

class CardNews extends Component {
  render() {
    const { title, date, description, url, image } = this.props;
    const classNames = classname('o-card-news', {});

    moment.locale('id');
    const formatDate = (date) => moment(date).format('dddd, DD MMMM YYYY');
    const isDateValid = (date) => moment(date).isValid();

    return (
      <div className={classNames}>
        <div className="o-card-news__background">
          <img src={image} alt="img-news" />
        </div>
        <div className="o-card-news__content">
          <div className="news-date">
            <TextBody>{isDateValid(date) && formatDate(date)}</TextBody>
          </div>
          <div className="news-title">
            <H3>{title}</H3>
          </div>
          <div className="news-desc">
            <TextBody color="grey">{description}</TextBody>
          </div>
          <div className="news-link">
            <Links underline color="red" to={url} tabIndex="-1" type="link">
              Baca Selengkapnya
            </Links>
          </div>
        </div>
      </div>
    );
  }
}

CardNews.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  image: PropTypes.string
};

CardNews.defaultProps = {
  title: '',
  date: '',
  description: '',
  url: '/',
  image: ''
};

export default withRouter(CardNews);
