
import Form from './components/Form/Form';
import { useAuth } from "react-oidc-context";

function App() {
  const auth = useAuth();

  const signOutRedirect = () => {
    const clientId = "67ofutr22ug4bbklq6dd00elh9";
    const logoutUri = "<logout uri>";
    const cognitoDomain = "https://eu-west-1xnfuvantz.auth.eu-west-1.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  if (auth.isLoading) {
    return <div className="text-xl text-center text-purple-600">Loading...</div>;
  }

  if (auth.error) {
    return <div className="text-xl text-center text-red-600">Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <div className="flex flex-col items-center p-8 bg-purple-100 min-h-screen">
        <h1 className="text-3xl font-semibold text-purple-700 mb-6">Customer Deployment Form</h1>
        <Form />
        <button 
          onClick={() => auth.removeUser()}
          className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-50">
      <button 
        onClick={() => auth.signinRedirect()}
        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 mb-4"
      >
        Sign in
      </button>
      <button 
        onClick={() => signOutRedirect()}
        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500"
      >
        Sign out
      </button>
    </div>
  );
}

export default App;
