/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _pickBy from 'lodash/pickBy';
import _identity from 'lodash/identity';

// components
import {
  Button,
  H3,
  H4,
  Input,
  InputTextArea,
  Loading,
  Notification,
  Radio,
  TextBody
} from 'components/atoms';

// assets
import IconCamera from '../../../assets/images/icon-camera.png';

// services
import {
  adminitrativeProvince,
  adminitrativeRegency,
  adminitrativeRegion,
  adminitrativeBranch,
  adminitrativeSupervisor,
  businessTypeChoice,
  mainBusinessChoice,
  secondaryBusinessChoice,
  profileBussines,
  updateBusinessById
} from '../../../services';

const services = {
  province: adminitrativeProvince,
  regency: adminitrativeRegency,
  region: adminitrativeRegion,
  branch: adminitrativeBranch,
  supervisor: adminitrativeSupervisor,
  type: businessTypeChoice,
  main_business_field: mainBusinessChoice,
  secondary_business_field: secondaryBusinessChoice
};

const defaultImage =
  'https://img2.pngio.com/navy-blue-seamless-rectangular-backgroun-1035579-png-images-pngio-navy-blue-backgroun-png-1920_1080.png';

const errorTemplates = {
  address: 'Masukkan alamat lengkap usahamu',
  business_name: 'Masukkan nama usahamu',
  business_started_year: 'Masukkan tahun mulai',
  main_business_field: 'Pilih bidang usaha utamamu',
  province_id: 'Pilih provinsi domisili usahamu',
  regency_id: 'Pilih kabupaten/kota usahamu',
  secondary_business_field: 'Pilih bidang usaha pendukungmu',
  type: 'Pilih salah satu jawaban dibawah ini',
  region_id: 'Pilih kanwil domisili usahamu',
  branch_id: 'Pilih kanca domisili usahamu',
  close_at: 'Masukkan jam tutup',
  open_at: 'Masukkan jam buka'
};

const formFields = [
  'address',
  'business_name',
  'business_started_year',
  'main_business_field',
  'province_id',
  'regency_id',
  'secondary_business_field',
  'type',
  'background_cover',
  'logo',
  'region_id',
  'branch_id',
  'close_at',
  'open_at',
  'supervisor_id'
];
const imageFields = ['logo', 'background_cover'];

/**
 * @summary Get options for the dropdown inputs
 * @param  {string} field list of options to get (default tp province)
 * @param  {string} slug slug required to get the options
 */
const getOptions = (field = 'province', slug) => {
  return new Promise((resolve, reject) => {
    services[field](slug)
      .then(({ data }) => {
        const currentOptions = data.results
          ? data.results.map(({ id, name, full_name }) => ({
              value: id,
              label: name || full_name
            }))
          : data.data.map(({ value, text }) => ({
              value,
              label: text
            }));
        resolve([field, currentOptions]);
      })
      .catch((err) => reject(err));
  });
};

