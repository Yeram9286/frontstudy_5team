"use client";

import React, { useState } from "react";
import styles from "./Signup.module.css";

const Signup = () => { 
  const [loginId, setLoginId] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [passwordCheck, setPasswordCheck] = useState(""); 
  const [username, setUsername] = useState(""); 
  const [gender, setGender] = useState<"male" | "female" | "private" | "">(""); 
  const [birthDate, setBirthDate] = useState(""); 
  const [phoneNumber, setPhoneNumber] = useState(""); 
  const [certificationNumber, setCertificationNumber] = useState(""); 

  const [isCertificationRequested, setIsCertificationRequested] = useState(false);
  const [verified, setVerified] = useState(false); 

  
  const handleCheckId = () => {
    if (!loginId) {
      alert("아이디를 입력해주세요.");
      return;
    }
    if (loginId.length < 4 || loginId.length > 12) {
      alert("아이디는 4~12자로 입력해주세요.");
      return;
    }
    if (!/^[a-zA-Z0-9]+$/.test(loginId)) {
      alert("아이디는 영문, 숫자만 사용 가능합니다.");
      return;
    }

    const usedIds = ["soyeoung"]; 
    if (usedIds.includes(loginId)) {
      alert("이미 사용 중인 아이디입니다.");
    } else {
      alert("사용 가능한 아이디입니다.");
    }
  };

  const handleCheckPhone = () => {
    if (!phoneNumber) {
      alert("전화번호를 입력해주세요.");
      return;
    }
    if (!/^[0-9]{10,11}$/.test(phoneNumber)) {
      alert("올바른 전화번호 형식이 아닙니다.");
      return;
    }

    alert("인증번호 6자리가 발송되었습니다.");

    setIsCertificationRequested(true);
    setVerified(false); 
  };

  const handleCheckCertificationNumber = () => {
    if (!isCertificationRequested) {
      alert("먼저 인증요청을 진행해주세요.");
      return;
    }

    if (!certificationNumber) {
      alert("인증번호를 입력해주세요.");
      return;
    }
    if (!/^[0-9]{6}$/.test(certificationNumber)) {
      alert("올바른 인증번호 형식이 아닙니다.");
      return;
    }

    if (certificationNumber === "111111") {
      alert("인증번호가 확인되었습니다.");
      setVerified(true);
    } else {
      alert("인증번호가 일치하지 않습니다.");
      setVerified(false);
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!loginId) {
      alert("아이디를 입력해주세요.");
      return;
    }
    if (!password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    if (password !== passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (password.length < 8) {
      alert("비밀번호는 8자 이상이어야 합니다.");
      return;
    }
    if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)) {
      alert("비밀번호는 영문과 숫자를 포함해야 합니다.");
      return;
    }
    if (!username) {
      alert("이름을 입력해주세요.");
      return;
    }
    if (!gender) {
      alert("성별을 선택해주세요.");
      return;
    }
    if (!birthDate) {
      alert("태어난 년도를 선택해주세요.");
      return;
    }
    if (!verified) {
      alert("전화번호 인증을 완료해주세요.");
      return;
    }

    const payload = {
      loginId,
      password,
      username,
      gender,
      birthDate,
      phoneNumber,
      verified,
    };

    console.log("회원가입 payload:", payload);
    alert("회원가입이 완료되었습니다. (콘솔 로그 확인)");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>회원가입</h2>

      <div className={styles.field}>
        <div className={styles.inputGroup}>
          <label>아이디</label>
          <div className={styles.idField}>
            <input
              type="text"
              placeholder="아이디를 입력해주세요."
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
            />
            <button className={styles.checkButton} onClick={handleCheckId}>
              중복확인
            </button>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label>비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>비밀번호 확인</label>
          <input
            type="password"
            placeholder="비밀번호를 다시 입력해주세요."
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>이름</label>
          <input
            type="text"
            placeholder="이름을 입력해주세요."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>성별</label>
          <div className={styles.radio}>
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={() => setGender("male")}
              />{" "}
              남성
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={() => setGender("female")}
              />{" "}
              여성
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="private"
                checked={gender === "private"}
                onChange={() => setGender("private")}
              />{" "}
              비공개
            </label>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label>생년</label>
          <select
            className={styles.select}
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          >
            <option value="" disabled>
              태어난 년도를 선택해주세요.
            </option>
            <option value="2006-01-01">2006년</option>
            <option value="2005-01-01">2005년</option>
            <option value="2004-01-01">2004년</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label>전화번호</label>
          <div className={styles.idField}>
            <input
              type="text"
              placeholder="전화번호를 입력해주세요."
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                setIsCertificationRequested(false);
                setVerified(false);
                setCertificationNumber("");
              }}
            />
            <button className={styles.checkButton} onClick={handleCheckPhone}>
              인증요청
            </button>
          </div>
          {verified && (
            <p className={styles.successText}>전화번호 인증이 완료되었습니다.</p>
          )}
        </div>
        <div className={styles.inputGroup}>
          <label>인증번호</label>
          <div className={styles.idField}>
            <input
              type="text"
              placeholder="인증번호를 입력해주세요."
              value={certificationNumber}
              onChange={(e) => setCertificationNumber(e.target.value)}
            />
            <button
              className={styles.checkButton}
              onClick={handleCheckCertificationNumber}
              disabled={!isCertificationRequested}
            >
              인증확인
            </button>
          </div>
        </div>

        <button className={styles.submitButton} onClick={handleSubmit}>
          다음으로
        </button>
      </div>
    </div>
  );
};

export default Signup;

