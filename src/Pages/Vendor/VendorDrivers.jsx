
import React from 'react';

export default function VendorDrivers({ drivers }) {
    return (
        <div className="vd-card vd-grid-full">
            <div className="vd-card-header">
                <div className="vd-card-title">Driver Overview</div>
                <span className="vd-card-badge badge-info">{drivers.length} Total</span>
            </div>
            <div className="drivers-list">
                {drivers.map(driver => (
                    <div key={driver.id} className="driver-row">
                        <div className="driver-avatar">🛵</div>
                        <div className="driver-info">
                            <div className="driver-name">{driver.name}</div>
                            <div className="driver-meta">
                                {driver.vehicle} · ⭐ {driver.rating} · {driver.deliveries} deliveries today
                            </div>
                        </div>
                        <span className={`driver-status ${driver.status === 'available' ? 'ds-available' : 'ds-busy'}`}>
              {driver.status}
            </span>
                    </div>
                ))}
            </div>
        </div>
    );
}