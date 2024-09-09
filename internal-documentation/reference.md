# Reference

A document for storing information about the game.

## General design goals

The basic idea of the game is that a parrot (called Polly) is navigating an island looking for treasure maps to find treasure. Polly's actions are controlled by the player of the game using code. Currently each level consists of the following components:
- Non-colliding blocks. These are blocks that Polly can walk through, such as grass and sand.
- Colliding blocks. These are blocks that Polly cannot walk through, such as rocks.
- Cannons, which shoot cannon balls that knock Polly out. The player has to start over if Polly hits a cannon ball. While most cannons are deterministic, shooting a cannon ball every $n$ game ticks, some shoot at a random frequency.
- One treasure map. This is the ultimate objective of any given level. Once Polly collects the treasure map, the level is over.

Along with the built-in programming constructs available in the c4c-lib interpreter, the user can make Polly move with following parameterless commands:
- `moveLeft`
- `moveRight`
- `moveUp`
- `moveDown`

## Level format

Levels are stored in JSON in the `levels` folder. Right now, there are five attributes specifying a level.

- **name (string):** This is the name of the level. Currently, it does not show up anywhere.
- **width (integer):** The width of the level in number of blocks.
- **height (integer):** The height of the level in number of blocks.
- **tiles (2d array of integers):** An array with dimensions [height][width] specifying the tiles of the level. The tile at (x, y) is located in the array at `tiles[y][x]`. Each element is an integer representing a different type of tile. A mapping of integers to tile types can be found in the [level README](../src/assets/levels/level_readme.txt).
- **entities (array of entities):** An array specifiying the initial locations and paramters of entities in the level. Each entities has an `x` and `y` field, for its location, and `size`, for its physical size in pixels (or something like that). The `texture` field specifies the type of entity. Currently, there are 4 supported options for the `texture` field:
    - **parrot:** Polly themself. There should only be one of these.
    - **mapPiece:** A piece of a map. In the future, this will be collectible.
    - **treasure:** A little treasure chest. Currently unused.
    - **cannon:** A cannon. This has two additional fields:
        - **vx:** The horizontal speed of cannonballs.
        - **vy:** The vertical speed of cannonballs.
    Both of these should be in `{ -1, 1 }` and one should be zero -- that is, cannons should always shoot orthogonally and have speed `1`. Otherwise, collision won't work the way you expect.

## The future