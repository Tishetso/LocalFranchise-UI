import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthModal.css';
import api from '../Services/api';

const ROLES = [
    { key: 'buyer', label: 'Buyer', icon: '🛒' },
    { key: 'vendor', label: 'Vendor', icon: '🏪' },
    { key: 'driver', label: 'Driver', icon: '🛵' },
];

export default function AuthModal({ onClose }) {
    const navigate = useNavigate();
    const [mode, setMode] = useState('signin'); // signin | signup
    const [role, setRole] = useState('buyer');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Sign In fields
    const [siEmail, setSiEmail] = useState('');
    const [siPassword, setSiPassword] = useState('');

    // Sign Up fields
    const [suFirstName, setSuFirstName] = useState('');
    const [suLastName, setSuLastName] = useState('');
    const [suEmail, setSuEmail] = useState('');
    const [suPassword, setSuPassword] = useState('');
    const [suConfirm, setSuConfirm] = useState('');

    // Extra fields for Vendor
    const [storeName, setStoreName] = useState('');
    const [storeAddress, setStoreAddress] = useState('');

    // Extra fields for Driver
    const [vehicle, setVehicle] = useState('');
    const [license, setLicense] = useState('');

    const switchMode = (m) => {
        setMode(m);
        setError('');
        setSuccess('');
    };

    const handleSignIn = async () => {
        setError('');
        if (!siEmail || !siPassword) {
            setError('Please fill in all fields.');
            return;
        }


        //  connect to Spring Boot /api/auth/login
        const res = await api.login(siEmail, siPassword, role);
        if (res.error) { setError(res.error); return; }
        // For now navigate based on role
        if (role === 'buyer') navigate('/buyer');
        else if (role === 'vendor') navigate('/vendor');
        else if (role === 'driver') navigate('/driver');
    };

    const handleSignUp = async () => {
        setError('');
        if (!suFirstName || !suLastName || !suEmail || !suPassword || !suConfirm) {
            setError('Please fill in all fields.');
            return;
        }
        if (suPassword !== suConfirm) {
            setError('Passwords do not match.');
            return;
        }
        if (suPassword.length < 8) {
            setError('Password must be at least 8 characters.');
            return;
        }
        if (role === 'vendor' && (!storeName || !storeAddress)) {
            setError('Please fill in your store details.');
            return;
        }
        if (role === 'driver' && (!vehicle || !license)) {
            setError('Please fill in your driver details.');
            return;
        }
        // connect to Spring Boot /api/auth/register
        const res = await api.register({
            firstName: suFirstName,
            lastName: suLastName,
            email: suEmail,
            password: suPassword,
            role: role.toUpperCase(),
            storeName,
            storeAddress,
            vehicle,
            licensePlate: license

        })
        setSuccess('Account created! You can now sign in.');
        switchMode('signin');
    };

    return (
        <div className="auth-overlay" onClick={(e) => e.target.className === 'auth-overlay' && onClose()}>
            <div className="auth-modal">
                <button className="auth-close" onClick={onClose}>✕</button>

                <div className="auth-logo">LOCAL<span>FRANCHISE</span></div>

                {/* TABS */}
                <div className="auth-tabs">
                    <button className={`auth-tab ${mode === 'signin' ? 'active' : ''}`} onClick={() => switchMode('signin')}>
                        Sign In
                    </button>
                    <button className={`auth-tab ${mode === 'signup' ? 'active' : ''}`} onClick={() => switchMode('signup')}>
                        Sign Up
                    </button>
                </div>

                {/* TITLE */}
                <div className="auth-title">{mode === 'signin' ? 'Welcome Back' : 'Create Account'}</div>
                <div className="auth-sub">
                    {mode === 'signin'
                        ? 'Sign in to continue to your dashboard'
                        : 'Welcome to LocalFranchise 🥳'}
                </div>

                {/* ROLE SELECTOR */}
                <p className="form-label">Choose Role:</p>
                <div className="role-grid">

                    {ROLES.map(r => (
                        <div
                            key={r.key}
                            className={`role-btn ${role === r.key ? 'selected' : ''}`}
                            onClick={() => setRole(r.key)}
                        >
                            <div className="role-btn-icon">{r.icon}</div>
                            <div className="role-btn-label">{r.label}</div>
                        </div>
                    ))}
                </div>

                {/* ERROR / SUCCESS */}
                {error && <div className="auth-error">⚠️ {error}</div>}
                {success && <div className="auth-success">✅ {success}</div>}

                {/* SIGN IN FORM */}
                {mode === 'signin' && (
                    <>
                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input
                                className="form-input"
                                type="email"
                                placeholder="thando@example.com"
                                value={siEmail}
                                onChange={e => setSiEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <input
                                className="form-input"
                                type="password"
                                placeholder="••••••••"
                                value={siPassword}
                                onChange={e => setSiPassword(e.target.value)}
                            />
                        </div>
                        <button className="auth-submit" onClick={handleSignIn}>
                            Sign In as {ROLES.find(r => r.key === role)?.label} →
                        </button>
                        <div className="auth-footer">
                            Don't have an account?{' '}
                            <span onClick={() => switchMode('signup')}>Sign up free</span>
                        </div>
                    </>
                )}

                {/* SIGN UP FORM */}
                {mode === 'signup' && (
                    <>
                        <div className="input-row">
                            <div className="form-group">
                                <label className="form-label">First Name</label>
                                <input
                                    className="form-input"
                                    placeholder="Thando"
                                    value={suFirstName}
                                    onChange={e => setSuFirstName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Last Name</label>
                                <input
                                    className="form-input"
                                    placeholder="Codes"
                                    value={suLastName}
                                    onChange={e => setSuLastName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input
                                className="form-input"
                                type="email"
                                placeholder="thandoCodes@example.com"
                                value={suEmail}
                                onChange={e => setSuEmail(e.target.value)}
                            />
                        </div>
                        <div className="input-row">
                            <div className="form-group">
                                <label className="form-label">Password</label>
                                <input
                                    className="form-input"
                                    type="password"
                                    placeholder="••••••••"
                                    value={suPassword}
                                    onChange={e => setSuPassword(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Confirm</label>
                                <input
                                    className="form-input"
                                    type="password"
                                    placeholder="••••••••"
                                    value={suConfirm}
                                    onChange={e => setSuConfirm(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* VENDOR EXTRA FIELDS */}
                        {role === 'vendor' && (
                            <>
                                <div className="auth-divider">
                                    <div className="auth-divider-line"></div>
                                    <div className="auth-divider-text">Store Details</div>
                                    <div className="auth-divider-line"></div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Store Name</label>
                                    <input
                                        className="form-input"
                                        placeholder="e.g. Burger Punch"
                                        value={storeName}
                                        onChange={e => setStoreName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Store Address</label>
                                    <input
                                        className="form-input"
                                        placeholder="Street, City"
                                        value={storeAddress}
                                        onChange={e => setStoreAddress(e.target.value)}
                                    />
                                </div>
                            </>
                        )}

                        {/* DRIVER EXTRA FIELDS */}
                        {role === 'driver' && (
                            <>
                                <div className="auth-divider">
                                    <div className="auth-divider-line"></div>
                                    <div className="auth-divider-text">Driver Details</div>
                                    <div className="auth-divider-line"></div>
                                </div>
                                <div className="input-row">
                                    <div className="form-group">
                                        <label className="form-label">Vehicle Type</label>
                                        <input
                                            className="form-input"
                                            placeholder="e.g. Motorcycle"
                                            value={vehicle}
                                            onChange={e => setVehicle(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">License Plate</label>
                                        <input
                                            className="form-input"
                                            placeholder="e.g. GP 123"
                                            value={license}
                                            onChange={e => setLicense(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        <button className="auth-submit" onClick={handleSignUp}>
                            Create {ROLES.find(r => r.key === role)?.label} Account →
                        </button>
                        <div className="auth-footer">
                            Already have an account?{' '}
                            <span onClick={() => switchMode('signin')}>Sign in</span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}