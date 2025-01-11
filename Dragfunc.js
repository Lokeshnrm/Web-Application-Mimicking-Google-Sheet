document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.id);
    });
    
    cell.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
    
    cell.addEventListener('drop', (e) => {
        e.preventDefault();
        let sourceId = e.dataTransfer.getData('text/plain');
        let target = e.target;
        let sourceCell = document.getElementById(sourceId);
        let temp = sourceCell.value;
        sourceCell.value = target.value;
        target.value = temp;
    });
});
