import React from 'react';
import axios from 'axios';

import { GoogleLogin } from 'react-google-login';

import { refreshTokenSetup } from '../utils/refreshToken';

const clientId = '707788443358-u05p46nssla3l8tmn58tpo9r5sommgks.apps.googleusercontent.com';

function LoginGoogle() {
    const onSuccess = (res) => {
      console.log("la");
        refreshTokenSetup(res);
        var url = "http://localhost:"+process.env.REACT_APP_SERVER_PORT+"/google"
        var data = {
            user_name: res.profileObj.googleId
        }
        var urlToken = "http://localhost:"+process.env.REACT_APP_SERVER_PORT+"/getToken"
        axios.post(urlToken, {pass: "DarkZorg28"})
        .then((rep) => {
          axios.post(url, data, {headers: {'api_key': rep.data.token}})
          .then( response => {
              var dataStored = "{\"user\": {\"name\":\""+res.profileObj.googleId+"\"}}"
              var tokenStored = "{\"name\":\""+rep.data.token+"\"}"
              localStorage.setItem('user', dataStored)
              localStorage.setItem('token', tokenStored)
              window.location.href = "/"
          }).catch(rep => {
            console.log(rep);
          });
        })
    };

  const onFailure = (res) => {
    console.log(res);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="With Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={true}
      />
    </div>
  );
}

export default LoginGoogle;