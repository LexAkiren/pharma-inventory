import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import DrugForm from './components/DrugForm';
import DrugTable from './components/DrugTable';
import FilterDropdown from './components/FilterDropdown';
import CartPage from './components/CartPage';

const API = 'http://localhost/pharma-backend';

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const [login, setLogin] = useState({ username: '', password: '' });
  const [drugs, setDrugs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editCache, setEditCache] = useState({});
  const [newDrug, setNewDrug] = useState({ name: '', quantity: '', price: '' });
  const [selectedDrug, setSelectedDrug] = useState('');
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (user) fetchDrugs();
  }, [user]);

  const fetchDrugs = () => {
    fetch(`${API}/drugs.php`)
      .then(res => res.json())
      .then(data => {
        const updated = data.map(d => ({ ...d, originalQuantity: d.quantity }));
        setDrugs(updated);
      })
      .catch(() => alert('Failed to fetch drugs'));
  };

  const handleLogin = () => {
    fetch(`${API}/auth.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(login)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          localStorage.setItem('user', JSON.stringify(data));
          setUser(data);
        } else alert('Login failed');
      });
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const handleEditChange = (id, field, value) => {
    setEditCache(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
  };

  const startEdit = (drug) => {
    setEditingId(drug.id);
    setEditCache({ [drug.id]: { ...drug } });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditCache({});
  };

  const saveEdit = (id) => {
    const updatedDrug = editCache[id];
    fetch(`${API}/drugs.php`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedDrug)
    }).then(() => {
      setEditingId(null);
      setEditCache({});
      fetchDrugs();
    });
  };

  const deleteDrug = (id) => {
    fetch(`${API}/drugs.php`, {
      method: 'DELETE',
      body: `id=${id}`
    }).then(fetchDrugs);
  };

  const handleNewDrugChange = (e) => {
    setNewDrug({ ...newDrug, [e.target.name]: e.target.value });
  };

  const addNewDrug = () => {
    if (!newDrug.name || !newDrug.quantity || !newDrug.price) {
      alert('Please fill in all fields');
      return;
    }

    fetch(`${API}/drugs.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newDrug)
    }).then(() => {
      setNewDrug({ name: '', quantity: '', price: '' });
      fetchDrugs();
    });
  };

  const confirmBuy = (drugId, quantity) => {
    const drug = drugs.find(d => d.id === drugId);
    if (!drug) return alert("Drug not found.");

    const existing = cart.find(item => item.id === drug.id);
    if (existing) {
      const updatedCart = cart.map(item =>
        item.id === drug.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...drug, quantity }]);
    }
  };

  const updateCartQty = (id, newQty) => {
    setCart(prev =>
      prev.map(item => item.id === id ? { ...item, quantity: newQty } : item)
    );
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const checkout = () => {
    Promise.all(
      cart.map(item =>
        fetch(`${API}/drugs.php`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...item,
            quantity: item.originalQuantity - item.quantity
          })
        })
      )
    ).then(() => {
      alert('Checkout successful!');
      setCart([]);
      fetchDrugs();
    });
  };

  const filteredDrugs = selectedDrug
    ? drugs.filter(d => d.name === selectedDrug)
    : drugs;

  return (
    <Router>
      <div className="App">
        {!user ? (
          <Login login={login} setLogin={setLogin} handleLogin={handleLogin} />
        ) : (
          <>
            <h2>Welcome, {user.username} ({user.role})</h2>
            <button onClick={handleLogout}>Logout</button>
            {user.role === 'guest' && (
              <Link to="/cart" style={{ marginLeft: '1rem' }}>
                🛒 View Cart ({cart.reduce((acc, item) => acc + item.quantity, 0)})
              </Link>
            )}

            <Routes>
              <Route
                path="/"
                element={
                  <>
                    {user.role === 'admin' && (
                      <DrugForm
                        newDrug={newDrug}
                        handleChange={handleNewDrugChange}
                        handleAdd={addNewDrug}
                      />
                    )}
                    <FilterDropdown
                      drugs={drugs}
                      selectedDrug={selectedDrug}
                      setSelectedDrug={setSelectedDrug}
                    />
                    <DrugTable
                    drugs={filteredDrugs}
                    user={user}
                    editingId={editingId}
                    editCache={editCache}
                    startEdit={startEdit}
                    handleEditChange={handleEditChange}
                    cancelEdit={cancelEdit}
                    saveEdit={saveEdit}
                    deleteDrug={deleteDrug}
                    confirmBuy={confirmBuy} 
                  />
                  </>
                }
              />
              <Route
                path="/cart"
                element={
                  <CartPage
                    cart={cart}
                    setCart={setCart}
                    updateCartQty={updateCartQty}
                    removeFromCart={removeFromCart}
                    checkout={checkout}
                  />
                }
              />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