// component declaration
const ProfileBusinessForm = ({ isEdit, prevData, onCancel, onSave }) => {
  // states
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    address: '',
    business_name: '',
    business_started_year: 0,
    main_business_field: 0,
    province_id: 0,
    regency_id: 0,
    supervisor_id: 0,
    secondary_business_field: 0,
    type: 0,
    background_cover: null,
    logo: null,
    region_id: 0,
    branch_id: 0,
    close_at: 0,
    open_at: 0
  });
  const [formEdit, setFormEdit] = useState({});
  const [options, setOptions] = useState({
    province: [],
    region: [],
    regency: [],
    branch: [],
    supervisor: [],
    type: [],
    main_business_field: [],
    secondary_business_field: []
  });
  const [moments, setMoments] = useState({
    business_started_year: null,
    close_at: null,
    open_at: null
  });

  // consts
  const hasNoImages = !form.logo;

  // methods
  const getVariant = (field) => {
    return `title-black width-full input-${errors[field] ? 'red' : 'gray'}`;
  };

  const getDateFromYear = (year) => {
    return year ? new Date(year, null, null) : null;
  };

  const getDateFromTime = (time) => {
    if (!time) return null;
    const [hh, mm] = time.split(':');
    return new Date(null, null, null, hh, mm);
  };

  const validateForm = () => {
    const formToValidate = isEdit ? { ...form, ...formEdit } : form;
    const emptyFields = Object.keys(_pickBy(formToValidate, (field) => !field));
    const errors = emptyFields
      .filter(
        (field) =>
          field !== 'supervisor_id' &&
          field !== 'background_cover' &&
          formFields.includes(field)
      )
      .map((field) => [field, errorTemplates[field]]);

    if (!errors.length) return true;
    window.scrollTo({ top: 420, behavior: 'smooth' });
    setIsError(true);
    setErrors(Object.fromEntries(errors));
    return false;
  };

  const resetErrors = (field) => {
    if (isError) setIsError(false);
    if (errors[field]) setErrors({ ...errors, [field]: '' });
  };

  // side effects
  useEffect(() => {
    // did mount, populate options
    let _isMounted = true;
    const initFetch = [
      'province',
      'region',
      'main_business_field',
      'secondary_business_field'
    ];
    const promises = [
      ...initFetch.map((field) => {
        return getOptions(field);
      }),
      new Promise((resolve, reject) => {
        businessTypeChoice()
          .then(({ data }) => resolve(['type', data.data]))
          .catch((err) => reject(err));
      })
    ];

    Promise.all(promises)
      .then((fieldOptions) => {
        const newOptions = Object.fromEntries(fieldOptions);
        if (_isMounted) {
          setOptions((o) => ({ ...o, ...newOptions }));
        }
      })
      .finally(() => setIsLoading(false));

    return () => {
      _isMounted = false;
    };
  }, []);

  useEffect(() => {
    // populate state with previous data to edit
    let _isMounted = true;

    const getQueryString = (field) => `?${field}=${prevData[field]}`;

    if (isEdit) {
      const dataToEdit = {};
      const imagesToEdit = {};
      const momentsToEdit = {};
      const promises = [];

      formFields.forEach((key) => {
        if (typeof prevData[key] !== 'undefined')
          dataToEdit[key] = prevData[key];
      });
      imageFields.forEach((key) => {
        if (key in dataToEdit) delete dataToEdit[key];
        imagesToEdit[key] = prevData[key];
      });

      momentsToEdit.open_at = getDateFromTime(prevData.open_at);
      momentsToEdit.close_at = getDateFromTime(prevData.close_at);
      momentsToEdit.business_started_year = getDateFromYear(
        prevData.business_started_year
      );

      if (prevData.province_id)
        promises.push(getOptions('regency', getQueryString('province_id')));
      if (prevData.region_id)
        promises.push(getOptions('branch', getQueryString('region_id')));
      if (prevData.branch_id)
        promises.push(
          getOptions('supervisor', {
            region_id: prevData.region_id,
            branch_id: prevData.branch_id
          })
        );
      if (promises.length) setIsLoading(true);

      Promise.all(promises)
        .then((fieldOptions) => {
          const newOptions = Object.fromEntries(fieldOptions);
          if (_isMounted) setOptions((o) => ({ ...o, ...newOptions }));
        })
        .finally(() => setIsLoading(false));

      setForm((f) => ({ ...f, ...dataToEdit, ...imagesToEdit }));
      setFormEdit((f) => ({ ...f, ...dataToEdit }));
      setMoments({ ...momentsToEdit });
    }

    return () => {
      _isMounted = false;
    };
  }, [isEdit, prevData]);

  // event handlers
  const handleSuccess = () => {
    onSave();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    if (isEdit) {
      updateBusinessById(prevData.id62, formEdit)
        .then(() => handleSuccess())
        .catch(() => setIsLoading(false));
    } else {
      profileBussines(_pickBy(form, _identity))
        .then(() => handleSuccess())
        .catch(() => setIsLoading(false));
    }
  };

  const handleChangeForm = (field, e) => {
    const newForm = { [field]: e.target?.value ?? e.value ?? e };
    resetErrors(field);
    setForm({ ...form, ...newForm });
    if (isEdit) setFormEdit({ ...formEdit, ...newForm });
  };

  const handleChangeSelect = (field, e, nextTarget) => {
    resetErrors(field);
    const newForm = { [field]: e.value };
    if (nextTarget) {
      let slug;
      if (nextTarget === 'supervisor') {
        slug = {
          region_id: form.region_id,
          branch_id: e.value
        };
      } else {
        slug = `?${field}=${e.value}`;
      }
      newForm[`${nextTarget}_id`] = 0;
      getOptions(nextTarget, slug).then(([key, value]) => {
        setOptions({ ...options, [key]: value });
      });
    }
    setForm({ ...form, ...newForm });
    if (isEdit) setFormEdit({ ...formEdit, ...newForm });
  };

  const handleChangePicker = (field, e, format) => {
    const newForm = { [field]: moment(e).format(format) };
    resetErrors(field);
    setMoments({ ...moments, [field]: e });
    setForm({ ...form, ...newForm });
    if (isEdit) setFormEdit({ ...formEdit, ...newForm });
  };

  const handleChangeImage = (field, e) => {
    const reader = new FileReader();
    const [file] = e.target.files;
    reader.onloadend = () => {
      handleChangeForm(field, reader.result);
    };
    if (file) reader.readAsDataURL(file);
  };

  return (
    <>
      <Loading loading={isLoading} />
      <section className="o-profile__body">
        <div className="o-profil__header">
          <H3 color="black" weight="bold">
            {isEdit ? 'Ubah Identitas Usaha' : 'Identitas Usaha'}
          </H3>
        </div>
        <div className="o-form-cover">
          <img
            src={form.background_cover || defaultImage}
            alt="background_cover"
            id="img"
            className="img"
          />
          <div className="m-upload-wrapper">
            <label htmlFor="background_cover">
              <img src={IconCamera} alt="icon" />
            </label>
            <input
              type="file"
              accept="image/*"
              name="image-upload"
              id="background_cover"
              onChange={(e) => handleChangeImage('background_cover', e)}
            />
          </div>
        </div>
        <div className="o-form-logo">
          <img
            src={form.logo || defaultImage}
            alt="banner-informasi"
            id="img"
            className="img"
          />
          <div className="m-upload-wrapper">
            <label htmlFor="input">
              <img src={IconCamera} alt="banner-informasi" />
            </label>
            <input
              type="file"
              accept="image/*"
              name="image-upload"
              id="input"
              onChange={(e) => handleChangeImage('logo', e)}
            />
          </div>
        </div>
        <div className="o-form-complete-business">
          <div className="o-profil__body">
            {isError && (
              <Notification
                status="error"
                title={`Lengkapi data yang belum terisi dengan benar ${
                  hasNoImages ? 'dan pastikan telah memasang foto avatar' : ''
                }`}
              />
            )}
            <form onSubmit={handleSubmit}>
              <Input
                type="text"
                id="namausaha"
                placeholder="Nama Usahamu"
                title="Nama Usaha"
                value={form.business_name}
                variant={getVariant('business_name')}
                handleChange={(e) => handleChangeForm('business_name', e)}
                titleBottom={errors.business_name}
              />
              <div className="select-wrapper">
                <div className="row">
                  <div className="col-md-6">
                    <Input
                      type="select"
                      id="province"
                      placeholder="Pilih Provinsi"
                      title="Provinsi"
                      valueSelect={form.province_id}
                      variant={getVariant('province_id')}
                      optionSelect={options.province}
                      handleChange={(e) =>
                        handleChangeSelect('province_id', e, 'regency')
                      }
                      titleBottom={errors.province_id}
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      type="select"
                      id="kabupaten"
                      title="Kabupaten Kota"
                      valueSelect={form.regency_id}
                      placeholder="Pilih Kabupaten/kota"
                      variant={getVariant('regency_id')}
                      optionSelect={options.regency}
                      handleChange={(e) => handleChangeSelect('regency_id', e)}
                      titleBottom={errors.regency_id}
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      type="select"
                      id="region"
                      placeholder="Pilih Kanwil"
                      title="Kanwil"
                      valueSelect={form.region_id}
                      variant={getVariant('region_id')}
                      optionSelect={options.region}
                      handleChange={(e) =>
                        handleChangeSelect('region_id', e, 'branch')
                      }
                      titleBottom={errors.region_id}
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      type="select"
                      id="uker"
                      placeholder="Pilih Kanca"
                      title="Kanca"
                      valueSelect={form.branch_id}
                      variant={getVariant('branch_id')}
                      optionSelect={options.branch}
                      handleChange={(e) =>
                        handleChangeSelect('branch_id', e, 'supervisor')
                      }
                      titleBottom={errors.branch_id}
                    />
                  </div>
                </div>
              </div>
              <div className="select-wrapper">
                <div className="row">
                  <div className="col-md-12">
                    <Input
                      type="select"
                      id="supervisor"
                      placeholder="Pilih Pendamping"
                      title="Pendamping"
                      valueSelect={form.supervisor_id}
                      variant={getVariant('supervisor_id')}
                      optionSelect={[
                        {
                          value: 0,
                          label: 'Tidak Ada'
                        },
                        ...options.supervisor
                      ]}
                      handleChange={(e) =>
                        handleChangeSelect('supervisor_id', e)
                      }
                      titleBottom={errors.supervisor_id}
                    />
                  </div>
                </div>
              </div>
              <div className="select-wrapper">
                <div className="row">
                  <div className="col-md-6">
                    <Input
                      type="date"
                      id="tahun"
                      placeholder="Tahun"
                      title="Tahun mulai usaha"
                      variant={getVariant('business_started_year')}
                      selectedDatePicker={moments.business_started_year}
                      showYearPicker
                      dateFormat="yyyy"
                      handleChange={(e) =>
                        handleChangePicker('business_started_year', e, 'YYYY')
                      }
                      titleBottom={errors.business_started_year}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <InputTextArea
                    type="text"
                    id="alamat"
                    value={form.address}
                    placeholder="Masukkan alamat"
                    handleChange={(e) => handleChangeForm('address', e)}
                    title="Alamat Usaha"
                    variant={getVariant('address')}
                    titleBottom={errors.address}
                    titleBottomColor="red"
                  />
                </div>
              </div>
              <div className="form-relative">
                <div className="o--text-body black black">
                  Bentuk badan usaha
                </div>
                <TextBody
                  color="red"
                  weight="light"
                  variant={getVariant('type')}
                >
                  {errors.type}
                </TextBody>
                {options.type.map((e) => {
                  return (
                    <div key={e.value} className="form-relative">
                      <Radio
                        id={e.value}
                        name="radio-type"
                        isChecked={e.value === form.type}
                        value={e.value}
                        onChange={() => handleChangeForm('type', e)}
                      >
                        <TextBody>{e.text}</TextBody>
                      </Radio>
                    </div>
                  );
                })}
              </div>

              <hr />

              <H4>INFORMASI BIDANG USAHA</H4>
              <div className="form-relative">
                <div className="select-wrapper">
                  <Input
                    type="select"
                    id="main_business_field"
                    valueSelect={form.main_business_field}
                    placeholder="Pilih bidang usaha utama"
                    title="Pilih bidang usaha utama"
                    subtitle="Berkontribusi memberikan pendapatan terbesar"
                    variant={getVariant('main_business_field')}
                    handleChange={(e) =>
                      handleChangeSelect('main_business_field', e)
                    }
                    optionSelect={options.main_business_field}
                    titleBottom={errors.main_business_field}
                  />
                  <Input
                    type="select"
                    id="main_business_field"
                    valueSelect={form.secondary_business_field}
                    placeholder="pilih bidang usaha utama"
                    title="Pilih bidang usaha pendukung"
                    subtitle="Berkontribusi sebagai pendapatan sampingan/tambahan"
                    variant={getVariant('secondary_business_field')}
                    handleChange={(e) =>
                      handleChangeSelect('secondary_business_field', e)
                    }
                    optionSelect={options.secondary_business_field}
                    titleBottom={errors.secondary_business_field}
                  />
                </div>
              </div>
              <div className="form-wrapper row">
                <div className="col-md-6">
                  <Input
                    type="date"
                    id="jambuka"
                    placeholder="Jam buka"
                    title="Jam Buka"
                    variant={getVariant('open_at')}
                    selectedDatePicker={moments.open_at}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals="30"
                    handleChange={(e) =>
                      handleChangePicker('open_at', e, 'HH:mm')
                    }
                    dateFormat="HH:mm"
                    timeFormat="HH:mm"
                    titleBottom={errors.open_at}
                  />
                </div>
                <div className="col-md-6">
                  <Input
                    type="date"
                    id="jamtutup"
                    placeholder="Jam tutup"
                    title="Jam Tutup"
                    variant={getVariant('close_at')}
                    selectedDatePicker={moments.close_at}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals="30"
                    handleChange={(e) =>
                      handleChangePicker('close_at', e, 'HH:mm')
                    }
                    dateFormat="HH:mm"
                    timeFormat="HH:mm"
                    titleBottom={errors.close_at}
                  />
                </div>
              </div>

              <div className="m-button-wrapper">
                <Button variant="secondary" onClick={onCancel}>
                  Kembali
                </Button>
                <Button type="submit" variant="primary">
                  Simpan
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

ProfileBusinessForm.propTypes = {
  isEdit: PropTypes.bool,
  prevData: PropTypes.object,
  onCancel: PropTypes.func,
  onSave: PropTypes.func
};

ProfileBusinessForm.defaultProps = {
  isEdit: false,
  prevData: {},
  onCancel: () => {},
  onSave: () => {}
};

export default ProfileBusinessForm;
