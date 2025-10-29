'use client';

import react from "react";
import styles from "@/app/signup/Signup.module.css";

const Signup = ()=> {

    return (
      <div className={styles.container}>
      <h2 className={styles.title}>회원가입</h2>

      <form className={styles.form}>
        {/* 아이디 */}
        <div className={styles.formGroup}>
          <label className={styles.label}>아이디</label>
          <div className={styles.inputRow}>
            <input
              type="text"
              placeholder="아이디를 입력해주세요."
              className={styles.input}
            />
            <button type="button" className={styles.duplicateBtn}>
              중복확인
            </button>
          </div>
        </div>

        {/* 비밀번호 */}
        <div className={styles.formGroup}>
          <label className={styles.label}>비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            className={styles.input}
          />
        </div>

        {/* 비밀번호 확인 */}
        <div className={styles.formGroup}>
          <label className={styles.label}>비밀번호 확인</label>
          <input
            type="password"
            placeholder="비밀번호를 다시 입력해주세요."
            className={styles.input}
          />
        </div>

        {/* 이름 */}
        <div className={styles.formGroup}>
          <label className={styles.label}>이름</label>
          <input
            type="text"
            placeholder="이름을 입력해주세요."
            className={styles.input}
          />
        </div>

        {/* 성별 */}
        <div className={styles.formGroup}>
          <label className={styles.label}>성별</label>
          <div className={styles.radioGroup}>
            <label><input type="radio" name="gender" /> 남성</label>
            <label><input type="radio" name="gender" /> 여성</label>
            <label><input type="radio" name="gender" /> 비공개</label>
          </div>
        </div>

        {/* 나이 */}
        <div className={styles.formGroup}>
          <label className={styles.label}>나이</label>
          <select className={styles.select}>
            <option>태어난 년도를 선택해주세요.</option>
            <option>2004</option>
            <option>2005</option>
            <option>2006</option>
          </select>
        </div>

        <button type="submit" className={styles.submitBtn}>다음으로</button>
      </form>
    </div>
    );
};

export default Signup;