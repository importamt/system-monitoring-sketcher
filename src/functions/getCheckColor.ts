import {Check, CheckStatus} from "../store/check";

export const CHECK_COLORS = {
    'success-live': '#09ce19',
    'success-expired': '#056f0e',
    'fail-live': '#ce0909',
    'fail-expired': '#860d0d',
    'not-exist': '#636363',
}

export const getCheckColor = (now: number, check?: Check): string => {
    let color = ''
    if (check) {
        if (check.status === CheckStatus.SUCCESS) {
            if (now - check.checkTime < 1000 * 60 * 30) {
                //Success and in time
                color = 'success-live'
            } else {
                //Success but out of time
                color = 'success-expired'
            }
        } else {
            if (now - check.checkTime < 1000 * 60 * 30) {
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
