export default (range: 'long_term' | 'medium_term' | 'short_term') => {
    if(range === 'medium_term') return 'The Last 6 months';
    else if(range === 'short_term') return 'The Last 4 weeks';
    else return 'All Time';
  }