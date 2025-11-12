'use client';

import React, { useEffect, useState } from "react";
import styles from "@/app/signup/Signup.module.css";

type FormData = {
  username: string;
  password: string;
  confirmPassword: string;
  name: string;
  gender: string;
  birthYear: string;
  phone: string;
  verificationCode: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const Signup = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
    gender: "",
    birthYear: "",
    phone: "",
    verificationCode: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [sentCode, setSentCode] = useState<string>("");
  const [timer, setTimer] = useState<number>(0);
  const [toast, setToast] = useState<string>("");

  /* 실시간 유효성 검사 */
  useEffect(() => {
    const newErrors: FormErrors = {};

    if (formData.username && !/^[a-zA-Z0-9]{5,12}$/.test(formData.username))
      newErrors.username = "영문과 숫자 조합 5~12자로 입력해주세요.";

    if (formData.password && !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(formData.password))
      newErrors.password = "영문, 숫자, 특수문자를 포함해 8자 이상 입력해주세요.";

    if (formData.confirmPassword && formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";

    if (formData.phone && !/^010\d{8}$/.test(formData.phone))
      newErrors.phone = "올바른 전화번호 형식을 입력해주세요. (01012345678)";

    setErrors(newErrors);
  }, [formData]);

  /* 타이머 관리 (인증번호 3분 유효) */
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer(prev => prev - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

 /* 입력값 변경 처리 */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  /* 토스트 메시지 표시 */
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  /* 아이디 중복확인 */
  const handleIdCheck = () => {
    if (errors.username || !formData.username) {
      showToast("아이디 형식을 먼저 확인해주세요.");
      return;
    }

    // Mock API (admin만 중복 처리)
    setTimeout(() => {
      if (formData.username === "admin") {
        setIsIdChecked(false);
        showToast("이미 사용 중인 아이디입니다");
      } else {
        setIsIdChecked(true);
        showToast("사용 가능한 아이디입니다");
      }
    }, 500);
  };

  /* 인증번호 전송 */
  const handleSendCode = () => {
    if (errors.phone || !formData.phone) {
      showToast("전화번호를 올바르게 입력해주세요.");
      return;
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setSentCode(code);
    setTimer(180); // 3분 타이머
    setIsVerified(false);
    showToast("인증번호가 전송되었습니다 (mock)");
  };

  /* 인증번호 확인 */
  const handleVerifyCode = () => {
    if (!sentCode) {
      showToast("인증번호를 먼저 전송해주세요.");
      return;
    }

    if (formData.verificationCode === sentCode) {
      setIsVerified(true);
      showToast("인증이 완료되었습니다");
      setTimer(0);
    } else {
      showToast("인증번호가 올바르지 않습니다");
    }
  };

  /* 폼 제출 */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isIdChecked) return showToast("아이디 중복확인을 해주세요.");
    if (!isVerified) return showToast("전화번호 인증을 완료해주세요.");
    if (Object.keys(errors).length > 0) return showToast("입력값을 다시 확인해주세요.");

    showToast("회원가입 성공 🎉");
    // 실제 서버 전송 로직 위치
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>회원가입</h2>

      {toast && <div className={styles.toast}>{toast}</div>}

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* 아이디 */}
        <div className={styles.formGroup}>
          <label className={styles.label}>아이디</label>
          <div className={styles.inputRow}>
            <input
              type="text"
              name="username"
              placeholder="아이디를 입력해주세요."
              value={formData.username}
              onChange={handleChange}
              className={styles.input}
              autoComplete="off"
            />
            <button
              type="button"
              className={styles.duplicateBtn}
              onClick={handleIdCheck}
            >
              중복확인
            </button>
          </div>
          {errors.username && <p className={styles.error}>{errors.username}</p>}
        </div>

        {/* 비밀번호 */}
        <div className={styles.formGroup}>
          <label className={styles.label}>비밀번호</label>
          <input
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요."
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
            autoComplete="off"
          />
          {errors.password && <p className={styles.error}>{errors.password}</p>}
        </div>

        {/* 비밀번호 확인 */}
        <div className={styles.formGroup}>
          <label className={styles.label}>비밀번호 확인</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="비밀번호를 다시 입력해주세요."
            value={formData.confirmPassword}
            onChange={handleChange}
            className={styles.input}
            autoComplete="off"
          />
          {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>}
        </div>

        {/* 이름 */}
        <div className={styles.formGroup}>
          <label className={styles.label}>이름</label>
          <input
            type="text"
            name="name"
            placeholder="이름을 입력해주세요."
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        {/* 성별 */}
        <div className={styles.formGroup}>
          <label className={styles.label}>성별</label>
          <div className={styles.radioGroup}>
            <label><input type="radio" name="gender" value="male" onChange={handleChange}/> 남성</label>
            <label><input type="radio" name="gender" value="female" onChange={handleChange}/> 여성</label>
            <label><input type="radio" name="gender" value="private" onChange={handleChange}/> 비공개</label>
          </div>
        </div>

        {/* 나이 */}
        <div className={styles.formGroup}>
          <label className={styles.label}>나이</label>
          <select
            name="birthYear"
            value={formData.birthYear}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="">태어난 년도를 선택해주세요.</option>
            <option value="2006">2006</option>
            <option value="2005">2005</option>
            <option value="2004">2004</option>
          </select>
        </div>

        {/* 전화번호 */}
        <div className={styles.formGroup}>
          <label className={styles.label}>전화번호</label>
          <div className={styles.inputRow}>
            <input
              type="text"
              name="phone"
              placeholder="01012345678"
              value={formData.phone}
              onChange={handleChange}
              className={`${styles.input} ${isVerified ? styles.disabledInput : ""}`}
              disabled={isVerified}
            />
            <button
              type="button"
              className={`${styles.verifyBtn} ${isVerified ? styles.verified : ""}`}
              onClick={handleSendCode}
              disabled={isVerified}
            >
              {isVerified ? "인증완료" : "인증번호 전송"}
            </button>
          </div>
          {errors.phone && <p className={styles.error}>{errors.phone}</p>}
          {timer > 0 && !isVerified && (
            <p className={styles.timer}>
              남은 시간: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, "0")}
            </p>
          )}
        </div>

        {/* 인증번호 */}
        {!isVerified && (
          <div className={styles.formGroup}>
            <label className={styles.label}>인증번호</label>
            <div className={styles.inputRow}>
              <input
                type="text"
                name="verificationCode"
                placeholder="인증번호를 입력해주세요."
                value={formData.verificationCode}
                onChange={handleChange}
                className={styles.input}
              />
              <button
                type="button"
                className={styles.verifyBtn}
                onClick={handleVerifyCode}
              >
                인증확인
              </button>
            </div>
          </div>
        )}

        <button type="submit" className={styles.submitBtn}>회원가입</button>
      </form>
    </div>
  );
};

export default Signup;