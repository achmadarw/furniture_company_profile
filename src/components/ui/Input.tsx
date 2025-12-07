'use client';

import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className = '', ...props }, ref) => {
        return (
            <div className='w-full'>
                {label && (
                    <label className='block text-sm font-semibold text-secondary-700 mb-2'>
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={`
            w-full px-4 py-3 rounded-lg border-2 border-secondary-200 
            focus:border-primary-500 focus:outline-none transition-colors
            text-secondary-900 placeholder:text-secondary-400
            ${error ? 'border-red-500' : ''}
            ${className}
          `}
                    {...props}
                />
                {error && <p className='mt-1 text-sm text-red-500'>{error}</p>}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
