import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  H3,
  Input,
  InputTextArea,
  Loading,
  TextBody
} from 'components/atoms';
import { Popup } from 'components/molecules';

// services
import {
  adminitrativeProvince,
  adminitrativeRegency,
  adminitrativeDistrict,
  adminitrativeKelurahan,
  updateDataUser
} from '../../../services';

const services = {
  province: adminitrativeProvince,
  regency: adminitrativeRegency,
  district: adminitrativeDistrict,
  kelurahan: adminitrativeKelurahan
};

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const getOptions = (target, slug) => {
  return new Promise((resolve, reject) => {
    services[target](slug)
      .then(({ data }) => {
        const options = data.results.map(({ id, name }) => ({
          value: id,
          label: name
        }));
        resolve(options);
      })
      .catch((err) => reject(err));
  });
};

// component declaration
const ProfilePopupAddress = ({ show, data, onClose, onSave }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState({});
  const [options, setOptions] = useState({});

  const getNextOptions = (target, payload) => {
    return new Promise((resolve, reject) => {
      const targets = Object.keys(services);
      const currentIndex = targets.findIndex((item) => item === target);

      if (currentIndex !== -1 && currentIndex !== targets.length - 1) {
        const nextTarget = targets[currentIndex + 1];
        getOptions(nextTarget, `?${target}_id=${payload}`)
          .then((nextOptions) => resolve([nextTarget, nextOptions]))
          .catch((err) => reject(err));
      }
    });
  };

  const getNextFields = (target) => {
    const targets = Object.keys(services);
    const currentIndex = targets.findIndex((item) => item === target);
    if (currentIndex !== -1 && currentIndex !== targets.length - 1) {
      const formEntries = [...targets]
        .splice(currentIndex + 1, targets.length)
        .map((i) => [i, '']);
      return Object.fromEntries(formEntries);
    }
    return {};
  };

  // side effects
  useEffect(() => {
    // did mount, populate province dropdown options
    let _isMounted = true;
    getOptions('province').then((province) => {
      if (_isMounted) {
        setOptions((o) => ({ ...o, province }));
        setIsLoading(false);
      }
    });
    return () => {
      _isMounted = false;
    };
  }, []);

  const prevShow = usePrevious(show);
  useEffect(() => {
    // populate form with previous data when opened and reset when closed
    if (prevShow !== show && show) {
      setForm((f) => ({
        ...f,
        province_id: data.province_id ?? 0,
        regency_id: data.regency_id ?? 0,
        district_id: data.district_id ?? 0,
        kelurahan_id: data.kelurahan_id ?? 0,
        address: data.address ?? '',
        region_id: data.region_id ?? 0,
        branch_id: data.branch_id ?? 0
      }));
      setOptions((o) => ({ ...o }));
    }
  }, [show, data, prevShow]);

  const prevForm = usePrevious(form);
  useEffect(() => {
    // fetch options when previous dropdown is selected
    const fieldHasChanged = (field) => {
      const fieldId = `${field}_id`;
      return form[fieldId] && prevForm[fieldId] !== form[fieldId];
    };
    const fields = ['province', 'regency', 'district'];
    const changedFields = fields.filter((field) => fieldHasChanged(field));
    const promises = changedFields.map((field) => {
      return getNextOptions(field, form[`${field}_id`]);
    });

    if (promises.length) {
      setIsLoading(true);
      Promise.all(promises)
        .then((fieldOptions) => {
          const newOptions = Object.fromEntries(fieldOptions);
          setOptions((o) => ({ ...o, ...newOptions }));
        })
        .finally(() => setIsLoading(false));
    }
  }, [form, prevForm]);

  // event handler
  const handleChange = (target, e) => {
    const newForm = {
      [target]: target === 'address' ? e.target.value : e.value
    };
    const resetForm = getNextFields(target);
    setForm({ ...form, ...resetForm, ...newForm });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    updateDataUser(form)
      .then(() => onSave())
      .finally(() => setIsLoading(false));
  };

  return (
    <Popup showPopup={show} onClickClosePopup={onClose} variant="form">
      <Loading loading={isLoading} />
      <>
        <H3 color="black" weight="black">
          Masukkan Alamat
        </H3>
        <TextBody color="" weight="regular">
          Masukkan alamat rumah Anda
        </TextBody>
        <form className="container" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <Input
                type="select"
                id="province"
                title="Provinsi"
                valueSelect={form.province_id}
                optionSelect={options.province}
                handleChange={(e) => handleChange('province_id', e)}
              />
            </div>
            <div className="col-md-6">
              <Input
                type="select"
                id="regency"
                title="Kota/Kabupaten"
                valueSelect={form.regency_id}
                optionSelect={options.regency}
                handleChange={(e) => handleChange('regency_id', e)}
              />
            </div>
            <div className="col-md-6">
              <Input
                type="select"
                id="district"
                title="Kecamatan"
                valueSelect={form.district_id}
                optionSelect={options.district}
                handleChange={(e) => handleChange('district_id', e)}
              />
            </div>
            <div className="col-md-6">
              <Input
                type="select"
                id="kelurahan"
                title="Kelurahan"
                valueSelect={form.kelurahan_id}
                optionSelect={options.kelurahan}
                handleChange={(e) => handleChange('kelurahan_id', e)}
              />
            </div>
            <div className="col-md-12">
              <InputTextArea
                type="text"
                id="address"
                placeholder="Masukkan alamat"
                title="Alamat"
                variant="title-black input-gray width-full"
                value={form.address}
                handleChange={(e) => handleChange('address', e)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Button
                type="submit"
                variant="primary"
                disabled={Object.values(form).some((field) => !field)}
              >
                SIMPAN
              </Button>
            </div>
          </div>
        </form>
      </>
    </Popup>
  );
};

ProfilePopupAddress.propTypes = {
  show: PropTypes.bool,
  data: PropTypes.object,
  onClose: PropTypes.func,
  onSave: PropTypes.func
};

ProfilePopupAddress.defaultProps = {
  show: false,
  data: {},
  onClose: () => {},
  onSave: () => {}
};

export default ProfilePopupAddress;
