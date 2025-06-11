function knightMoves(start, end) {
    // All possible knight moves
    const moves = [
        [1, 2],
        [2, 1],
        [2, -1],
        [1, -2],
        [-1, -2],
        [-2, -1],
        [-2, 1],
        [-1, 2],
    ];

    // Convert positions to strings for easy comparison & visited tracking
    const toKey = ([x, y]) => `${x},${y}`;
    const fromKey = (key) => key.split(",").map(Number);

    const queue = [[start, 0]]; // [position, moveCount]
    const visited = new Set();
    const parent = new Map();

    visited.add(toKey(start));
    parent.set(toKey(start), null);

    while (queue.length > 0) {
        const [[x, y], movesSoFar] = queue.shift();

        // If we reached the target, return the move count
        if (x === end[0] && y === end[1]) {
            const path = [];
            let currentKey = toKey(end);
            while (currentKey !== null) {
                path.unshift(fromKey(currentKey));
                currentKey = parent.get(currentKey);
            }
            console.log(
                `You made it in ${path.length - 1} moves! Here's your path:`
            );
            for (let i = 0; i < path.length; i++) {
                console.log(path[i]);
            }
            return path.length - 1;
        }

        for (const [dx, dy] of moves) {
            const newX = x + dx;
            const newY = y + dy;

            // Ensure within bounds of 8x8 board
            if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
                const newKey = toKey([newX, newY]);
                if (!visited.has(newKey)) {
                    visited.add(newKey);
                    parent.set(newKey, toKey([x, y]));
                    queue.push([[newX, newY], movesSoFar + 1]);
                }
            }
        }
    }

    return -1; // If no path found (shouldn't happen on a valid chess board)
}

knightMoves([0, 0], [7, 7]);
knightMoves([0, 0], [1, 2]);
knightMoves([3, 3], [4, 3]);
