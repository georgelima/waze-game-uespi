const loadState = {
  preload: () => {
    game.add
      .text(game.world.centerX, 150, 'CALMA AI BICHO, TAMO CARREGANDO...', {
        font: '15px emulogic',
        fill: '#FFF',
      })
      .anchor.set(0.5)

    const progressBar = game.add.sprite(game.world.centerX, 250, 'progressBar')

    progressBar.anchor.set(0.5)

    game.load.setPreloadSprite(progressBar)
    game.load.image('bg', 'img/bg.png')
    game.load.image('block', 'img/block.png')
    game.load.image('part', 'img/part.png')
    game.load.image('end', 'img/end.png')

    game.load.spritesheet('coin', 'img/coin.png', 32, 32)

    game.load.spritesheet('jureg', 'img/jureg.png', 24, 40)
    game.load.spritesheet('lion', 'img/lion.png', 48, 48)
    game.load.spritesheet('darthvader', 'img/darthvader.png', 32, 48)

    game.load.spritesheet('player', 'img/player.png', 24, 32)
    game.load.spritesheet('playerV1', 'img/player_v1.png', 32, 32)
    game.load.spritesheet('icons', 'img/icons.png', 32, 32)

    game.load.audio('getitem', 'sfx/getitem.mp3')
    game.load.audio('jureg', 'sfx/faz_o_urro.mp3')
    game.load.audio('darthvader', 'sfx/darth.mp3')
    game.load.audio('lion', 'sfx/lion.mp3')
    game.load.audio('victory', 'sfx/victory.mp3')
    game.load.audio('jaws', 'sfx/jaws.mp3')
    game.load.audio('music', 'sfx/music.ogg')
    game.load.audio('gameMusic', 'sfx/game_song.mp3')
    game.load.audio('loseGame', 'sfx/losegame.mp3')

    game.physics.startSystem(Phaser.Physics.ARCADE)
  },
  create: () => {
    game.state.start('menu')
  },
}
