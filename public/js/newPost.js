document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('new-post-form');
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault(); // Prevent the default form submission
  
      // Get form data
      const title = document.getElementById('title').value;
      const content = document.getElementById('content').value;
  
      // Create an object with the form data
      const postData = {
        title,
        content
      };
  
      try {
        // Send a POST request to the server
        const response = await fetch('/api/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        });
  
        if (response.ok) {
          // Handle successful response (e.g., redirect or show a success message)
          window.location.href = '/dashboard'; // Redirect to the dashboard
        } else {
          // Handle errors
          const errorData = await response.json();
          console.error('Error:', errorData);
          alert('Failed to create the post. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      }
    });
  });
  