"use client";

import React from "react";
import styles from "@/app/signup/Signup.module.css";

const Signup = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>회원가입</h2>
      
      <div className={styles.field}>
        <div className={styles.inputGroup}>
          <label>아이디</label>
          <div className={styles.idField}>
            <input type="text" placeholder="아이디를 입력해주세요." />
            <button className={styles.checkButton}>중복확인</button>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label>비밀번호</label>
          <input type="password" placeholder="비밀번호를 입력해주세요." />
        </div>

        <div className={styles.inputGroup}>
          <label>비밀번호 확인</label>
          <input type="password"placeholder="비밀번호를 다시 입력해주세요." />
        </div>

        <div className={styles.inputGroup}>
          <label>이름</label>
          <input type="text" placeholder="이름을 입력해주세요." />
        </div>

        <div className={styles.inputGroup}>
          <label>성별</label>
          <div className={styles.radio}>
            <label><input type="radio" name="gender" value="male" /> 남성</label>
            <label><input type="radio" name="gender" value="female" /> 여성</label>
            <label><input type="radio" name="gender" value="private" /> 비공개</label>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label>나이</label>
          <select className={styles.select} defaultValue="">
            <option value="" disabled>태어난 년도를 선택해주세요.</option>
            <option value="2006">2006년</option>
            <option value="2005">2005년</option>
            <option value="2004">2004년</option>
          </select>
        </div>

        <button className={styles.submitButton}>다음으로</button>
      </div>
    </div>
  );
};

export default Signup;