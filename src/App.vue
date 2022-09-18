<template>
  <div id="app">
    <div>Validate form</div>
    <form-component is-validate-form>
      <input-component 
        v-model="firstInputValue"
        placeholder="required field"
        :validate-rules="['required']"
      />
      <input-component 
        v-model="secondInputValue"
        placeholder="url"
        :validate-rules="['url']"
      />
    </form-component>


    <div class="mt-4">Validate input</div>
    <form-component>
      <input-component 
        v-model="thirdInputValue" 
        :validate-rules="['required']" 
      />
      <input-component 
        v-model="fourthInputValue"
        placeholder="url"
        :validate-rules="['url']"
      />
    </form-component>
  </div>
</template>

<script>
import FormComponent from './components/FormComponent'
import InputComponent from './components/InputComponent'

export default {
  name: 'App',
  components: {
    FormComponent,
    InputComponent
  },
  data() {
    return {
      firstInputValue: '',
      secondInputValue: '',
      thirdInputValue: '',
      fourthInputValue: '',
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.mt-4 {
  margin-top: 40px;
}
</style>
