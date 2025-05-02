import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductListPage from './pages/ProductListPage.tsx';
import CheckoutPage from './pages/CheckoutPage.tsx';
import SuccessPage from './pages/SuccessPage';
import ErrorPage from './pages/ErrorPage';
import TransactionsListPage from './pages/TransactionsListPage.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductListPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/transactions" element={<TransactionsListPage />} />
      </Routes>
    </Router>
  );
}

export default App;