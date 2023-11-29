import { Button, NavItem, Navbar } from 'components';
import React, { useState, useEffect } from 'react';
import BannerPayment from '../../../assets/images/Banner.png';
import checkEmoji from '../../../assets/images/check.svg';
import videoPlayer from '../../../assets/images/video.svg';
import './styles.scss';

const PaymentPage = () => {
  const [activeButton, setActiveButton] = useState('Front End');
  const [description, setDescription] = useState([]);

  useEffect(() => {
    setActiveButton('Front End');
    setDescription([
      ' Belajar HTML',
      ' CSS testing',
      ' JAVA SCRIPT testing',
      ' API Testing',
      ' Mobil testing'
    ]);
  }, []);

  return (
    <div className="container">
      <Navbar />

      <div className="content">
        <div className="profile-box">
          <div className="profile-picture"></div>
          <div className="profile-name-box">
            <div className="profile-name">Hartoyo </div>
            <div className="profile-role">Frontend</div>
          </div>
        </div>

        <div className="banner">
          <img src={BannerPayment} alt="banner-payment" />
        </div>

        <div className="class-box">
          <h1> Class</h1>
          <div className="class-item">
            <Button
              className={activeButton === 'Front End' ? 'active' : ''}
              onClick={() => {
                setActiveButton('Front End');
                setDescription([
                  ' Belajar HTML',
                  ' CSS testing',
                  ' JAVA SCRIPT testing',
                  ' API Testing',
                  ' Mobil testing'
                ]);
              }}
              family="Poppins"
            >
              Frontend
            </Button>
            <Button
              className={activeButton === 'Back End' ? 'active' : ''}
              onClick={() => {
                setActiveButton('Back End');
                setDescription([
                  ' Memahami manajemen',
                  ' Backend testing',
                  ' Input data testing',
                  ' Edit data Testing',
                  ' Pengelolaan'
                ]);
              }}
              family="Poppins"
            >
              Backend
            </Button>
            <Button
              className={activeButton === 'QA' ? 'active' : ''}
              onClick={() => {
                setActiveButton('QA');
                setDescription([
                  ' Konsep dasar quality assurance',
                  ' QA testing',
                  ' Website testing',
                  ' API testing',
                  ' Mobile testing'
                ]);
              }}
              family="Poppins"
              style={{ fontSize: '16px' }}
            >
              Quality Assurance
            </Button>
            <Button
              className={activeButton === 'UIUX' ? 'active' : ''}
              onClick={() => {
                setActiveButton('UIUX');
                setDescription([
                  ' Apa itu UI/UX',
                  ' Istilah-istilah dalam dunia UI/UX',
                  ' Pengenalan Figma sebagai tools UI/UX Design',
                  ' Prototyping',
                  ' Wireframing'
                ]);
              }}
              family="Poppins"
              style={{ fontSize: '16px', width: '241px' }}
            >
              User interface <br />
              User experience
            </Button>
          </div>
        </div>

        <div className="description-box">
          <div className="grid-item1">
            <div className="desc-title">yang akan dipelajari</div>
            <div className="desc-list">
              <ul>
                {description.map((item, index) => (
                  <li key={index}>
                    <img src={checkEmoji} alt="check" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div class="grid-item2">
            <img src={videoPlayer} alt="video" />
            <div className="payment-desc">
              <div className="price">Rp. 250.OOO</div>
              <Button className="pay-btn">Pay Now</Button>
              <div className="pay-guarantee">Jaminan uang kembali</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
