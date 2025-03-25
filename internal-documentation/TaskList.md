# Wrap-Up
  //re-switching graphical glitch
  //safewait 
  //autocomplete
  //moving into cannonballs
  levels finalized
  //save code between sessions

  graphical glitch side cannonballs
  clean up code
  sound?
  win screen
  level bonus name

# Old Todo
- level design
  - Kent (IN PROGRESS)
  - more pairs of people independently design levels going forward.
  - Finalizing level 1 -- Kent (IN PROGRESS)
  - Fix level display tiles being cut off -- Levi (IN PROGRESS)
    - (bottom few rows are not visible on game scene)
  - forever times conditional (bonus?) level David
- 
General: finalize game mechanics:
  - obstacles
    - cannonballs (DONE) David
    - /No?/animals
    - /No?/ship
  - start to finish -- straightforward path?
  - Points system
  - goal objective
    - treasure map and some treasure
    - levels leading up to final treasure map

- QoL
  - autocomplete
  - blockly
  - Parrot cosmetics
  - Custom textures (more of them)
  - Custom sounds
    - parrot call
    - cannonball

# Finished:

- Collisions with entities -- Ayden (DONE)
- Collision Callbacks
  - add callbacks for different combinations of collisions -- David (DONE)
  - trees & water should be parrot-collidable -- David (DONE)
- Scale pieceOfMap and treasure to better fit the grid cells -- Levi (DONE)
- Fix parrot icon on the header (frontend) -- Ayden (DONE) 
- Config files to streamline map design/loading -- David (DONE)
- Primary textures
  - connected tiles -- David (DONE)
  - custom parrot -- Levi, David (DONE)
  - custom cannon -- Levi (DONE)
- Collisions -- (DONE)
  - straightforward system to add more types of collisions + callbacks
  - more collisions/interactions between cannon, parrot, trees.
- Detect Game End Condition -- David (DONE)
- Implement stepEval on our interpreter (DONE)
  - 'wait' command Connor (DONE)
  - https://github.com/Code4Community/c4c-lib/blob/master/src/interpreter/stepEval.js
  - conditionals -- detect cannonball (DONE)
    - peek at sprites around current pos (DONE) Ram
    - add condition to 'if' statement (DONE) David
    - add function for cannonballs to return their position on the next iteration (DONE) Ram