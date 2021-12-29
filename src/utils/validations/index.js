import {
  validateRequired,
  validateMaxLength,
  validateMinLength,
  isValidEmail,
  checkEqual,
  validatePositiveInteger,
} from './common';
import { checkValidDomain } from '../../utils/index';
import errorMessages from 'constants/errorMessages';

export const defaultValidation = {
  name: ({ value }) => {
    if (!validateRequired(value)) {
      return errorMessages.blank('Name');
    }
    if (!validateMaxLength(value, 256)) {
      return errorMessages.maxLengthReached('Length of Name', 255);
    }
    // if (!alphabetsWithSpace(value)) {
    //   return errorMessages.onlyAlphabetSpace;
    // }
  },
  reporting_manager: ({ value }) => {
    if (!validateRequired(value)) {
      return errorMessages.blank('Name');
    }
    if (!validateMaxLength(value, 256)) {
      return errorMessages.maxLengthReached('Length of Name', 255);
    }
    // if (!alphabetsWithSpace(value)) {
    //   return errorMessages.onlyAlphabetSpace;
    // }
  },
  senior_manager: ({ value }) => {
    // if (!validateRequired(value)) {
    //   return errorMessages.blank('Name');
    // }
    if (!validateMaxLength(value, 256)) {
      return errorMessages.maxLengthReached('Length of Name', 255);
    }
    // if (!alphabetsWithSpaceOrEmpty(value)) {
    //   return errorMessages.onlyAlphabetSpace;
    // }
  },
  work_force_manager_name: ({ value }) => {
    if (!validateMaxLength(value, 256)) {
      return errorMessages.maxLengthReached('Length of Name', 255);
    }
  },
  password: ({ value }) => {
    return validatePassword(value);
  },
  old_pswd: ({ value }) => {
    return validatePassword(value);
  },
  new_pswd: ({ value }) => {
    return validatePassword(value);
  },
  confirmPassword: ({ value }) => {
    return validatePassword(value);
  },
  emp_id: ({ value }) => {
    if (!validateRequired(value)) {
      return errorMessages.blank('Employee ID');
    }
    if (!validateMaxLength(value, 26)) {
      return errorMessages.maxLengthReached('Length of Employee ID', 25);
    }
    // if (!isAlphaNumeric(value)) {
    //   return errorMessages.onlyAlphaNumeric;
    // }
  },
  username: ({ value }) => {
    return validEmail(value);
  },
  email: ({ value, formData = {}, domainList = [] }) => {
    if (Object.keys(formData).length > 0)
      return validateEmpForm(value, formData, domainList, 'email');
    else return validEmail(value);
    // return validEmail(value);
  },
  role: ({ value }) => {
    if (!validateRequired(value)) {
      return errorMessages.blank('Role');
    }
  },
  reporting_manager_email: ({ value, formData = {}, domainList }) => {
    // return validEmail(value);
    return validateEmpForm(
      value,
      formData,
      domainList,
      'reporting_manager_email',
    );
  },
  senior_manager_email: ({ value, formData = {}, domainList }) => {
    // if (value && !isValidEmail(value)) {
    //   return errorMessages.invalidEmail;
    // }
    return validateEmpForm(value, formData, domainList, 'senior_manager_email');
  },
  work_force_manager: ({ value, formData = {}, domainList }) => {
    return validateEmpForm(value, formData, domainList, 'work_force_manager');
  },
  duration: ({ value: { startDate, endDate } }) => {
    if (!validateRequired(startDate) || !validateRequired(endDate)) {
      return errorMessages.blank('Duration');
    }
  },
  reason: ({ value: { value } }) => {
    if (!validateRequired(value)) {
      return errorMessages.blank('Reason');
    }
  },
  reason_other: ({ value }) => {
    if (!validateRequired(value)) {
      return errorMessages.blank('Exemption Reason');
    }
    // if (!alphabetsWithSpace(value)) {
    //   return errorMessages.onlyAlphabetSpace;
    // }
    if (!validateMaxLength(value, 51)) {
      return errorMessages.maxLengthReached('Length of Exemption Reason', 50);
    }
  },
  extras: ({ value, formData = {} }) => {
    if (value) {
      const {
        daily_mail_recipient_email = '',
        consecutive_mail_recipient_email = '',
      } = formData;
      if (!validateRequired(daily_mail_recipient_email)) {
        return errorMessages.blank('Daily Recipient Email Address');
      }
      if (!validateRequired(consecutive_mail_recipient_email)) {
        return errorMessages.blank('Consecutive Recipient Email Address');
      }
    }
  },
  object_list: ({ value }) => {
    if (!validateObjectList(value)) {
      return errorMessages.objectListError;
    }
  },
};

