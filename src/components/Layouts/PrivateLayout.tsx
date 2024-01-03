import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import CurrentUserService from "@/services/CurrentUserService";
import Loader from "@/components/Loader";
import * as MuiMaterial from "@mui/material";
import IdentityService from "@/services/IdentityService";

interface PrivateLayoutProps {
  children: React.ReactNode;
}

const PrivateLayout: React.FC<PrivateLayoutProps> = ({ children }) => {
  const [isTokenValid, setTokenValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      let apiResult = await IdentityService.getCurrentUserInfo();
      CurrentUserService.setUserInfo(apiResult.data);
    };
    fetchUserInfo()
      .then(() => {
        setTokenValid(true);
      })
      .catch(() => {
        // todo
      });
  }, [navigate]);

  return (
    <>
      {isTokenValid ? (
        <>
            <Header />
            <main>
              <MuiMaterial.Box
                sx={{
                  textAlign: "center",
                  minHeight: "100vh",
                }}
              >
                {children}
              </MuiMaterial.Box>
            </main>
        </>
      ) : (
        <Loader />
      )}
      <Footer />
    </>
  );
};

export default PrivateLayout;
