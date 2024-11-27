import React, { useState } from 'react';

const Form = () => {
  const [requesterName, setRequesterName] = useState('');
  const [tenantName, setTenantName] = useState('');
  const [deploymentType, setDeploymentType] = useState('');
  const [otherDeployment, setOtherDeployment] = useState('');
  const [publicIPs, setPublicIPs] = useState('');
  const [errors, setErrors] = useState({
    requesterName: '',
    tenantName: '',
    deploymentError: '',
    ipError: '',
  });

  const handleDeploymentTypeChange = (event) => {
    setDeploymentType(event.target.value);
  };

  const handleOtherDeploymentChange = (event) => {
    setOtherDeployment(event.target.value);
  };

  const validateForm = (event) => {
    event.preventDefault();
    let formErrors = {
      requesterName: '',
      tenantName: '',
      deploymentError: '',
      ipError: '',
    };
    let isValid = true;

    if (requesterName.trim().length < 3) {
      formErrors.requesterName = 'Full name must be at least 3 characters long.';
      isValid = false;
    }

    if (tenantName.trim().length < 3) {
      formErrors.tenantName = 'Tenant full name must be at least 3 characters long.';
      isValid = false;
    }

    if (deploymentType === 'Other' && otherDeployment.trim() === '') {
      formErrors.deploymentError = 'Please specify the deployment type.';
      isValid = false;
    }

    const cidrPattern = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9?])\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?\/([1-9]|[12][0-9]|3[0-2]))$/;
    const ipList = publicIPs.split(',').map((ip) => ip.trim());

    if (ipList.length > 3) {
      formErrors.ipError = 'You can only provide up to 3 CIDR ranges.';
      isValid = false;
    }
    else if (ipList.some((ip) => !cidrPattern.test(ip))) {
      formErrors.ipError = 'Please enter valid CIDR ranges (e.g., 1.1.1.1/24).';
      isValid = false;
    }

    setErrors(formErrors);

    if (isValid) {
      sendData();
    }
  };

  const sendData = () => {
    const formData = {
      requesterName,
      tenantName,
      deploymentType,
      otherDeployment,
      publicIPs,
    };

    //dev
    // fetch('https://veritiautomation.app.n8n.cloud/webhook-test/7224427a-fe17-4c7c-a21c-bc3ac58accca', {
    //prod
    fetch('https://veritiautomation.app.n8n.cloud/webhook/7224427a-fe17-4c7c-a21c-bc3ac58accca', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          alert('Form submitted successfully!');
        } else {
          alert('Error submitting the form. Please try again.');
        }
      })
      .catch((error) => {
        alert('An error occurred while submitting the form.');
        console.error('Error:', error);
      });
  };

  return (
    <form className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg space-y-6">
      {/* Requester Full Name */}
      <div className="flex flex-col">
        <label htmlFor="requesterName" className="text-purple-600 font-medium">Requester Full Name:</label>
        <input
          type="text"
          id="requesterName"
          value={requesterName}
          onChange={(e) => setRequesterName(e.target.value)}
          required
          className="mt-2 p-3 border-2 border-purple-300 rounded-md focus:outline-none focus:border-purple-500"
        />
        {errors.requesterName && <span className="text-red-500 text-sm mt-1">{errors.requesterName}</span>}
      </div>

      {/* Tenant Full Name */}
      <div className="flex flex-col">
        <label htmlFor="tenantName" className="text-purple-600 font-medium">Tenant Full Name:</label>
        <input
          type="text"
          id="tenantName"
          value={tenantName}
          onChange={(e) => setTenantName(e.target.value)}
          required
          className="mt-2 p-3 border-2 border-purple-300 rounded-md focus:outline-none focus:border-purple-500"
        />
        {errors.tenantName && <span className="text-red-500 text-sm mt-1">{errors.tenantName}</span>}
      </div>

      {/* Deployment Type */}
      <div className="flex flex-col">
        <label htmlFor="deploymentType" className="text-purple-600 font-medium">Deployment Type:</label>
        <select
          id="deploymentType"
          value={deploymentType}
          onChange={handleDeploymentTypeChange}
          required
          className="mt-2 p-3 border-2 border-purple-300 rounded-md focus:outline-none focus:border-purple-500"
        >
          <option value="ESXi">ESXi</option>
          <option value="Hyper-V">Hyper-V</option>
          <option value="Nutanix">Nutanix</option>
          <option value="Citrix">Citrix</option>
          <option value="Other">Other</option>
        </select>
        {errors.deploymentError && <span className="text-red-500 text-sm mt-1">{errors.deploymentError}</span>}
        {deploymentType === 'Other' && (
          <input
            type="text"
            value={otherDeployment}
            onChange={handleOtherDeploymentChange}
            placeholder="Specify Other Deployment"
            className="mt-2 p-3 border-2 border-purple-300 rounded-md focus:outline-none focus:border-purple-500"
          />
        )}
      </div>

      {/* Public IPs */}
      <div className="flex flex-col">
        <label htmlFor="publicIPs" className="text-purple-600 font-medium">Public IP Ranges (CIDR):</label>
        <input
          type="text"
          id="publicIPs"
          value={publicIPs}
          onChange={(e) => setPublicIPs(e.target.value)}
          placeholder="e.g., 192.168.0.0/24, 10.0.0.0/24"
          required
          className="mt-2 p-3 border-2 border-purple-300 rounded-md focus:outline-none focus:border-purple-500"
        />
        {errors.ipError && <span className="text-red-500 text-sm mt-1">{errors.ipError}</span>}
      </div>

      {/* Submit Button */}
      <button
        onClick={validateForm}
        className="w-full py-3 bg-purple-600 text-white rounded-md hover:bg-purple-500"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
