document.getElementById('characterTable2').addEventListener('click', function(e) {
    if (e.target.tagName === 'LABEL') {
        const td = e.target.parentElement;
        const table = td.closest('table');
        const column = td.cellIndex;

        // Remove 'selected' class from all cells in this column
        for (let row of table.rows) {
            if (row.cells[column]) {
                row.cells[column].classList.remove('selected');
            }
        }

        // Add 'selected' class to the clicked cell
        td.classList.add('selected');

        const radio = td.getElementsByTagName('input')[0];
        radio.checked = true;

        console.log(`Selected: ${e.target.textContent} in column ${String.fromCharCode(65 + column - 1)}${td.parentElement.rowIndex}`);
    }
});