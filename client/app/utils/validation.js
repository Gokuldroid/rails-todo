import { isBlank } from '@ember/utils';


const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


export function isValidEmail(email) {
    return EMAIL_REGEX.test(email);
}

export function minLength(text, minLength) {
    return minLength == 0 || (!isBlank(text) && text.length >= minLength);
}