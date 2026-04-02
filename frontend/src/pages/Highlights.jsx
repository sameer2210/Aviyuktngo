import React, { useState } from "react";
import axios from "../instant/axios";
import { ChevronDownIcon } from "@heroicons/react/solid";

// FAQs
const faqs = [
  {
    question: "How is my donation used?",
    answer: "Your donation directly supports the cause you select, ensuring maximum impact.",
  },
  {
    question: "Is my donation tax-deductible?",
    answer: "Yes, all donations are eligible for tax deductions under Section 80G.",
  },
  {
    question: "Can I donate anonymously?",
    answer: "Absolutely! You can choose to keep your identity confidential.",
  },
];

const Highlights = () => {
  
  const [formType, setFormType] = useState("donor");
  const [form, setForm] = useState({
    amount: "",
    name: "",
    email: "",
    adhar: "",
    address: "",
    occupation: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    gender: "",
  });
console.log(import.meta.env.VITE_RAZORPAY_KEY_ID)

  const [formErrors, setFormErrors] = useState({});
  const [paymentMessage, setPaymentMessage] = useState({ type: "", text: "" });
  const [paymentClip, setPaymentClip] = useState(null);
  const [openFAQ, setOpenFAQ] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!form.name.trim()) {
      errors.name = "Name is required.";
      isValid = false;
    }
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "Valid email is required.";
      isValid = false;
    }
    if (!form.adhar || form.adhar.length !== 12) {
      errors.adhar = "Aadhar must be 12 digits.";
      isValid = false;
    }

    if (formType === "donor") {
      if (!form.amount || Number(form.amount) <= 0) {
        errors.amount = "Donation amount must be more than 0.";
        isValid = false;
      }
      if (!form.address.trim()) {
        errors.address = "Address is required.";
        isValid = false;
      }
    }

    if (formType === "member") {
      if (!form.occupation.trim()) {
        errors.occupation = "Occupation is required.";
        isValid = false;
      }
      if (!form.street.trim()) {
        errors.street = "Street is required.";
        isValid = false;
      }
      if (!form.city.trim()) {
        errors.city = "City is required.";
        isValid = false;
      }
      if (!form.state.trim()) {
        errors.state = "State is required.";
        isValid = false;
      }
      if (!form.pincode || form.pincode.length !== 6) {
        errors.pincode = "Pincode must be 6 digits.";
        isValid = false;
      }
      if (!form.gender.trim()) {
        errors.gender = "Gender is required.";
        isValid = false;
      }
    }

    setFormErrors(errors);
    return isValid;
  };

  const loadRazorpayScript = () =>
    new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => reject(false);
      document.body.appendChild(script);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPaymentMessage({ type: "", text: "" });

    if (!validateForm()) return;

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      setPaymentMessage({ type: "error", text: "Razorpay SDK failed to load." });
      return;
    }

    try {
      const payload = {
        ...form,
        amount: formType === "member" ? 1200 : form.amount,
        formType,
      };

      const res = await axios.post("/razorpay/paymentcreate", payload);
      const { id, amount, currency } = res.data.order;

      
      

      const options = {
        key:import.meta.env.VITE_RAZORPAY_KEY_ID?.trim(),
        amount: amount.toString(),
        currency,
        name: "Aviyukt NGO",
        description: formType === "member" ? "Membership Payment" : "Donation Payment",
        image: "/logo.png",
        order_id: id,
        handler: async function (response) {
          try {
            const res= await axios.post("/razorpay/paymentverify", {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            });

            console.log(res.data);
            setPaymentClip({
              ...payload,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              message: "✅ Payment successful!",
            });

            setPaymentMessage({ type: "success", text: "✅ Payment verified successfully!" });
          } catch {
            setPaymentMessage({ type: "error", text: "❌ Payment verification failed." });
          }
        },
        prefill: {
          name: form.name,
          email: form.email,
          contact: "0000000000",
        },
        notes: {
          address: form.address || `${form.street}, ${form.city}, ${form.state}, ${form.pincode}`,
          occupation: form.occupation || "",
          gender: form.gender || "",
        },
        theme: {
          color: "#225ca3",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      setPaymentMessage({ type: "error", text: "❌ Payment creation failed." });
    }
  };

  const toggleForm = (type) => {
    setFormType(type);
    setFormErrors({});
    setPaymentClip(null);
    setPaymentMessage({ type: "", text: "" });
    setForm({
      amount: type === "member" ? "1200" : "",
      name: "",
      email: "",
      adhar: "",
      address: "",
      occupation: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
      gender: "",
    });
  };

  return (
    <div className="bg-gray-50 font-sans min-h-screen">
      {/* Hero */}
      <div className="relative w-full min-h-[60vh] text-white text-center flex flex-col justify-center items-center">
        <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dyvccryuz/image/upload/v1746259324/about_tayim0.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 p-6">
          <h1 className="text-5xl font-serif mb-5">Donate Us</h1>
          <p className="text-lg w-[50%] text-center mx-auto">Your small contribution can bring a big change. Support our cause and help transform lives through kindness, education, and hope. Every donation counts. Together, we make a difference.</p>
        </div>
      </div>
      

      {/* Toggle */}
      <div className="flex justify-center gap-4 mt-10">
        <button
          className={`px-6 py-2 rounded ${formType === "donor" ? "bg-[#335288] text-white" : "bg-gray-200"
            }`}
          onClick={() => toggleForm("donor")}
        >
          Donate
        </button>
        <button
          className={`px-6 py-2 rounded ${formType === "member" ? "bg-[#335288] text-white" : "bg-gray-200"
            }`}
          onClick={() => toggleForm("member")}
        >
          Become a Member
        </button>
      </div>

      {/* Form */}
      <div className="max-w-lg mx-auto py-8 mt-8 mb-[10vh] bg-white p-6 rounded shadow">
        <h2 className="text-xl font-serif mb-6 text-center text-[#335288]">
          {formType === "donor" ? "Donation Form" : "Membership Form"}
        </h2>

        {!paymentClip ? (
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Common Fields */}
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border-1 border-zinc-400 outline-none px-3 py-2 rounded"
            />
            {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border-1 border-zinc-400 outline-none px-3 py-2 rounded"
            />
            {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}

            <input
              type="text"
              name="adhar"
              placeholder="Aadhar Number"
              maxLength={12}
              value={form.adhar}
              onChange={handleChange}
              className="w-full border-1 border-zinc-400 outline-none px-3 py-2 rounded"
            />

            {formErrors.adhar && <p className="text-red-500 text-sm">{formErrors.adhar}</p>}
            {formType === "member" && (
              <>
                <input
                  type="text"
                  name="occupation"
                  placeholder="Occupation"
                  value={form.occupation}
                  onChange={handleChange}
                  className="w-full border-1 border-zinc-400 outline-none px-3 py-2 rounded"
                />
                {formErrors.occupation && <p className="text-red-500 text-sm">{formErrors.occupation}</p>}

                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="w-full border-1 border-zinc-400 outline-none px-3 py-2 rounded"
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
                  className="w-full border-1 border-zinc-400 outline-none px-3 py-2 rounded"
                />
                {formErrors.street && <p className="text-red-500 text-sm">{formErrors.street}</p>}

                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full border-1 border-zinc-400 outline-none px-3 py-2 rounded"
                />
                {formErrors.city && <p className="text-red-500 text-sm">{formErrors.city}</p>}

                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={form.state}
                  onChange={handleChange}
                  className="w-full border-1 border-zinc-400 outline-none px-3 py-2 rounded"
                />
                {formErrors.state && <p className="text-red-500 text-sm">{formErrors.state}</p>}

                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={form.pincode}
                  maxLength={6}
                  onChange={handleChange}
                  className="w-full border-1 border-zinc-400 outline-none px-3 py-2 rounded"
                />
                {formErrors.pincode && <p className="text-red-500 text-sm">{formErrors.pincode}</p>}


              </>
            )}



            {formType === "donor" && (
              <textarea
                name="address"
                placeholder="Full Address"
                value={form.address}
                onChange={handleChange}
                className="w-full border-1 border-zinc-400 outline-none px-3 py-2 rounded"
              />
            )}

            {formType === "donor" && (
              <>
                <input
                  type="number"
                  name="amount"
                  placeholder="Donation Amount"
                  value={form.amount}
                  onChange={handleChange}
                  className="w-full border-1 border-zinc-400 outline-none px-3 py-2 rounded"
                />
                {formErrors.amount && <p className="text-red-500 text-sm">{formErrors.amount}</p>}
              </>
            )}
            {formType === "donor" && formErrors.address && <p className="text-red-500 text-sm">{formErrors.address}</p>}

            <button
              type="submit"
              className="w-full bg-[#335288] hover:bg-transparent hover:text-[#335288] border-1 border-[#335288] text-white font-semibold py-2 rounded"
            >
              Pay Now
            </button>
          </form>
        ) : (
          <div className="bg-white p-6 rounded-xl shadow-md text-gray-800 max-w-xl mx-auto font-sans relative border border-gray-200">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <img className="w-24" src="https://res.cloudinary.com/dyvccryuz/image/upload/v1746258864/My%20Brand/logo_jo4h7x.png" alt="Logo" />
          </div>
        
          {/* Message */}
          <h3 className="text-lg font-bold mb-3 text-center">{paymentClip.message}</h3>
        
          {/* Main Details */}
          <div className="space-y-1 text-sm">
            <p><b>Name:</b> {paymentClip.name}</p>
            <p><b>Email:</b> {paymentClip.email}</p>
            <p><b>Amount:</b> ₹{paymentClip.amount}</p>
            <p><b>Aadhar:</b> {paymentClip.adhar}</p>
        
            {formType === "donor" ? (
              <p><b>Address:</b> {paymentClip.address}</p>
            ) : (
              <>
                <p><b>Occupation:</b> {paymentClip.occupation}</p>
                <p><b>Gender:</b> {paymentClip.gender}</p>
                <p><b>Street:</b> {paymentClip.street}</p>
                <p><b>City:</b> {paymentClip.city}</p>
                <p><b>State:</b> {paymentClip.state}</p>
                <p><b>Pincode:</b> {paymentClip.pincode}</p>
              </>
            )}
        
            <p><b>Payment ID:</b> {paymentClip.paymentId}</p>
            <p><b>Order ID:</b> {paymentClip.orderId}</p>
          </div>
        
          {/* Certificate Numbers */}
          <div className="border-t mt-4 pt-3 text-xs text-gray-600">
            <p><b>12AB:</b> AAPAA3852N23BP01</p>
            <p><b>80G:</b> AAPAA3852N23BP02</p>
          </div>
        
          {/* Download Button */}
          <div className="flex justify-center mt-5">
            <button
              onClick={() => window.print()}
              className="bg-[#335288] text-white px-5 py-2 rounded-md hover:bg-blue-400 transition text-sm font-medium shadow"
            >
              Download Receipt
            </button>
          </div>
        </div>
      
        )}

        {paymentMessage.text && (
          <p
            className={`mt-4 p-2 rounded text-sm ${paymentMessage.type === "success"
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
              }`}
          >
            {paymentMessage.text}
          </p>
        )}
      </div>
     
      {/* FAQ Section */}
      <div className="py-12 px-4 sm:px-10 md:px-20 bg-white">
        <h2 className="text-3xl font-serif text-center text-[#335288] mb-8">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 py-4">
              <button
                className="w-full flex justify-between items-center text-left text-lg font-medium text-[#335288] focus:outline-none"
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              >
                {faq.question}
                <ChevronDownIcon className={`h-5 w-5 transform transition-transform duration-300 ${openFAQ === index ? 'rotate-180' : 'rotate-0'}`} />
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
