import React, { useState } from 'react';

export default function VendorProfile() {
    const [activeTab, setActiveTab] = useState('store');

    // Store profile state
    const [storeName, setStoreName] = useState('Burger Baron');
    const [storeAddress, setStoreAddress] = useState('12 Main Street, Sandton');
    const [storePhone, setStorePhone] = useState('+27 11 123 4567');
    const [storeEmail, setStoreEmail] = useState('burgers@localfranchise.com');
    const [storeEmoji, setStoreEmoji] = useState('🍔');
    const [storeDesc, setStoreDesc] = useState('Best smash burgers in Joburg. Fresh ingredients, bold flavours.');
    const [storeSaved, setStoreSaved] = useState(false);

    // User profile state
    const [firstName, setFirstName] = useState('John');
    const [lastName, setLastName] = useState('Doe');
    const [userEmail, setUserEmail] = useState('john@localfranchise.com');
    const [phone, setPhone] = useState('+27 82 000 0000');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userSaved, setUserSaved] = useState(false);
    const [pwError, setPwError] = useState('');

    const handleStoreSave = () => {
        setStoreSaved(true);
        setTimeout(() => setStoreSaved(false), 2500);
    };

    const handleUserSave = () => {
        setPwError('');
        if (newPassword && newPassword !== confirmPassword) {
            setPwError('Passwords do not match.'); return;
        }
        if (newPassword && newPassword.length < 6) {
            setPwError('Password must be at least 6 characters.'); return;
        }
        setUserSaved(true);
        setTimeout(() => setUserSaved(false), 2500);
    };

    return (
        <div className="vd-card vd-grid-full">
            <div className="vd-card-header">
                <div className="vd-card-title">Profile</div>
            </div>

            {/* TABS */}
            <div style={{padding: '1rem 1.4rem', borderBottom: '1px solid var(--border)', display: 'flex', gap: '.5rem'}}>
                <button
                    className={`action-btn ${activeTab === 'store' ? 'primary' : ''}`}
                    onClick={() => setActiveTab('store')}
                >
                    🏪 Store Profile
                </button>
                <button
                    className={`action-btn ${activeTab === 'user' ? 'primary' : ''}`}
                    onClick={() => setActiveTab('user')}
                >
                    👤 My Account
                </button>
            </div>

            <div style={{padding: '1.5rem 1.4rem'}}>

                {/* STORE PROFILE */}
                {activeTab === 'store' && (
                    <>
                        <div style={{display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1.8rem'}}>
                            <div style={{width:70, height:70, borderRadius:16, background:'linear-gradient(135deg,#0a1f35,#1a3a0a)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'2.2rem', border:'1px solid var(--border)'}}>
                                {storeEmoji}
                            </div>
                            <div>
                                <div style={{fontWeight:700, fontSize:'1.1rem'}}>{storeName}</div>
                                <div style={{color:'var(--muted)', fontSize:'.82rem', marginTop:3}}>{storeAddress}</div>
                            </div>
                        </div>

                        {storeSaved && <div className="auth-success">✅ Store profile saved!</div>}

                        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'.9rem'}}>
                            <div className="form-group">
                                <label className="form-label">Store Name</label>
                                <input className="form-input" value={storeName} onChange={e => setStoreName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Store Emoji</label>
                                <input className="form-input" value={storeEmoji} onChange={e => setStoreEmoji(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Phone</label>
                                <input className="form-input" value={storePhone} onChange={e => setStorePhone(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input className="form-input" value={storeEmail} onChange={e => setStoreEmail(e.target.value)} />
                            </div>
                            <div className="form-group" style={{gridColumn:'1 / -1'}}>
                                <label className="form-label">Address</label>
                                <input className="form-input" value={storeAddress} onChange={e => setStoreAddress(e.target.value)} />
                            </div>
                            <div className="form-group" style={{gridColumn:'1 / -1'}}>
                                <label className="form-label">Description</label>
                                <textarea
                                    className="form-input"
                                    rows={3}
                                    style={{resize:'none'}}
                                    value={storeDesc}
                                    onChange={e => setStoreDesc(e.target.value)}
                                />
                            </div>
                        </div>
                        <button className="action-btn primary" style={{marginTop:'1rem'}} onClick={handleStoreSave}>
                            Save Store Profile
                        </button>
                    </>
                )}

                {/* USER PROFILE */}
                {activeTab === 'user' && (
                    <>
                        <div style={{display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1.8rem'}}>
                            <div style={{width:60, height:60, borderRadius:'50%', background:'linear-gradient(135deg,var(--accent),var(--accent2))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.5rem'}}>
                                👤
                            </div>
                            <div>
                                <div style={{fontWeight:700, fontSize:'1.1rem'}}>{firstName} {lastName}</div>
                                <div style={{color:'var(--muted)', fontSize:'.82rem', marginTop:3}}>Vendor Account</div>
                            </div>
                        </div>

                        {userSaved && <div className="auth-success">✅ Account updated!</div>}
                        {pwError && <div className="auth-error">⚠️ {pwError}</div>}

                        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'.9rem'}}>
                            <div className="form-group">
                                <label className="form-label">First Name</label>
                                <input className="form-input" value={firstName} onChange={e => setFirstName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Last Name</label>
                                <input className="form-input" value={lastName} onChange={e => setLastName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input className="form-input" value={userEmail} onChange={e => setUserEmail(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Phone</label>
                                <input className="form-input" value={phone} onChange={e => setPhone(e.target.value)} />
                            </div>
                        </div>

                        <div style={{borderTop:'1px solid var(--border)', marginTop:'1.4rem', paddingTop:'1.4rem'}}>
                            <div style={{fontFamily:"'Bebas Neue', sans-serif", fontSize:'1rem', letterSpacing:1, marginBottom:'1rem', color:'var(--muted)'}}>// CHANGE PASSWORD</div>
                            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'.9rem'}}>
                                <div className="form-group">
                                    <label className="form-label">Current Password</label>
                                    <input className="form-input" type="password" placeholder="••••••••" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">New Password</label>
                                    <input className="form-input" type="password" placeholder="••••••••" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Confirm Password</label>
                                    <input className="form-input" type="password" placeholder="••••••••" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <button className="action-btn primary" style={{marginTop:'1rem'}} onClick={handleUserSave}>
                            Save Account
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}