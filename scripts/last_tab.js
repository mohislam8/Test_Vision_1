function handleTableClick(event, tableId) {
    if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox') {
        const td = event.target.parentElement;
        td.classList.toggle('selected', event.target.checked);
        console.log(`Selected: ${event.target.checked ? 'Checked' : 'Unchecked'} in table ${tableId}`);
    }
}

document.getElementById('coordinateTable5').addEventListener('click', function(e) {
    handleTableClick(e, 'coordinateTable5');
});