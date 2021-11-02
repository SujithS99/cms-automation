import React, { useState } from 'react';
import './styles/reduction.scss';
import './App.css';
import Home from './pages/home/Home';
import SignIn from './pages/signIn/signIn';
import PageSpinner from './components/PageSpinner';
import getViewport from './lib/viewpoint';
import Response from './lib/Response';
import apiClient from './lib/apiClient';
import { ACCESS_TOKEN_KEY } from './config/settings';
import Constants from './lib/constant';

function App() {
  let [accessToken, setAccessToken] = useState();
  let [userId, setUserId] = useState();
  let [inProgress, setInProgress] = useState(false);
  let [accessTokenValid, setAccessTokenValid] = useState(true);

  //function to update the accessToken
  const updateAccessToken = (token) => {
    setAccessToken(token);
  };



  //function to reset the accessToken
  const resetAccessToken = () => {
    setAccessToken(null);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  };

  //function to check the existing accesstoekn is valid or not
  const validateAccessToken = () => {
    if (inProgress) return;
    apiClient('/admin/game/settings', 'POST', accessToken,{}).then(res => {
      if (res.responseCode === Response.STATUS_OK) {
        setAccessTokenValid(true);
      } 
      else if (res.responseCode === Response.TOKEN_EXPIRED) {
        resetAccessToken();
      }
      setInProgress(false);
    });
  };

  return (
    <div className="bg-light">
      {!accessToken &&
        localStorage.getItem(ACCESS_TOKEN_KEY) &&
        setAccessToken(localStorage.getItem(ACCESS_TOKEN_KEY))}

      {!userId &&
        localStorage.getItem('user_id') &&
        setUserId(localStorage.getItem('user_id'))}

      {/* if accesstoken is not valid then signin component will be called */}
      {!accessToken &&
        ((
          <SignIn
            onAccessTokenUpdate={updateAccessToken}
          />
        ))}

      {/* if accesstoken is valid then home componet will be called*/}
      {accessToken && !accessTokenValid && (!inProgress && (setInProgress(true) || (!validateAccessToken() || <React.Suspense fallback={<PageSpinner />}><PageSpinner /></React.Suspense>)))}
      {accessToken && ((accessTokenValid && (
        <Home
          accessToken={accessToken}
          userId = {userId}
          resetAccessToken={resetAccessToken}
          breakpoint={getViewport()}
        />
      )))}
    </div>
  );
}

export default App;
