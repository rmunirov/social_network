export const required = (value) => (value ? undefined : "Required");

export const maxLength = (max) => (value) => value && value.length >= max ? `Should be less than ${max}` : undefined;

export const minLength = (min) => (value) => value && value.length >= min? undefined : `Should be greater than ${min}`;

export const composeValidators = (...validators) => (value) =>
    validators.reduce((error, validator) => error || validator(value), undefined)
