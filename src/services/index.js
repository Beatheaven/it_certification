/* eslint-disable no-alert */
import axios from 'axios';
import CONFIG from '../config';

const fullURL = (path) => {
  console.log(`${CONFIG.API_URL}/api/${path}`)
  return `${CONFIG.API_URL}/api/${path}`;
};

axios.interceptors.request.use(
  (config) => {
    if ('token' in localStorage) {
      const token = localStorage.token;
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
   (error) => {
     if (error.response?.status === 401) {
       if ('token' in localStorage) localStorage.removeItem('token');
       window.location = '/login';
     }
     return Promise.reject(error);
  }
);

export const handleNetworkError = (error) => {
  if (error.message === 'Network request failed') {
    alert(
      'Kesalahan Jaringan',
      'Silakan periksa koneksi Anda dan coba kembali.',
      'iconNoInet'
    );
  }
  throw error;
};

export const handleCommonError = (error) => {
  if (error && error.data.msg === 'invalid token') {
    alert(
      'Session kamu telah habis',
      'Silakan login kembali dengan akun kamu yg telah terdaftar'
    );
    throw new Error({
      logout: true
    });
  } else {
    throw error;
  }
};

const post = (api) => (data, timemout = true) => {
  const tokens = localStorage.getItem('token');
  return axios.post(
    fullURL(api),
    data,
    {
      method: 'POST',
      headers: {
        Authorization: tokens
      }
    },
    timemout
  );
};

const patch = (api) => (data, timemout = true) => {
  const tokens = localStorage.getItem('token');
  return axios.patch(
    fullURL(api),
    data,
    {
      method: 'POST',
      headers: {
        Authorization: tokens
      }
    },
    timemout
  );
};

const postData = (api) => (data, timemout = true) => {
  const tokens = localStorage.getItem('token');
  return axios.post(
    fullURL(api),
    data,
    {
      method: 'POST',
      headers: {
        Authorization: tokens
      }
    },
    { handleNetworkError, handleCommonError },
    timemout
  );
};

const get = (api) => (params, timemout = true) => {
  const tokens = localStorage.getItem('token');

  return axios(
    fullURL(api),
    {
      method: 'GET',
      headers: {
        Authorization: tokens
      },
      params
    },
    { handleNetworkError, handleCommonError },
    timemout
  );
};

const getWithSlug = (api) => (slug, params, timemout = true) => {
  const tokens = localStorage.getItem('token');
  return axios(
    `${fullURL(api)}${slug}`,
    {
      method: 'GET',
      headers: {
        Authorization: tokens
      },
      params
    },
    { handleNetworkError, handleCommonError },
    timemout
  );
};

const patchWithSlug = (api) => (slug, data, timeout = true) => {
  const tokens = localStorage.getItem('token');
  return axios.patch(
    `${fullURL(api)}${slug}/`,
    data,
    {
      method: 'POST',
      headers: {
        Authorization: tokens
      }
    },
    timeout
  );
};

// Auth
export const login = post('authentication/login/');
export const register = post('authentication/register/');
export const validator = post('survey/validator/field/');
export const changePin = post('authentication/change-pin/');
export const resetPin = post('authentication/reset-pin/');
export const sentOtp = post('authentication/send-otp/');
export const setPin = post('authentication/set-pin/');
export const verifyOtp = post('authentication/verify-otp/');
// Survey
export const adminitrativeDistrict = getWithSlug(
  'survey/adminitrative/district/'
);
export const adminitrativeKelurahan = getWithSlug(
  'survey/adminitrative/kelurahan/'
);
export const adminitrativeProvince = get('survey/adminitrative/province/');
export const adminitrativeProvinceId = getWithSlug(
  'survey/adminitrative/province/'
);
export const adminitrativeRegion = get('survey/adminitrative/region/');
export const adminitrativeRegionId = getWithSlug(
  'survey/adminitrative/region/'
);

export const adminitrativeUker = getWithSlug('survey/adminitrative/uker/');

export const adminitrativeBranch = getWithSlug('survey/adminitrative/branch/');

export const adminitrativeRegency = getWithSlug(
  'survey/adminitrative/regency/'
);
export const adminitrativeSupervisor = get('survey/adminitrative/supervisor/');

export const answerBulk = postData('survey/answer/bulk-answer/');
export const answerDone = postData('survey/answer/done/');
export const answerId = getWithSlug('survey/answer/');
export const surveyLastAnswer = get('survey/answer/last-answer');
export const surveyProgress = get('survey/survey/progress/');
export const surveyHistory = get('survey/survey?show_all=true');
export const surveyGroup = get('survey/group/');
export const surveyGroupId = getWithSlug('survey/group/');
export const getprofilePublic = getWithSlug('survey/profile/public/');
export const getprofileBussines = get('survey/profile/business/');
export const profileBussines = post('survey/profile/business/');
export const getprofileBussinesId = getWithSlug('survey/profile/business/');
export const getExample = getWithSlug('survey/question/');
export const getProfileUser = get('survey/profile/user');
export const getProfileCheckPoint = get('survey/profile/checkpoint/');
export const getHistorySurvey = getWithSlug('survey/survey/');
export const getDataHistorySurvey = get('survey/survey/');
export const updateDataUser = patch('survey/profile/user');
export const updateBusinessById = patchWithSlug('survey/profile/business/');
export const businessTypeChoice = get(
  'survey/profile/business/business-type-choices/'
);
export const mainBusinessChoice = get(
  'survey/profile/business/main-business-choices/'
);
export const secondaryBusinessChoice = get(
  'survey/profile/business/secondary-business-choices/'
);
export const businessCategory = get('survey/profile/business-category/');
export const businessCategoryId = getWithSlug(
  'survey/profile/business-category/'
);

// umkm smart - class
export const getClassRecommendation = get('survey/class/recommendation/');
export const getDetailClass = getWithSlug('survey/class/');
export const getClassHistory = get('survey/class/history/');
export const postTakeModule = postData('survey/class/take-module/');

// test
export const getListTestClass = get('test/test/');
export const getTestQuestion = getWithSlug('test/test/');
export const postTestAnswer = postData('test/test/bulk-answer/');
export const postDoneTest = postData('test/test/done/');
export const getTestResult = get('test/result/');

const API = {
  login,
  register,
  changePin,
  resetPin,
  sentOtp,
  setPin,
  verifyOtp,
  adminitrativeDistrict,
  adminitrativeRegion,
  adminitrativeRegionId,
  adminitrativeUker,
  adminitrativeProvince,
  adminitrativeProvinceId,
  adminitrativeRegency,
  adminitrativeSupervisor,
  answerBulk,
  answerId,
  surveyProgress,
  surveyGroup,
  surveyGroupId,
  getprofileBussines,
  profileBussines,
  getprofileBussinesId,
  getExample,
  getProfileUser,
  getProfileCheckPoint,
  getHistorySurvey,
  getDataHistorySurvey,
  updateDataUser,
  businessTypeChoice,
  mainBusinessChoice,
  secondaryBusinessChoice,
  businessCategory,
  businessCategoryId,
  validator,
  getClassRecommendation,
  getDetailClass,
  getListTestClass,
  getTestQuestion,
  postTestAnswer,
  postDoneTest,
  getTestResult
};

export default API;
