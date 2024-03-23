import React, { useState } from 'react';

function ReferralSystem() {
  const [referralCode, setReferralCode] = useState('');
  const [isValidReferral, setIsValidReferral] = useState(false);

  const handleReferralCodeChange = (event) => {
    setReferralCode(event.target.value);
  };

  const handleReferralSubmit = () => {
    // Check if the referral code is valid (e.g., perform a network request to verify)
    // For simplicity, let's assume a valid referral code is "123456"
    setIsValidReferral(referralCode === '123456');
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Referral System</h1>
        <input
          type="text"
          placeholder="Enter referral code"
          value={referralCode}
          onChange={handleReferralCodeChange}
          className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
        />
        <button
          onClick={handleReferralSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
        >
          Submit
        </button>
        {isValidReferral ? (
          <p className="text-green-600 mt-4">Referral code is valid!</p>
        ) : (
          <p className="text-red-600 mt-4">Referral code is not valid.</p>
        )}
      </div>
    </div>
  );
}

export default ReferralSystem;
