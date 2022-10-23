const Player = (name, selectedSymbol, position) => {
    let score = 0;
    const checkIfwinner = () => {
        const board = gameBoard.getCurrentBoardContent();
        if (board[0] == selectedSymbol && board[1] == board[0] && board[2] == board[0] ||
            board[3] == selectedSymbol && board[4] == board[3] && board[5] == board[3] ||
            board[6] == selectedSymbol && board[7] == board[6] && board[8] == board[6] ||
            board[0] == selectedSymbol && board[3] == board[0] && board[6] == board[0] ||
            board[1] == selectedSymbol && board[4] == board[1] && board[7] == board[1] ||
            board[2] == selectedSymbol && board[2] == board[5] && board[8] == board[2] ||
            board[0] == selectedSymbol && board[4] == board[0] && board[8] == board[0] ||
            board[2] == selectedSymbol && board[4] == board[2] && board[2] == board[6]) {
            return true
        } else {
            return false
        }
    }

    return {
        selectedSymbol,
        name,
        score,
        position,
        checkIfwinner,
    }
}