import { jwtDecode, JwtPayload } from "jwt-decode";

// import { PATH_AUTH } from "../routes/paths";
//
import axios from "./axios";

// ----------------------------------------------------------------------

interface PayloadType extends JwtPayload {
  userId: string;
}
const getUserIdFromToken = (accessToken: string) => {
  if (!accessToken) {
    return "";
  }
  const decoded = jwtDecode<PayloadType>(accessToken);
  console.log(decoded);
  return decoded["userId"];
};

const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode(accessToken);

  const currentTime = Date.now() / 1000;
  if (decoded === undefined || decoded.exp === undefined) {
    console.log("Something went wrong while authentication");
    return false;
  }

  return decoded.exp > currentTime;
};

// const handleTokenExpired = (exp) => {
//   let expiredTimer;

//   const currentTime = Date.now();

//   // Test token expires after 10s
//   // const timeLeft = currentTime + 10000 - currentTime; // ~10s
//   const timeLeft = exp * 1000 - currentTime;

//   clearTimeout(expiredTimer);

//   expiredTimer = setTimeout(() => {
//     // eslint-disable-next-line no-alert
//     alert("Token expired");

//     localStorage.removeItem("accessToken");

//     window.location.href = PATH_AUTH.login;
//   }, timeLeft);
// };

// const setSession = (accessToken) => {
//   if (accessToken) {
//     localStorage.setItem("accessToken", accessToken);
//     axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

//     // This function below will handle when token is expired
//     const { exp } = jwtDecode(accessToken); // ~3 days by codingmonks server
//     handleTokenExpired(exp);
//   } else {
//     localStorage.removeItem("accessToken");
//     delete axios.defaults.headers.common.Authorization;
//   }
// };

export { getUserIdFromToken, isValidToken /*, setSession */ };
