<template>
  <router-view />
</template>

<style lang="scss">
html,
body {
  background-color: #212121;
  padding: 0px;
  margin: 0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #a7a7a7;
  background-color: #212121;
  display: grid;
  height: 100vh;
  grid-template-rows: 1fr 8fr 1fr;
}

a {
  font-weight: bold;
  color: #bbbbbb;

  &.router-link-exact-active {
    color: #a7a7a7;
  }
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #a7a7a7;

    &.router-link-exact-active {
      color: #a7a7a7;
    }
  }
}

.card {
  max-width: 1000px;
  margin: 0 auto;
  margin-top: 1em;
  border: 1px solid #333;
  display: block;
  padding: 0px;
  border-radius: 1em;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
  transition: .35s;
}
.files,
.lyrics,
.sectionButton,
.btn {
  max-width: 1000px;
  margin: 0 auto;
  margin-top: 1em;
  border: 1px solid #333;
  display: block;
  padding: 0px;
  border-radius: 1em;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
  transition: .35s;
}
.sectionButton{
  cursor: pointer;
}

.round {
  display:block;
  margin: .5em 0;
  padding: .1em;
  width: 2em;
  height: 2em;
  text-decoration: none;
  font-size: 2em;
  line-height: 2.4em;
  border: 1px solid #333;
  border-radius: 50%;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
}

.btn:hover{
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.95);

}

.demo {
  width: 100%;
  border: 1px solid #333;
  display: inline-block;
  margin: 1em;
  padding: 1em;
  border-radius: 0.5em;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}
audio {
  max-width: 100%;
}
.button {
  background-color: rgba(255, 255, 255, 0.05);
  box-sizing: border-box;
  border: 1px solid #666;
  padding: 1em;
  margin: 1em;
  border-radius: 1em;
  text-decoration: none;
  font-weight: bold;
  color: #bbbbbb;
  cursor: pointer;
}
.button:hover {
  background-color: rgba(255, 255, 255, 0.1);
  text-decoration: none;
}

.success {
  border: 1px solid #228822;
  background-color: #228844;
}
.danger {
  border: 1px solid #883333;
  background-color: #bb4444;
}
.success:hover {
  border: 1px solid #228822;
  background-color: #22cc55;
  color: #ffffff;
}
.danger:hover {
  border: 1px solid #883333;
  background-color: #ee5555;
  color: #ffffff;
}
table {
  width: 90%;
  max-width: 40em;
  margin: 0 auto;
  border-collapse: collapse;
  border-radius: 0.5em;

  border-style: hidden; /* hide standard table (collapsed) border */
  box-shadow: 0 0 0 1px #666; /* this draws the table border  */
}
td, th {
  cursor: pointer;
  border: 1px solid #666;
  padding: 1em;
  width: 100%;
}
th {
  background-color: #2a2a2a;
  border-radius: 0.5em;

}
tr:hover {
  background-color: rgba(255, 255, 255, 0.02);
}

.message {
  margin-top: 4em;
}

.round {
  margin: 1rem;
}

input,
textarea {
  background-color: #121212;
  color: #cecece;
  padding: 10px 35px 10px 15px;
  border: 1px solid #666;
  border-radius: 100px;
  outline: none;
  border-style: hidden; /* hide standard table (collapsed) border */
  box-shadow: 0 0 0 1px #666; /* this draws the table border  */
}

textarea {
  border-radius: 20px;
  height: 10rem;
}

.form {
  display: grid;
  grid-template-columns: 3fr 7fr;
  padding: 1rem;
  gap: 1rem;
  justify-content: center;
  > * {
    align-self: center;
    text-align: left;
  }
}
</style>
