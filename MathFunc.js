function calculateSum(range) {
    let sum = 0;
    range.forEach(cell => {
        sum += parseFloat(cell.value) || 0;
    });
    return sum;
}
