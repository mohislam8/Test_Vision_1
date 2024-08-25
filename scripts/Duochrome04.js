function toggleCircle(circleId) {
    const circle = document.getElementById(circleId);
    const checkBox = document.getElementById(`check${circleId.slice(-1)}`);
    circle.style.backgroundColor = checkBox.checked ? 'lightblue' : 'white';
}

function toggleGroup(group) {
    const groupContainer = document.getElementById(`group${group}`);
    const circles = groupContainer.getElementsByClassName('circle');
    const checkBoxes = groupContainer.getElementsByTagName('input');
    const mainCheckBox = document.getElementById(`check${group}`);

    const checkedChifers = [];
    
    for (let i = 0; i < checkBoxes.length; i++) {
        checkBoxes[i].checked = mainCheckBox.checked;
        circles[i].style.backgroundColor = mainCheckBox.checked ? 'lightblue' : 'white';
        
        // Collect the `data-chifer` attribute of checked checkboxes
        if (checkBoxes[i].checked) {
            checkedChifers.push(checkBoxes[i].getAttribute('data-chifer'));
        }
    }

    // Log all checked `data-chifer` attributes
    console.log(`Checked checkboxes data-chifer: ${checkedChifers.join(', ')}`);

    // Send the list of checked `data-chifer` values as JSON
    fetch('/save', { // Adjust URL if needed
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ checkedChifers }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
