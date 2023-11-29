import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Navbar,
  Footer,
  HeaderBanner,
  Loading,
  CardIUmkm,
  CardAbout,
  CardAccordionIUmkm
} from 'components';
import { H3 } from 'components/atoms';
import PropTypes from 'prop-types';
import ImageDashboard from 'assets/images/banner/header-banner-iumkm.png';
import ImageDashboardMobile from 'assets/images/banner/image-dashboard-mobile.png';
import ImageIzinUsaha from 'assets/images/banner/image-izin-usaha.png';
import ImageIzinUsahaMobile from 'assets/images/banner/image-izin-usaha-mobile.png';
import ImagePIRT from 'assets/images/banner/image-p-irt.png';
import ImagePIRTMobile from 'assets/images/banner/image-p-irt-mobile.png';
import ImageAboutIUmkm from 'assets/images/illustrations/informasi-i-umkm.png';
import ImagePriceListIUmkm from 'assets/images/illustrations/price-list-i-umkm.png';
import classname from 'classnames';

// service
import { getprofileBussines } from '../../../services';

// style
import './styles.scss';

const mapStateToProps = ({ user }, ownProps) => ({ user });

class IUmkm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataNav: [{ title: 'I-UMKM', withArrow: false }],
      dataBusiness: [],
      activeIndex: null
    };
  }

  componentDidMount() {
    this.getDataBussines();
  }

  toggleButton = (index) => {
    const { activeIndex } = this.state;
    this.setState({
      activeIndex: activeIndex === index ? null : index
    });
  };

  getDataBussines = () => {
    getprofileBussines().then((data) => {
      this.setState({
        dataBusiness: data.data.results
      });
    });
  };

  render() {
    const { dataNav, dataBusiness, activeIndex } = this.state;
    const classNames = classname('o-iumkm', {});
    const types = [
      {
        id: 1,
        titleCardIumkm: 'Izin Usaha',
        descCardIUmkm:
          'Lakukan izin usaha terhadap usahamu agar usahamu mendapatkan perlindungan secara hukum,',
        registerButton:
          'https://docs.google.com/forms/d/e/1FAIpQLSfNrOrsvo_yqR1-1RlsLJKBy23TGtEXUSm_zISqpEurbz_Pcw/viewform',
        confirmButton:
          'https://docs.google.com/forms/d/e/1FAIpQLSfD9n1TT0BMgrJblPiXeBlnKut9uj605ILJbulleWECaTjfyA/viewform'
      },
      {
        id: 2,
        titleCardIumkm: 'P-IRT',
        descCardIUmkm:
          'Lakukan P-IRT terhadap usahamu agar usahamu dapat dipasarkan secara luas.',
        registerButton:
          'https://docs.google.com/forms/d/e/1FAIpQLSfzxNda6Jcj-LS-Xzmj9mmmOknCcTarBLgPDcMnjD1czKUm_g/viewform',
        confirmButton:
          'https://docs.google.com/forms/d/e/1FAIpQLSdHjH1uUXX-Zsxoyj4HemsnkP982L2bYq4rNDf4YPceR4uHaw/viewform'
      }
    ];

    const {
      props: { user }
    } = this;

    return (
      <div>
        <Loading loading={user.loading} />
        <div className={classNames}>
          <div className="i-umkm-header">
            <Navbar />
          </div>
          <HeaderBanner
            imageDesktop={ImageDashboard}
            imageMobile={ImageDashboardMobile}
            title="I-UMKM"
            withNav={dataNav}
          />
          <div className="container pb-64">
            <div className="wrapper__o-card-collapse">
              {types.map((type, index) => (
                <CardAccordionIUmkm
                  key={index}
                  title={type.titleCardIumkm}
                  desc={type.descCardIUmkm}
                  image={index === 0 ? ImageIzinUsaha : ImagePIRT}
                  imageMobile={
                    index === 0 ? ImageIzinUsahaMobile : ImagePIRTMobile
                  }
                  isOpen={index === activeIndex}
                  onClick={() => this.toggleButton(index)}
                >
                  {dataBusiness.map((business, index) => (
                    <CardIUmkm
                      key={index}
                      titleCardIumkm={business.business_name}
                      imageBackground={business.background_cover}
                      altImage={business.business_name}
                      actionButtonRegister={type.registerButton}
                      actionButtonConfirm={type.confirmButton}
                    />
                  ))}
                </CardAccordionIUmkm>
              ))}
            </div>
          </div>

          <div className="container pb-64">
            <H3 weight="bold" color="" className="desktop-only">
              Informasi I-UMKM
            </H3>
            <CardAbout
              titleCardAbout="Tentang I-UMKM"
              descCardAbout="I-UMKM adalah tanda legalitas kepada seseorang atau pelaku usaha/kegiatan tertentu dalam bentuk izin usaha mikro dan kecil dalam bentuk satu lembar.
						Tujuan
						untuk memberikan kepastian hukum dan sarana pemberdayaan bagi Pelaku Usaha Mikro, kecil dan menengah dalam ..."
              titleButtonCardAbout="BACA LEBIH LANJUT"
              imagePosition="right"
              imageCardAbout={ImageAboutIUmkm}
              altImageCardAbout="about i-umkm"
            />
            <CardAbout
              titleCardAbout="Daftar Harga Pengurusan I-UMKM"
              descCardAbout="Daftar harga pengurusan I-UMKM terbaru, untuk mendaftar I-UMKM harap dapat melengkapi berbagai persyaratan yang diperlukan untuk mendapatkan izin usaha seperti sebagai berikut ini ..."
              titleButtonCardAbout="BACA LEBIH LANJUT"
              imagePosition="left"
              imageCardAbout={ImagePriceListIUmkm}
              altImageCardAbout="price list i-umkm"
            />
          </div>

          <Footer />
        </div>
      </div>
    );
  }
}

IUmkm.propTypes = {
  user: PropTypes.object
};

IUmkm.defaultProps = {
  user: {}
};

export default connect(mapStateToProps)(IUmkm);
