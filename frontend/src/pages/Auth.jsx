import { Link } from 'react-router-dom';
import GoogleLogin from '../Components/Auth/GoogleLogin';

const Auth = () => {
  return (
    <main
      className="min-h-screen py-14 px-4 flex items-center justify-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(235,235,235,0.85), rgba(235,235,235,0.9)), url('https://images.unsplash.com/photo-1469571486292-b53601020cf8?q=80&w=1932&auto=format&fit=crop')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="w-full max-w-lg">
        <GoogleLogin />
        <p className="text-center text-sm text-gray-700 mt-5">
          <Link to="/" className="hover:underline">
            Back to Home
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Auth;
