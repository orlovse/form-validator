<template>
  <div>
    <input 
      :class="{'error': !isInputValid}"
      :value="value"
      :placeholder="placeholder"
      @input="handleInput"
      @blur="handleBlur"
    />
    <div 
      v-if="!isInputValid && actualErrorText"
      class="error-text"
    >
      {{ actualErrorText }}
    </div>
  </div>
</template>

<script>
import { validator } from '../validator';

export default {
  props: {
    value: String,
    isValidateInput: Boolean,
    isValidateOnBlur: Boolean,
    validateRules: Array,
    errorText: String,
    placeholder: String,
  },
  data() {
    return {
      isInputValid: true,
      actualErrorText: this.errorText,
      inputId: '',
    }
  },
  inject: ['setInputValidation', 'isValidateForm'],
  mounted() {
    this.inputId = Math.floor(Math.random() * 10000);

    const { isValid } = validator(this.value, this.validateRules)

    this.setInputValidation(this.inputId, isValid);
  },
  methods: {
    handleInput(event) {
      const value = event.target.value;

      this.$emit('input', value)

      if (this.isValidateOnBlur) {
        return;
      }

      if (this.isValidateInput || this.isValidateForm || this.validateRules) {
        this.validateInput(value, this.validateRules)
      }
    },
    handleBlur(event) {
      const value = event.target.value;

      if (this.isValidateOnBlur) {
        this.validateInput(value)
      }
    },
    validateInput(value) {
      const { isValid, errorText } = validator(value, this.validateRules)

      if (errorText && !this.actualErrorText) {
        this.actualErrorText = errorText;
      }

      this.setInputValidation(this.inputId, isValid);
      this.isInputValid = isValid;
    },
  }
}
</script>

<style scoped>
  .error {
    border-color: red;
  }

  .error-text {
    color: red;
  }
</style>
