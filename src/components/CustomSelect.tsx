'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './CustomSelect.module.css';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  id?: string;
}

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = '선택해주세요',
  required = false,
  id,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 선택된 옵션의 라벨 찾기
  const selectedLabel = options.find(opt => opt.value === value)?.label || placeholder;

  return (
    <div 
      ref={selectRef}
      className={`${styles.select} ${isOpen ? styles.open : ''}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div 
        className={styles.trigger}
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={`${id}-listbox`}
        aria-haspopup="listbox"
        id={id}
      >
        {selectedLabel}
      </div>
      
      {isOpen && (
        <ul 
          className={styles.options}
          role="listbox"
          id={`${id}-listbox`}
          aria-label="연도 선택"
        >
          {options.map((option) => (
            <li
              key={option.value}
              className={`${styles.option} ${value === option.value ? styles.selected : ''}`}
              role="option"
              aria-selected={value === option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}