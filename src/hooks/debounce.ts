import {useEffect, useState} from 'react';

//https://thisblogfor.me/web/throttle_debounce/
export function useDebounce(value: any, delay: number) {
    // 디바운스 할 값을 관리하기위한 상태값과 setter 함수
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // 딜레이 이후 값을 업데이트한다.
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // 딜레이 기간중에 value 혹은 delay 값이 업데이트 되었다면 이(cleanup)함수를 실행한다.
        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]); // delay 값이나 value 값이 업데이트 되었다면 다시 호출한다.

    return debouncedValue;
}
