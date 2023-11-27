function viewBlue () {
    strip.setPixelColor(6, neopixel.colors(NeoPixelColors.Blue))
    strip.setPixelColor(7, neopixel.colors(NeoPixelColors.Blue))
    strip.show()
    music.playTone(294, music.beat(BeatFraction.Whole))
    basic.pause(150)
    strip.clear()
    strip.show()
    basic.pause(80)
}
function viewGreen () {
    strip.setPixelColor(0, neopixel.colors(NeoPixelColors.Green))
    strip.setPixelColor(1, neopixel.colors(NeoPixelColors.Green))
    strip.show()
    music.playTone(349, music.beat(BeatFraction.Whole))
    basic.pause(150)
    strip.clear()
    strip.show()
    basic.pause(80)
}
function viewRed () {
    strip.setPixelColor(8, neopixel.colors(NeoPixelColors.Red))
    strip.setPixelColor(9, neopixel.colors(NeoPixelColors.Red))
    strip.show()
    music.playTone(262, music.beat(BeatFraction.Whole))
    basic.pause(150)
    strip.clear()
    strip.show()
    basic.pause(80)
}
function Intro () {
    for (let index = 0; index < 6; index++) {
        vIntro = randint(0, 3)
        if (vIntro == 0) {
            viewRed()
        } else {
            if (vIntro == 1) {
                viewBlue()
            } else {
                if (vIntro == 2) {
                    viewYellow()
                } else {
                    viewGreen()
                }
            }
        }
    }
}
function viewYellow () {
    strip.setPixelColor(2, neopixel.colors(NeoPixelColors.Orange))
    strip.setPixelColor(3, neopixel.colors(NeoPixelColors.Orange))
    strip.show()
    music.playTone(330, music.beat(BeatFraction.Whole))
    basic.pause(150)
    strip.clear()
    strip.show()
    basic.pause(80)
}
function reset () {
    score = 0
    correct = 1
    simonsString = [
    "R",
    "B",
    "Y",
    "G"
    ]
    sequence = [
    simonsString[randint(0, 4)],
    simonsString[randint(0, 4)],
    simonsString[randint(0, 4)],
    simonsString[randint(0, 4)]
    ]
    vIntro = 0
    Intro()
    strip.showRainbow(1, 180)
    basic.pause(1000)
    strip.clear()
    strip.show()
}
let capturedInputs = 0
let maxInputs = 0
let sequence: string[] = []
let simonsString: string[] = []
let correct = 0
let score = 0
let vIntro = 0
let strip: neopixel.Strip = null
let tempobloqueio = 50
strip = neopixel.create(DigitalPin.P1, 10, NeoPixelMode.RGB)
strip.setBrightness(100)
reset()
basic.forever(function () {
    while (correct == 1) {
        basic.showLeds(`
            # # . # #
            # # . # #
            . . . . .
            # . . . #
            . # # # .
            `)
        for (let índice = 0; índice <= sequence.length - 1; índice++) {
            if (sequence[índice] == "R") {
                viewRed()
            } else {
                if (sequence[índice] == "B") {
                    viewBlue()
                } else {
                    if (sequence[índice] == "Y") {
                        viewYellow()
                    } else {
                        viewGreen()
                    }
                }
            }
        }
        basic.pause(500)
        maxInputs = sequence.length
        capturedInputs = 0
        while (capturedInputs < maxInputs && correct == 1) {
            if (hackbit.SwitchState(DigitalPin.P2)) {
                basic.pause(tempobloqueio)
                if (sequence[capturedInputs] != "G") {
                    correct = 0
                }
                capturedInputs += 1
                viewGreen()
            } else {
                if (hackbit.SwitchState(DigitalPin.P8)) {
                    basic.pause(tempobloqueio)
                    if (sequence[capturedInputs] != "Y") {
                        correct = 0
                    }
                    capturedInputs += 1
                    viewYellow()
                } else {
                    if (hackbit.SwitchState(DigitalPin.P12)) {
                        basic.pause(tempobloqueio)
                        if (sequence[capturedInputs] != "B") {
                            correct = 0
                        }
                        capturedInputs += 1
                        viewBlue()
                    } else {
                        if (hackbit.SwitchState(DigitalPin.P13)) {
                            basic.pause(tempobloqueio)
                            if (sequence[capturedInputs] != "R") {
                                correct = 0
                            }
                            capturedInputs += 1
                            viewRed()
                        }
                    }
                }
            }
        }
        if (correct == 1) {
            score += 1
            sequence.push(simonsString[randint(0, 4)])
        }
    }
    if (correct == 0) {
        strip.showRainbow(1, 180)
        strip.show()
        basic.showIcon(IconNames.Skull)
        basic.clearScreen()
        basic.showString("Score")
        basic.showNumber(score)
        basic.pause(2000)
        basic.clearScreen()
        strip.clear()
        strip.show()
        reset()
    }
})
