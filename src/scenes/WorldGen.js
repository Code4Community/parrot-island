const WORLD_TILE_SIZE = 30;

export function IslandTiles(width, height){
	// initially, the world is all water.
	// preloadImages()
	let result=[]
	for (let y = 0; y < height; y++) {
		let row = [];
		for (let x = 0; x < width; x++) {
			row.push("sand");
		}
		result.push(row);
	}

	



	return result
};
