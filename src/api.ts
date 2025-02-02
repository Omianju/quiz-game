export const fetchQuizData = async () => {
  try {
    const response = await fetch('https://organize-stamps-asking-discover.trycloudflare.com');
    if (!response.ok) {
      throw new Error('Failed to fetch quiz data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    throw error;
  }
};