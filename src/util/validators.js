export function isEmpty(value){
    return value.trim() === ''
}

export function isNotEmail(email){
    return !email.includes('@')
}