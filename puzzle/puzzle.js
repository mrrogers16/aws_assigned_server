class Puzzle 
{
    constructor(container, imageUrl, size = 4) 
    {
        this.container = container;
        this.size = size;
        this.tiles = [];
        this.emptyPosition = { x: size - 1, y: size - 1 };
        this.imageUrl = imageUrl;

        // Dynamically calculate tile size after the image loads
        this.loadImageAndInit();
    }

    loadImageAndInit() 
    {
        const image = new Image();
        image.src = this.imageUrl;
        image.onload = () => 
        {
            // Calculate tile size based on the image dimensions
            this.imageWidth = image.naturalWidth;
            this.imageHeight = image.naturalHeight;

            // Ensure the image fits within the puzzle grid
            this.tileWidth = this.imageWidth / this.size;
            this.tileHeight = this.imageHeight / this.size;

            // Set the container size dynamically
            this.container.style.width = `${this.imageWidth}px`;
            this.container.style.height = `${this.imageHeight}px`;

            // Initialize and render the puzzle
            this.init();
        };
    }

    createTiles() 
    {
        let tileNumber = 1;

        for (let y = 0; y < this.size; y++) 
        {
            for (let x = 0; x < this.size; x++) 
            {
                const isLastTile = (x === this.size - 1 && y === this.size - 1);
                if (isLastTile) 
                {
                    const emptyTile = new Tile(null, x, y, this.imageUrl, this.tileWidth, this.tileHeight, true);
                    this.tiles.push(emptyTile);
                    continue;
                }
                const tile = new Tile(tileNumber++, x, y, this.imageUrl, this.tileWidth, this.tileHeight);
                this.tiles.push(tile);
            }
        }
    }

    render() 
    {
        this.tiles.forEach(tile => 
        {
            this.container.appendChild(tile.tileElement);
            tile.updateTilePosition();
            tile.tileElement.addEventListener('click', () => this.moveTile(tile));
        });
    }

    shuffle() 
    {
        let moveCount = 100;  // Number of shuffling moves
        let currentMove = 0;

        const shuffleStep = () => 
        {
            if (currentMove >= moveCount) 
            {
                return;
            }

            const possibleMoves = this.getPossibleMoves();
            const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

            this.moveTile(randomMove, false);  // Move tile without checking win condition
            currentMove++;

            setTimeout(shuffleStep, 200);  // Delay of 200ms between moves
        };

        shuffleStep();  // Start the first shuffle step
    }

    getPossibleMoves() 
    {
        const { x, y } = this.emptyPosition;
        const possibleMoves = [];

        if (x > 0) possibleMoves.push(this.getTileAtPosition(x - 1, y));
        if (x < this.size - 1) possibleMoves.push(this.getTileAtPosition(x + 1, y));
        if (y > 0) possibleMoves.push(this.getTileAtPosition(x, y - 1));
        if (y < this.size - 1) possibleMoves.push(this.getTileAtPosition(x, y + 1));

        return possibleMoves;
    }

    getTileAtPosition(x, y) 
    {
        return this.tiles.find(tile => tile.x === x && tile.y === y);
    }

    moveTile(tile, checkWin = true) 
    {
        const { x, y } = this.emptyPosition;

        if (Math.abs(tile.x - x) + Math.abs(tile.y - y) === 1) 
        {
            this.emptyPosition.x = tile.x;
            this.emptyPosition.y = tile.y;
            tile.setPosition(x, y);

            if (checkWin) this.checkWin();
        }
    }

    checkWin() 
    {
        let isSolved = true;

        for (let i = 0; i < this.tiles.length; i++) 
        {
            const tile = this.tiles[i];
            if (tile.isHidden) continue; // Skip the hidden tile

            const correctX = (tile.number - 1) % this.size;
            const correctY = Math.floor((tile.number - 1) / this.size);

            if (tile.x !== correctX || tile.y !== correctY) 
            {
                isSolved = false;
                break;
            }
        }

        if (isSolved) 
        {
            alert('Congratulations! You solved the puzzle!');
        }
    }
}

class Tile 
{
    constructor(number, x, y, imageUrl, tileWidth, tileHeight, isHidden = false) 
    {
        this.number = number;
        this.x = x;
        this.y = y;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.isHidden = isHidden;
        this.tileElement = this.createTileElement(imageUrl);
    }

    createTileElement(imageUrl) 
    {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        if (this.isHidden) 
        {
            tile.classList.add('hidden');
        }

        // Set background image and position
        tile.style.backgroundImage = `url(${imageUrl})`;
        tile.style.backgroundPosition = `${-this.x * this.tileWidth}px ${-this.y * this.tileHeight}px`;
        tile.style.width = `${this.tileWidth}px`;
        tile.style.height = `${this.tileHeight}px`;

        return tile;
    }

    setPosition(x, y) 
    {
        this.x = x;
        this.y = y;
        this.updateTilePosition();
    }

    updateTilePosition() 
    {
        this.tileElement.style.transform = `translate(${this.x * (this.tileWidth + 2)}px, ${this.y * (this.tileHeight + 2)}px)`;
    }

    hide() 
    {
        this.tileElement.classList.add('hidden');
    }

    show() 
    {
        this.tileElement.classList.remove('hidden');
    }
}

document.addEventListener('DOMContentLoaded', () => 
{
    const puzzleContainer = document.getElementById('puzzle-container');
    const puzzle = new Puzzle(puzzleContainer, 'utsa_logo.jpg');  // <-- Replace this with your image URL
});
