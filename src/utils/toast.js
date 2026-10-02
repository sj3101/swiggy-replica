import { toast } from 'react-toastify';

export const showSuccessToast = (message, options = {}) => {
  toast.success(message, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
    style: { backgroundColor: '#fc8019', color: '#fff', borderRadius: '12px', fontWeight: '500' },
    ...options,
  });
};

export const showErrorToast = (message, options = {}) => {
  toast.error(message, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
    ...options,
  });
};

export const showInfoToast = (message, options = {}) => {
  toast.info(message, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
    ...options,
  });
};

export const showWarningToast = (message, options = {}) => {
  toast.warning(message, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
    ...options,
  });
};
