/** 
 * Class representing the world grid of tiles, within which entities can move.
*/
export class Grid {
	
	static WindowWidth
	static WindowHeight
	static TileWidth
	static TileHeight
	static MaxTilesX
	static MaxTilesY
	
	// pass the window's width, height, and a 'tileScale' value in range (0,1]
    constructor(width, height, tileScale){
		this.WindowWidth=width
		this.WindowHeight=height
		
		this.SetTileSize(tileScale)
    }

	static SetTileSize(tileScale){
		// forces square tiles by finding 
		// optimal number of squares to tile X and Y
		this.TileWidth=this.WindowWidth*tileScale/20
		this.TileHeight=this.TileWidth

		this.MaxTilesX=this.WindowWidth/this.TileWidth
		this.MaxTilesY=this.WindowHeight/this.TileHeight
	}
	getPosition(tileNumber){
		return tileNumber*this.TileWidth
	}
	getNumTilesX(){
		return this.MaxTilesXMax
	}
	getNumTilesY(){
		return this.MaxTilesYTilesY
	}
}

export class Position{
	constructor(gridx=0,gridY=0){
		this.x=gridX
		this.y=gridY
	}

	getPixelX(){
		return this.x*Grid.TileWidth
	}

	getPixelY(){
		return this.y*Grid.TileWidth
	}
	getX(){
		return this.x
	}

	getY(){
		return this.y
	}

	getPixelPosition(){
		return [getPixelX(), this.getPixelY()]
	}
}