import React, { useState, useEffect } from 'react';
import { apiKeysAPI } from '../../api/apiKeys'; 
import { Button } from '../ui/Button';
import { Pencil, Trash2 } from 'lucide-react';

const ApiKeysPage = () => {
  const [apiKeys, setApiKeys] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showGeneratedKey, setShowGeneratedKey] = useState(false);
  const [keyName, setKeyName] = useState('');
  const [generatedKey, setGeneratedKey] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    try {
      const response = await apiKeysAPI.getAllKeys();
      setApiKeys(response);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch API keys:', error);
      setLoading(false);
    }
  };

  const handleCreateKey = async () => {
    try {
      const response = await apiKeysAPI.createKey(keyName);
      setGeneratedKey(response.key);
      setShowCreateModal(false);
      setShowGeneratedKey(true);
      await fetchApiKeys();
    } catch (error) {
      console.error('Failed to create API key:', error);
    }
  };

  const handleKeyNameSubmit = (e) => {
    e.preventDefault();
    handleCreateKey();
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(generatedKey);
  };

  const handleDeleteKey = async (keyId) => {
    try {
      await apiKeysAPI.deleteKey(keyId);
      await fetchApiKeys();
    } catch (error) {
      console.error('Failed to delete API key:', error);
    }
  };

  return (
    <div className="flex-1 bg-[#151515] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">API Keys</h1>
          <Button 
            onClick={() => setShowCreateModal(true)}
            className="bg-white text-black hover:bg-gray-100"
          >
            Create API Key
          </Button>
        </div>

        <p className="text-gray-400 mb-8">
          Manage your API keys. Remember to keep your API keys safe to prevent unauthorized access.
        </p>

        {loading ? (
          <div className="text-center text-gray-400 mt-8">Loading...</div>
        ) : apiKeys.length === 0 ? (
          <div className="text-center text-gray-400 mt-8">No API keys found</div>
        ) : (
          <div className="bg-[#1E1E1E] rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#2D2D2D]">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">NAME</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">SECRET KEY</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">CREATED</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">LAST USED</th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-400"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {apiKeys.map((key) => (
                  <tr key={key.id}>
                    <td className="px-6 py-4 text-sm">{key.name}</td>
                    <td className="px-6 py-4 text-sm font-mono">
                      {key.key.substring(0, 12)}...
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {new Date(key.created).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {key.lastUsed ? new Date(key.lastUsed).toLocaleDateString() : 'Never'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDeleteKey(key.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

    
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-[#1E1E1E] rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Create API Key</h2>
              <form onSubmit={handleKeyNameSubmit}>
                <input
                  type="text"
                  placeholder="Enter a display name for the key (max 50 characters)"
                  value={keyName}
                  onChange={(e) => setKeyName(e.target.value)}
                  className="w-full px-4 py-2 bg-[#2D2D2D] border border-gray-700 rounded-lg mb-4 text-white placeholder-gray-500"
                  maxLength={50}
                  required
                />
                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowCreateModal(false);
                      setKeyName('');
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Submit</Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Generated Key Modal */}
        {showGeneratedKey && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-[#1E1E1E] rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-2">
                Your new API key has been created
              </h2>
              <p className="text-red-400 text-sm mb-4">
                Copy it now, as we will not display it again.
              </p>
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  value={generatedKey}
                  readOnly
                  className="flex-1 px-4 py-2 bg-[#2D2D2D] border border-gray-700 rounded-lg text-white font-mono"
                />
                <Button onClick={handleCopyKey}>
                  Copy
                </Button>
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={() => {
                    setShowGeneratedKey(false);
                    setGeneratedKey('');
                  }}
                >
                  Done
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiKeysPage;