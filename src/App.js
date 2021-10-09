import { ApolloProvider } from '@apollo/client';
import Quacks from './components/Quacks';
import initApollo from './config/apollo';
import './index.css';
import createMirage from './mirage/config';

createMirage();
const apolloClient = initApollo();

function App() {
  return (
    <div>
      <div className="flex justify-center">
        <div className="md:w-full lg:w-200 bg-gray-100">
          <Quacks />
        </div>
      </div>
    </div>
  );
}

function AppWrapper() {
  return (
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  );
}

export default AppWrapper;
