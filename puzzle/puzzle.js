class Tile 
{
    constructor(number, x, y, imageUrl, size, containerSize, isHidden = false) 
    {
        this.number = number;
        this.x = x;
        this.y = y;
        this.size = size;
        this.containerSize = containerSize;
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

        // Set background image and position to create the illusion of a sliced image
        tile.style.backgroundImage = `url(${imageUrl})`;
        tile.style.backgroundPosition = `${-this.x * this.size}px ${-this.y * this.size}px`;
        tile.style.width = `${this.size}px`;
        tile.style.height = `${this.size}px`;

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
        this.tileElement.style.transform = `translate(${this.x * (this.size + 2)}px, ${this.y * (this.size + 2)}px)`;
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

class Puzzle 
{
    constructor(container, imageUrl, size = 4, tileSize = 100) 
    {
        this.container = container;
        this.size = size;
        this.tileSize = tileSize;
        this.tiles = [];
        this.emptyPosition = { x: size - 1, y: size - 1 };
        this.imageUrl = imageUrl;
        this.init();
    }

    init() 
    {
        this.createTiles();
        this.shuffle();
        this.render();
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
                    // Leave the last tile empty (the hidden tile)
                    const emptyTile = new Tile(null, x, y, this.imageUrl, this.tileSize, this.size * this.tileSize, true);
                    this.tiles.push(emptyTile);
                    continue;
                }

                const tile = new Tile(tileNumber++, x, y, this.imageUrl, this.tileSize, this.size * this.tileSize);
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
        for (let i = 0; i < 100; i++) 
        {
            const possibleMoves = this.getPossibleMoves();
            const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
            this.moveTile(randomMove, false);
        }
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

        // Swap positions if the tile can move
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

document.addEventListener('DOMContentLoaded', () => 
{
    const puzzleContainer = document.getElementById('puzzle-container');
    const puzzle = new Puzzle(puzzleContainer, 'utsa_logo.jpg');
});
