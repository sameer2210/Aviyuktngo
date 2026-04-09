import { motion } from 'framer-motion';
import SkeletonImage from '../SkeletonImage';

// Placeholder images representing "documents" as requested
const documents = [
   'https://res.cloudinary.com/dc2geexnf/image/upload/v1775764147/Screenshot_2026-04-10_010930_mi0owu.png',
  'https://res.cloudinary.com/dc2geexnf/image/upload/v1775764148/Screenshot_2026-04-10_010309_vj00le.png',
  'https://res.cloudinary.com/dc2geexnf/image/upload/v1775764146/Screenshot_2026-04-10_010853_eygthz.png',
  'https://images.unsplash.com/photo-1554224154-26032ffc0d07?q=80&w=2626&auto=format&fit=crop',
];

const documentsData = [
  {
    title: "REGISTRATION & IDENTITY",
    content: (
      <>
        <p className="mb-2"><strong>Name:</strong> Aviyukt Samaj Sevi Sansthan</p>
        <p className="mb-2"><strong>Type of NGO:</strong> Registered Society (Non-Government)</p>
        <p className="mb-2"><strong>Registration Number:</strong> 01/01/01/39567/2023 (under Societies Registration Act XXI of 1973)</p>
        <p className="mb-2"><strong>Date of Registration:</strong> 25/03/2023</p>
        <p><strong>Status of the organization:</strong> All India</p>
      </>
    ),
    image: documents[0]
  },
  {
    title: "TAX EXEMPTIONS & COMPLIANCE",
    content: (
      <>
        <p className="mb-2"><strong>PAN Number:</strong> AAPAA3852NP</p>
        <p className="mb-2"><strong>TAN:</strong> BPLA20243G</p>
        <p className="mb-2"><strong>Income Tax Exemption:</strong> Exempted under 12A/80 G of Income Tax Act (Approved)</p>
        <p className="mb-2"><strong>NITI AAYOG Registration:</strong> MP/2023/0344738</p>
        <p><strong>CSR-1:</strong> CSR00096744</p>
      </>
    ),
    image: documents[1]
  },
  {
    title: "UDYAM REGISTRATION",
    content: (
      <>
        <p className="mb-2"><strong>Udyam Registration Number:</strong> UDYAM-MP-10-0080776</p>
        <p className="mb-2"><strong>Date of Udyam Registration:</strong> 24/04/2024</p>
        <p className="mb-2"><strong>Classification:</strong> Micro Enterprise (Services)</p>
        <p className="mb-2"><strong>Registered Unit:</strong> H.NO. 122, Naveen Nagar colony, Aish bag, Bhopal 462010</p>
        <p><strong>NIC Code:</strong> 63999 - Other information service activities n.e.c.</p>
      </>
    ),
    image: documents[2]
  },
  {
    title: "HEAD OFFICE & LEADERSHIP",
    content: (
      <>
        <p className="mb-2"><strong>Head Office:</strong> 122, Naveen Nagar, Aish Bag, Distt- Bhopal (M.P) 462010</p>
        <p className="mb-2"><strong>President:</strong> Narain kumar Shrivastava</p>
        <p className="mb-2"><strong>Secretary:</strong> Brijesh Pratap Singh | <strong>Treasurer:</strong> Smt. Sapna Shrivastava</p>
        <p className="mb-2"><strong>Email:</strong> nkshrivastava113@gmail.com</p>
        <p><strong>Website:</strong> www.aviyuktngo.org</p>
      </>
    ),
    image: documents[3]
  }
];

const TransparencySection = () => {
  return (
    <section className="bg-white text-black font-sans pb-4">
      <div className="py-20 max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12">
        <h2 className="text-center text-xl md:text-3xl font-bold uppercase tracking-[0.1em] mb-12">
          Legal Status of Organization
        </h2>
        <p className="text-center text-gray-500 max-w-3xl mx-auto mb-16 text-sm md:text-base leading-relaxed">
          Organization is working for the holistic development of the community for last 03 years,
          and has a legal identity to work with &amp; for the community in India.
        </p>

        <div className="border-t border-gray-300">
          {documentsData.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              key={index}
              className="flex flex-col md:flex-row border-b border-gray-300 group"
            >

              {/* Left text section */}
              <div className="w-full md:w-1/2 p-8 md:p-16 lg:p-24 flex flex-col items-start bg-transparent transition-colors duration-500 group-hover:bg-gray-50/50">
                <span className="text-[11px] md:text-xs font-semibold tracking-[0.2em] uppercase mb-16 flex items-center gap-3">
                  <span className="text-gray-300">[</span>
                  <span className="text-gray-900 transition-colors duration-300 hover:text-gray-500 cursor-pointer">VIEW DOCUMENT</span>
                  <span className="text-gray-300">]</span>
                </span>

                <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tighter mb-8 text-black" style={{ letterSpacing: '-0.02em' }}>
                  {item.title}
                </h3>

                <div className="text-gray-600 text-sm md:text-base leading-loose font-light">
                  {item.content}
                </div>
              </div>

              {/* Right image section */}
              <div className="w-full md:w-1/2 min-h-[400px] md:min-h-full overflow-hidden border-l border-transparent md:border-gray-200">
                <SkeletonImage
                  src={item.image}
                  alt={item.title}
                  wrapperClassName="w-full h-full"
                  className="w-full h-[400px] md:h-full object-cover filter grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                />
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TransparencySection;
