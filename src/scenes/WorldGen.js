const WORLD_TILE_SIZE = 30;	

export function IslandTiles(width, height){
	// initially, the world is all water.
	// preloadImages()
	let result=[]
	for (let y = 0; y < height; y++) {
		let row = [];
		for (let x = 0; x < width; x++) {
			row[x]=[]
			row[x].push("sand");
			row[x].push("water");
		}
		result.push(row);
	}

	let startX=width/3
	let startY=height/2.5
	let delta=7


	
	for (let y = startY-delta; y < startY+delta; y++) {
		for (let x = startX-delta; x < startX+delta; x++) {
			if(x<0 || x>=width || y<0 || y>=height)continue;
			result[x][y].push("grass");
		}
		console.log(Math.random());

	}

	return result
};

function dist(x1,y1,x2,y2){
	return Math.pow((Math.pow((x2-x1),2)+Math.pow((y1-y2),2)),.5);
}

function getRand(start, end){
	return Math.random()*(end-start) + start;
}

function chance(proportion){
	return getRand(0,1)<proportion
}
