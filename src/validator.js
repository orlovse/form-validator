const urlRegExp =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]|www\.[a-zA-Z0-9]+\.[^\s])/gi;

const allRules = {
  required: (value) => Boolean(value),
  url: (value) => urlRegExp.test(value),
};

const errorTexts = {
  required: "Field is required",
  url: "Not valid url",
};

const validateRule = (value, rule) => {
  let isValid = true;
  let errorText = "";

  if (typeof rule === "string" && allRules[rule]) {
    isValid = allRules[rule](value);
    errorText = errorTexts[rule];
  }

  if (typeof rule === "function") {
    return rule(value);
  }

  if (rule instanceof RegExp) {
    return {
      isValid: rule.test(value),
    };
  }

  return { isValid, errorText };
};

export const validator = (value, rules) => {
  const validResult = {
    isValid: true,
    errorText: "",
  };

  if (!rules) {
    return validResult;
  }

  if (Array.isArray(rules)) {
    for (const rule of rules) {
      const validationResult = validateRule(value, rule);

      if (validationResult.isValid === false) {
        return validationResult;
      }
    }
  }

  return validResult;
};
