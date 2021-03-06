# tstris

An implementation of Tetris using Typescript

## Running for Production

Open `dist/index.html` to view the current build of the game.

## Running for Development

`$ npm run start`

## Building

`$ npm run build`

The built artefacts should end up in the `dist` directory.

# Currently Implemented

- Grid
- All tetrominos (O, I, S, Z, T, L, J)
- Score
- Lines cleared
- Game over

The rotation system is similar to Tetris on Nintendo Entertainment System.

## Tetrominos and Rotation

When created, a Tetromino is in a given 'orientation' (North, South, East, or West).

The following image is more or less how I envisioned the 'orientation'
that the piece is in.

![Tetromino rotation](/rotation.png "Tetromino rotation")
