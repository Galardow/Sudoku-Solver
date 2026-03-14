document.addEventListener('DOMContentLoaded', function() {
    const totalGrid = 9
    const solve = document.getElementById('solve')
    solve.addEventListener('click', solveSudoku)

    const grid = document.getElementById('grid')

    for(let row = 0; row < totalGrid; row ++) {
        const newRow = document.createElement('tr')
        for(let column = 0; column < totalGrid; column ++) {
            const cell = document.createElement('td')
            const input = document.createElement('input')
            input.type = 'number'
            input.className = 'cell'
            input.id = `cell-${row}-${column}`
            cell.appendChild(input)
            newRow.appendChild(cell)
        }
        grid.appendChild(newRow)
    }
})

async function solveSudoku() {
    const totalGrid = 9
    const sudokuArray = []

    for(let row = 0; row < totalGrid; row ++) {
        sudokuArray[row] = []
        for(let column = 0; column < totalGrid; column ++) {
            const cellId = `cell-${row}-${column}`
            const cellValue = document.getElementById(cellId).value
            sudokuArray[row][column] = cellValue !== '' ? parseInt(cellValue) : 0
        }
    }
    for(let row = 0; row < totalGrid; row ++) {
        for(let column = 0; column < totalGrid; column ++) {
            const cellId = `cell-${row}-${column}`
            const cell = document.getElementById(cellId)

            if(sudokuArray[row][column] !== 0) {
                cell.classList.add('user')
            }
        }
    }
    if(solver(sudokuArray)) {
        for(let row = 0; row < totalGrid; row ++) {
            for(let column = 0; column < totalGrid; column ++) {
                const cellId = `cell-${row}-${column}`
                const cell = document.getElementById(cellId)

                if(!cell.classList.contains('user')) {
                    cell.value = sudokuArray[row][column]
                    cell.classList.add('solved')
                    await sleep(20)
                }
            }
        }
    } else {
        alert('Please give the right clue')
    }
}

function solver(board) {
    const totalGrid = 9

    for(let row = 0; row < totalGrid; row ++) {
        for(let column = 0; column < totalGrid; column ++) {
            if(board[row][column] === 0) {
                for(let number = 1; number <= 9; number ++) {
                    if(validMove(board, row, column, number)) {
                        board[row][column] = number

                        if(solver(board)) {
                            return true
                        }
                        board[row][column] = 0
                    }
                }
                return false
            }
        }
    }
    return true
}

function validMove(board, row, column, number) {
    const totalGrid = 9

    for(let i = 0; i < totalGrid; i ++) {
        if(board[row][i] === number || board[i][column] === number) {
            return false
        }
    }
    const startRow = Math.floor(row / 3) * 3
    const startColumn = Math.floor(column / 3) * 3

    for(let i = startRow; i < startRow + 3; i ++) {
        for(let x = startColumn; x < startColumn + 3; x ++) {
            if(board[i][x] === number) {
                return false
            }
        }
    }
    return true
}

function sleep(s) {
    return new Promise(resolve => setTimeout(resolve, s))
}