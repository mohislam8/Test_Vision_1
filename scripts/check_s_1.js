document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll(".single-checkbox1",);

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (event) => {
            if (event.target.checked) {
                checkboxes.forEach(cb => {
                    if (cb !== event.target) {
                        cb.checked = false;
                    }
                });
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll(".single-checkbox2",);

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (event) => {
            if (event.target.checked) {
                checkboxes.forEach(cb => {
                    if (cb !== event.target) {
                        cb.checked = false;
                    }
                });
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll(".single-checkbox3",);

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (event) => {
            if (event.target.checked) {
                checkboxes.forEach(cb => {
                    if (cb !== event.target) {
                        cb.checked = false;
                    }
                });
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll(".single-checkbox4",);

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (event) => {
            if (event.target.checked) {
                checkboxes.forEach(cb => {
                    if (cb !== event.target) {
                        cb.checked = false;
                    }
                });
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll(".single-checkbox5",);

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (event) => {
            if (event.target.checked) {
                checkboxes.forEach(cb => {
                    if (cb !== event.target) {
                        cb.checked = false;
                    }
                });
            }
        });
    });
});

// ========================================================================================

document.addEventListener('DOMContentLoaded', () => {
    const collectCheckboxStates = () => {
        // Create an object to store the state of checkboxes
        const checkboxStates = {
            singleCheckbox1: [],
            singleCheckbox2: [],
            singleCheckbox3: [],
            singleCheckbox4: [],
            singleCheckbox5: []
        };

        // Helper function to update the state of checkboxes
        const updateCheckboxStates = (className, stateArray) => {
            document.querySelectorAll(`.${className}`).forEach(checkbox => {
                stateArray.push({ id: checkbox.id, checked: checkbox.checked });
            });
        };

        // Collect states for each checkbox group
        updateCheckboxStates('single-checkbox1', checkboxStates.singleCheckbox1);
        updateCheckboxStates('single-checkbox2', checkboxStates.singleCheckbox2);
        updateCheckboxStates('single-checkbox3', checkboxStates.singleCheckbox3);
        updateCheckboxStates('single-checkbox4', checkboxStates.singleCheckbox4);
        updateCheckboxStates('single-checkbox5', checkboxStates.singleCheckbox5);

        return checkboxStates;
    };

    // Function to send the collected data as JSON
    const sendCheckboxStates = () => {
        const checkboxStates = collectCheckboxStates();

        fetch('/save', { // Replace with your endpoint URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(checkboxStates),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    // Example of how to trigger sending data (e.g., on button click)
    document.getElementById('save-btn').addEventListener('click', sendCheckboxStates);

    // Add change event listeners for each group of checkboxes
    const addCheckboxListeners = (className) => {
        const checkboxes = document.querySelectorAll(`.${className}`);
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (event) => {
                if (event.target.checked) {
                    checkboxes.forEach(cb => {
                        if (cb !== event.target) {
                            cb.checked = false;
                        }
                    });
                }
            });
        });
    };

    addCheckboxListeners('single-checkbox1');
    addCheckboxListeners('single-checkbox2');
    addCheckboxListeners('single-checkbox3');
    addCheckboxListeners('single-checkbox4');
    addCheckboxListeners('single-checkbox5');
});
