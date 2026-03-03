import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VendorDashboard.css';
import VendorOrders from './VendorOrders';
import VendorDrivers from './VendorDrivers';
import VendorMenu from './VendorMenu';
import VendorProfile from './VendorProfile';

const MOCK_ORDERS = [
    { id: 1001, customer: 'Thabo M.', items: ['Classic Smash x2', 'Loaded Fries x1'], total: 223, status: 'placed', time: '2 min ago' },
    { id: 1002, customer: 'Ayanda K.', items: ['Spicy Baron x1', 'Classic Shake x2'], total: 209, status: 'preparing', time: '8 min ago' },
    { id: 1003, customer: 'Sipho N.', items: ['Mushroom Melt x1', 'Onion Rings x1'], total: 134, status: 'assigned', time: '15 min ago' },
    { id: 1004, customer: 'Lerato P.', items: ['Classic Smash x3'], total: 267, status: 'delivered', time: '42 min ago' },
];

const MOCK_DRIVERS = [
    { id: 1, name: 'Sipho M.', vehicle: 'Motorcycle', rating: 4.9, status: 'available', deliveries: 12 },
    { id: 2, name: 'Ayanda K.', vehicle: 'Car', rating: 4.8, status: 'busy', deliveries: 8 },
    { id: 3, name: 'Thabo N.', vehicle: 'Bicycle', rating: 4.7, status: 'available', deliveries: 15 },
];

const MOCK_MENU = [
    { id: 101, name: 'Classic Smash', category: 'Signature Burgers', price: 89, emoji: '🍔' },
    { id: 102, name: 'Spicy Baron', category: 'Signature Burgers', price: 99, emoji: '🌶️' },
    { id: 103, name: 'Mushroom Melt', category: 'Signature Burgers', price: 95, emoji: '🍄' },
    { id: 104, name: 'Loaded Fries', category: 'Sides', price: 45, emoji: '🍟' },
    { id: 105, name: 'Onion Rings', category: 'Sides', price: 39, emoji: '🧅' },
    { id: 106, name: 'Classic Shake', category: 'Drinks', price: 55, emoji: '🥤' },
];

const STATUS_COLORS = {
    placed: 'os-placed', accepting: 'os-accepting', preparing: 'os-preparing',
    assigned: 'os-assigned', pickup: 'os-pickup', delivery: 'os-delivery', delivered: 'os-delivered',
};

const STATUS_LABELS = {
    placed: 'New Order', accepting: 'Accepted', preparing: 'Preparing',
    assigned: 'Driver Assigned', pickup: 'Picked Up', delivery: 'Out for Delivery', delivered: 'Delivered',
};

const NAV_ITEMS = [
    { key: 'dashboard', icon: '📊', label: 'Dashboard' },
    { key: 'orders', icon: '📋', label: 'Live Orders' },
    { key: 'menu', icon: '🍔', label: 'Menu' },
    { key: 'drivers', icon: '🛵', label: 'Drivers' },
    { key: 'profile', icon: '👤', label: 'Profile' },
];

