'use client';

import React, { useEffect, useState } from "react";
import styles from "@/app/signup/Signup.module.css";
import axios from "axios";

const ID_CHECK_ENDPOINT    = "https://www.gamzasturdy.shop/api/auth/check_login_id";
const SEND_CODE_ENDPOINT   = "https://www.gamzasturdy.shop/api/sms/send";
const VERIFY_CODE_ENDPOINT = "https://www.gamzasturdy.shop/api/sms/verify";
const SIGNUP_ENDPOINT      = "https://www.gamzasturdy.shop/auth/signup";


type FormData = {
  loginId: string;          // 아이디
  password: string;         // 비밀번호
  confirmPassword: string;  // 비밀번호 확인 (프론트 전용)
  username: string;         // 이름
  gender: string;           // 성별
  birthDate: string;        // 생일
  phoneNumber: string;      // 전화번호
  verificationCode: string; // 인증번호 입력값 (프론트 전용)
  verified: boolean;        // 인증상태
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const Signup = () => {
  const [formData, setFormData] = useState<FormData>({
    loginId: "",
    password: "",
    confirmPassword: "",
    username: "",
    gender: "",
    birthDate: "",
    phoneNumber: "",
    verificationCode: "",
    verified: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [toast, setToast] = useState<string>("");

  /* 실시간 유효성 검사 */
  useEffect(() => {
    const newErrors: FormErrors = {};

    // 아이디(loginId) 검사
    if (formData.loginId && !/^[a-zA-Z0-9]{5,12}$/.test(formData.loginId)) {
      newErrors.loginId = "영문과 숫자 조합 5~12자로 입력해주세요.";
    }

    // 비밀번호 검사
    if (
      formData.password &&
      !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(formData.password)
    ) {
      newErrors.password = "영문, 숫자, 특수문자를 포함해 8자 이상 입력해주세요.";
    }

    // 비밀번호 확인 일치 여부
    if (
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    // 전화번호 검사
    if (formData.phoneNumber && !/^010\d{8}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber =
        "올바른 전화번호 형식을 입력해주세요. (01012345678)";
    }

    setErrors(newErrors);
  }, [formData]);

  /* 입력값 변경 처리 */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  /* 토스트 메시지 표시 */
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  /* 아이디 중복확인 */
  const handleIdCheck = async () => {
  if (errors.loginId || !formData.loginId) {
    showToast("아이디 형식을 먼저 확인해주세요.");
    return;
  }

  try {
    const response = await axios.post(
        ID_CHECK_ENDPOINT,
        { loginId: formData.loginId }, 
        {
          headers: { "Content-Type": "application/json" },
        }
      );

    console.log("아이디 중복확인 응답:", response.data);

    if (response.data.exists === false) {
      setIsIdChecked(true);
      showToast("사용 가능한 아이디입니다");
    } else {
      setIsIdChecked(false);
      showToast("이미 사용 중인 아이디입니다");
    }
  } catch (error) {
  if (axios.isAxiosError(error)) {
    console.error("아이디 중복확인 실패:", error.response?.data ?? error.message);
  } else {
    console.error("아이디 중복확인 실패(알 수 없는 에러):", error);
  }

  showToast("아이디 확인 중 오류가 발생했습니다.");
}

};

  /* 인증번호 전송 */
  const handleSendCode = async () => {
  if (errors.phoneNumber || !formData.phoneNumber) {
    showToast("전화번호를 올바르게 입력해주세요.");
    return;
  }

  try {
    const response =await axios.post(
  SEND_CODE_ENDPOINT,
  {
    phoneNumber: formData.phoneNumber
  },
  {
    headers: { "Content-Type": "application/json" }
  }
);


    console.log("인증번호 전송 응답:", response.data);

    setFormData((prev) => ({ ...prev, verified: false }));

    showToast("인증번호가 전송되었습니다.");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("인증번호 전송 실패:", error.response?.data ?? error.message);
    } else {
      console.error("인증번호 전송 실패(알 수 없는 에러):", error);
    }

    showToast("인증번호 전송 중 오류가 발생했습니다.");
  }
};


  /* 인증번호 확인 */
  const handleVerifyCode = async () => {
  if (!formData.verificationCode) {
    showToast("인증번호를 입력해주세요.");
    return;
  }

  const payload = {
    phoneNumber: formData.phoneNumber,
    code: formData.verificationCode,
  };

    console.log("인증번호 확인 페이로드:", payload);

  try {
    const response = await axios.post(VERIFY_CODE_ENDPOINT,payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("인증번호 확인 응답:", response.data);

    if (response.status == 200 ) { 
            setFormData((prev) => ({ ...prev, verified: true })); 
            showToast("인증이 완료되었습니다 ");
        } else {
            showToast("인증번호가 올바르지 않습니다");
        }
    } catch (error) {
        showToast("인증번호 확인 중 오류가 발생했습니다.");
    }
};


  /* 폼 제출 */
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!isIdChecked) return showToast("아이디 중복확인을 해주세요.");
  if (!formData.verified) return showToast("전화번호 인증을 완료해주세요.");
  if (Object.keys(errors).length > 0)
    return showToast("입력값을 다시 확인해주세요.");

  const payload = {
    loginId: formData.loginId,
    password: formData.password,
    username: formData.username,
    gender: formData.gender,
    birthDate: formData.birthDate ? `${formData.birthDate}-06-02` : null,
    phoneNumber: formData.phoneNumber,
    verified: formData.verified,
  };

  try {
    const response = await axios.post(SIGNUP_ENDPOINT, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("회원가입 응답:", response.data);

    showToast("회원가입 성공 🎉");

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("회원가입 실패:", error.response?.data ?? error.message);
    } else {
      console.error("회원가입 실패(알 수 없는 에러):", error);
    }

    showToast("회원가입 중 오류가 발생했습니다.");
  }
};


  return (
    <div className={styles.container}>
      <h2 className={styles.title}>회원가입</h2>

      {toast && <div className={styles.toast}>{toast}</div>}

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* 아이디 (loginId) */}
        <div className={styles.formGroup}>
          <label className={styles.label}>아이디</label>
          <div className={styles.inputRow}>
            <input
              type="text"
              name="loginId"
              placeholder="아이디를 입력해주세요."
              value={formData.loginId}
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
          {errors.loginId && (
            <p className={styles.error}>{errors.loginId}</p>
          )}
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
        </div>
        {errors.password && (
          <p className={styles.error}>{errors.password}</p>
        )}

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
          {errors.confirmPassword && (
            <p className={styles.error}>{errors.confirmPassword}</p>
          )}
        </div>

        {/* 이름 (username) */}
        <div className={styles.formGroup}>
          <label className={styles.label}>이름</label>
          <input
            type="text"
            name="username"
            placeholder="이름을 입력해주세요."
            value={formData.username}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        {/* 성별 */}
        <div className={styles.formGroup}>
          <label className={styles.label}>성별</label>
          <div className={styles.radioGroup}>
            <label>
              <input
                type="radio"
                name="gender"
                value="MALE"
                onChange={handleChange}
              />{" "}
              남성
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="FEMALE"
                onChange={handleChange}
              />{" "}
              여성
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="NONE"
                onChange={handleChange}
              />{" "}
              비공개
            </label>
          </div>
        </div>

        {/* 생일 (birthDate) */}
        <div className={styles.formGroup}>
          <label className={styles.label}>생일</label>
          <select
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="">태어난 년도를 선택해주세요.</option>
            <option value="2006">2006</option>
            <option value="2005">2005</option>
            <option value="2004">2004</option>
          </select>
        </div>

        {/* 전화번호 (phoneNumber) */}
        <div className={styles.formGroup}>
          <label className={styles.label}>전화번호</label>
          <div className={styles.inputRow}>
            <input
              type="text"
              name="phoneNumber"
              placeholder="01012345678"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`${styles.input} ${
                formData.verified ? styles.disabledInput : ""
              }`}
              disabled={formData.verified}
            />
            <button
              type="button"
              className={`${styles.verifyBtn} ${
                formData.verified ? styles.verified : ""
              }`}
              onClick={handleSendCode}
              disabled={formData.verified}
            >
              {formData.verified ? "인증완료" : "인증번호 전송"}
            </button>
          </div>
          {errors.phoneNumber && (
            <p className={styles.error}>{errors.phoneNumber}</p>
          )}
        </div>

        {/* 인증번호 입력 */}
        {!formData.verified && (
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

        <button type="submit" className={styles.submitBtn}>
          회원가입
        </button>
      </form>
    </div>
  );
};

export default Signup;