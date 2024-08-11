module.exports = {
  formatTime: (date) => {
    if (!date) return '';
    return new Date(date).toLocaleTimeString();
  },
  formatDate: (date) => {
    if (!date) return '';
    const d = new Date(date);
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  },

  ifLoggedIn: (loggedIn, options) => {
    if (loggedIn) {
      return options.fn(this); // Render the block inside the helper
    } else {
      return options.inverse(this); // Render the block inside the else
    }
  }
  
  };