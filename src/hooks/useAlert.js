import {useState} from 'react';

export const useAlert = () => {
  const [openAlert, setOpenAlert] = useState(false);
  const [alertInfo, setAlertInfo] = useState({severity: null, message: null});

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenAlert(false);
  };

  const handleOpenAlert = (severity, message) => {
    setAlertInfo({severity, message});
    setOpenAlert(true);
  }

  return {
    openAlert,
    alertInfo,
    handleOpenAlert,
    handleCloseAlert
  }
}