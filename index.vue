<script>
export default {
  data() {
    return {
      text: 'Edit me',
      selected: 0,
      games: [
        {'value': 1, 'text': 'Game 1'},
        {'value': 4, 'text': 'Game 4'}
      ],
    }
  }
}

</script>
a
<template>
  <h2>Text Input</h2>
  <input v-model="text"> {{ text }}

  <h2>Select</h2>
  <select v-model="selected">
    <option disabled value="">Please select one</option>
    <option v-for="game in games" :value="game.value">{{game.text}}</option>
  </select>
  <span> Selected : {{ selected }}</span>

</template>