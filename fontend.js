const response = await fetch('http://localhost:8000/api', {
    method: 'POST',
    body: JSON.stringify({
        username: "sujan_123",
        password: "sujan@123"
    }),
    headers: {
        'Content-Type': 'application/json'
    }
});
