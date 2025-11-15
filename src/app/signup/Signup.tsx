'use client';

import React, { useState } from 'react';
import styles from "@/app/signup/Signup.module.css";

const Signup = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'secret' | ''>('');
  const [birthYear, setBirthYear] = useState<'' | '2004' | '2005' | '2006'>('');
  const [message, setMessage] = useState('');

  // ✅ 전화번호 관련 state
  const [phone, setPhone] = useState('');
  const [verifyCode, setVerifyCode] = useState('');  // 실제 발송된 코드
  const [userCode, setUserCode] = useState('');      // 사용자가 입력한 코드
  const [isVerified, setIsVerified] = useState(false); // 인증 여부

  // 아이디 중복확인
  const handleDuplicateCheck = () => {
    if (!userId) return setMessage('아이디를 먼저 입력해주세요.');
    setMessage('사용 가능한 아이디입니다');
  };

  // ✅ 인증번호 전송
  const handleSendCode = () => {
    if (!phone) return setMessage('전화번호를 입력해주세요.');
    const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6자리 난수
    setVerifyCode(code);
    setIsVerified(false);
    setMessage(`인증번호가 발송되었습니다: ${code}`); // 실제 서비스에서는 이 부분은 alert로 X, 서버 API로 처리
  };

  // ✅ 인증번호 확인
  const handleVerifyCode = () => {
    if (userCode === verifyCode && verifyCode !== '') {
      setIsVerified(true);
      setMessage('전화번호 인증이 완료되었습니다 ');
    } else {
      setIsVerified(false);
      setMessage('인증번호가 올바르지 않습니다 ');
    }
  };

  // 제출
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setMessage('');

    if (!userId || !password || !passwordConfirm || !fullName || !gender || !birthYear || !phone) {
      return setMessage('모든 항목을 입력해주세요.');
    }
    if (password !== passwordConfirm) {
      return setMessage('비밀번호 확인이 일치하지 않습니다.');
    }
    if (!isVerified) {
      return setMessage('전화번호 인증을 완료해주세요.');
    }

    alert(`회원가입 데이터\n${JSON.stringify({ userId, fullName, gender, birthYear, phone }, null, 2)}`);
    setMessage('회원가입이 완료되었습니다 🎉');
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
            <label htmlFor="userId">아이디</label>
            <div className={styles.row}>
              <input
                id="userId"
                type="text"
                placeholder="아이디를 입력해주세요."
                className={styles.input}
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
              <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={handleDuplicateCheck}>
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
            <label htmlFor="fullName">이름</label>
            <input
              id="fullName"
              type="text"
              placeholder="이름을 입력해주세요."
              className={styles.input}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          {/* ✅ 전화번호 + 인증 */}
          <div className={styles.field}>
            <label htmlFor="phone">전화번호</label>
            <div className={styles.row}>
              <input
                id="phone"
                type="tel"
                placeholder="01012345678"
                className={styles.input}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <button
                type="button"
                className={`${styles.btn} ${styles.btnGhost}`}
                onClick={handleSendCode}
              >
                인증번호 전송
              </button>
            </div>

            {/* 인증번호 입력 */}
            {verifyCode && (
              <div className={styles.row} style={{ marginTop: '8px' }}>
                <input
                  type="text"
                  placeholder="인증번호 입력"
                  className={styles.input}
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                />
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnGhost}`}
                  onClick={handleVerifyCode}
                >
                  확인
                </button>
              </div>
            )}
            {isVerified && <p className={styles.hint}>✅ 인증 완료</p>}
          </div>

          {/* 성별 */}
          <fieldset className={styles.field}>
            <legend className={styles.label}>성별</legend>
            <div className={styles.radios}>
              <label><input type="radio" name="gender" value="male" checked={gender === 'male'} onChange={(e) => setGender(e.target.value as any)} />남성</label>
              <label><input type="radio" name="gender" value="female" checked={gender === 'female'} onChange={(e) => setGender(e.target.value as any)} />여성</label>
              <label><input type="radio" name="gender" value="secret" checked={gender === 'secret'} onChange={(e) => setGender(e.target.value as any)} />비공개</label>
            </div>
          </fieldset>

          {/* 출생년도 */}
          <div className={styles.field}>
            <label htmlFor="birthYear">나이</label>
            <select id="birthYear" value={birthYear} onChange={(e) => setBirthYear(e.target.value as any)} required>
              <option value="">선택해주세요</option>
              <option value="2004">2004</option>
              <option value="2005">2005</option>
              <option value="2006">2006</option>
            </select>
          </div>

          {/* 회원가입 버튼 */}
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
