import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _pickBy from 'lodash/pickBy';
import _identity from 'lodash/identity';
import { Button, H3, Loading, TextBody } from 'components/atoms';
import { CardUsaha } from 'components/organisms';

import BusinessForm from './_ProfileBusinessForm';

import ImageAddUsaha from '../../../assets/images/illustrations/add-usaha.svg';
import { getprofileBussines } from '../../../services';

const paginationOptions = { perPage: 3 };

// component declaration
const ProfileBusiness = ({ onSave }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState('read');
  const [dataBusiness, setDataBusiness] = useState([]);
  const [businessToEdit, setBusinessToEdit] = useState({});
  const [pagination, setPagination] = useState({
    ...paginationOptions,
    currentPage: 1,
    totalPage: 1,
    totalItems: 0
  });

  // side effects
  useEffect(() => {
    // did mount
    let _isMounted = true;
    getprofileBussines().then(({ data }) => {
      const totalItems = Math.ceil(data.results.length);
      const totalPage = Math.ceil(totalItems / paginationOptions.perPage);
      if (_isMounted) {
        setDataBusiness(data.results);
        setPagination((p) => ({ ...p, totalPage, totalItems }));
        setIsLoading(false);
      }
    });
    return () => {
      _isMounted = false;
    };
  }, []);

  // event handlers
  const handleChangePage = (page) => {
    setPagination({ ...pagination, currentPage: page });
  };

  const handleEditBusiness = (item) => {
    setView('update');
    let itemToEdit = {
      ...item,
      address: item.address.address,
      province_id: item.address.province_id,
      regency_id: item.address.regency_id,
      category_id62: item.category.value,
      main_business_field: item.main_business_field.value,
      secondary_business_field: item.secondary_business_field.value,
      type: item.type.value
    };
    delete itemToEdit.category;
    itemToEdit = _pickBy(itemToEdit, _identity);
    setBusinessToEdit(itemToEdit);
  };

  const EmptyBusiness = () => {
    return (
      <div className="business-empty">
        <img
          src={ImageAddUsaha}
          className="business-empty__image"
          alt="empty-business"
        />
        <H3 color="black" weight="bold">
          Oops! Usahamu belum ada nih.
        </H3>
        <TextBody className="my-32" color="gray" weight="light">
          Kamu belum menambahkan usahamu <br />
          Yuk, tambah usahamu
        </TextBody>
        <Button variant="primary" onClick={() => setView('create')}>
          Tambah Usaha
        </Button>
      </div>
    );
  };

  const BusinessList = () => {
    const pageSkip = pagination.perPage * (pagination.currentPage - 1);
    const pageContent = dataBusiness.slice(
      pageSkip,
      pageSkip + pagination.perPage
    );

    return (
      <>
        <Loading loading={isLoading} />
        <section className="o-profile__body">
          <H3 color="black" weight="bold">
            Usaha Saya
          </H3>
          {pageContent && pageContent.length ? (
            <>
              {pageContent.map((e) => (
                <CardUsaha
                  key={e.id62}
                  imageBackgroundDesktop={e.logo}
                  imageBackgroundMobile={e.logo}
                  contentUsahaCard=""
                  titleCardDashboard={e.business_name}
                  withIcon
                  handleIcon={() => handleEditBusiness(e)}
                  addressCard={e.address?.full_addresss}
                  timeCard={moment(e.open_at, 'H:mm').format('H:mm')}
                  timeCardEnd={moment(e.close_at, 'H:mm').format('H:mm')}
                  actionButton=""
                />
              ))}
              <div className="m-button-wrapper mt-24">
                <Button variant="secondary" onClick={() => setView('create')}>
                  Tambah Usaha
                </Button>
                <div className="business-pagination">
                  <Button
                    className="mr-16"
                    variant="primary"
                    disabled={pagination.currentPage <= 1}
                    onClick={() => handleChangePage(pagination.currentPage - 1)}
                  >
                    Sebelumnya
                  </Button>
                  <Button
                    variant="primary"
                    disabled={pagination.currentPage >= pagination.totalPage}
                    onClick={() => handleChangePage(pagination.currentPage + 1)}
                  >
                    Berikutnya
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <EmptyBusiness />
          )}
        </section>
      </>
    );
  };

  const Content = () => {
    switch (view) {
      case 'create':
        return (
          <BusinessForm onCancel={() => setView('read')} onSave={onSave} />
        );
      case 'update':
        return (
          <BusinessForm
            isEdit
            prevData={businessToEdit}
            onCancel={() => setView('read')}
            onSave={onSave}
          />
        );
      default:
      case 'read':
        return <BusinessList />;
    }
  };

  return (
    <div className="o-profile__content">
      <Content />
    </div>
  );
};

ProfileBusiness.propTypes = {
  onSave: PropTypes.func
};

ProfileBusiness.defaultProps = {
  onSave: () => {}
};

export default ProfileBusiness;
