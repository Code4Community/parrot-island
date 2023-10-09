// @ts-check

/**
 * @param {string} filePath - the (website) path of the file to load.
 * @return {Promise<LevelData>} - the level data.
 */
export const readLevelData = async (filePath) => {
    /** @type LevelData */
    const levelData = await fetch(filePath).then((response) => response.json());
    return levelData;
};

/**
 * @param {LevelData} levelData - the level data.
 * @param {number} tileSize
 */
export const createTilesFromLevelData = (levelData, scene, tileSize) => {
    for (let y = 0; y < levelData.height; y++) {
        let row = [];
        for (let x = 0; x < levelData.width; x++) {
            const tile = levelData.tiles[y][x];
            let texture = tile;

            let phaserTile = scene.add.sprite(
                x * tileSize + tileSize / 2,
                y * tileSize + tileSize / 2,
                texture
            );

            phaserTile.width = tileSize;
            phaserTile.displayWidth = tileSize;
            phaserTile.height = tileSize;
            phaserTile.displayHeight = tileSize;
            row.push(tile);
        }
        scene.tiles.push(row);
    }
};

/**
 * @param {string} name
 * @param {number} width
 * @param {number} height
 * @return {LevelData}
 */
export const generateRandomLevelData = (name, width, height) => {

    /**
     * @type {Tile[][]}
     */
    const tiles = [];

    /**
     * @type {Entity[][]}
     */
    const entities = [];

    for (let y = 0; y < height; y++) {
        /**
         * @type {Tile[]}
         */
        let tileRow = [];
        /**
         * @type {Entity[]}
         */
        let entityRow = [];
        for (let x = 0; x < width; x++) {
            /**
             * @type Tile
             */
            let tile;

            if (Math.random() < 0.5) {
                tile = "grass";
            } else {
                tile = "stone";
            }

            if (Math.random() < 0.1) {
                entityRow.push("tree");
            } else {
                entityRow.push(null);
            }

            tileRow.push(tile);
        }
        tiles.push(tileRow);
    }

    /**
     * @type LevelData
     */
    const levelData = {
        name,
        width,
        height,
        tiles,
        entities,
    };

    return levelData;
};

/**
 * @typedef { 'grass' | 'stone' } Tile
 * @typedef { 'tree' | null } Entity
 *
 * @typedef {{
 *      name: string,
 *      width: number,
 *      height: number, 
 *      tiles: Tile[][],    // indexed by [y][x]
 *      entities: Entity[], // “
 * }} LevelData
 */
