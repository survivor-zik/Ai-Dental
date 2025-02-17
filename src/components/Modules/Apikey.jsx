import React, { useState, useEffect } from 'react';
import { apiKeysAPI } from '../../api/apiKeys'; 
import { Button } from '../ui/Button';
import { Pencil, Trash2, X, ClipboardCopy } from 'lucide-react';
import { Toaster ,toast } from 'sonner';
const ApiKeysPage = () => {
  const [apiKeys, setApiKeys] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showGeneratedKey, setShowGeneratedKey] = useState(false);
  const [keyName, setKeyName] = useState('');
  const [generatedKey, setGeneratedKey] = useState('');
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false)
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
      setIsLoading(true)
      const response = await apiKeysAPI.createKey(keyName);
      setGeneratedKey(response.key);
      
      setTimeout(() => {
        toast.success("Key Successfully Generated!");
        setShowCreateModal(false);
        setShowGeneratedKey(true);
        setIsLoading(false)
      }, 3000);
      
      await fetchApiKeys();
    
    } catch (error) {
      setIsLoading(false)
      toast.error("Failed to create API key!");
      console.error('Failed to create API key:', error);
    }
  };

  const handleKeyNameSubmit = (e) => {
    e.preventDefault();
    handleCreateKey();
  };

  const handleCopyKey = () => {
    toast.success("Key Successfully Generated!");
    navigator.clipboard.writeText(generatedKey);
  };

  const handleDeleteKey = async (keyId) => {
    try {
      await apiKeysAPI.deleteKey(keyId);
      toast.success("Key Successfully Deleted!");
      await fetchApiKeys();
    } catch (error) {
      toast.error("Failed to delete API key");
      console.error('Failed to delete API key:', error);
    }
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setKeyName('');
    setShowGeneratedKey(false);
    setGeneratedKey('');
  }

  return (
    <div className="flex-1 bg-[#151515] text-white p-4">
      <div className="w-full">
        <div className="items-center pb-5  border-b border-gray-700">
          <h1 className="text-2xl font-bold">API Keys</h1>
        </div>

        <p className="text-white mb-6 pt-5">
          Manage your API keys. Remember to keep your API keys safe to prevent unauthorized access.
        </p>

        {loading ? (
      <div className="text-center text-gray-400 mt-8">Loading...</div>
    ) : apiKeys.length === 0 ? (
      <div className="text-center text-gray-400 mt-8">No API keys found</div>
    ) : (
      <div className="w-full max-w-[calc(100%-350px)] mr-60">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">NAME</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">SECRET KEY</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">CREATED</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">LAST USED</th>
              <th className="px-4 py-2 text-right text-sm font-medium text-gray-400"></th>
            </tr>
          </thead>
          <tbody>
            {apiKeys.map((key) => (
              <tr key={key.id} className="border-b border-gray-700">
                <td className="px-4 py-3 text-sm">{key.name}</td>
                <td className="px-4 py-3 text-sm font-mono">
                  {key.key.substring(0, 12)}...
                </td>
                <td className="px-4 py-3 text-sm text-gray-400">
                  {new Date(key.created).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-sm text-gray-400">
                  {key.lastUsed ? new Date(key.lastUsed).toLocaleDateString() : 'Never'}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => handleDeleteKey(key.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
 
        <div className='mt-5'>
        <Button 
            onClick={() => setShowCreateModal(true)}
            className="bg-[#ffff] text-[#000000] hover:bg-gray-200 px-4 py-2 rounded flex items-center justify-center gap-2"
          >
            <Pencil size={18} className="w-5 h-5" />
            <span>Create API Key</span>
          </Button>
        </div>

        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-[#151515] rounded-lg p-8 w-full max-w-xl">
              <div className="flex justify-between items-center mb-6"> 
                <h2 className="text-xl font-semibold text-white">Create API Key</h2>
                <button 
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={20} className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleKeyNameSubmit}>
                <div className="mb-6">
                  <p className="text-sm text-gray-400 mb-2">Enter a display name for the key (max 50 characters)</p>
                  <input
                    type="text"
                    value={keyName}
                    onChange={(e) => setKeyName(e.target.value)}
                    className="w-full px-4 py-3 bg-[#151515] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-500"
                    maxLength={50}
                    required
                  />
                </div>
                
                <div className="flex justify-end gap-3">
                <Button 
                    type="submit"
                    className="bg-[#ffff] text-[#000000] hover:bg-gray-200 px-6 py-2 rounded-lg font-medium"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                         <div className="animate-spin h-5 w-5 border-2 border-gray-300 border-t-gray-900 rounded-full mr-2"></div>
                      </div>
                    ) : (
                      'Submit'
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showGeneratedKey && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-[#151515] rounded-lg p-6 w-[600px]"> 
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">Create API Key</h2>
                <button 
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={20} className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-white">
                  Your new API key has been created. Copy it now, as we will not display it again.
                </p>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={generatedKey}
                    readOnly
                    className="w-[450px] px-3 py-2 bg-[#151515] border border-gray-700 rounded-md text-white font-mono text-sm focus:outline-none"
                  />
                  <Button 
                    onClick={handleCopyKey}
                    className="bg-[#ffff] text-[#000000] hover:bg-gray-200 px-3 ml-2 py-2 rounded-md min-w-[70px] flex items-center justify-center gap-2"
                  >
                    <ClipboardCopy size={18} className="w-5 h-5" />
                    <span>Copy</span>
                  </Button>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={handleCloseModal}
                    className="bg-[#2F3034] text-[#ffff] hover:bg-[#000000] px-4 py-2 rounded-md"
                  >
                    Done
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Toaster richColors visibleToasts={1} position='bottom-center'/>
    </div>
  );
};

export default ApiKeysPage;