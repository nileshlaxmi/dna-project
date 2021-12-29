const errorMessages = {
  apiError: errorCode => `Error ${errorCode}: Something went wrong`,
  fileSizeError: size => `File should be less than ${size} MB in size`,
  emailValidation: 'Entered Email is not valid',
  blank: field => `${field} cannot be blank.`,
  numberNotValid: field => `${field} is not valid.`,
  priceNotValid: field => `${field} cannot be less than 0.`,
  maxLengthReached: (elementName, charLength) =>
    `${elementName} should not be greater than ${charLength}.`,
  minLengthReached: (elementName, charLength) =>
    `${elementName} should not be less than ${charLength}.`,
  sameFieldValues: (field1, field2) =>
    `${field1} and ${field2} cannot be same.`,
  resolve: 'Please resolve below errors',
  fileFormat: 'File format not supported.',
  matchPassword: (field1, field2) =>
    `${field1} and ${field2} password does not match.`,
  onlyAlphaNumeric: 'Only alphanumeric is allowed.',
  invalidEmail: 'Please enter a valid email id',
  emptyFormError: 'Please fill all the mandatory fields.',
  noImageselected: 'Please upload atleast one image',
  onlyAlphabetSpace: 'Only alphabets and spaces are allowed.',
  addEmployeeFail: 'Add Employee operation Failed.',
  updateEmployeeFail: 'Update Employee operation Failed.',
  rangeError: (min_value, max_value) =>
    `Value should be between ${min_value} to ${max_value}.`,
  positiveIntegerValueError: 'Only values greater than 1 allowed',
  email_RM_Error: `Employee's email and Reporting Manager's email cannot be same.`,
  email_SM_Error: `Employee's email and Senior Manager's email cannot be same.`,
  rm_Email_Error: `Reporting Manager's email and Employee's email cannot be same.`,
  rm_SM_Error: `Reporting Manager's email and Senior Manager's email cannot be same.`,
  sm_Email_Error: `Senior Manager's email and Employee's email cannot be same.`,
  sm_RM_Error: `Senior Manager's email and Reporting Manager's email cannot be same.`,
  matchThresholdWarning: `Threshold cannot exceed number of images captured`,
  NoLogFile: `File does not exist.`,
  CaptureFrequencyChange: `Change in Image Capture Frequency also updates Match Threshold`,
  objectListError: 'Please select at least one object.',
  empDeactivated: 'Employee is no longer associated with the organization.',
  fileUploadWarning: 'File successfully uploaded with some error',
  fileUploadProcessFailed: 'Your file failed to process',
  fileUploadPending: 'Your file is under processing'
};

export default errorMessages;
