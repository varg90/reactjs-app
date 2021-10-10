import { ApolloProvider } from '@apollo/client';
import Header from './components/Header';
import Quacks from './components/Quacks';
import SignInForm from './components/SignInForm';
import initApollo from './config/apollo';
import { ProvideAuth, useAuth } from './hooks/useAuth';
import './index.css';
import createMirage from './mirage/config';

createMirage();
const apolloClient = initApollo();

function App() {
  const auth = useAuth();
  return (
    <div>
      {auth.isAuthenticated && !auth.user ? (
        <div>Loading</div>
      ) : auth.user ? (
        <>
          <Header />
          <div className="flex justify-center mt-10">
            <div className="md:w-full lg:w-200 bg-gray-100">
              <Quacks />
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center">
          <div className="md:w-full lg:w-96">
            <div className="mt-10">
              <SignInForm />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AppWrapper() {
  return (
    <ApolloProvider client={apolloClient}>
      <ProvideAuth>
        <App />
      </ProvideAuth>
    </ApolloProvider>
  );
}

export default AppWrapper;
