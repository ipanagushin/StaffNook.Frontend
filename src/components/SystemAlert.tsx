import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { alertState } from '../common/AppAtoms';
import { useSnackbar } from 'notistack';

const SystemAlert: React.FC = () => {
  const recoilValue = useRecoilValue(alertState);
  const setAlertMessage = useSetRecoilState(alertState);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(()=>{
    if(recoilValue !== null){
      enqueueSnackbar(recoilValue.Message, { 
        variant: recoilValue.Variant,
        autoHideDuration: 2000,
        style: {margin:0},
        onClose: () => setAlertMessage(null),
        anchorOrigin: { horizontal:'right', vertical: 'bottom' }
      });
      setAlertMessage(null);
    }
  }, [enqueueSnackbar, recoilValue, setAlertMessage])

  return (<></>);
};

export default SystemAlert;