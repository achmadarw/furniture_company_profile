'use client';

import { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ label, error, className = '', ...props }, ref) => {
        return (
            <div className='w-full'>
                {label && (
                    <label className='block text-sm font-semibold text-secondary-700 mb-2'>
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    className={`
            w-full px-4 py-3 rounded-lg border-2 border-secondary-200 
            focus:border-primary-500 focus:outline-none transition-colors
            text-secondary-900 placeholder:text-secondary-400
            min-h-[120px] resize-y
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

Textarea.displayName = 'Textarea';

export default Textarea;
