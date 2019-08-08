const menuState = {
  create() {
    this.music = game.add.audio('music')
    this.music.loop = true
    this.music.volume = 0.5
    this.music.play()

    if (!localStorage.getItem('TCC_SIS_MULT_HIGH_SCORE')) {
      localStorage.setItem('TCC_SIS_MULT_HIGH_SCORE', 0)
    }

    if (game.global.highScore > localStorage.getItem('TCC_SIS_MULT_HIGH_SCORE')) {
      localStorage.setItem('TCC_SIS_MULT_HIGH_SCORE', game.global.highScore)
    } else {
      game.global.highScore = localStorage.getItem('TCC_SIS_MULT_HIGH_SCORE')
    }

    game.add
      .text(game.world.centerX, 150, 'Em busca do\nTCC perdido', {
        font: '40px emulogic',
        fill: '#FFF',
        align: 'center',
      })
      .anchor.set(0.5)

    const startGameText1 = game.add.text(game.world.centerX, 300, 'Aperte enter para\ncomecar a busca pelo dedinho', {
      font: '15px emulogic',
      fill: '#FF0',
      align: 'center',
    })
    startGameText1.anchor.set(0.5)

    game.add
      .tween(startGameText1)
      .to({ y: 280 }, 1000)
      .start()

    game.add
      .text(
        game.world.centerX,
        390,
        'Colete as correcoes do seu TCC,\nfuja dos professores que querem novas correcoes\ne conquiste o tao sonhado TCC',
        {
          font: '13px emulogic',
          fill: '#F02F0F',
          align: 'center',
        },
      )
      .anchor.set(0.5)

    game.time.events.add(1000, () =>
      game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.addOnce(this.startGame, this),
    )
  },

  startGame() {
    this.music.stop()
    game.state.start('stage1')
  },
}
