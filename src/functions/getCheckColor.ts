import {Check} from "../store/check";

export const CHECK_COLORS = {
    'success-live': '#29de39',
    'success-expired': '#254f2e',
    'fail-live': '#fe3939',
    'fail-expired': '#662d2d',
    'not-exist': '#636363',
}

export const getCheckColor = (now: number, delay: number, check?: Check, ): string => {
    let color = ''
    if (check) {
        if (check.status === 'SUCCESS') {

            if (now - check.checkTime < delay) {
                //Success and in time
                color = 'success-live'
            } else {
                //Success but out of time
                color = 'success-expired'
            }
        } else {
            if (now - check.checkTime < delay) {
                //Success and in time
                color = 'fail-live'
            } else {
                //Success but out of time
                color = 'fail-expired'
            }
        }
    } else {
        color = 'not-exist'
    }
    return color
}
