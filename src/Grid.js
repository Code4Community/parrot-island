/** 
 * Class representing the world grid of tiles, within which entities can move.
*/
export default class Grid {
	
	static WindowWidth
	static WindowHeight
	static TileWidth
	static TileHeight
	static NumTilesX
	static NumTilesY
	
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

		this.NumTilesX=this.WindowWidth/this.TileWidth
		this.NumTilesY=this.WindowHeight/this.TileHeight
	}
	getPosition(tileNumber){
		return tileNumer*this.TileWidth
	}
	getNumTilesX(){
		return this.NumTilesX
	}
	getNumTilesY(){
		return this.NumTilesY
	}
    
}