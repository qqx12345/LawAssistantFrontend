// Toastu63d0u793au51fdu6570
import toast, { ToastOptions } from 'react-hot-toast';

type ToastType = 'success' | 'error' | 'warning' | 'info';

/**
 * u663eu793au901au77e5u4f53
 * @param message u63d0u793au4fe1u606f
 * @param type u63d0u793au7c7bu578b
 */
export const showToast = (message: string, type: ToastType) => {
  const options: ToastOptions = {
    duration: 3000,
    position: 'top-center',
    style: {
      background: type === 'error' ? '#FEE2E2' : 
                type === 'success' ? '#ECFDF5' :
                type === 'warning' ? '#FEF3C7' : '#EFF6FF',
      color: type === 'error' ? '#DC2626' : 
             type === 'success' ? '#059669' :
             type === 'warning' ? '#D97706' : '#3B82F6',
      padding: '16px',
      borderRadius: '10px',
      fontSize: '14px',
      fontWeight: '500',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    },
    icon: type === 'error' ? '❌' : 
          type === 'success' ? '✅' :
          type === 'warning' ? '⚠️' : 'ℹ️',
  };

  toast(message, options);
};
