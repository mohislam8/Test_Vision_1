

document.getElementById('next-btn').addEventListener('click', async function() {

    localStorage.clear();

    const lastId = await fetchLastId(); 
    //============================================================================================
    const    first_and_last_name =  document.getElementById('nom').value;
    const    age = document.getElementById('age').value;
    const    job = document.getElementById('job').value;
    const    medical_antidotes = document.getElementById('medical_antidotes').value;
    const    correction = document.getElementById('correction').value ;
    //const    now = new Date().toLocaleString();
    const now = new Date();
    now.setHours(now.getHours() + 1);  // Adjusts by 1 hour
    const adjustedTime = now.toISOString();

    const page1Data  = {
        "id": ((lastId) + 1).toString(),
        "created_at":String(adjustedTime),
        "first_and_last_name": first_and_last_name,
        "age": age,
        "job": job,
        "medical_antidotes": medical_antidotes,
        "correction": correction ,
    };
    
    //localStorage.clear();

    localStorage.setItem('page1Data', JSON.stringify(page1Data ));

    // Navigate to the next page
    window.location.href = '/addpatient_test1';
});

// Function to fetch the last ID from the backend
async function fetchLastId() {
    try {
        const response = await fetch('/last-id/');
        if (response.ok) {
            const data = await response.json();
            return data.last_id || null; // Handle cases where last_id might not be present
        } else {
            console.error('Error fetching last ID:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Network error fetching last ID:', error);
        return null;
    }
}

for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    console.log(`${key}: ${value}`);
} 
//localStorage.clear();


