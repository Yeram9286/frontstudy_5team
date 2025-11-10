"use client";

import React, { useState } from "react";
import styles from "@/app/signup/Signup.module.css";

const Signup = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userCertificationNumber, setUserCertificationNumber] = useState("");

  const handleCheckId = () => {
    if (!userId) {
      alert("아이디를 입력해주세요.");
      return;
    }
    if (userId.length < 4 || userId.length > 12) {
      alert("아이디는 4~12자로 입력해주세요.");
      return;
    }
    if (!/^[a-zA-Z0-9]+$/.test(userId)) {
      alert("아이디는 영문, 숫자만 사용 가능합니다.");
      return;
    }

    const usedIds = ["soyeoung"];
    if (usedIds.includes(userId)) {
      alert("이미 사용 중인 아이디입니다.");
    } else {
      alert("사용 가능한 아이디입니다.");
    }
  };

  const handleCheckPhone = () => {
    if (!userPhone) {
      alert("전화번호를 입력해주세요.");
      return;
    }
    if (!/^[0-9]{10,11}$/.test(userPhone)) {
      alert("올바른 전화번호 형식이 아닙니다.");
      return;
    }
    alert("인증번호 6자리가 발송되었습니다.");
  };

  const handleCheckCertificationNumber = () => {
    if (!userCertificationNumber) {
      alert("인증번호를 입력해주세요.");
      return;
    }
    if (!/^[0-9]{6}$/.test(userCertificationNumber)) {
      alert("올바른 인증번호 형식이 아닙니다.");
      return;
    }
    alert("인증번호가 확인되었습니다.");
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!userId) {
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
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
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
          <input type="text" placeholder="이름을 입력해주세요." />
        </div>

        <div className={styles.inputGroup}>
          <label>성별</label>
          <div className={styles.radio}>
            <label>
              <input type="radio" name="gender" value="male" /> 남성
            </label>
            <label>
              <input type="radio" name="gender" value="female" /> 여성
            </label>
            <label>
              <input type="radio" name="gender" value="private" /> 비공개
            </label>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label>나이</label>
          <select className={styles.select}>
            <option value="" disabled>
              태어난 년도를 선택해주세요.
            </option>
            <option value="2006">2006년</option>
            <option value="2005">2005년</option>
            <option value="2004">2004년</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label>전화번호</label>
          <div className={styles.idField}>
            <input
              type="text"
              placeholder="전화번호를 입력해주세요."
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
            />
            <button className={styles.checkButton} onClick={handleCheckPhone}>
              인증요청
            </button>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label>인증번호</label>
          <div className={styles.idField}>
            <input
              type="text"
              placeholder="인증번호를 입력해주세요."
              value={userCertificationNumber}
              onChange={(e) => setUserCertificationNumber(e.target.value)}
            />
            <button
              className={styles.checkButton}
              onClick={handleCheckCertificationNumber}
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
