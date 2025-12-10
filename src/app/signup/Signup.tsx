'use client';

import React, { useState } from 'react';
import axios from "axios";
import styles from "@/app/signup/Signup.module.css";

const ID_CHECK_ENDPOINT = "https://www.gamzasturdy.shop/api/auth/check_login_id";  
const SIGNUP_ENDPOINT = "https://www.gamzasturdy.shop/auth/signup";      
const SEND_CODE_ENDPOINT = "https://www.gamzasturdy.shop/api/sms/send";       // 인증번호 발송
const VERIFY_CODE_ENDPOINT = "https://www.gamzasturdy.shop/api/sms/verify";   // 인증번호 확인

const Signup = () => {

  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState<'MALE' | 'FEMALE' | 'SECRET' | ''>('');
  const [birthDate, setBirthDate] = useState('NONE');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verified, setVerified] = useState(false);
  const [message, setMessage] = useState('');

  // 전화번호 인증번호 입력
  const [authCode, setAuthCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);

  // ★ 아이디 중복확인 API
  const handleDuplicateCheck = async () => {
    if (!loginId) return setMessage("아이디를 먼저 입력해주세요.");

    try {
      const response = await axios.post(ID_CHECK_ENDPOINT, { loginId });
      setMessage(response.data.message || "사용 가능한 아이디입니다.");
    } catch (error: any) {
      setMessage(error.response?.data?.message || "이미 사용중인 아이디입니다.");
    }
  };

  // ★ 인증번호 발송 API
  const handleSendCode = async () => {
    if (!phoneNumber) return setMessage("전화번호를 입력해주세요.");

    try {
      const response = await axios.post(SEND_CODE_ENDPOINT, { phoneNumber });
      setCodeSent(true);
      setMessage("인증번호가 발송되었습니다!");
    } catch (error: any) {
      setMessage(error.response?.data?.message || "인증번호 발송 중 오류가 발생했습니다.");
    }
  };

  // ★ 인증번호 확인 API
  const handleVerifyCode = async () => {
    if (!authCode) return setMessage("인증번호를 입력해주세요.");

    try {
      const response = await axios.post(VERIFY_CODE_ENDPOINT, {
        phoneNumber,
        authCode,
      });

      setVerified(true);
      setMessage("전화번호 인증이 완료되었습니다!");

    } catch (error: any) {
      setMessage(error.response?.data?.message || "인증번호가 올바르지 않습니다.");
    }
  };

  // ★ 회원가입 API
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!loginId || !password || !passwordConfirm || !username || !gender || !birthDate || !phoneNumber) {
      return setMessage('모든 항목을 입력/선택해주세요.');
    }

    if (password !== passwordConfirm) {
      return setMessage('비밀번호 확인이 일치하지 않습니다.');
    }

    if (!verified) {
      return setMessage("전화번호 인증을 완료해주세요.");
    }

    const requestData = {
      loginId,
      username,
      password,
      gender,
      birthDate: "2006-11-26",
      phoneNumber,
      verified,
    };

    try {
      const response = await axios.post(SIGNUP_ENDPOINT, requestData);
      setMessage("회원가입이 완료되었습니다.");

    } catch (error: any) {
      setMessage(error.response?.data?.message || "회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="signup-title">
        <header className={styles.cardHeader}>
          <button className={styles.iconBtn} type="button" aria-label="뒤로 가기">←</button>
          <h1 id="signup-title" className={styles.title}>회원가입</h1>
        </header>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>

          {/* 아이디 */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="loginId">아이디</label>
            <div className={styles.row}>
              <input
                id="loginId"
                type="text"
                placeholder="아이디를 입력해주세요."
                className={styles.input}
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                required
              />
              <button
                type="button"
                className={`${styles.btn} ${styles.btnGhost}`}
                onClick={handleDuplicateCheck}
              >
                중복확인
              </button>
            </div>
          </div>

          {/* 비밀번호 */}
          <div className={styles.field}>
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* 비밀번호 확인 */}
          <div className={styles.field}>
            <label htmlFor="passwordConfirm">비밀번호 확인</label>
            <input
              id="passwordConfirm"
              type="password"
              placeholder="비밀번호를 다시 입력해주세요."
              className={styles.input}
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
          </div>

          {/* 이름 */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="username">이름</label>
            <input
              id="username"
              type="text"
              placeholder="이름을 입력해주세요."
              className={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* 전화번호 */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="phoneNumber">전화번호</label>

            <div className={styles.row}>
              <input
                id="phoneNumber"
                type="text"
                placeholder="전화번호를 입력해주세요."
                className={styles.input}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />

              <button
                type="button"
                className={`${styles.btn} ${styles.btnGhost}`}
                onClick={handleSendCode}
              >
                인증요청
              </button>
            </div>
          </div>

          {/* 인증번호 */}
          {codeSent && (
            <div className={styles.field}>
              <label className={styles.label} htmlFor="authCode">인증번호</label>

              <div className={styles.row}>
                <input
                  id="authCode"
                  type="text"
                  placeholder="인증번호를 입력해주세요."
                  className={styles.input}
                  value={authCode}
                  onChange={(e) => setAuthCode(e.target.value)}
                />

                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnGhost}`}
                  onClick={handleVerifyCode}
                >
                  인증하기
                </button>
              </div>

              {verified && <p className={styles.success}>✔ 인증 완료</p>}
            </div>
          )}

          {/* 성별 */}
          <fieldset className={styles.field}>
            <legend className={styles.label}>성별</legend>
            <div className={styles.radios}>

              <label className={styles.radio}>
                <input
                  type="radio"
                  name="gender"
                  value="MALE"
                  checked={gender === 'MALE'}
                  onChange={(e) => setGender(e.target.value as any)}
                />
                남성
              </label>

              <label className={styles.radio}>
                <input
                  type="radio"
                  name="gender"
                  value="FEMALE"
                  checked={gender === 'FEMALE'}
                  onChange={(e) => setGender(e.target.value as any)}
                />
                여성
              </label>

              <label className={styles.radio}>
                <input
                  type="radio"
                  name="gender"
                  value="SECRET"
                  checked={gender === 'SECRET'}
                  onChange={(e) => setGender(e.target.value as any)}
                />
                비공개
              </label>

            </div>
          </fieldset>

          {/* 출생년도 */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="birthDate">출생년도</label>
            <div className={styles.select}>
              <select
                id="birthDate"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value as any)}
                required
              >
                <option value="">태어난 년도를 선택해주세요.</option>
                <option value="2004">2004</option>
                <option value="2005">2005</option>
                <option value="2006">2006</option>
              </select>
            </div>
          </div>

          <div className={styles.actions}>
            <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
              회원가입하기
            </button>
          </div>

        </form>

        {message && <p className={styles.message}>{message}</p>}
      </section>
    </main>
  );
};

export default Signup;
