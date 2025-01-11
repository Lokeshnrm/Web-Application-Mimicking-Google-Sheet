// Save Spreadsheet
function saveSpreadsheet() {
    const cells = Array.from(document.querySelectorAll('.cell'));
    const data = cells.map(cell => cell.value);
    localStorage.setItem('spreadsheetData', JSON.stringify(data));
}

// Load Spreadsheet
function loadSpreadsheet() {
    const data = JSON.parse(localStorage.getItem('spreadsheetData'));
    const cells = document.querySelectorAll('.cell');
    data.forEach((value, index) => {
        cells[index].value = value;
    });
}
