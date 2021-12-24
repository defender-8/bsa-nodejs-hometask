class BaseValidator {
  constructor(dataModel) {
    this.dataModel = dataModel;
  }

  areValuesRequired(res, data) {
    const isValueRequired = (value, title) => {
      if (!value) {
        const err = new Error(`${title} is required!`);
        err.statusCode = 400;
        res.err = err;
      }
    };

    Object.entries(data).forEach(([key, value]) => {
      if (this.dataModel[key].isRequired) {
        isValueRequired(value, capitalize(key));
      }
    });
  }
}

function capitalize(camelCaseStr) {
  const separatedBySpacesStr =  camelCaseStr.replace( /([A-Z])/g, " $1" );
  return separatedBySpacesStr.charAt(0).toUpperCase() + separatedBySpacesStr.slice(1);
}

exports.BaseValidator = BaseValidator;
