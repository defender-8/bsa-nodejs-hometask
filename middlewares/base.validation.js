class BaseValidator {
  constructor(dataModel, res, data) {
    this.dataModel = dataModel;
    this.res = res;
    this.data = data;
  }

  isNotDeclaredValues() {
    for (let key of Object.keys(this.data)) {
      if (!Object.keys(this.dataModel).includes(key)) {
        const err = new Error(`${key} is not declared field!`);
        err.statusCode = 400;
        this.res.err = err;
        return true;
      }
    }
  }

  isIdInsideReqBody() {
    if (Object.keys(this.data).includes('id')) {
      const err = new Error('Id field inside request body is forbidden!');
      err.statusCode = 400;
      this.res.err = err;
      return true;
    }
  }

  isEmptyRequiredField() {
    for (let key of Object.keys(this.dataModel)) {
      if (this.dataModel[key].isRequired && !this.data[key]) {
        const err = new Error(`${capitalize(key)} is required!`);
        err.statusCode = 400;
        this.res.err = err;
        return true;
      }
    }
  }

  isInRange(name, value, min, max) {
    if (value <= min || value >= max) {
      const err = new Error(`${name} must be more than ${min} and less than ${max}`);
      err.statusCode = 400;
      this.res.err = err;
      return true;
    }
  }

  isValidEmail(email) {
    if(!email.toLowerCase().endsWith('@gmail.com')) {
      const err = new Error('Email must be valid Gmail email!');
      err.statusCode = 400;
      this.res.err = err;
      return true;
    }
  }

  isValidPhoneNumber(phoneNumber) {
    if (!phoneNumber.startsWith('+380') || phoneNumber.length !== 13) {
      const err = new Error('Enter valid phone number: +380xxxxxxxxx');
      err.statusCode = 400;
      this.res.err = err;
      return true;
    }
  }

  isValidPassword(password) {
    if (password.length < 3 || password.length > 20) {
      const err = new Error('Password must be 3-20 characters long!');
      err.statusCode = 400;
      this.res.err = err;
      return true;
    }
  }
}

function capitalize(camelCaseStr) {
  const separatedBySpacesStr =  camelCaseStr.replace( /([A-Z])/g, " $1" );
  return separatedBySpacesStr.charAt(0).toUpperCase() + separatedBySpacesStr.slice(1);
}

exports.BaseValidator = BaseValidator;
