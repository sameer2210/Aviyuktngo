import { ChevronDownIcon } from '@heroicons/react/solid';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { useRef, useState } from 'react';
import axios from '../instant/axios';
import SkeletonImage from '../Components/SkeletonImage';

const faqs = [
  {
    question: 'How is my donation used?',
    answer: 'Your donation directly supports the cause you select, ensuring maximum impact.',
  },
  {
    question: 'Is my donation tax-deductible?',
    answer: 'Yes, all donations are eligible for tax deductions under Section 80G.',
  },
  {
    question: 'Can I donate anonymously?',
    answer: 'Absolutely! You can choose to keep your identity confidential.',
  },
];

const Highlights = () => {
  const receiptRef = useRef(null);
  const [formType, setFormType] = useState('donor');
  const [form, setForm] = useState({
    amount: '',
    name: '',
    email: '',
    adhar: '',
    address: '',
    occupation: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    gender: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [paymentMessage, setPaymentMessage] = useState({ type: '', text: '' });
  const [paymentClip, setPaymentClip] = useState(null);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [isDownloadingReceipt, setIsDownloadingReceipt] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!form.name.trim()) {
      errors.name = 'Name is required.';
      isValid = false;
    }
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = 'Valid email is required.';
      isValid = false;
    }
    if (!form.adhar || form.adhar.length !== 12) {
      errors.adhar = 'Aadhar must be 12 digits.';
      isValid = false;
    }

    if (formType === 'donor') {
      if (!form.amount || Number(form.amount) <= 0) {
        errors.amount = 'Donation amount must be more than 0.';
        isValid = false;
      }
      if (!form.address.trim()) {
        errors.address = 'Address is required.';
        isValid = false;
      }
    }

    if (formType === 'member') {
      if (!form.occupation.trim()) {
        errors.occupation = 'Occupation is required.';
        isValid = false;
      }
      if (!form.street.trim()) {
        errors.street = 'Street is required.';
        isValid = false;
      }
      if (!form.city.trim()) {
        errors.city = 'City is required.';
        isValid = false;
      }
      if (!form.state.trim()) {
        errors.state = 'State is required.';
        isValid = false;
      }
      if (!form.pincode || form.pincode.length !== 6) {
        errors.pincode = 'Pincode must be 6 digits.';
        isValid = false;
      }
      if (!form.gender.trim()) {
        errors.gender = 'Gender is required.';
        isValid = false;
      }
    }

    setFormErrors(errors);
    return isValid;
  };

  const loadRazorpayScript = () =>
    new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => reject(false);
      document.body.appendChild(script);
    });

  const handleSubmit = async e => {
    e.preventDefault();
    setPaymentMessage({ type: '', text: '' });

    if (!validateForm()) return;

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      setPaymentMessage({ type: 'error', text: 'Razorpay SDK failed to load.' });
      return;
    }

    try {
      const payload = {
        ...form,
        amount: formType === 'member' ? 1200 : form.amount,
        formType,
      };

      const res = await axios.post('/razorpay/paymentcreate', payload);
      const { id, amount, currency } = res.data.order;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID?.trim(),
        amount: amount.toString(),
        currency,
        name: 'Aviyukt NGO',
        description: formType === 'member' ? 'Membership Payment' : 'Donation Payment',
        image: '/logo.png',
        order_id: id,
        handler: async function (response) {
          try {
            await axios.post('/razorpay/paymentverify', {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            });

            setPaymentClip({
              ...payload,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              message: '✅ Payment successful!',
            });

            setPaymentMessage({ type: 'success', text: '✅ Payment verified successfully!' });
          } catch {
            setPaymentMessage({ type: 'error', text: '❌ Payment verification failed.' });
          }
        },
        prefill: {
          name: form.name,
          email: form.email,
          contact: '0000000000',
        },
        notes: {
          address: form.address || `${form.street}, ${form.city}, ${form.state}, ${form.pincode}`,
          occupation: form.occupation || '',
          gender: form.gender || '',
        },
        theme: {
          color: '#225ca3',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      setPaymentMessage({ type: 'error', text: '❌ Payment creation failed.' });
    }
  };

  const toggleForm = type => {
    setFormType(type);
    setFormErrors({});
    setPaymentClip(null);
    setPaymentMessage({ type: '', text: '' });
    setForm({
      amount: type === 'member' ? '1200' : '',
      name: '',
      email: '',
      adhar: '',
      address: '',
      occupation: '',
      street: '',
      city: '',
      state: '',
      pincode: '',
      gender: '',
    });
  };

  const handleDownloadReceipt = async () => {
    if (!receiptRef.current || !paymentClip) return;
    setIsDownloadingReceipt(true);

    try {
      const receiptElement = receiptRef.current;

      const canvas = await html2canvas(receiptElement, {
        scale: Math.max(window.devicePixelRatio || 1, 2),
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        onclone: clonedDocument => {
          // Hide download button in PDF
          const clonedEl = clonedDocument.getElementById('aviyukt-receipt');
          if (clonedEl) {
            const btn = clonedEl.querySelector('#receipt-download-btn');
            if (btn) btn.style.display = 'none';
          }
        },
      });

      const imageData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const scale = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
      const renderWidth = canvas.width * scale;
      const renderHeight = canvas.height * scale;
      const x = (pageWidth - renderWidth) / 2;
      const y = (pageHeight - renderHeight) / 2;

      pdf.addImage(imageData, 'PNG', x, y, renderWidth, renderHeight, undefined, 'FAST');
      pdf.save(`aviyukt-receipt-${paymentClip.orderId || Date.now()}.pdf`);
    } catch (error) {
      console.error('Receipt download error:', error);
      setPaymentMessage({ type: 'error', text: '❌ Failed to generate receipt PDF.' });
    } finally {
      setIsDownloadingReceipt(false);
    }
  };

  const receiptRows = paymentClip
    ? [
        { label: 'Full Name', value: paymentClip.name },
        { label: 'Email Address', value: paymentClip.email },
        { label: 'Aadhar Number', value: paymentClip.adhar },
        ...(formType === 'donor'
          ? [{ label: 'Address', value: paymentClip.address }]
          : [
              { label: 'Occupation', value: paymentClip.occupation },
              { label: 'Gender', value: paymentClip.gender },
              {
                label: 'Address',
                value: `${paymentClip.street}, ${paymentClip.city}, ${paymentClip.state} - ${paymentClip.pincode}`,
              },
            ]),
        { label: 'Payment ID', value: paymentClip.paymentId },
        { label: 'Order ID', value: paymentClip.orderId },
      ]
    : [];

  return (
    <div className="bg-gray-50 font-sans min-h-screen">
      {/* Hero */}
      <div className="relative w-full min-h-[60vh] text-white text-center flex flex-col justify-center items-center">
        <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dyvccryuz/image/upload/v1746259324/about_tayim0.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 p-6">
          <h1 className="text-5xl font-serif mb-5">Donate Us</h1>
          <p className="text-lg w-[50%] text-center mx-auto">
            Your small contribution can bring a big change. Support our cause and help transform
            lives through kindness, education, and hope. Every donation counts. Together, we make a
            difference.
          </p>
        </div>
      </div>

      {/* Toggle */}
      <div className="flex justify-center gap-4 mt-10">
        <button
          className={`px-6 py-2 rounded ${
            formType === 'donor' ? 'bg-[#335288] text-white' : 'bg-gray-200'
          }`}
          onClick={() => toggleForm('donor')}
        >
          Donate
        </button>
        <button
          className={`px-6 py-2 rounded ${
            formType === 'member' ? 'bg-[#335288] text-white' : 'bg-gray-200'
          }`}
          onClick={() => toggleForm('member')}
        >
          Become a Member
        </button>
      </div>

      {/* Form */}
      <div className="max-w-lg mx-auto py-8 mt-8 mb-[10vh] bg-white p-6 rounded shadow">
        <h2 className="text-xl font-serif mb-6 text-center text-[#335288]">
          {formType === 'donor' ? 'Donation Form' : 'Membership Form'}
        </h2>

        {!paymentClip ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-zinc-400 outline-none px-3 py-2 rounded"
            />
            {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-zinc-400 outline-none px-3 py-2 rounded"
            />
            {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}

            <input
              type="text"
              name="adhar"
              placeholder="Aadhar Number"
              maxLength={12}
              value={form.adhar}
              onChange={handleChange}
              className="w-full border border-zinc-400 outline-none px-3 py-2 rounded"
            />
            {formErrors.adhar && <p className="text-red-500 text-sm">{formErrors.adhar}</p>}

            {formType === 'member' && (
              <>
                <input
                  type="text"
                  name="occupation"
                  placeholder="Occupation"
                  value={form.occupation}
                  onChange={handleChange}
                  className="w-full border border-zinc-400 outline-none px-3 py-2 rounded"
                />
                {formErrors.occupation && (
                  <p className="text-red-500 text-sm">{formErrors.occupation}</p>
                )}

                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="w-full border border-zinc-400 outline-none px-3 py-2 rounded"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {formErrors.gender && <p className="text-red-500 text-sm">{formErrors.gender}</p>}

                <input
                  type="text"
                  name="street"
                  placeholder="Street"
                  value={form.street}
                  onChange={handleChange}
                  className="w-full border border-zinc-400 outline-none px-3 py-2 rounded"
                />
                {formErrors.street && <p className="text-red-500 text-sm">{formErrors.street}</p>}

                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full border border-zinc-400 outline-none px-3 py-2 rounded"
                />
                {formErrors.city && <p className="text-red-500 text-sm">{formErrors.city}</p>}

                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={form.state}
                  onChange={handleChange}
                  className="w-full border border-zinc-400 outline-none px-3 py-2 rounded"
                />
                {formErrors.state && <p className="text-red-500 text-sm">{formErrors.state}</p>}

                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={form.pincode}
                  maxLength={6}
                  onChange={handleChange}
                  className="w-full border border-zinc-400 outline-none px-3 py-2 rounded"
                />
                {formErrors.pincode && <p className="text-red-500 text-sm">{formErrors.pincode}</p>}
              </>
            )}

            {formType === 'donor' && (
              <textarea
                name="address"
                placeholder="Full Address"
                value={form.address}
                onChange={handleChange}
                className="w-full border border-zinc-400 outline-none px-3 py-2 rounded"
              />
            )}
            {formType === 'donor' && formErrors.address && (
              <p className="text-red-500 text-sm">{formErrors.address}</p>
            )}

            {formType === 'donor' && (
              <>
                <input
                  type="number"
                  name="amount"
                  placeholder="Donation Amount"
                  value={form.amount}
                  onChange={handleChange}
                  className="w-full border border-zinc-400 outline-none px-3 py-2 rounded"
                />
                {formErrors.amount && <p className="text-red-500 text-sm">{formErrors.amount}</p>}
              </>
            )}

            <button
              type="submit"
              className="w-full bg-[#335288] hover:bg-transparent hover:text-[#335288] border border-[#335288] text-white font-semibold py-2 rounded"
            >
              Pay Now
            </button>
          </form>
        ) : (
          <>
            {/* ── Receipt (captured by html2canvas) ── */}
            <div
              id="aviyukt-receipt"
              ref={receiptRef}
              style={{ fontFamily: 'Georgia, serif', backgroundColor: '#ffffff', color: '#1a1a2e' }}
              className="max-w-xl mx-auto"
            >
              {/* Top accent bar */}
              <div
                style={{ height: '6px', backgroundColor: '#335288', borderRadius: '6px 6px 0 0' }}
              />

              <div style={{ padding: '24px 32px' }}>
                {/* Header: logo + org name */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '20px',
                  }}
                >
                  <SkeletonImage
                    src="https://res.cloudinary.com/dyvccryuz/image/upload/v1746258864/My%20Brand/logo_jo4h7x.png"
                    alt="Aviyukt Logo"
                    crossOrigin="anonymous"
                    style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                  />
                  <div style={{ textAlign: 'right' }}>
                    <p
                      style={{
                        fontSize: '18px',
                        fontWeight: '700',
                        color: '#335288',
                        margin: 0,
                        fontFamily: 'Georgia, serif',
                      }}
                    >
                      AVIYUKT NGO
                    </p>
                    <p
                      style={{
                        fontSize: '11px',
                        color: '#94a3b8',
                        margin: '3px 0 0',
                        fontFamily: 'sans-serif',
                      }}
                    >
                      Empowering Lives, Spreading Hope
                    </p>
                  </div>
                </div>

                {/* Title band */}
                <div
                  style={{
                    backgroundColor: '#335288',
                    borderRadius: '6px',
                    padding: '8px 16px',
                    marginBottom: '20px',
                    textAlign: 'center',
                  }}
                >
                  <p
                    style={{
                      color: '#ffffff',
                      fontSize: '13px',
                      fontWeight: '700',
                      letterSpacing: '1.5px',
                      margin: 0,
                      fontFamily: 'sans-serif',
                    }}
                  >
                    {formType === 'donor' ? 'DONATION RECEIPT' : 'MEMBERSHIP CERTIFICATE'}
                  </p>
                </div>

                {/* Success badge */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    marginBottom: '20px',
                  }}
                >
                  <div
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      backgroundColor: '#d1fae5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M2 7l3.5 3.5L12 3.5"
                        stroke="#065f46"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p
                    style={{
                      color: '#065f46',
                      fontWeight: '600',
                      fontSize: '13px',
                      margin: 0,
                      fontFamily: 'sans-serif',
                    }}
                  >
                    Payment Successful
                  </p>
                </div>

                {/* Details table */}
                <div
                  style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    marginBottom: '16px',
                  }}
                >
                  {receiptRows.map((row, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        borderBottom: i < receiptRows.length - 1 ? '1px solid #f1f5f9' : 'none',
                        backgroundColor: i % 2 === 0 ? '#f8fafc' : '#ffffff',
                      }}
                    >
                      <div
                        style={{
                          width: '38%',
                          padding: '9px 14px',
                          fontSize: '12px',
                          color: '#64748b',
                          fontFamily: 'sans-serif',
                          flexShrink: 0,
                        }}
                      >
                        {row.label}
                      </div>
                      <div
                        style={{
                          width: '62%',
                          padding: '9px 14px',
                          fontSize: '12px',
                          color: '#1e293b',
                          fontFamily: 'sans-serif',
                          fontWeight: '600',
                          wordBreak: 'break-all',
                        }}
                      >
                        {row.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Amount highlight */}
                <div
                  style={{
                    backgroundColor: '#eff6ff',
                    border: '1px solid #bfdbfe',
                    borderRadius: '8px',
                    padding: '14px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px',
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: '13px',
                      color: '#1e40af',
                      fontFamily: 'sans-serif',
                    }}
                  >
                    {formType === 'donor' ? 'Donation Amount' : 'Membership Fee'}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: '22px',
                      fontWeight: '700',
                      color: '#1d4ed8',
                      fontFamily: 'sans-serif',
                    }}
                  >
                    ₹{paymentClip.amount}
                  </p>
                </div>

                {/* Tax registration numbers */}
                <div
                  style={{
                    borderTop: '1px dashed #cbd5e1',
                    paddingTop: '12px',
                    marginBottom: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <p
                      style={{
                        margin: '0 0 3px',
                        fontSize: '10px',
                        color: '#94a3b8',
                        fontFamily: 'sans-serif',
                      }}
                    >
                      12AB Registration
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#334155',
                        fontFamily: 'sans-serif',
                      }}
                    >
                      AAPAA3852N23BP01
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p
                      style={{
                        margin: '0 0 3px',
                        fontSize: '10px',
                        color: '#94a3b8',
                        fontFamily: 'sans-serif',
                      }}
                    >
                      80G Registration
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#334155',
                        fontFamily: 'sans-serif',
                      }}
                    >
                      AAPAA3852N23BP02
                    </p>
                  </div>
                </div>

                {/* Footer note */}
                <p
                  style={{
                    textAlign: 'center',
                    fontSize: '10px',
                    color: '#94a3b8',
                    fontFamily: 'sans-serif',
                    margin: 0,
                    lineHeight: '1.6',
                  }}
                >
                  This receipt is computer-generated and valid for tax deduction under Section 80G.
                  <br />
                  Thank you for your generous support — Aviyukt NGO.
                </p>
              </div>

              {/* Bottom accent bar */}
              <div
                style={{ height: '4px', backgroundColor: '#5b8dee', borderRadius: '0 0 6px 6px' }}
              />

              {/* Download button — hidden in PDF via onclone */}
              <div
                id="receipt-download-btn"
                style={{ display: 'flex', justifyContent: 'center', padding: '20px 0 4px' }}
              >
                <button
                  onClick={handleDownloadReceipt}
                  disabled={isDownloadingReceipt}
                  className={`bg-[#335288] text-white px-6 py-2 rounded-md text-sm font-medium shadow transition ${
                    isDownloadingReceipt ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-500'
                  }`}
                >
                  {isDownloadingReceipt ? 'Preparing PDF...' : 'Download Receipt'}
                </button>
              </div>
            </div>
          </>
        )}

        {paymentMessage.text && (
          <p
            className={`mt-4 p-2 rounded text-sm ${
              paymentMessage.type === 'success'
                ? 'bg-green-200 text-green-800'
                : 'bg-red-200 text-red-800'
            }`}
          >
            {paymentMessage.text}
          </p>
        )}
      </div>

      {/* FAQ Section */}
      <div className="py-12 px-4 sm:px-10 md:px-20 bg-white">
        <h2 className="text-3xl font-serif text-center text-[#335288] mb-8">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 py-4">
              <button
                className="w-full flex justify-between items-center text-left text-lg font-medium text-[#335288] focus:outline-none"
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              >
                {faq.question}
                <ChevronDownIcon
                  className={`h-5 w-5 transform transition-transform duration-300 ${
                    openFAQ === index ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </button>
              {openFAQ === index && <p className="mt-2 text-gray-600">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Highlights;

