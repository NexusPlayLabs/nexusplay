import React from 'react'

export default function ConnectModal({ isOpen, onClose, onSelect }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center space-y-4">
        <h2 className="text-xl font-semibold">Connect Your Account</h2>
        <button
          onClick={() => onSelect('twitter')}
          className="w-full py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
        >
          Connect with Twitter
        </button>
        <button
          onClick={() => onSelect('wallet')}
          className="w-full py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700"
        >
          Connect with Wallet
        </button>
        <button onClick={onClose} className="text-gray-500 hover:underline">
          Cancel
        </button>
      </div>
    </div>
  );
}
