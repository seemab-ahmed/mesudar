import axios from 'axios';

const TestExportAPI = () => {
  const testAPI = async () => {
    try {
      console.log('Testing export API...');
      
      // Test stats endpoint
      const statsResponse = await axios.get('http://localhost:3000/api/export/admin/stats');
      console.log('Stats Response:', statsResponse.data);
      
      // Test PDFs list endpoint
      const pdfsResponse = await axios.get('http://localhost:3000/api/export/admin/pdfs?page=1&limit=20');
      console.log('PDFs Response:', pdfsResponse.data);
      
      alert('API test successful! Check console for details.');
    } catch (error) {
      console.error('API test failed:', error.response?.data || error.message);
      alert('API test failed! Check console for details.');
    }
  };

  return (
    <div className="p-4">
      <h2>Export API Test</h2>
      <button 
        onClick={testAPI}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Test Export API
      </button>
    </div>
  );
};

export default TestExportAPI;