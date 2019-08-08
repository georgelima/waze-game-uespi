const stage2State = {
  create() {
    this.isRunning = true
    this.isJawsMusicRunning = false
    this.throttleTouchTeacher = this.throttle((player, teacher) => this.touchTeacher(teacher), 2000)
    game.add.sprite(0, 0, 'bg')

    this.soundGame = game.add.audio('gameMusic')
    this.soundGame.volume = 0.5
    this.soundGame.loop = true
    this.soundGame.play()

    this.soundJaws = game.add.audio('jaws')
    this.soundJaws.volume = 0.5
    this.soundJaws.loop = true

    this.soundVictory = game.add.audio('victory')
    this.soundVictory.volume = 0.5

    this.soundGetFix = game.add.audio('getitem')
    this.soundGetFix.volume = 0.5

    this.soundReceiveFixes = game.add.audio('loseitem')
    this.soundReceiveFixes.volume = 0.5

    this.soundJureg = game.add.audio('jureg')
    this.soundJureg.volume = 0.5

    this.soundDarthVader = game.add.audio('darthvader')
    this.soundDarthVader.volume = 0.5

    this.soundLion = game.add.audio('lion')
    this.soundLion.volume = 0.5

    this.maze = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1],
      [1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1],
      [1, 2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
      [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ]

    this.blocks = game.add.group()
    this.blocks.enableBody = true

    this.fixPositions = []

    this.maze.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        let x = colIndex * 50
        let y = rowIndex * 50

        if (col === 1) {
          const block = this.blocks.create(x, y, 'block')
          block.body.immovable = true
        } else if (col === 2) {
          this.player = game.add.sprite(y + 25, y + 25, 'player')
          this.player.anchor.set(0.5)
          game.physics.arcade.enable(this.player)
          this.player.animations.add('goDown', [0, 1, 2, 3, 4, 5, 6, 7], 20, true)
          this.player.animations.add('goUp', [8, 9, 10, 11, 12, 13, 14, 15], 20, true)
          this.player.animations.add('goLeft', [16, 17, 18, 19, 20, 21, 22, 23], 20, true)
          this.player.animations.add('goRight', [24, 25, 26, 27, 28, 29, 30, 31], 20, true)
        } else if (col === 3 || col === 0) {
          const position = {
            x: x + 25,
            y: y + 25,
          }

          this.fixPositions.push(position)
        }
      })
    })

    this.teachers = [
      game.add.sprite(75, 75, 'jureg'),
      game.add.sprite(75, 75, 'lion'),
      game.add.sprite(75, 75, 'darthvader'),
    ]

    this.teachers.forEach(teacher => {
      teacher.anchor.set(0.5)
      game.physics.arcade.enable(teacher)

      switch (teacher.key) {
        case 'jureg':
          teacher.animations.add('goDown', [0, 1, 2, 3, 4, 5, 6, 7], 20, true)
          teacher.animations.add('goUp', [8, 9, 10, 11, 12, 13, 14, 15], 20, true)
          teacher.animations.add('goLeft', [16, 17, 18, 19, 20, 21, 22, 23], 20, true)
          teacher.animations.add('goRight', [24, 25, 26, 27, 28, 29, 30, 31], 20, true)
          break
        case 'lion':
          teacher.animations.add('goDown', [0, 1, 2], 20, true)
          teacher.animations.add('goUp', [36, 37, 38], 20, true)
          teacher.animations.add('goLeft', [12, 13, 14], 20, true)
          teacher.animations.add('goRight', [24, 25, 26], 20, true)
          break
        case 'darthvader':
          teacher.animations.add('goDown', [0, 1, 2, 3], 20, true)
          teacher.animations.add('goLeft', [4, 5, 6, 7], 20, true)
          teacher.animations.add('goRight', [8, 9, 10, 11], 20, true)
          teacher.animations.add('goUp', [12, 13, 14, 15], 20, true)
          break
      }

      teacher.direction = 'down'
    })

    this.fix = {}
    this.fix.position = this.newPosition()
    this.fix = game.add.sprite(this.fix.position.x, this.fix.position.y, 'icons', 219)
    this.fix.anchor.set(0.5)
    game.add
      .tween(this.fix)
      .to({ alpha: 1 }, 100)
      .to({ alpha: 0 }, 100)
      .to({ alpha: 1 }, 100)
      .loop()
      .start()
    game.physics.arcade.enable(this.fix)

    this.fixes = 2
    this.fixesText = game.add.text(15, 15, `Revisoes: ${this.getText(this.fixes)}`, {
      font: '20px emulogic',
      fill: '#FF0',
    })

    this.controls = game.input.keyboard.createCursorKeys()

    this.emitter = game.add.emitter(0, 0, 15)
    this.emitter.makeParticles('part')
    this.emitter.setXSpeed(-50, 50)
    this.emitter.setYSpeed(-50, 50)
    this.emitter.gravity.y = 0

    this.time = 50
    this.timeText = game.add.text(game.world.width - 15, 15, `Tempo: ${this.time}`, {
      font: '20px emulogic',
      fill: '#FF0',
    })
    this.timeText.anchor.set(1, 0)
    this.timer = game.time.events.loop(
      1000,
      () => {
        this.time--
        this.timeText.text = `Tempo: ${this.time}`
      },
      this,
    )
  },
  update() {
    if (!this.isJawsMusicRunning && this.time < 10) {
      this.isJawsMusicRunning = true
      this.soundJaws.play()
    }

    if (this.isRunning) {
      game.physics.arcade.collide(this.player, this.blocks)
      game.physics.arcade.overlap(this.player, this.fix, this.doFix, null, this)

      this.teachers.forEach(teacher => {
        game.physics.arcade.overlap(this.player, teacher, this.throttleTouchTeacher, null, this)
      })

      this.moveEnemy()
      this.movePlayer()

      if (this.time < 1 || this.fixes === 0) {
        this.gameOver()
      }
    }
  },

  gameOver() {
    this.isRunning = false
    game.time.events.remove(this.timer)

    this.soundGame.stop()
    this.soundJaws.stop()

    this.player.body.velocity.x = 0
    this.player.body.velocity.y = 0
    this.player.animations.stop()
    this.player.frame = 0

    this.teachers.forEach(teacher => {
      teacher.animations.stop()
      teacher.frame = 0
    })

    if (this.fixes === 0) {
      this.soundVictory.play()

      game.add
        .text(game.world.centerX, 150, 'Boa garoto!\nAgora voce eh um\ncientista', {
          font: '30px emulogic',
          fill: '#FFF',
          align: 'center',
        })
        .anchor.set(0.5)

      game.add
        .text(game.world.centerX, 250, 'ENTER para voltar ao menu inicial', {
          font: '15px emulogic',
          fill: '#FF0',
          align: 'center',
        })
        .anchor.set(0.5)

      game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.addOnce(() => {
        game.state.start('menu')
      }, this)
    } else {
      this.soundLoseGame = game.add.audio('loseGame')
      this.soundLoseGame.volume = 0.5
      this.soundLoseGame.play()

      game.add
        .text(game.world.centerX, 150, 'Deu ruim, ficou pro', {
          font: '30px emulogic',
          fill: '#FFF',
        })
        .anchor.set(0.5)
      game.add
        .text(game.world.centerX, 210, 'proximo semestre', {
          font: '40px emulogic',
          fill: '#FFF',
        })
        .anchor.set(0.5)
    }

    game.time.events.add(
      5000,
      () => {
        if (this.fixes === 0) {
        } else {
          game.state.start('menu')
        }
      },
      this,
    )
  },

  touchTeacher(teacher) {
    switch (teacher.key) {
      case 'jureg':
        this.soundJureg.play()
        break
      case 'lion':
        this.soundLion.play()
        break
      case 'darthvader':
        this.soundDarthVader.play()
        break
    }

    this.emitter.x = this.player.position.x
    this.emitter.y = this.player.position.y
    this.emitter.start(true, 500, null, 15)
    this.fixes += 2
    this.fixesText.text = `Revisoes: ${this.getText(this.fixes)}`
  },

  moveEnemy() {
    this.teachers.forEach(teacher => {
      if (Math.floor(teacher.x - 25) % 50 === 0 && Math.floor(teacher.y - 25) % 50 === 0) {
        const currentCol = Math.floor(teacher.x / 50)
        const currentRow = Math.floor(teacher.y / 50)
        const path = []

        if (this.maze[currentRow][currentCol - 1] !== 1 && teacher.direction !== 'right') {
          path.push('left')
        }
        if (this.maze[currentRow][currentCol + 1] !== 1 && teacher.direction !== 'left') {
          path.push('right')
        }
        if (this.maze[currentRow - 1][currentCol] !== 1 && teacher.direction !== 'down') {
          path.push('up')
        }
        if (this.maze[currentRow + 1][currentCol] !== 1 && teacher.direction !== 'up') {
          path.push('down')
        }

        teacher.direction = path[Math.floor(Math.random() * path.length)]
      }

      switch (teacher.direction) {
        case 'left':
          teacher.x -= 2
          teacher.animations.play('goLeft')
          break
        case 'right':
          teacher.x += 2
          teacher.animations.play('goRight')
          break
        case 'up':
          teacher.y -= 2
          teacher.animations.play('goUp')
          break
        case 'down':
          teacher.y += 2
          teacher.animations.play('goDown')
          break
      }
    })
  },

  movePlayer() {
    this.player.body.velocity.x = 0
    this.player.body.velocity.y = 0

    if (this.controls.left.isDown && !this.controls.right.isDown) {
      this.player.body.velocity.x = -100
      this.player.direction = 'left'
    } else if (this.controls.right.isDown && !this.controls.left.isDown) {
      this.player.body.velocity.x = 100
      this.player.direction = 'right'
    }
    if (this.controls.up.isDown && !this.controls.down.isDown) {
      this.player.body.velocity.y = -100
      this.player.direction = 'up'
    } else if (this.controls.down.isDown && !this.controls.up.isDown) {
      this.player.body.velocity.y = 100
      this.player.direction = 'down'
    }

    switch (this.player.direction) {
      case 'left':
        this.player.animations.play('goLeft')
        break
      case 'right':
        this.player.animations.play('goRight')
        break
      case 'down':
        this.player.animations.play('goDown')
        break
      case 'up':
        this.player.animations.play('goUp')
    }

    if (this.player.body.velocity.x === 0 && this.player.body.velocity.y === 0) {
      this.player.animations.stop()
    }
  },

  doFix() {
    this.fixes--

    this.fixesText.text = `Revisoes: ${this.getText(this.fixes)}`
    this.fix.position = this.newPosition()

    this.soundGetFix.play()

    if (game.global.score > game.global.highScore) {
      game.global.highScore = game.global.score
    }

    this.emitter.x = this.player.position.x
    this.emitter.y = this.player.position.y
    this.emitter.start(true, 500, null, 15)
  },

  newPosition() {
    let position = this.fixPositions[Math.floor(Math.random() * this.fixPositions.length)]

    while (this.fix.position === position) {
      position = this.fixPositions[Math.floor(Math.random() * this.fixPositions.length)]
    }

    return position
  },

  getText(value) {
    if (value < 10) return `00${value}`
    if (value < 100) return `0${value}`
    return value
  },

  throttle(callback, limit) {
    var wait = false
    return function(...args) {
      if (!wait) {
        callback(...args)
        wait = true
        setTimeout(function() {
          wait = false
        }, limit)
      }
    }
  },
}
