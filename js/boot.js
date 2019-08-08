const bootState = {
  preload: () => {
    game.load.image('progressBar', 'img/progressBar.png')
  },

  create: () => {
    game.state.start('load')
  },
}
