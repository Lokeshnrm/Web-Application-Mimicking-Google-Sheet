// Global variables for tracking history (for undo/redo)
let history = [];
let historyIndex = -1;

// DOM Elements
const spreadsheet = document.getElementById('spreadsheet');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const fontColorPicker = document.getElementById('font-color-picker');
const fontSizeMenu = document.getElementById('font-size-menu');
const upper = document.getElementById('upper');
const lower = document.getElementById('lower');
const trim = document.getElementById('trim');
const removeDuplicates = document.getElementById('remove-duplicates');
const findReplace = document.getElementById('find-replace');
const undoBtn = document.getElementById('undo');
const redoBtn = document.getElementById('redo');
const boldBtn = document.getElementById('bold');
const italicBtn = document.getElementById('italic');
let selectedCell = null;

// Handle creating a new spreadsheet (simplified)
function createNewSpreadsheet() {
    history = [];
    historyIndex = -1;
    // Add your code for creating a new spreadsheet here.
    updateHistory();
}

// Update the undo/redo stack after an action
function updateHistory() {
    history.push(spreadsheet.innerHTML);
    historyIndex++;
    toggleUndoRedo();
}

// Handle Undo operation
undoBtn.onclick = () => {
    if (historyIndex > 0) {
        historyIndex--;
        spreadsheet.innerHTML = history[historyIndex];
    }
    toggleUndoRedo();
};

// Handle Redo operation
redoBtn.onclick = () => {
    if (historyIndex < history.length - 1) {
        historyIndex++;
        spreadsheet.innerHTML = history[historyIndex];
    }
    toggleUndoRedo();
};

// Toggle visibility of Undo/Redo buttons
function toggleUndoRedo() {
    undoBtn.disabled = historyIndex <= 0;
    redoBtn.disabled = historyIndex >= history.length - 1;
}

// Text transformations
upper.onclick = () => transformText('upper');
lower.onclick = () => transformText('lower');
trim.onclick = () => transformText('trim');

// Function to perform text transformations
function transformText(action) {
    const cells = spreadsheet.getElementsByTagName('td');
    for (let cell of cells) {
        switch(action) {
            case 'upper':
                cell.textContent = cell.textContent.toUpperCase();
                break;
            case 'lower':
                cell.textContent = cell.textContent.toLowerCase();
                break;
            case 'trim':
                cell.textContent = cell.textContent.trim();
                break;
        }
    }
    updateHistory();
}

// Remove Duplicates
removeDuplicates.onclick = () => {
    const cells = Array.from(spreadsheet.getElementsByTagName('td')).map(cell => cell.textContent);
    const uniqueCells = [...new Set(cells)];
    let index = 0;
    for (let row of spreadsheet.rows) {
        for (let cell of row.cells) {
            if (index < uniqueCells.length) {
                cell.textContent = uniqueCells[index++];
            }
        }
    }
    updateHistory();
};

// Find and Replace
findReplace.onclick = () => {
    const find = prompt('Enter the text to find');
    const replace = prompt('Enter the replacement text');
    const cells = spreadsheet.getElementsByTagName('td');
    for (let cell of cells) {
        if (cell.textContent.includes(find)) {
            cell.textContent = cell.textContent.replace(new RegExp(find, 'g'), replace);
        }
    }
    updateHistory();
};

// Search operation
searchBtn.onclick = () => {
    const searchTerm = searchInput.value;
    const cells = spreadsheet.getElementsByTagName('td');
    for (let cell of cells) {
        if (cell.textContent.includes(searchTerm)) {
            cell.style.backgroundColor = 'yellow';
        } else {
            cell.style.backgroundColor = '';
        }
    }
};

// Style changes (Bold, Italic, Font Size, Font Color)
boldBtn.onclick = () => toggleStyle('bold');
italicBtn.onclick = () => toggleStyle('italic');
fontSizeMenu.onclick = (e) => changeFontSize(e.target.id);
fontColorPicker.oninput = (e) => changeFontColor(e.target.value);

function toggleStyle(style) {
    if (selectedCell) {
        if (style === 'bold') {
            selectedCell.style.fontWeight = selectedCell.style.fontWeight === 'bold' ? 'normal' : 'bold';
        } else if (style === 'italic') {
            selectedCell.style.fontStyle = selectedCell.style.fontStyle === 'italic' ? 'normal' : 'italic';
        }
    }
}

function changeFontSize(size) {
    if (selectedCell) {
        selectedCell.style.fontSize = size + 'px';
    }
}

function changeFontColor(color) {
    if (selectedCell) {
        selectedCell.style.color = color;
    }
}

// Event to select a cell
spreadsheet.onclick = (e) => {
    if (e.target.tagName === 'TD') {
        selectedCell = e.target;
    }
};
