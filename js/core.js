player = {
  version: 0.01
  build: 0
  money: new Decimal(0)
  mpc: new Decimal(1)
  mps: new Decimal(0)
  tick: new Decimal(1000)
  playtime: new Decimal(0)
}

function click() {
  player.money += (player.mpc)
}

function save() {
  localStorage.setItem('clicktSave', btoa(JSON.stringify(player)))
}

function load(savefile) {
  try {
    savefile = JSON.parse(atob(savefile));
    //To prevent to trying to load a save file with glitches.
    //when adding a new player variable, PLEASE ADD A NEW LINE!!
    if (savefile.version == undefined) savefile.version = 0;
    if (savefile.build == undefined) savefile.build = 0
    savefile.version = player.version
    savefile.build = player.build
    //if the value is a Decimal, set it to be a Decimal here.
    if (savefile.money == 'NaN') savefile.money = new Decimal(0)
    else savefile.money = new Decimal(savefile.money)
    player = savefile
    console.log('Game loaded!')
  } catch (e) {
    console.log('Your save failed to load:\n' + e)
  }
}

function gameTick() {
  if (player.time > 0) {
    var s = (new Date()
      .getTime() - player.time) / 1000 // number of seconds since last tick
    player.playtime += s
  }
  player.time = new Date()
    .getTime()
}

function gameInit() {
  load(localStorage.getItem('clicktSave'))
  var tickspeed = 0
  updated = true
  setInterval(function() {
    if (updated) {
      updated = false
      setTimeout(function() {
        var startTime = new Date()
          .getTime()
        try {
          gameTick()
        } catch (e) {
          console.log(e)
        }
        tickspeed = (new Date()
          .getTime() - startTime) * 0.2 + tickspeed * 0.8
        updated = true
      }, tickspeed)
    }
  }, 0)
  setInterval(save, 1000);
}