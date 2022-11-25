import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isLoggedInSelector, emailSelector } from '../../redux/hooks';
import { setIsLoggedIn } from '../../redux/slice';
import { postLoginToken } from '../../api/postLoginToken';
// import { useCookies } from 'react-cookie';
import { Cookies } from 'react-cookie';
import { setCookie, getCookie } from '../../utils/cookie';

axios.defaults.withCredentials = true; // 쿠키 사용하기 위해 필수

export default function GoogleLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(isLoggedInSelector);
  //   const userEmail = useSelector(emailSelector);
  //   console.log('로그인' + isLoggedIn);
  //   console.log('이메일' + userEmail);

  const GOOGLE_LOGIN_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=840805606859-diamap7b8svl8fhe3kqt1bmjsi6aieg9.apps.googleusercontent.com&redirect_uri=http://localhost:3000/login/callback&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`;

  console.log(GOOGLE_LOGIN_URL);

  const getAccessToken = async authorizationCode => {
    // const getURL = `${process.env.REACT_APP_BASIC_URL}?code=${authorizationCode}`;
    // const getURL = process.env.REACT_APP_REDIRECT_URL;
    const getURL = 'https://521a-211-58-204-152.jp.ngrok.io/oauth/google';
    // const params = { code: authorizationCode };
    let config = {
      // headers: {
      //   'Access-Control-Allow-Origin': '*',
      //   'Access-Control-Allow-Credentials': true,
      // },
      params: {
        code: authorizationCode,
      },
    };
    console.log(getURL);
    await axios.get(getURL, config).then(res => {
      if (res.data) {
        console.log(res.data);
        // 액세스 토큰 받아서 api 요청시마다 전달
        const { accessToken } = res.data;
        console.log(accessToken);
        console.log(res.data.refreshToken);
        axios.defaults.headers.common['Authorization'] = accessToken;
        // 리프레시 토큰 쿠키에 저장
        setCookie('refreshToken', res.data.refreshToken, {
          path: '/',
          // HttpOnly: true,
          secure: true,
          sameSite: 'none',
        });
        // 라우팅
        if (res.data.newUser) {
          navigate('/signup');
        } else {
          navigate('/');
        }
      }
    });

    console.log(getCookie('refreshToken'));
  };

  // accessToken
  // :
  // "Bearer eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InlyeW4yMDE2QGdtYWlsLmNvbSIsIm1lbWJlcklkIjozLCJzdWIiOiJ5cnluMjAxNkBnbWFpbC5jb20iLCJpYXQiOjE2NjkzMTE1NzEsImV4cCI6MTY2OTMxMzM3MX0.JCBWS8anLn9QSpHRaxsQ8rabZj-b5DIM1vAWyu_QPxs"
  // email
  // :
  // "yryn2016@gmail.com"
  // refreshToken
  // :
  // tokenType
  // :
  // "bearer"

  function oAuthHandler() {
    dispatch(setIsLoggedIn());
    window.location.replace(GOOGLE_LOGIN_URL);
  }

  useEffect(() => {
    const urlParams = new URL(location.href).searchParams;
    console.log('코드');
    const authorizationCode = urlParams.get('code');
    console.log(authorizationCode);
    if (authorizationCode) getAccessToken(authorizationCode);
  }, [isLoggedIn]);

  // const handleLogin = async () => {
  //   await axios
  //     .get(GOOGLE_LOGIN_URL)
  //     .then(res => {
  //       const url = new URL(window.location);
  //       const authorizationCode = url.searchParams.get('code');
  //     })
  //     .then(res => {
  //       console.log(authorizationCode);
  //     });
  // const url = new URL(window.location);
  // console.log(url);
  // const authorizationCode = url.searchParams.get('code');
  // console.log(authorizationCode);
  // getAccessToken(authorizationCode);
  // };

  // async function handleCallbackResponse() {
  // oAuthHandler();
  // window.location.assign(oAuthURL);
  // console.log('이동');
  // const url = new URL(window.location);
  // console.log(url);
  // const url = window.location.href;
  // const result = await axios.get(url);
  // console.log(result);
  // console.log('Encoded JWT ID token: ' + response.credential);
  // const result = await postLoginToken(response.credential);
  // 신규유저면 email 전송
  // console.log(response.credential);
  // if (result.data.userInfo.email) {
  //   dispatch(setIsLoggedIn());
  //   navigate('/displayname');
  // }
  // 기존유저면 jwt토큰 전송
  // document.getElementById('signInDiv').hidden = true;
  // }

  // useEffect(() => {
  //   !isLoggedIn ? navigate('/displayname') : navigate('/home');
  // }, isLoggedIn);

  // 신규 구글 로그인 라이브러리 사용
  useEffect(() => {
    if (window) {
      google.accounts.id.initialize({
        client_id:
          '840805606859-diamap7b8svl8fhe3kqt1bmjsi6aieg9.apps.googleusercontent.com',
        // 로그인 할 경우 호출되는 함수
        // callback: handleCallbackResponse,
        callback: oAuthHandler,
      });

      window.google.accounts.id.renderButton(
        document.getElementById('signInDiv'),
        {
          theme: 'outline',
          size: 'large',
          width: '250',
        }
      );
      window.google.accounts.id.prompt();
    }
  }, []);

  return <div id="signInDiv"></div>;

  // return (
  //   <button id="oAuthBtn" onClick={oAuthHandler}>
  //     google
  //   </button>
  // );
}

// 참고용
// let assetCnt = async () => {
//   //const { klaytn } = window;
//   //const accounts = await klaytn.enable();
//   const token = localStorage.getItem('Token');
//   await axios(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/asset_count`, {
//    method: "POST",
//     data: ({
//       wallet_address: accounts[0].toLowerCase(),
//       blockchain: "klaytn",
//     }),
//     headers: {
//       "Authorization": `Bearer ${token}`
//     },
//   }).then((response) => {
//     setAsset(response);
//   }).catch(()=> {
//     console.log('Error')
//   })
// }
