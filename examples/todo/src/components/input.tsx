import React, { FC, useState, useRef, useEffect } from 'react'
interface Proops {
    handleSubmit?: (str: string) => void;
    formCSS?: string,
    inputCSS?: string,
    value: string;
    changeValue?: (val: string) => void,
    isSearching?: boolean,
    onBlur?: () => any
}
export const Input: FC<Proops> = ({ handleSubmit, formCSS, inputCSS, value, isSearching, changeValue, onBlur }) => {

    const inputRef = useRef(null as any);
    const [inputValue, setValue] = useState(value);
    useEffect(() => {
        inputRef.current?.focus();
        setValue(value);
    }, [isSearching, value]);

    function onSubmit(e: any) {
        e.preventDefault();
        handleSubmit?.call(null, inputValue);
    }

    if (!formCSS) formCSS = 'mb-4'
    if (!inputCSS) inputCSS = 'shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker'
    return (
        <form onSubmit={onSubmit} className={formCSS}>
            <input
                ref={inputRef}
                className={inputCSS}
                type="text"
                onBlur={() => onBlur?.call(null)}
                value={inputValue}
                onChange={e => { setValue(e.target.value); changeValue?.call(null, e.target.value) }}
                placeholder={isSearching ? 'Search todos' : 'What needs to be done?'}
            />
        </form>
    )
}