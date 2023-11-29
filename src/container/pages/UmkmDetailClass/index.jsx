import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Player, BigPlayButton } from 'video-react';
import classname from 'classnames';
import { withRouter } from 'react-router-dom';

import { HeaderBannerUmkm, Navbar, H3, Footer } from 'components';

import { getDetailClass, postTakeModule } from 'services';

import ContentAboutCourses from './ContentAboutCourses';
import ContentVideoCourses from './ContentVideoCourses';
import ContentModulesCourses from './ContentModulesCourses';
import ContentTestCourses from './ContentTestCourses';
import ContentWebinar from './ContentWebinar';

import './styles.scss';

class UmkmDetailClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'about',
      tabMenu: [
        {
          name: 'about',
          title: 'Tentang Kursus'
        },
        {
          name: 'video',
          title: 'Video'
        },
        {
          name: 'modul',
          title: 'Modul'
        },
        {
          name: 'test',
          title: 'Tes'
        },
        {
          name: 'webinar',
          title: 'Webinar'
        }
      ],
      videoSource: null,
      documentSource: null,
      sourceType: 'video',
      detailClass: {},
      selectedVideo: null,
      selectedModul: null
    };
  }

  componentDidMount() {
    this.getDetailClass();
  }

  componentDidUpdate(prevProps, prevState) {
    const { videoSource } = this.state;
    if (videoSource !== prevState.videoSource) {
      this.player.load();
    }
  }

  getDetailClass = () => {
    const { match } = this.props;
    const { classId } = match.params;

    getDetailClass(classId)
      .then((response) => {
        this.setState({
          detailClass: response.data,
          videoSource: response.data.videos.length
            ? response.data.videos[0].url
            : null,
          selectedVideo: response.data.videos.length
            ? response.data.videos[0].id62
            : null
        });
      })
      .catch((err) => {
        throw err;
      });
  };

  handlePostTakeModule = (moduleId) => {
    const { match } = this.props;
    const { classId } = match.params;
    const data = {
      class_id62: classId,
      module_id62: moduleId
    };

    postTakeModule(data)
      .then((response) => {})
      .catch((err) => {
        throw err;
      });
  };

  handleChangeVideo = (val) => {
    this.handlePostTakeModule(val.id);
    this.setState({
      sourceType: 'video',
      videoSource: val.url,
      selectedVideo: val.id
    });
  };

  handleChangeDocument = (val) => {
    this.handlePostTakeModule(val.id);
    this.setState({
      sourceType: 'document',
      documentSource: val.url,
      selectedModul: val.id
    });
  };

  render() {
    const classNames = classname('o-umkm-smart o-umkm-detail-class', {});
    const {
      activeTab,
      tabMenu,
      videoSource,
      documentSource,
      sourceType,
      detailClass,
      selectedVideo,
      selectedModul
    } = this.state;
    let tabContent;

    switch (activeTab) {
      case 'about':
        tabContent = <ContentAboutCourses dataAbout={detailClass} />;
        break;
      case 'video':
        tabContent = (
          <ContentVideoCourses
            titleClass={detailClass.display_name}
            dataVideo={detailClass.videos}
            selectedVideo={selectedVideo}
            changeVideoSource={(val) => this.handleChangeVideo(val)}
          />
        );
        break;
      case 'modul':
        tabContent = (
          <ContentModulesCourses
            titleClass={detailClass.display_name}
            dataModule={detailClass.modules}
            selectedModul={selectedModul}
            changeDocumentSource={(val) => this.handleChangeDocument(val)}
          />
        );
        break;
      case 'test':
        tabContent = (
          <ContentTestCourses titleClass={detailClass.display_name} />
        );
        break;
      case 'webinar':
        tabContent = <ContentWebinar dataWebinar={detailClass.webinar} />;
        break;
      default:
        break;
    }

    return (
      <>
        <div className={classNames}>
          <div className="umkm-header">
            <Navbar />
          </div>
          <HeaderBannerUmkm />
          <div className="container my-16">
            <H3 color="black" weight="bold">
              {detailClass.display_name}
            </H3>
            <div className="courses-card">
              <div
                className="courses-content"
                style={{
                  backgroundImage: `url(${detailClass.background_cover})`
                }}
              >
                {sourceType === 'video' && videoSource && (
                  <Player
                    ref={(player) => {
                      this.player = player;
                    }}
                    videoId="video-1"
                  >
                    <BigPlayButton id="dataaa" position="center" />
                    <source src={videoSource} />
                  </Player>
                )}
                {sourceType === 'document' && documentSource && (
                  <embed
                    src={documentSource}
                    type="application/pdf"
                    width="100%"
                    height="600px"
                  />
                )}
              </div>
              <div className="courses-tabs">
                <div className="tab-nav">
                  {tabMenu.map((item) => (
                    <div
                      className={`tab-nav__item ${
                        activeTab === item.name ? 'active' : ''
                      }`}
                      onClick={() => this.setState({ activeTab: item.name })}
                    >
                      {item.title}
                    </div>
                  ))}
                </div>
                <div className="courses-tabs__content">{tabContent}</div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

UmkmDetailClass.propTypes = {
  match: PropTypes.object
};

UmkmDetailClass.defaultProps = {
  match: {}
};

export default withRouter(UmkmDetailClass);
