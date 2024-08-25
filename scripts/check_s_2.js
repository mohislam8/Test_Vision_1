document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll(".single-checkbox6",);

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
    const checkboxes = document.querySelectorAll(".single-checkbox7",);

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
    const checkboxes = document.querySelectorAll(".single-checkbox8",);

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
    const checkboxes = document.querySelectorAll(".single-checkbox9",);

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
    const checkboxes = document.querySelectorAll(".single-checkbox10",);

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

//====================================================================================================


document.addEventListener('DOMContentLoaded', () => {
    const collectCheckboxStates = () => {
        // Create an object to store the state of checkboxes
        const checkboxStates = {
            singleCheckbox6: [],
            singleCheckbox7: [],
            singleCheckbox8: [],
            singleCheckbox9: [],
            singleCheckbox10: []
        };

        // Helper function to update the state of checkboxes
        const updateCheckboxStates = (className, stateArray) => {
            document.querySelectorAll(`.${className}`).forEach(checkbox => {
                stateArray.push({ id: checkbox.id, checked: checkbox.checked });
            });
        };

        // Collect states for each checkbox group
        updateCheckboxStates('single-checkbox6', checkboxStates.singleCheckbox6);
        updateCheckboxStates('single-checkbox7', checkboxStates.singleCheckbox7);
        updateCheckboxStates('single-checkbox8', checkboxStates.singleCheckbox8);
        updateCheckboxStates('single-checkbox9', checkboxStates.singleCheckbox9);
        updateCheckboxStates('single-checkbox10', checkboxStates.singleCheckbox10);

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

    addCheckboxListeners('single-checkbox6');
    addCheckboxListeners('single-checkbox7');
    addCheckboxListeners('single-checkbox8');
    addCheckboxListeners('single-checkbox9');
    addCheckboxListeners('single-checkbox10');
});
