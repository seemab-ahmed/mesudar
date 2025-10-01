import { useState, useEffect } from 'react';
import axios from 'axios';

const ExportedPdfsPage = () => {
  const [exports, setExports] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [showStats, setShowStats] = useState(true);
  const API_BASE = 'https://admin.mesudar.com/api/export';
  // const API_BASE = 'http://localhost:3000/api/export';

  useEffect(() => {
    fetchExports();
    fetchStats();
  }, [currentPage]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchExports = async () => {
    try {
      setLoading(true);
      console.log('Fetching exports from:', `${API_BASE}/admin/pdfs?page=${currentPage}&limit=20`);
      const response = await axios.get(`${API_BASE}/admin/pdfs?page=${currentPage}&limit=20`);
      console.log('Exports response:', response.data);
      setExports(response.data.exports);
      setPagination(response.data.pagination);
      setError(null);
    } catch (err) {
      setError('Failed to fetch exported PDFs');
      console.error('Error fetching exports:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_BASE}/admin/stats`);
      setStats(response.data.stats);
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const handleDownload = async (id, fileName) => {
    try {
      const response = await axios.get(`${API_BASE}/admin/pdf/${id}`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('Failed to download PDF');
      console.error('Download error:', err);
    }
  };

  const handleDelete = async (id, fileName) => {
    if (!window.confirm(`Are you sure you want to delete "${fileName}"?`)) {
      return;
    }

    try {
      await axios.delete(`${API_BASE}/admin/pdf/${id}`);
      fetchExports(); // Refresh the list
      fetchStats(); // Refresh stats
      alert('PDF deleted successfully');
    } catch (err) {
      alert('Failed to delete PDF');
      console.error('Delete error:', err);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading && currentPage === 1) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Loading exported PDFs...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#1f7333]">Exported PDFs</h2>
        <button
          onClick={() => setShowStats(!showStats)}
          className="px-4 py-2 bg-[#1f7333] text-white rounded hover:bg-[#89c497] transition"
        >
          {showStats ? 'Hide Stats' : 'Show Stats'}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Statistics Section */}
      {showStats && stats && (
        <div className="bg-white rounded-lg border border-[#1f7333] p-6">
          <h3 className="text-lg font-semibold text-[#1f7333] mb-4">Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-[#fcf1e6] p-4 rounded-lg">
              <h4 className="font-semibold text-[#1f7333]">Total Exports</h4>
              <p className="text-2xl font-bold text-[#535252]">{stats.totalExports}</p>
            </div>
            <div className="bg-[#fcf1e6] p-4 rounded-lg">
              <h4 className="font-semibold text-[#1f7333]">Total Storage</h4>
              <p className="text-2xl font-bold text-[#535252]">{stats.totalSizeMB} MB</p>
            </div>
            <div className="bg-[#fcf1e6] p-4 rounded-lg">
              <h4 className="font-semibold text-[#1f7333]">Categories</h4>
              <p className="text-2xl font-bold text-[#535252]">{stats.categoryStats.length}</p>
            </div>
          </div>

          {/* Category Statistics */}
          {stats.categoryStats.length > 0 && (
            <div>
              <h4 className="font-semibold text-[#1f7333] mb-3">Popular Categories</h4>
              <div className="space-y-2">
                {stats.categoryStats.slice(0, 5).map((category, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                    <span className="font-medium">{category._id}</span>
                    <div className="text-sm text-gray-600">
                      <span className="mr-4">{category.count} exports</span>
                      <span>{formatFileSize(category.totalSize)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Exports Table */}
      <div className="bg-white rounded-lg border border-[#1f7333] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#1f7333] text-white">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">File Name</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Size</th>
                <th className="px-4 py-3 text-left">Export Date</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {exports.map((exportItem, index) => (
                <tr key={exportItem._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <span className="font-bold text-[#1f7333] bg-[#fcf1e6] px-2 py-1 rounded-full text-sm">
                      {String((currentPage - 1) * 20 + index + 1).padStart(2, '0')}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-medium text-[#535252]">
                      {exportItem.fileName}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-[#fcf1e6] text-[#1f7333] rounded-full text-sm">
                      {exportItem.categoryName}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#535252]">
                    {formatFileSize(exportItem.fileSize)}
                  </td>
                  <td className="px-4 py-3 text-[#535252]">
                    {formatDate(exportItem.exportedAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDownload(exportItem._id, exportItem.fileName)}
                        className="px-3 py-1 bg-[#1f7333] text-white rounded text-sm hover:bg-[#89c497] transition"
                      >
                        Download
                      </button>
                      <button
                        onClick={() => handleDelete(exportItem._id, exportItem.fileName)}
                        className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {exports.length === 0 && !loading && (
          <div className="text-center py-8 text-gray-500">
            No exported PDFs found.
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={!pagination.hasPrev}
            className={`px-4 py-2 rounded ${
              pagination.hasPrev
                ? 'bg-[#1f7333] text-white hover:bg-[#89c497]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            } transition`}
          >
            Previous
          </button>
          
          <span className="px-4 py-2 text-[#535252]">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={!pagination.hasNext}
            className={`px-4 py-2 rounded ${
              pagination.hasNext
                ? 'bg-[#1f7333] text-white hover:bg-[#89c497]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            } transition`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ExportedPdfsPage;