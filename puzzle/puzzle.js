class Puzzle {
    constructor(container, imageUrl, size = 4) {
        this.container = container;
        this.size = size;
        this.tiles = [];
        this.emptyPosition = { x: size - 1, y: size - 1 };
        this.imageUrl = imageUrl;

        // Load image and initialize the puzzle
        this.loadImageAndInit();
    }

    loadImageAndInit() {
        const image = new Image();
        image.src = this.imageUrl;
        image.onload = () => {
            // Calculate tile size based on the image dimensions
            this.tileWidth = image.naturalWidth / this.size;
            this.tileHeight = image.naturalHeight / this.size;

            // Set the container size dynamically
            this.container.style.width = `${image.naturalWidth}px`;
            this.container.style.height = `${image.naturalHeight}px`;

            // Initialize and render the puzzle
            this.init();
        };
    }

    init() {
        this.createTiles();
        this.shuffle();
        this.render();
    }

    createTiles() {
        let tileNumber = 1;

        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                const isLastTile = (x === this.size - 1 && y === this.size - 1);
                const tile = new Tile(
                    isLastTile ? null : tileNumber++,  // Tile number, null for the hidden tile
                    x,
                    y,
                    this.imageUrl,
                    this.tileWidth,
                    this.tileHeight,
                    isLastTile
                );
                this.tiles.push(tile);
            }
        }
    }

    shuffle() {
        // Perform a number of random valid moves to shuffle the puzzle
        const moves = 1000; // Number of shuffle moves
        for (let i = 0; i < moves; i++) {
            const possibleMoves = this.getPossibleMoves();
            const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
            this.moveTile(randomMove, false); // Move tile without checking win condition
        }
    }

    getPossibleMoves() {
        const { x, y } = this.emptyPosition;
        const possibleMoves = [];

        if (x > 0) possibleMoves.push(this.getTileAtPosition(x - 1, y));
        if (x < this.size - 1) possibleMoves.push(this.getTileAtPosition(x + 1, y));
        if (y > 0) possibleMoves.push(this.getTileAtPosition(x, y - 1));
        if (y < this.size - 1) possibleMoves.push(this.getTileAtPosition(x, y + 1));

        return possibleMoves;
    }

    getTileAtPosition(x, y) {
        return this.tiles.find(tile => tile.x === x && tile.y === y);
    }

    moveTile(tile, checkWin = true) {
        const { x, y } = this.emptyPosition;

        if (Math.abs(tile.x - x) + Math.abs(tile.y - y) === 1) {
            // Swap tile position with empty position
            const tempX = tile.x;
            const tempY = tile.y;

            tile.setPosition(x, y);
            this.emptyPosition = { x: tempX, y: tempY };

            if (checkWin) this.checkWin();
        }
    }

    render() {
        this.container.innerHTML = '';
        this.tiles.forEach(tile => {
            if (!tile.isHidden) {
                this.container.appendChild(tile.tileElement);
                tile.updateTilePosition();
                tile.tileElement.addEventListener('click', () => this.moveTile(tile));
            }
        });
    }

    checkWin() {
        const isSolved = this.tiles.every(tile => {
            if (tile.isHidden) return true; // Skip the hidden tile

            const correctX = (tile.number - 1) % this.size;
            const correctY = Math.floor((tile.number - 1) / this.size);

            return tile.x === correctX && tile.y === correctY;
        });

        if (isSolved) alert('Congratulations! You solved the puzzle!');
    }
}

class Tile {
    constructor(number, x, y, imageUrl, tileWidth, tileHeight, isHidden = false) {
        this.number = number;
        this.x = x;
        this.y = y;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.isHidden = isHidden;
        this.tileElement = this.createTileElement(imageUrl);
    }

    createTileElement(imageUrl) {
        const tile = document.createElement('div');
        tile.classList.add('tile');

        // Set background image and position
        tile.style.backgroundImage = `url(${imageUrl})`;
        tile.style.backgroundPosition = `-${this.x * this.tileWidth}px -${this.y * this.tileHeight}px`;
        tile.style.backgroundSize = `${this.tileWidth * 4}px ${this.tileHeight * 4}px`;
        tile.style.width = `${this.tileWidth}px`;
        tile.style.height = `${this.tileHeight}px`;

        return tile;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.updateTilePosition();
    }

    updateTilePosition() {
        this.tileElement.style.left = `${this.x * this.tileWidth}px`;
        this.tileElement.style.top = `${this.y * this.tileHeight}px`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const puzzleContainer = document.getElementById('puzzle-container');
    const puzzle = new Puzzle(puzzleContainer, 'utsa_logo.jpg');  // Replace with your image URL
});
