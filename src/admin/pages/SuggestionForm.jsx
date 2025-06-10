import { useState } from 'react';
import axios from 'axios';

const SuggestionForm = () => {
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    name: '',
    email: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    try {
      await axios.post('https://admin.mesudar.com/api/suggestion/create', formData);
    //   await axios.post('http://localhost:3000/api/suggestion/create', formData);
      setSubmitSuccess(true);
      // Reset form
      setFormData({
        subject: '',
        message: '',
        name: '',
        email: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: error.response?.data?.message || 'Failed to submit suggestion'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-[550px] mx-auto bg-white rounded-lg border border-[#1f7333] p-6 my-[50px]">
      <h2 className="text-2xl font-bold text-[#1f7333] mb-4">Submit Your Suggestion</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="subject" className="block text-[18px] font-semibold text-gray-700 mb-1">
            Subject:
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:ring-1  focus:ring-[#1f7333] focus:border-[#1f7333] outline-none transition ${
              errors.subject ? 'border-red-500' : 'border-[#000]'
            }`}
            placeholder="What's your suggestion about?"
          />
          {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
        </div>
        
        <div>
          <label htmlFor="message" className="block text-[18px] font-semibold text-gray-700 mb-1">
             Message:
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className={`w-full px-3 py-2 border rounded-md focus:ring-1 border-[#000] focus:ring-[#1f7333] focus:border-[#1f7333] outline-none transition ${
              errors.message ? 'border-red-500' : 'border-[#000]'
            }`}
            placeholder="Please describe your suggestion in detail..."
          />
          {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="name" className="block text-[18px] font-semibold text-gray-700 mb-1">
              Your name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:ring-1 border-[#000] focus:ring-[#1f7333] focus:border-[#1f7333] outline-none transition ${
                errors.name ? 'border-red-500' : 'border-[#000]'
              }`}
              placeholder="Your full name"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-[18px] font-semibold text-gray-700 mb-1">
              Your email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:ring-1 border-[#000] focus:ring-[#1f7333] focus:border-[#1f7333] outline-none transition ${
                errors.email ? 'border-red-500' : 'border-[#000]'
              }`}
              placeholder="your@email.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>
        </div>

        {submitSuccess && (
          <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
            <p>Thank you! Your suggestion has been submitted successfully.</p>
          </div>
        )}

        {errors.submit && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
            <p>{errors.submit}</p>
          </div>
        )}
        
        <div className="flex items-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-fit m-auto py-3 px-6 bg-[#1f7333] hover:bg-[#89c497] text-white font-medium rounded-[50px] transition ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Suggestion'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SuggestionForm;