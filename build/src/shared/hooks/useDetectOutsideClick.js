import { useCallback, useEffect, useState } from 'react';
const useDetectOutsideClick = (ref, initialState) => {
    const [isActive, setIsActive] = useState(initialState);
    const handleClick = useCallback((event) => {
        if (ref.current !== null && !ref.current.contains(event.target)) {
            setIsActive(!isActive);
        }
    }, [isActive, ref]);
    useEffect(() => {
        if (isActive) {
            window.addEventListener('click', handleClick);
        }
        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, [isActive, handleClick]);
    return [isActive, setIsActive];
};
export default useDetectOutsideClick;
