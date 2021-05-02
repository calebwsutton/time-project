<template>
  <div>
    <h2>{{ time }}</h2>
    <button v-on:click="getTime">Get Time</button>
  </div>
</template>

<script>
export default {
  name: 'Time',
  props: {
    time: String
  },
  methods: {
      getTime: function() {
          fetch("https://time-api.calebwsutton.com")
              .then(async response => {
                  const data = await response.json();

                  const dateTime = new Date(data.currentTime);

                  this.time = `It is ${dateTime.toLocaleDateString()} at ${dateTime.toLocaleTimeString()}`;
              }); 
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