export const validateForm = ({
  formData,
  formFields = [],
  errors = {},
  range = {},
  domainList = [],
}) => {
  formFields.forEach(field => {
    const validation = defaultValidation[field];

    if (validation) {
      let error = validation({
        value: formData[field],
        formData,
        domainList,
        range,
      });
      if (error) {
        errors[field] = error;
      } else {
        delete errors[field];
      }
    }
  });
  return errors;
};

export const validatePassword = value => {
  if (!validateRequired(value)) {
    return errorMessages.blank('Password');
  }
  if (!validateMaxLength(value, 101)) {
    return errorMessages.maxLengthReached('Length of Password', 100);
  }
  if (!validateMinLength(value, 8)) {
    return errorMessages.minLengthReached('Length of Password', 8);
  }
};

export const validEmail = (value, domainList = []) => {
  if (!validateRequired(value)) {
    return errorMessages.blank('Email');
  }
  if (!validateMaxLength(value, 101)) {
    return errorMessages.maxLengthReached('Length of Email', 100);
  }
  if (domainList.length == 0) {
    if (!isValidEmail(value)) {
      return errorMessages.invalidEmail;
    }
  } else {
    let message = checkValidDomain(value, domainList);
    if (!message.status) {
      return message.error;
    }
  }
};

export const filterEmailError = ({ fieldError, field, errors }) => {
  if (!!fieldError) {
    errors[field] = fieldError;
  } else {
    delete errors[field];
  }
  return errors;
};

export const validateEmpForm = (
  value = '',
  formData = {},
  domainList = [],
  type = '',
) => {
  const {
    email = '',
    reporting_manager_email = '',
    senior_manager_email = '',
    work_force_manager = '',
  } = formData;
  if (type === 'email') {
    const emailError = validEmail(email, domainList);
    if (emailError) return emailError;
    if (checkEqual(email, reporting_manager_email))
      return errorMessages.sameFieldValues(
        `Employee's email`,
        `Reporting Manager's email`,
      );
    if (checkEqual(email, senior_manager_email))
      return errorMessages.sameFieldValues(
        `Employee's email`,
        `Senior Manager's email`,
      );
  }
  if (type === 'reporting_manager_email') {
    const emailError = validEmail(reporting_manager_email, domainList);
    if (emailError) return emailError;
    if (checkEqual(reporting_manager_email, email))
      return errorMessages.sameFieldValues(
        `Reporting Manager's email`,
        `Employee's email`,
      );
    if (checkEqual(reporting_manager_email, senior_manager_email))
      return errorMessages.sameFieldValues(
        `Reporting Manager's email`,
        `Senior Manager's email`,
      );
  }
  if (type === 'senior_manager_email') {
    if (!validateMaxLength(senior_manager_email, 101)) {
      return errorMessages.maxLengthReached('Length of Email', 100);
    }
    // if (senior_manager_email && !isValidEmail(senior_manager_email)) {
    //   return errorMessages.invalidEmail;
    // }
    if (senior_manager_email) {
      let message = checkValidDomain(senior_manager_email, domainList);
      if (!message.status) {
        return message.error;
      }
    }
    if (checkEqual(senior_manager_email, email))
      return errorMessages.sameFieldValues(
        `Senior Manager's email`,
        `Employee's email`,
      );

    if (checkEqual(senior_manager_email, reporting_manager_email))
      return errorMessages.sameFieldValues(
        `Senior Manager's email`,
        `Reporting Manager's email`,
      );
  }
  if (type === 'work_force_manager') {
    if (!validateMaxLength(work_force_manager, 101)) {
      return errorMessages.maxLengthReached('Length of WFM Email', 100);
    }
    if (work_force_manager) {
      let message = checkValidDomain(work_force_manager, domainList);
      if (!message.status) {
        return message.error;
      }
    }
    if (checkEqual(work_force_manager, email))
      return errorMessages.sameFieldValues(
        `WFM email`,
        `Employee's email`,
      );
  }
};

export const validateFilter = (filters, domainList) => {
  let errors = {};
  if (!!filters.manager && !isValidEmail(filters.manager)) {
    let message = checkValidDomain(filters.manager, domainList);
    if (!message.status) {
      errors.manager = message.error;
    }
  }

  if (!!filters.sManager && !isValidEmail(filters.sManager)) {
    let message = checkValidDomain(filters.sManager, domainList);
    if (!message.status) {
      errors.sManager = message.error;
    }
  }
  if (filters.language && filters.language.length == 0) {
    // errors.language = 'Please Select supported language';
  }
  return errors;
};

export const validateObjectList = (objectList = []) => {
  let objectListAr = objectList.map(item => {
    return (item.objects || []).map(obj => {
      return obj.is_allowed;
    });
  });

  let newObjectListAr = [].concat(...objectListAr);

  let ifObjectPresent = (newObjectListAr || []).some(item => item);
  return ifObjectPresent;
};
