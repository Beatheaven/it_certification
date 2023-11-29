/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button,
  H3,
  Input,
  InputTextArea,
  Loading,
  Notification,
  TextBody
} from 'components/atoms';

// assets
import IconCamera from '../../../assets/images/icon-camera.png';
import emptyAvatar from '../../../assets/images/default-avatar-m.png';

// services
import {
  updateDataUser,
  adminitrativeRegion,
  adminitrativeBranch,
  adminitrativeSupervisor
} from '../../../services';

const services = {
  region: adminitrativeRegion,
  branch: adminitrativeBranch,
  supervisor: adminitrativeSupervisor
};

const rules = {
  avatar: /.*\S.*/,
  full_name: /.*\S.*/,
  birth_place: /.*\S.*/,
  birth_date: /.*\S.*/,
  email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
};

const errorTemplates = {
  avatar: 'Pilih avatar',
  full_name: 'Masukkan nama lengkap',
  birth_place: 'Masukkan kota kelahiran',
  birth_date: 'Masukkan tanggal lahir',
  email: 'Masukkan alamat email yang valid',
  region_id: 'Pilih kanwil domisili',
  branch_id: 'Pilih kanca domisili',
  supervisor_id: 'Pilih pendamping'
};

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const getOptions = (field = 'province', slug) => {
  return new Promise((resolve, reject) => {
    services[field](slug)
      .then(({ data }) => {
        const currentOptions = data.results.map(({ id, name, full_name }) => ({
          value: id,
          label: name || full_name
        }));
        resolve(currentOptions);
      })
      .catch((err) => reject(err));
  });
};

