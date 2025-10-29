'use client';

import React, { useState } from 'react';
import styles from "@/app/signup/Signup.module.css";

const Signup = ()=> {

    const [userId, setUserId] = useState('');
     const [password, setPassword] = useState('');
     const [passwordConfirm, setPasswordConfirm] = useState('');
     const [fullName, setFullName] = useState('');
     const [gender, setGender] = useState<'male' | 'female' | 'secret' | ''>('');
     const [birthYear, setBirthYear] = useState<'' | '2004' | '2005' | '2006'>('');
     const [message, setMessage] = useState('');


     const handleDuplicateCheck = () => {
    if (!userId) return setMessage('아이디를 먼저 입력해주세요.');
    setMessage('사용 가능한 아이디입니다');
  };

  // 제출
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setMessage('');

    if (!userId || !password || !passwordConfirm || !fullName || !gender || !birthYear) {
      return setMessage('모든 항목을 입력/선택해주세요.');
    }
    if (password !== passwordConfirm) {
      return setMessage('비밀번호 확인이 일치하지 않습니다.');
    }
    // 실제 프로젝트에서는 여기서 API 호출
    alert(`회원가입 데이터\n${JSON.stringify({ userId, fullName, gender, birthYear }, null, 2)}`);
    setMessage('회원가입이 완료되었습니다');
  };

    return (
         <main className={styles.page}>
      <section className={styles.card} aria-labelledby="signup-title">
        <header className={styles.cardHeader}>
          <button className={styles.iconBtn} type="button" aria-label="뒤로 가기">←</button>
          <h1 id="signup-title" className={styles.title}>회원가입</h1>
        </header>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {/* 아이디 + 중복확인 */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="userId">아이디</label>
            <div className={styles.row}>
              <input
                id="userId"
                type="text"                                  /* 지침: text */
                placeholder="아이디를 입력해주세요."
                className={styles.input}
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
                aria-describedby="userIdHint"
              />
              <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={handleDuplicateCheck}>
                중복확인
              </button>
            </div>
            <p id="userIdHint" className={styles.hint}>영문/숫자 조합을 권장합니다.</p>
          </div>

          {/* 비밀번호 */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"                               /* 지침: password */
              placeholder="비밀번호를 입력해주세요."
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* 비밀번호 확인 */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="passwordConfirm">비밀번호 확인</label>
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
            <label className={styles.label} htmlFor="fullName">이름</label>
            <input
              id="fullName"
              type="text"                                   /* 지침: text */
              placeholder="이름을 입력해주세요."
              className={styles.input}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          {/* 성별: 라디오(name 동일 → 하나만 선택) */}
          <fieldset className={styles.field}>
            <legend className={styles.label}>성별</legend>
            <div className={styles.radios}>
              <label className={styles.radio}>
                <input
                  type="radio"
                  name="gender"                              /* 지침: name 동일 */
                  value="male"
                  checked={gender === 'male'}
                  onChange={(e) => setGender(e.target.value as any)}
                />
                남성
              </label>
              <label className={styles.radio}>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === 'female'}
                  onChange={(e) => setGender(e.target.value as any)}
                />
                여성
              </label>
              <label className={styles.radio}>
                <input
                  type="radio"
                  name="gender"
                  value="secret"
                  checked={gender === 'secret'}
                  onChange={(e) => setGender(e.target.value as any)}
                />
                비공개
              </label>
            </div>
          </fieldset>

          {/* 나이(출생년도): select + option 2004/2005/2006 */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="birthYear">나이</label>
            <div className={styles.select}>
              <select
                id="birthYear"
                value={birthYear}
                onChange={(e) => setBirthYear(e.target.value as any)}
                required
              >
                <option value="">태어난 년도를 선택해주세요.</option>
                <option value="2004">2004</option>
                <option value="2005">2005</option>
                <option value="2006">2006</option>
              </select>
            </div>
          </div>

          {/* 회원가입 버튼 (지침: button 태그) */}
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