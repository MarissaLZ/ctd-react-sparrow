import React from "react"

export default function Input({
  id,
  type,
  value,
  handleChange,
  className,
  placeholder,
}) {
  return (
    <>
      <label htmlFor={id}></label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={handleChange}
        className={className}
        placeholder={placeholder}
      />
    </>
  )
}
