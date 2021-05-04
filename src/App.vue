<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
body {
  font-family: sans-serif;
  color: $text;
}
.box {
  border: $border;
  @extend .spaced;
}
.spaced {
  padding: 1em 1.25em;
}
</style>
