
import React, { useState } from 'react';

export default function VendorMenu({ menu, onAdd, onEdit }) {
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [emoji, setEmoji] = useState('');

    const handleAdd = () => {
        if (!name || !category || !price || !emoji) return;
        onAdd({ name, category, price: parseInt(price), emoji });
        setName(''); setCategory(''); setPrice(''); setEmoji('');
        setShowForm(false);
    };

    return (
        <div className="vd-card vd-grid-full">
            <div className="vd-card-header">
                <div className="vd-card-title">Menu Items</div>
                <span className="vd-card-badge badge-info">{menu.length} Items</span>
            </div>
            <div className="menu-list">
                {menu.map(item => (
                    <div key={item.id} className="menu-row">
                        <div className="menu-emoji">{item.emoji}</div>
                        <div className="menu-info">
                            <div className="menu-name">{item.name}</div>
                            <div className="menu-cat">{item.category}</div>
                        </div>
                        <span className="menu-price">R{item.price}</span>
                        <button className="action-btn" onClick={() => onEdit(item)}>Edit</button>
                    </div>
                ))}
            </div>

            {showForm && (
                <div style={{padding: '1rem 1.4rem', borderTop: '1px solid var(--border)'}}>
                    <div className="input-row" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'.8rem', marginBottom:'.8rem'}}>
                        <div className="form-group">
                            <label className="form-label">Item Name</label>
                            <input className="form-input" placeholder="e.g. Classic Smash" value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Category</label>
                            <input className="form-input" placeholder="e.g. Burgers" value={category} onChange={e => setCategory(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Price (R)</label>
                            <input className="form-input" type="number" placeholder="e.g. 89" value={price} onChange={e => setPrice(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Emoji</label>
                            <input className="form-input" placeholder="e.g. 🍔" value={emoji} onChange={e => setEmoji(e.target.value)} />
                        </div>
                    </div>
                    <div style={{display:'flex', gap:'.8rem'}}>
                        <button className="action-btn primary" onClick={handleAdd}>Save Item</button>
                        <button className="action-btn" onClick={() => setShowForm(false)}>Cancel</button>
                    </div>
                </div>
            )}

            {!showForm && (
                <button className="add-menu-btn" onClick={() => setShowForm(true)}>+ Add New Item</button>
            )}
        </div>
    );
}