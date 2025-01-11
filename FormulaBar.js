function evaluateFormula() {
    const formula = document.getElementById('formula-bar').value;
    // Basic evaluation, assuming formula like "=SUM(A1:A3)"
    const cells = formula.match(/\([^\)]+\)/g); // Match cell references
    let result = 0;
    cells.forEach(cell => {
        const cellValue = document.getElementById(cell).value;
        result += parseFloat(cellValue) || 0;
    });
    document.getElementById('formula-bar').value = result;
}