// component declaration
const ProfileAccountEdit = ({ onSave }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { buffer } = user;
  const { email, full_name: name, nik, phone_number: phone, profile } =
    user?.profile ?? {};

  // states
  const [isLoading, setIsLoading] = useState(user?.loading ?? false);
  const [isError, setIsError] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    avatar: profile?.avatar ? undefined : null,
    address: profile?.addresses?.address ?? '',
    province_id: profile?.addresses?.province_id ?? 0,
    regency_id: profile?.addresses?.regency_id ?? 0,
    district_id: profile?.addresses?.district_id ?? 0,
    kelurahan_id: profile?.addresses?.kelurahan_id ?? 0,
    region_id: profile?.region_id ?? null,
    branch_id: profile?.branch_id ?? null,
    supervisor_id: profile?.supervisor_id ?? 0,
    ...buffer,
    ...buffer.profile
  });
  const [view, setView] = useState({
    birth_place: (buffer.profile?.birth_place || profile?.birth_place) ?? '',
    birth_date:
      buffer.profile?.birth_date || profile?.birth_date
        ? new Date(buffer.profile?.birth_date || profile.birth_date)
        : new Date(),
    address: profile?.addresses?.address ?? '',
    province_id: profile?.addresses?.province_id ?? 0,
    regency_id: profile?.addresses?.regency_id ?? 0,
    district_id: profile?.addresses?.district_id ?? 0,
    kelurahan_id: profile?.addresses?.kelurahan_id ?? 0,
    region_id: profile?.region_id ?? 0,
    branch_id: profile?.branch_id ?? 0,
    supervisor_id: profile?.supervisor_id ?? 0,
    avatar: (buffer.profile?.avatar || profile?.avatar) ?? emptyAvatar,
    email,
    full_name: buffer.full_name ?? name,
    nik,
    phone
  });

  const [options, setOptions] = useState({
    region: [],
    branch: [],
    supervisor: []
  });

  // methods
  const validateForm = () => {
    const errors = [];
    Object.entries(rules).forEach(([field, pattern]) => {
      if (field in form && !pattern.test(form[field])) errors.push(field);
    });
    if (!errors.length) return true;

    const errorMessages = errors.map((field) => [field, errorTemplates[field]]);
    setErrors(Object.fromEntries(errorMessages));
    return false;
  };

  const getVariant = (field) => {
    return `title-black width-full input-${errors[field] ? 'red' : 'gray'}`;
  };

  const resetErrors = (field) => {
    if (isError) setIsError(false);
    if (errors[field]) setErrors({ ...errors, [field]: '' });
  };

  // event handlers
  const handleFormBuffer = () => {
    const payload = { profile: {} };
    if (form.full_name) payload.full_name = form.full_name;
    if (form.avatar) payload.profile.avatar = form.avatar;
    if (form.birth_place) payload.profile.birth_place = form.birth_place;
    if (form.birth_date) payload.profile.birth_date = form.birth_date;
    if (form.region_id) payload.profile.region_id = form.region_id;
    if (form.branch_id) payload.profile.branch_id = form.branch_id;
    if (form.supervisor_id) payload.profile.supervisor_id = form.supervisor_id;

    dispatch({ type: 'user/SET_BUFFER', payload });
  };

  const handleChangeForm = (field, value) => {
    setForm({ ...form, [field]: value });
    setView({ ...view, [field]: value });
    setErrors({ ...errors, [field]: '' });
    resetErrors(field);
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
    setView({ ...view, ...newForm });
  };

  const handleChangeImage = (field, e) => {
    const reader = new FileReader();
    const [file] = e.target.files;
    reader.onloadend = () => {
      handleChangeForm(field, reader.result);
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleChangeDate = (field, e) => {
    setForm({ ...form, [field]: e ? e.toISOString().substr(0, 10) : '' });
    setView({ ...view, [field]: e });
    resetErrors(field);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    delete form.profile;
    setIsLoading(true);
    updateDataUser(form)
      .then(() => onSave())
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  };

  const togglePopup = () => {
    handleFormBuffer();
    dispatch({ type: 'user/TOGGLE_POPUP' });
  };

  const getNextOptions = (target, slug) => {
    return new Promise((resolve, reject) => {
      const targets = Object.keys(services);
      const currentIndex = targets.findIndex((item) => item === target);

      if (currentIndex !== -1 && currentIndex !== targets.length - 1) {
        const nextTarget = targets[currentIndex + 1];
        getOptions(nextTarget, slug)
          .then((nextOptions) => resolve([nextTarget, nextOptions]))
          .catch((err) => reject(err));
      }
    });
  };

  // side effects
  useEffect(() => {
    // did mount, populate options
    let _isMounted = true;
    getOptions('region').then((region) => {
      if (_isMounted) {
        setOptions((o) => ({ ...o, region }));
        setIsLoading(false);
      }
    });
    return () => {
      _isMounted = false;
    };
  }, []);

  const prevForm = usePrevious(view);
  useEffect(() => {
    // fetch options when previous dropdown is selected
    if (prevForm && view) {
      const fieldHasChanged = (field) => {
        const fieldId = `${field}_id`;
        return field !== 'supervisor' && view[fieldId] && prevForm[fieldId];
      };
      const fields = ['region', 'branch', 'supervisor'];
      const changedFields = fields.filter((field) => fieldHasChanged(field));
      const promises = changedFields.map((field) => {
        let slug;
        if (field === 'branch') {
          slug = {
            region_id: view.region_id,
            branch_id: view[`${field}_id`]
          };
        } else {
          slug = `?${field}_id=${view[`${field}_id`]}`;
        }
        return getNextOptions(field, slug);
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
    }
  }, [view, prevForm]);

  return (
    <section className="o-profile__body">
      <Loading loading={isLoading} />
      <div className="m-avatar-wrapper">
        <img src={view.avatar} alt="profile" />
        <div className="m-upload-wrapper">
          <label htmlFor="inputprofile">
            <img src={IconCamera} alt="profile" />
          </label>
          <input
            type="file"
            accept="image/*"
            name="image-upload"
            id="inputprofile"
            onChange={(e) => handleChangeImage('avatar', e)}
          />
        </div>
      </div>
      <H3 color="black" weight="bold">
        Profil Saya
      </H3>
      <TextBody color="black" weight="light text-subs">
        Demi mengamankan dan melindungi profil anda. masukkan informasi profil
        anda
      </TextBody>
      <Notification
        status={isError ? 'error' : ''}
        title="Lengkapi data dengan benar dan pastikan telah memasang avatar"
      />
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          id="nik"
          value={view.nik}
          placeholder="NIK"
          title="NIK"
          variant="title-black input-gray width-full"
          isDisable
        />
        <Input
          type="text"
          id="full_name"
          value={view.full_name}
          placeholder="Nama Lengkap"
          title="Nama Lengkap"
          variant={getVariant('full_name')}
          titleBottom={errors.full_name}
          handleChange={(e) => handleChangeForm('full_name', e.target.value)}
        />
        <div className="select-wrapper">
          <div className="row">
            <div className="col-12 col-md-6">
              <Input
                type="text"
                id="city"
                value={view.birth_place}
                placeholder="Masukkan Kota Kelahiran"
                title="Kota kelahiran"
                variant={getVariant('birth_place')}
                titleBottom={errors.birth_place}
                handleChange={(e) =>
                  handleChangeForm('birth_place', e.target.value)
                }
              />
            </div>
            <div className="col-12 col-md-6">
              <Input
                type="date"
                id="tgl"
                title="Tanggal Lahir"
                variant={getVariant('birth_date')}
                selectedDatePicker={view.birth_date}
                handleChange={(e) => handleChangeDate('birth_date', e)}
                titleBottom={errors.birth_date}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <Input
              type="select"
              id="region"
              placeholder="Pilih Kanwil"
              title="Kanwil"
              valueSelect={view.region_id}
              variant={getVariant('region_id')}
              optionSelect={options.region}
              handleChange={(e) => handleChangeSelect('region_id', e, 'branch')}
              titleBottom={errors.region_id}
            />
          </div>
          <div className="col-md-6">
            <Input
              type="select"
              id="uker"
              placeholder="Pilih Kanca"
              title="Kanca"
              valueSelect={view.branch_id}
              variant={getVariant('branch_id')}
              optionSelect={options.branch}
              handleChange={(e) =>
                handleChangeSelect('branch_id', e, 'supervisor')
              }
              titleBottom={errors.branch_id}
            />
          </div>
        </div>
        <Input
          type="select"
          id="supervisor"
          placeholder="Pilih Pendamping"
          title="Pendamping"
          valueSelect={view.supervisor_id}
          variant={getVariant('supervisor_id')}
          optionSelect={[
            {
              value: 0,
              label: 'Tidak Ada'
            },
            ...options.supervisor
          ]}
          handleChange={(e) => handleChangeSelect('supervisor_id', e)}
          titleBottom={errors.supervisor_id}
        />
        <InputTextArea
          type="text"
          id="alamat"
          withIcon
          placeholder="Masukkan alamat"
          title="Alamat"
          variant={getVariant('address')}
          value={view.address}
          handleChange={(e) => handleChangeForm('address', e.target.value)}
          isDisable
          titleBottom={errors.address}
          handleIcon={togglePopup}
        />
        <Input
          type="text"
          id="phone"
          placeholder="81XXXXXXXX"
          title="NO. Hp"
          value={view.phone}
          variant={getVariant('phone_number')}
          isDisable
        />
        <Input
          type="text"
          id="email"
          value={view.email || ''}
          placeholder="email@example.com"
          title="Email (Tidak Wajib)"
          variant={getVariant('email')}
          handleChange={(e) => handleChangeForm('email', e.target.value)}
          titleBottom={errors.email}
        />
        <div className="m-button-wrapper">
          <Button type="submit" variant="primary">
            Simpan
          </Button>
        </div>
      </form>
    </section>
  );
};

ProfileAccountEdit.propTypes = {
  onSave: PropTypes.func
};

ProfileAccountEdit.defaultProps = {
  onSave: () => {}
};

export default ProfileAccountEdit;
