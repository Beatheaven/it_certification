import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';
import moment from 'moment';
import { TextBody, Radio, Loading } from 'components/atoms';
import { ScoreSurvey, ContentCardSurvey } from 'components/molecules';

import { getHistorySurvey } from '../../../services';

// style
import './styles.scss';

class CardCategoryKompetensi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      currentHistory: null,
      date: '',
      category: '',
      score: 0,
      omzet: '',
      name: '',
      business: '',
      dataList: [{ group: 'Skala Usaha', score: 0, max_score: 10 }]
    };
  }

  componentDidMount() {
    const { historyIds } = this.props;
    if (historyIds.length) {
      this.setState({ currentHistory: historyIds[0] });
      this.getHistorySurvey(historyIds[0]);
    }
  }

  getHistorySurvey = (id) => {
    this.setState({ loading: true });
    getHistorySurvey(id)
      .then((response) => {
        const {
          created_at: date,
          umkm_category: category,
          average_score: score,
          business_name: business,
          full_name: name,
          omzet,
          summary
        } = response.data;
        const dateFormat = moment(date).format('DD MMMM YYYY');
        this.setState({
          date: dateFormat,
          category,
          score,
          business,
          name,
          omzet,
          dataList: summary,
          loading: false
        });
      })
      .catch((err) => {
        throw err;
      });
  };

  activeHistory = () => {
    const { currentHistory } = this.state;
    const { historyIds } = this.props;
    return historyIds.map((id, index) => (
      <Radio
        className="mr-16"
        key={id}
        id={id}
        name="activeHistory"
        isChecked={currentHistory === id}
        value={currentHistory}
        isMultipleChoice
        onChange={this.changeActiveHistory(id)}
      >
        <TextBody>
          {index === 0 ? 'Hasil survey terbaru' : 'Hasil survey sebelumnya'}
        </TextBody>
      </Radio>
    ));
  };

  changeActiveHistory = (id) => (e) => {
    this.setState({ currentHistory: id });
    this.getHistorySurvey(id);
  };

  render() {
    const {
      date,
      category,
      score,
      business,
      name,
      omzet,
      dataList,
      currentHistory,
      loading
    } = this.state;

    const dataChart = dataList.map((data, index) => ({
      subject: `${data.group} (${data.score})`,
      A: Math.round(data.score),
      fullMark: data.max_score
    }));

    const dataPdf = {
      category,
      score,
      date,
      name,
      business,
      omzet
    };

    const classNames = classname('o-card-category-kompetensi', {});
    const classContent = classname('o-card-category-kompetensi__content');
    const classHeader = classname('o-card-category-kompetensi__header');

    return (
      <div className={classNames}>
        <Loading loading={loading} />
        <div className={classHeader}>
          <TextBody weight="bold" color="black">
            KATEGORI KOMPETENSI
          </TextBody>
          <TextBody
            weight="regular"
            color="black"
          >{`Berdasarkan hasil survey ${date}`}</TextBody>
          <ScoreSurvey category={category} nameUmkm={`${omzet} ${category}`} />
        </div>
        <div className={classContent}>
          <ContentCardSurvey
            dataPdf={dataPdf}
            dataChart={dataChart}
            dataLegend={dataList}
            infoChart={this.activeHistory()}
            currentData={currentHistory}
          />
        </div>
      </div>
    );
  }
}

CardCategoryKompetensi.propTypes = {
  historyIds: PropTypes.array
};

CardCategoryKompetensi.defaultProps = {
  historyIds: []
};

export default CardCategoryKompetensi;
