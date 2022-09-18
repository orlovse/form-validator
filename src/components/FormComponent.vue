<template>
  <form @submit="handleSubmit">
    <slot />
    <button type="submit" :disabled="isSubmitDisabled">
      Submit
    </button>
  </form>
</template>

<script>
  export default {
    props: {
      isValidateForm: Boolean,
    },
    data() {
      return {
        inputsValidationObj: {},
      }
    },
    computed: {
      isFormValid() {
        return Object.values(this.inputsValidationObj).every((value) => value);
      },
      isSubmitDisabled() {
        return this.isValidateForm && !this.isFormValid;
      }
    },
    provide() {
      return {
        isValidateForm: this.isValidateForm,
        setInputValidation: this.setInputValidation
      }
    },
    methods: {
      handleSubmit(event) {
        if (this.isValidateForm && !this.isFormValid) {
          event.preventDefault();
          return;
        }

        console.log(event);
      },
      setInputValidation(inputId, isValid) {
        this.inputsValidationObj = {
          ...this.inputsValidationObj,
          [inputId]: isValid,
        }
      }
    }
  }
</script>

<style>

</style>
