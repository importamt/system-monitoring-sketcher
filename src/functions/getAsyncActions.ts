export const getAsyncActions = (type: string) => ({
    request: `${type}_REQUEST`,
    success: `${type}_SUCCESS`,
    fail: `${type}_FAIL`,
})

