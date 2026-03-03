import React, { useState } from 'react';
import AuthModal from './AuthModal';
import './LandingPage.css';

const STORES = [
    { id:1, name:"Burger Baron", emoji:"🍔", open:true, rating:4.8, deliveryTime:"15–25 min", distance:"0.8 km", categories:["Burgers","Fries","Drinks"], gradient:"linear-gradient(135deg,#0a1f35,#1a3a0a)", menu:{"Signature Burgers":[{id:101,name:"Classic Smash",desc:"Double smash patty, american cheese, pickles, house sauce",price:89,emoji:"🍔"},{id:102,name:"Spicy Baron",desc:"Jalapeño, ghost pepper mayo, crispy onions",price:99,emoji:"🌶️"},{id:103,name:"Mushroom Melt",desc:"Swiss cheese, sautéed mushrooms, truffle aioli",price:95,emoji:"🍄"}],"Sides":[{id:104,name:"Loaded Fries",desc:"Cheese sauce, jalapeños, crispy bits",price:45,emoji:"🍟"},{id:105,name:"Onion Rings",desc:"Beer-battered, ranch dip",price:39,emoji:"🧅"}],"Drinks":[{id:106,name:"Classic Shake",desc:"Vanilla, chocolate or strawberry",price:55,emoji:"🥤"}]} },
    { id:2, name:"Pizza Punk", emoji:"🍕", open:true, rating:4.6, deliveryTime:"20–35 min", distance:"1.2 km", categories:["Pizza","Pasta","Salads"], gradient:"linear-gradient(135deg,#0a1235,#1a0a2e)", menu:{"Pizzas":[{id:201,name:"Margherita Punk",desc:"San Marzano, fior di latte, fresh basil",price:129,emoji:"🍕"},{id:202,name:"Pepperoni Riot",desc:"Double pepperoni, honey, chili flakes",price:149,emoji:"🔥"},{id:203,name:"Veggie Anarchy",desc:"Roasted veg, pesto, goat cheese",price:139,emoji:"🌿"}],"Pasta":[{id:204,name:"Cacio e Pepe",desc:"Pecorino, black pepper, bucatini",price:95,emoji:"🍝"}]} },
    { id:3, name:"Sushi Wave", emoji:"🍣", open:false, rating:4.9, deliveryTime:"25–40 min", distance:"2.1 km", categories:["Sushi","Ramen","Sashimi"], gradient:"linear-gradient(135deg,#051828,#0a2030)", menu:{"Rolls":[{id:301,name:"Dragon Roll",desc:"Shrimp tempura, avocado, unagi glaze",price:185,emoji:"🍣"},{id:302,name:"Spicy Tuna",desc:"Fresh tuna, sriracha mayo, cucumber",price:165,emoji:"🌊"}],"Ramen":[{id:303,name:"Tonkotsu Bowl",desc:"Pork broth, chashu, soft egg, nori",price:145,emoji:"🍜"}]} },
    { id:4, name:"Taco Cartel", emoji:"🌮", open:true, rating:4.7, deliveryTime:"10–20 min", distance:"0.5 km", categories:["Tacos","Burritos","Quesadillas"], gradient:"linear-gradient(135deg,#0f1a08,#1a2a0a)", menu:{"Tacos":[{id:401,name:"Al Pastor",desc:"Marinated pork, pineapple, cilantro, onion",price:35,emoji:"🌮"},{id:402,name:"Birria",desc:"Braised beef, consomé, oaxaca cheese",price:45,emoji:"🥩"},{id:403,name:"Fish Taco",desc:"Beer-battered cod, slaw, chipotle crema",price:40,emoji:"🐟"}],"Extras":[{id:404,name:"Guacamole",desc:"Chunky, house-made, chips",price:55,emoji:"🥑"},{id:405,name:"Horchata",desc:"Cold rice milk, cinnamon",price:30,emoji:"🥛"}]} },
    { id:5, name:"Brew & Bite", emoji:"☕", open:true, rating:4.5, deliveryTime:"5–15 min", distance:"0.3 km", categories:["Coffee","Pastries","Sandwiches"], gradient:"linear-gradient(135deg,#0f1a28,#1a2535)", menu:{"Coffee":[{id:501,name:"Flat White",desc:"Double ristretto, micro-foam",price:45,emoji:"☕"},{id:502,name:"Oat Latte",desc:"Single origin, oat milk",price:52,emoji:"🌾"}],"Food":[{id:503,name:"Croissant",desc:"Butter, almond cream, flaky layers",price:35,emoji:"🥐"},{id:504,name:"Club Sandwich",desc:"Turkey, bacon, avo, pesto mayo",price:85,emoji:"🥪"}]} },
    { id:6, name:"Peri Palace", emoji:"🍗", open:true, rating:4.6, deliveryTime:"20–30 min", distance:"1.5 km", categories:["Grills","Burgers","Wings"], gradient:"linear-gradient(135deg,#1a1008,#2a1a05)", menu:{"Grills":[{id:601,name:"Peri Chicken",desc:"Half chicken, lemon herb or hot sauce, peri fries",price:159,emoji:"🍗"},{id:602,name:"Chicken Wrap",desc:"Grilled strips, lettuce, garlic aioli",price:89,emoji:"🌯"}],"Wings":[{id:603,name:"Hot Wings 6pc",desc:"Buffalo, blue cheese dip",price:75,emoji:"🔥"}]} },
];

