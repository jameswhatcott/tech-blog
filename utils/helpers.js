module.exports = {
  format_time: (date) => {
    if (!date) return '';
    return new Date(date).toLocaleTimeString();
  },
  format_date: (date) => {
    if (!date) return '';
    const d = new Date(date);
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  },
  
  };