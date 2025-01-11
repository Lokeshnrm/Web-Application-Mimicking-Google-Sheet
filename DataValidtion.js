document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('input', () => {
        if (isNaN(cell.value)) {
            cell.setCustomValidity("Please enter a number.");
        } else {
            cell.setCustomValidity("");
        }
    });
});
