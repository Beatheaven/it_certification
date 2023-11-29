import React, { useState, useEffect } from 'react';
import classname from 'classnames';

import { HeaderBannerUmkm, Navbar, H2, Footer } from 'components';

import ItemHistory from './_ItemHistory';

import { getTestResult } from '../../../services';

import './styles.scss';

const UmkmClassHistory = () => {
  const classNames = classname('o-umkm-smart', {});
  const [classHistory, setClassHistory] = useState([]);

  useEffect(() => {
    getTestResult()
      .then(({ data }) => {
        setClassHistory(data.results);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <div className={classNames}>
        <div className="umkm-header">
          <Navbar />
        </div>
        <HeaderBannerUmkm />
        <div className="container pb-64">
          <H2 className="my-32">Riwayat Kursus</H2>
          <div className="history-class">
            <div className="history-class__header">
              <div className="history-class__header--item">Kursus</div>
              <div className="history-class__header--item">Durasi</div>
              <div className="history-class__header--item">Selesai</div>
              <div className="history-class__header--item">Skor</div>
            </div>
            {classHistory?.length ? (
              classHistory.map((history, i) => (
                <ItemHistory key={i} data={history}>
                  {history.score?.all.map((tes) => (
                    <div>{tes.score}</div>
                  ))}
                </ItemHistory>
              ))
            ) : (
              <div className="history-class__body no-data">Belum ada data</div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default UmkmClassHistory;
