"use client";

import React from "react";
import styles from "@/app/signup/Signup.module.css";

const Signup = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>회원가입</h2>

      <div className={styles.field}>
        <div className={styles.input}>
          <b>아이디</b>
          <input
            type="text"
            placeholder="아이디를 입력해주세요."
            className={styles.input}
          />
        </div>

        <div className={styles.input}>
          <b>비밀번호</b>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            className={styles.input}
          />
        </div>

        <div className={styles.input}>
          <b>비밀번호 확인</b>
          <input
            type="password"
            placeholder="비밀번호를 다시 입력해주세요."
            className={styles.input}
          />
        </div>

        <div className={styles.input}>
          <b>이름</b>
          <input
            type="text"
            placeholder="이름을 입력해주세요."
            className={styles.input}
          />
        </div>

        <div className={styles.gender}>
          <b>성별</b>
          <div className={styles.radio}>
            <label>
              <input type="radio" name="gender" /> 남성
            </label>
            <label>
              <input type="radio" name="gender" /> 여성
            </label>
            <label>
              <input type="radio" name="gender" /> 비공개
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