const DRIVERS = [
    {id:1,name:"Sipho M.",vehicle:"Motorcycle",rating:4.9,eta:"8 min"},
    {id:2,name:"Ayanda K.",vehicle:"Car",rating:4.8,eta:"12 min"},
    {id:3,name:"Thabo N.",vehicle:"Bicycle",rating:4.7,eta:"6 min"},
];

const STATUS_STEPS = [
    {key:"placed",icon:"📋",title:"Order Placed",desc:"Your order has been received"},
    {key:"accepting",icon:"✅",title:"Vendor Accepted",desc:"Restaurant confirmed your order"},
    {key:"preparing",icon:"👨‍🍳",title:"Preparing",desc:"Your food is being freshly prepared"},
    {key:"assigned",icon:"🛵",title:"Driver Assigned",desc:"A driver is heading to the restaurant"},
    {key:"pickup",icon:"📦",title:"Picked Up",desc:"Driver has your order"},
    {key:"delivery",icon:"🚀",title:"Out for Delivery",desc:"On the way to you!"},
    {key:"delivered",icon:"🎉",title:"Delivered",desc:"Enjoy your meal!"},
];

export default function LandingPage() {
    const [currentStore, setCurrentStore] = useState(null);
    const [cart, setCart] = useState({});
    const [showCheckout, setShowCheckout] = useState(false);
    const [activeOrder, setActiveOrder] = useState(null);
    const [orders, setOrders] = useState([]);
    const [orderCounter, setOrderCounter] = useState(1001);
    const [showAuth, setShowAuth] = useState(false);

    const getAllItems = (store) => Object.values(store.menu).flat();

    const cartCount = Object.values(cart).reduce((s, v) => s + v, 0);
    const cartTotal = currentStore
        ? Object.entries(cart).reduce((s, [id, qty]) => {
            const item = getAllItems(currentStore).find(i => i.id === parseInt(id));
            return s + (item ? item.price * qty : 0);
        }, 0)
        : 0;

    const openStore = (store) => {
        if (!store.open) { alert(`${store.name} is currently closed.`); return; }
        setCurrentStore(store);
        setCart({});
        setShowCheckout(false);
    };

    const addItem = (id) => setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }));
    const incItem = (id) => setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }));
    const decItem = (id) => setCart(c => {
        const qty = (c[id] || 0) - 1;
        if (qty <= 0) { const { [id]: _, ...rest } = c; return rest; }
        return { ...c, [id]: qty };
    });

    const placeOrder = (name, phone, address) => {
        const driver = DRIVERS[Math.floor(Math.random() * DRIVERS.length)];
        const allItems = getAllItems(currentStore);
        const cartItems = Object.entries(cart)
            .filter(([, q]) => q > 0)
            .map(([id, qty]) => ({ item: allItems.find(i => i.id === parseInt(id)), qty }))
            .filter(x => x.item);

        const order = {
            id: orderCounter,
            status: 'placed',
            driver: null,
            name, phone, address,
            items: cartItems,
            total: cartTotal + 25,
            store: currentStore,
        };

        setOrderCounter(c => c + 1);
        setOrders(prev => [order, ...prev]);
        setCurrentStore(null);
        setCart({});
        setShowCheckout(false);
        setActiveOrder(order);

        const seq = ['accepting','preparing','assigned','pickup','delivery','delivered'];
        const delays = [1500, 4000, 8000, 12000, 16000, 22000];
        seq.forEach((status, i) => {
            setTimeout(() => {
                setActiveOrder(prev => prev?.id === order.id
                    ? { ...prev, status, driver: status === 'assigned' ? driver : prev.driver }
                    : prev
                );
            }, delays[i]);
        });
    };

    const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    return (
        <>
        <div className={showAuth ? 'page-blur' : ''}>
            {/* NAV */}
            <nav className="nav">
                <div className="nav-logo" onClick={() => window.scrollTo(0,0)}>LOCAL<span>FRANCHISE</span></div>
                <div className="nav-links">
                    <span className="nav-link" onClick={() => scrollTo('how')}>How It Works</span>
                    <span className="nav-link" onClick={() => scrollTo('stores')}>Browse Stores</span>
                    <span className="nav-link" onClick={() => scrollTo('features')}>Features</span>
                </div>
                <div className="nav-actions">
                    <button className="btn-nav" onClick={() => setShowAuth(true)}>Sign In</button>
                    <button className="btn-nav-fill" onClick={() => scrollTo('stores')}>Order Now</button>

                </div>
            </nav>

            {/* HERO */}
            <section className="hero">
                <div className="hero-radial"></div>
                <div className="hero-radial2"></div>
                <div className="hero-grid"></div>
                <div className="hero-inner">
                    <div className="hero-left">
                        <div className="hero-tag"><div className="hero-tag-dot"></div>📍 Johannesburg · Now Open</div>
                        <h1 className="hero-title">Fresh Local.<br /><span className="line2">Delivered Hot.</span></h1>
                        <p className="hero-sub">Discover the best local franchises in your area. Order from your favourite spots and track every step from kitchen to door — in real time.</p>
                        <div className="hero-cta">
                            <button className="btn-primary" onClick={() => scrollTo('stores')}>Browse Stores 🍽️</button>
                            <button className="btn-ghost" onClick={() => scrollTo('how')}>How it works →</button>
                        </div>
                        <div className="hero-stats">
                            <div><div className="hero-stat-val"><span>6</span>+</div><div className="hero-stat-label">Local Stores</div></div>
                            <div><div className="hero-stat-val"><span>15</span>min</div><div className="hero-stat-label">Avg Delivery</div></div>
                            <div><div className="hero-stat-val"><span>4.8</span>⭐</div><div className="hero-stat-label">Avg Rating</div></div>
                        </div>
                    </div>
                    <div className="hero-right">
                        <div className="float-card fc1">
                            <div className="fc-icon" style={{background:'linear-gradient(135deg,#0a1f35,#1a3a0a)'}}>🍔</div>
                            <div><div className="fc-name">Burger Baron</div><div className="fc-meta">⭐ 4.8 · 15–25 min</div></div>
                            <span className="fc-badge badge-green">OPEN</span>
                        </div>
                        <div className="float-card fc2">
                            <div className="fc-icon" style={{background:'linear-gradient(135deg,#0a1235,#1a0a2e)'}}>🍕</div>
                            <div><div className="fc-name">Pizza Punk</div><div className="fc-meta">⭐ 4.6 · 20–35 min</div></div>
                            <span className="fc-badge badge-green">OPEN</span>
                        </div>
                        <div className="float-card fc3">
                            <div className="fc-icon" style={{background:'linear-gradient(135deg,#0f1a08,#1a2a0a)'}}>🌮</div>
                            <div><div className="fc-name">Taco Cartel</div><div className="fc-meta">⭐ 4.7 · 10–20 min</div></div>
                            <span className="fc-badge badge-green">OPEN</span>
                        </div>
                        <div className="float-card fc4">
                            <div className="fc-icon" style={{background:'linear-gradient(135deg,#051828,#0a2030)'}}>🍣</div>
                            <div><div className="fc-name">Sushi Wave</div><div className="fc-meta">⭐ 4.9 · 25–40 min</div></div>
                            <span className="fc-badge badge-orange">CLOSED</span>
                        </div>
                        <div className="track-mini">
                            <div className="track-mini-title">📦 Order #1042</div>
                            <div className="track-step"><div className="ts-dot ts-done"></div><div className="ts-label done">Order Placed</div></div>
                            <div className="track-step"><div className="ts-dot ts-done"></div><div className="ts-label done">Preparing</div></div>
                            <div className="track-step"><div className="ts-dot ts-active"></div><div className="ts-label active">Out for Delivery 🚀</div></div>
                            <div className="track-step"><div className="ts-dot ts-idle"></div><div className="ts-label idle">Delivered</div></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <div id="how" style={{background:'var(--surface)',borderTop:'1px solid var(--border)',borderBottom:'1px solid var(--border)'}}>
                <div className="section">
                    <div className="section-tag">// Process</div>
                    <div className="section-title">How It Works</div>
                    <div className="section-sub">From browsing to delivery — a seamless experience with full real-time visibility at every step.</div>
                    <div className="hiw-grid">
                        {[
                            {num:'01',icon:'🏪',title:'Browse Stores',desc:'Explore local franchise billboards. Click any store to view their full menu with live availability.'},
                            {num:'02',icon:'🛒',title:'Place Your Order',desc:'Add items to your cart, enter your address and confirm. Your order is instantly sent to the vendor.'},
                            {num:'03',icon:'🛵',title:'Driver Assigned',desc:'The system automatically picks the nearest available driver. Vendor can also manually assign.'},
                            {num:'04',icon:'🎉',title:'Track & Receive',desc:'Follow every status change in real time — from kitchen to your door. Enjoy your fresh meal!'},
                        ].map(card => (
                            <div key={card.num} className="hiw-card" data-num={card.num}>
                                <div className="hiw-icon">{card.icon}</div>
                                <div className="hiw-title">{card.title}</div>
                                <div className="hiw-desc">{card.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* STORES */}
            <div id="stores">
                <div className="section">
                    <div className="section-tag">// Local Franchise</div>
                    <div className="section-title">Nearby Stores</div>
                    <div className="section-sub">Click any open store to browse their menu and start ordering.</div>
                    <div className="stores-grid">
                        {STORES.map(store => (
                            <div key={store.id} className="store-card" onClick={() => openStore(store)}>
                                <div className="sc-img" style={{background: store.gradient}}>
                                    <span style={{fontSize:'3.5rem'}}>{store.emoji}</span>
                                    <span className={`sc-open ${store.open ? 'badge-green' : 'badge-orange'}`}>
                    {store.open ? 'OPEN' : 'CLOSED'}
                  </span>
                                </div>
                                <div className="sc-body">
                                    <div className="sc-name">{store.name}</div>
                                    <div className="sc-meta">
                                        <span>⭐ {store.rating}</span>
                                        <span>🕐 {store.deliveryTime}</span>
                                        <span>📍 {store.distance}</span>
                                    </div>
                                    <div className="sc-cats">
                                        {store.categories.map(c => <span key={c} className="sc-cat">{c}</span>)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* FEATURES */}
            <div id="features" style={{background:'var(--surface)',borderTop:'1px solid var(--border)',borderBottom:'1px solid var(--border)'}}>
                <div className="section">
                    <div className="section-tag">// Platform</div>
                    <div className="section-title">Built for Everyone</div>
                    <div className="section-sub">A complete ecosystem for customers, vendors, and drivers — all in one platform.</div>
                    <div className="features-grid">
                        {[
                            {icon:'⚡',title:'Real-Time Order Tracking',desc:'Live status updates at every stage — Placed, Preparing, Assigned, Picked Up, Out for Delivery, and Delivered.'},
                            {icon:'🗺️',title:'Smart Driver Assignment',desc:'System automatically selects the nearest available driver using GPS proximity. Vendors can also manually assign.'},
                            {icon:'📊',title:'Vendor Dashboard',desc:'Full vendor control panel with live order queue, status management, revenue stats, and driver oversight.'},
                            {icon:'🏪',title:'Billboard Storefronts',desc:'Stores are showcased as visual billboards — customers browse, discover, and tap into a full menu experience.'},
                            {icon:'🔒',title:'Secure & Reliable',desc:'Built on Spring Boot + MySQL backend with structured order pipelines and validated state transitions.'},
                            {icon:'📱',title:'Mobile-First Design',desc:'Fully responsive across mobile, tablet, and desktop. Fast, smooth, and intuitive for all users on any device.'},
                        ].map(f => (
                            <div key={f.title} className="feat-card">
                                <div className="feat-icon">{f.icon}</div>
                                <div className="feat-title">{f.title}</div>
                                <div className="feat-desc">{f.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="cta-section">
                <div className="cta-inner">
                    <div className="cta-grid"></div>
                    <div className="cta-tag">🚀 Start Ordering</div>
                    <div className="cta-title">Hungry? <span>Order Now.</span></div>
                    <div className="cta-sub">Your favourite local restaurants are ready. Fresh food, real-time tracking, delivered to your door.</div>
                    <div className="cta-btns">
                        <button className="btn-primary" onClick={() => scrollTo('stores')}>Browse Stores</button>
                        <button className="btn-ghost">Become a Vendor →</button>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <footer>
                <div className="footer-logo">LOCAL<span>FRANCHISE</span></div>
                <div className="footer-links">
                    {['About','Vendors','Drivers','Support','Privacy'].map(l => (
                        <div key={l} className="footer-link">{l}</div>
                    ))}
                </div>
                <div className="footer-copy">© 2026 LocalFranchise. All rights reserved.</div>
            </footer>

            {/* STORE MODAL */}
            {currentStore && !showCheckout && (
                <div className="overlay" onClick={(e) => e.target.className === 'overlay' && setCurrentStore(null)}>
                    <div className="store-modal">
                        <div className="modal-header">
                            <div className="modal-store-icon" style={{background: currentStore.gradient}}>{currentStore.emoji}</div>
                            <div>
                                <div className="modal-store-name">{currentStore.name}</div>
                                <div className="modal-store-meta">⭐ {currentStore.rating} · {currentStore.deliveryTime} · {currentStore.distance}</div>
                            </div>
                            <button className="modal-close" onClick={() => setCurrentStore(null)}>✕</button>
                        </div>
                        {Object.entries(currentStore.menu).map(([cat, items]) => (
                            <div key={cat} className="menu-section">
                                <div className="menu-cat-title">{cat}</div>
                                <div className="menu-grid">
                                    {items.map(item => {
                                        const qty = cart[item.id] || 0;
                                        return (
                                            <div key={item.id} className={`menu-item ${qty > 0 ? 'incart' : ''}`}>
                                                <div className="mi-emoji">{item.emoji}</div>
                                                <div className="mi-name">{item.name}</div>
                                                <div className="mi-desc">{item.desc}</div>
                                                <div className="mi-footer">
                                                    <span className="mi-price">R{item.price}</span>
                                                    {qty === 0
                                                        ? <button className="mi-add" onClick={() => addItem(item.id)}>+</button>
                                                        : <div className="mi-qty">
                                                            <button className="qty-btn" onClick={() => decItem(item.id)}>−</button>
                                                            <span className="qty-val">{qty}</span>
                                                            <button className="qty-btn" onClick={() => incItem(item.id)}>+</button>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                        {cartCount > 0 && (
                            <div className="modal-cart-footer">
                                <button className="modal-cart-btn" onClick={() => setShowCheckout(true)}>
                                    🛒 View Cart ({cartCount} items) — R{cartTotal}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* CART BAR */}
            {cartCount > 0 && currentStore && !showCheckout && (
                <button className="cart-bar" onClick={() => setShowCheckout(true)}>
                    🛒 View Cart <span className="cart-count">{cartCount}</span> R{cartTotal}
                </button>
            )}

            {/* CHECKOUT MODAL */}
            {showCheckout && currentStore && (
                <CheckoutModal
                    store={currentStore}
                    cart={cart}
                    cartTotal={cartTotal}
                    getAllItems={getAllItems}
                    onClose={() => setShowCheckout(false)}
                    onPlaceOrder={placeOrder}
                />
            )}

            {/* TRACKER MODAL */}
            {activeOrder && !currentStore && !showCheckout && (
                <TrackerModal order={activeOrder} onClose={() => setActiveOrder(null)} />
            )}
        </div>
            {showAuth && <AuthModal onClose={() => setShowAuth(false)}/>};
            </>
    );
}

function CheckoutModal({ store, cart, cartTotal, getAllItems, onClose, onPlaceOrder }) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const allItems = getAllItems(store);
    const cartItems = Object.entries(cart)
        .filter(([, q]) => q > 0)
        .map(([id, qty]) => ({ item: allItems.find(i => i.id === parseInt(id)), qty }))
        .filter(x => x.item);
    const delivery = 25;
    const total = cartTotal + delivery;

    const handlePlace = () => {
        if (!name || !address) { alert('Please fill in your name and address'); return; }
        onPlaceOrder(name, phone, address);
    };

    return (
        <div className="overlay">
            <div className="checkout-modal">
                <div className="co-header">
                    <div className="co-title">Your Order</div>
                    <button className="modal-close" onClick={onClose}>✕</button>
                </div>
                <div className="co-body">
                    {cartItems.map(({ item, qty }) => (
                        <div key={item.id} className="cart-row">
                            <div className="cr-info">
                                <span style={{fontSize:'1.3rem'}}>{item.emoji}</span>
                                <div><div className="cr-name">{item.name}</div><div className="cr-sub">Qty: {qty}</div></div>
                            </div>
                            <div className="cr-price">R{item.price * qty}</div>
                        </div>
                    ))}
                    <hr className="divider" />
                    <div className="summary-row"><span>Subtotal</span><span>R{cartTotal}</span></div>
                    <div className="summary-row"><span>Delivery</span><span>R{delivery}</span></div>
                    <hr className="divider" style={{margin:'.5rem 0'}} />
                    <div className="total-row"><span>Total</span><span className="total-val">R{total}</span></div>
                    <br />
                    <div className="form-group"><label className="form-label">Your Name</label><input className="form-input" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} /></div>
                    <div className="form-group"><label className="form-label">Phone</label><input className="form-input" placeholder="+27 ..." value={phone} onChange={e => setPhone(e.target.value)} /></div>
                    <div className="form-group"><label className="form-label">Delivery Address</label><input className="form-input" placeholder="Street, City, Area" value={address} onChange={e => setAddress(e.target.value)} /></div>
                    <button className="place-btn" onClick={handlePlace}>🚀 Place Order — R{total}</button>
                </div>
            </div>
        </div>
    );
}

function TrackerModal({ order, onClose }) {
    const stepKeys = STATUS_STEPS.map(s => s.key);
    const curIdx = stepKeys.indexOf(order.status);
    const chipMap = {placed:'chip-pending',accepting:'chip-pending',preparing:'chip-preparing',assigned:'chip-preparing',pickup:'chip-preparing',delivery:'chip-delivery',delivered:'chip-delivered'};
    const chipLabel = {placed:'Placed',accepting:'Accepted',preparing:'Preparing',assigned:'Driver Assigned',pickup:'Picked Up',delivery:'Out for Delivery',delivered:'Delivered'};

    return (
        <div className="overlay">
            <div className="tracker-modal">
                <div className="tr-header">
                    <div>
                        <div className="tr-title">Order Tracker</div>
                        <div className="tr-id">#{order.id} · {order.store.name}</div>
                    </div>
                    <button className="modal-close" onClick={onClose}>✕</button>
                </div>
                <div className="tr-body">
                    <span className={`status-chip ${chipMap[order.status] || 'chip-pending'}`}>{chipLabel[order.status]}</span>
                    <div className="pipeline">
                        {STATUS_STEPS.map((step, i) => {
                            const isDone = i < curIdx;
                            const isActive = i === curIdx;
                            const isLast = i === STATUS_STEPS.length - 1;
                            return (
                                <div key={step.key} className="pip-step">
                                    <div className="pip-col">
                                        <div className={`pip-icon ${isDone ? 'done' : ''} ${isActive ? 'active' : ''}`}>
                                            {isDone ? '✓' : step.icon}
                                        </div>
                                        {!isLast && <div className={`pip-line ${isDone ? 'done' : ''}`}></div>}
                                    </div>
                                    <div className="pip-content">
                                        <div className="pip-title" style={{opacity: isDone || isActive ? 1 : 0.3}}>{step.title}</div>
                                        <div className="pip-desc" style={{opacity: isDone || isActive ? 1 : 0.3}}>{step.desc}</div>
                                        {(isDone || isActive) && <div className="pip-time">Just now</div>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {curIdx >= 3 && order.driver && (
                        <div className="driver-card">
                            <div className="driver-av">🛵</div>
                            <div>
                                <div className="driver-name">{order.driver.name}</div>
                                <div className="driver-meta">{order.driver.vehicle} · ETA {order.driver.eta}</div>
                                <div className="driver-rating">⭐ {order.driver.rating}</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}