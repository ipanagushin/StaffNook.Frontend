import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CurrentUserService from '@/services/CurrentUserService';
import Loader from '@/components/Loader';

interface LoginLayoutProps {
  children: React.ReactNode;
}

const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const token = CurrentUserService.userTokenExist();
    if (token) {
        navigate('/');
    }
    setIsLoading(false);
  }, [navigate]);

  return (
    <>
      {!isLoading ? <main>{children}</main> : <Loader/>}
    </>
  );
};

export default LoginLayout;
