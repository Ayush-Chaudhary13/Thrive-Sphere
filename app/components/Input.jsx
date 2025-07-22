'use client';

import clsx from "clsx";

const Input = ({
  label,
  id,
  register,
  required,
  errors,
  type = 'text',
  disabled,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className={`
          block 
          text-sm 
          font-medium 
          leading-6 
          mb-1
          text-graydark
          dark:text-graylight
        `}
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required })}
          className={clsx(
            `form-input
            block
            w-full
            rounded-lg
            border-0
            p-2
            text-graydark
            dark:text-graylight
            bg-graylight
            dark:bg-graydarker
            shadow-sm
            ring-1
            ring-inset
            ring-gray-300
            dark:ring-graydark
            placeholder:text-gray-400
            focus:ring-2
            focus:ring-inset
            focus:ring-tealmain
            outline-none
            transition
            sm:text-sm
            sm:leading-6`,
            errors[id] && 'ring-2 ring-rose-500 focus:ring-rose-500',
            disabled && 'opacity-50 cursor-default'
          )}
        />
      </div>
      {errors[id] && (
        <span className="text-xs text-rose-500 mt-1 block">{errors[id].message || "This field is required."}</span>
      )}
    </div>
  );
}

export default Input;