export default function VendorDashboard() {
    const navigate = useNavigate();
    const [activePage, setActivePage] = useState('dashboard');
    const [isOpen, setIsOpen] = useState(true);
    const [orders, setOrders] = useState(MOCK_ORDERS);
    const [menu, setMenu] = useState(MOCK_MENU);

    const activeOrders = orders.filter(o => o.status !== 'delivered');
    const delivered = orders.filter(o => o.status === 'delivered');
    const revenue = delivered.reduce((s, o) => s + o.total, 0);

    const advanceOrder = (id) => {
        const STATUS_NEXT = {
            placed: 'accepting', accepting: 'preparing', preparing: 'assigned',
            assigned: 'pickup', pickup: 'delivery', delivery: 'delivered',
        };
        setOrders(prev => prev.map(o => {
            if (o.id !== id) return o;
            const next = STATUS_NEXT[o.status];
            return next ? { ...o, status: next } : o;
        }));
    };

    return (
        <div className="vd-layout">

            {/* SIDEBAR */}
            <aside className="vd-sidebar">
                <div className="vd-logo">LOCAL<span>FRANCHISE</span></div>
                <div className="vd-store-info">
                    <div className="vd-store-avatar">🍔</div>
                    <div className="vd-store-name">Burger Baron</div>
                    <div className="vd-store-role">// VENDOR DASHBOARD</div>
                </div>
                <nav className="vd-nav">
                    {NAV_ITEMS.map(item => (
                        <div
                            key={item.key}
                            className={`vd-nav-item ${activePage === item.key ? 'active' : ''}`}
                            onClick={() => setActivePage(item.key)}
                        >
                            <span className="vd-nav-icon">{item.icon}</span>
                            {item.label}
                        </div>
                    ))}
                </nav>
                <div className="vd-sidebar-footer">
                    <div className="vd-signout" onClick={() => navigate('/')}>
                        <span>🚪</span> Sign Out
                    </div>
                </div>
            </aside>

            {/* MAIN */}
            <main className="vd-main">

                {/* TOPBAR */}
                <div className="vd-topbar">
                    <div>
                        <div className="vd-page-title">{NAV_ITEMS.find(n => n.key === activePage)?.label}</div>
                        <div className="vd-page-sub">
                            {new Date().toLocaleDateString('en-ZA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                    </div>
                    <div className="vd-topbar-right">
                        <div
                            className={`vd-status-toggle ${isOpen ? 'open' : 'closed'}`}
                            onClick={() => setIsOpen(p => !p)}
                        >
                            <div className={`status-dot ${isOpen ? 'dot-green' : 'dot-red'}`}></div>
                            {isOpen ? 'Store Open' : 'Store Closed'}
                        </div>
                    </div>
                </div>

                {/* DASHBOARD PAGE — inline overview */}
                {activePage === 'dashboard' && (
                    <>
                        <div className="vd-stats">
                            <div className="stat-card">
                                <div className="stat-icon">💰</div>
                                <div className="stat-val">R{revenue}</div>
                                <div className="stat-label">Today's Revenue</div>
                                <div className="stat-change up">↑ 12% from yesterday</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">📋</div>
                                <div className="stat-val">{orders.length}</div>
                                <div className="stat-label">Total Orders</div>
                                <div className="stat-change up">↑ 3 new today</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">🔥</div>
                                <div className="stat-val">{activeOrders.length}</div>
                                <div className="stat-label">Active Orders</div>
                                <div className="stat-change">Live right now</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">✅</div>
                                <div className="stat-val">{delivered.length}</div>
                                <div className="stat-label">Delivered</div>
                                <div className="stat-change up">↑ 100% success rate</div>
                            </div>
                        </div>

                        <div className="vd-grid">
                            <div className="vd-card">
                                <div className="vd-card-header">
                                    <div className="vd-card-title">Recent Orders</div>
                                    <span className="vd-card-badge badge-live">● LIVE</span>
                                </div>
                                <div className="orders-table">
                                    {orders.slice(0, 3).map(order => (
                                        <div key={order.id} className="order-row">
                                            <div className="order-id">#{order.id}</div>
                                            <div>
                                                <div className="order-items">{order.customer}</div>
                                                <div className="order-items-sub">
                                                    {order.items[0]}{order.items.length > 1 ? ` +${order.items.length - 1} more` : ''}
                                                </div>
                                            </div>
                                            <div className="order-total">R{order.total}</div>
                                            <span className={`order-status ${STATUS_COLORS[order.status]}`}>
                        {STATUS_LABELS[order.status]}
                      </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="vd-card">
                                <div className="vd-card-header">
                                    <div className="vd-card-title">Drivers</div>
                                    <span className="vd-card-badge badge-info">
                    {MOCK_DRIVERS.filter(d => d.status === 'available').length} Available
                  </span>
                                </div>
                                <div className="drivers-list">
                                    {MOCK_DRIVERS.map(driver => (
                                        <div key={driver.id} className="driver-row">
                                            <div className="driver-avatar">🛵</div>
                                            <div className="driver-info">
                                                <div className="driver-name">{driver.name}</div>
                                                <div className="driver-meta">{driver.vehicle} · ⭐ {driver.rating}</div>
                                            </div>
                                            <span className={`driver-status ${driver.status === 'available' ? 'ds-available' : 'ds-busy'}`}>
                        {driver.status}
                      </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {activePage === 'orders' && <VendorOrders orders={orders} onAdvance={advanceOrder} />}
                {activePage === 'drivers' && <VendorDrivers drivers={MOCK_DRIVERS} />}
                {activePage === 'menu' && <VendorMenu menu={menu} onAdd={(item) => setMenu(prev => [...prev, { ...item, id: Date.now() }])} onEdit={(item) => alert(`Edit ${item.name} — coming soon!`)} />}
                {activePage === 'profile' && <VendorProfile />}

            </main>
        </div>
    );
}