document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('edit-post-form');
    
    // Extract the post ID from a data attribute or URL
    const postId = form.dataset.postId; // Assuming you set data-post-id on the form
  
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
        // Send a PUT request to the server to update the post
        const response = await fetch(`/api/posts/${postId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        });
  
        if (response.ok) {
          // Handle successful response (e.g., redirect or show a success message)
          window.location.href = '/dashboard'; // Redirect to the dashboard or another page
        } else {
          // Handle errors
          const errorData = await response.json();
          console.error('Error:', errorData);
          alert('Failed to update the post. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      }
    });
  });
  