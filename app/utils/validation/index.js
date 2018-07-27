import validatejs from 'validate.js';

import deDataConstraints from './rules/de/data';
import deClientConstraints from './rules/de/client';

const rules = {
  deDataConstraints,
  deClientConstraints,
};

export default validation = (fieldName, value, constraints) => {
  const formValues = {};
  formValues[fieldName] = value;

  const formFields = {};
  formFields[fieldName] = rules[constraints][fieldName];

  const result = validatejs(formValues, formFields);

  if (result) {
    return result[fieldName][0];
  }

  return null;
}