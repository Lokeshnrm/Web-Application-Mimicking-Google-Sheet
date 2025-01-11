// Trim Function
function trimData() {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.value = cell.value.trim();
    });
}

// Uppercase Function
function convertToUpper() {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.value = cell.value.toUpperCase();
    });
}

// Remove Duplicates Function
function removeDuplicates() {
    let values = [];
    document.querySelectorAll('.cell').forEach(cell => {
        if (!values.includes(cell.value)) {
            values.push(cell.value);
        }
    });
    // Reassign unique values back to cells
    let index = 0;
    document.querySelectorAll('.cell').forEach(cell => {
        cell.value = values[index++];
    });
}
