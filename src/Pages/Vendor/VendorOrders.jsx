
import React from 'react';

const STATUS_NEXT = {
    placed: { label: 'Accept', next: 'accepting' },
    accepting: { label: 'Start Preparing', next: 'preparing' },
    preparing: { label: 'Assign Driver', next: 'assigned' },
    assigned: { label: 'Mark Picked Up', next: 'pickup' },
    pickup: { label: 'Out for Delivery', next: 'delivery' },
    delivery: { label: 'Mark Delivered', next: 'delivered' },
};

const STATUS_COLORS = {
    placed: 'os-placed', accepting: 'os-accepting', preparing: 'os-preparing',
    assigned: 'os-assigned', pickup: 'os-pickup', delivery: 'os-delivery', delivered: 'os-delivered',
};

const STATUS_LABELS = {
    placed: 'New Order', accepting: 'Accepted', preparing: 'Preparing',
    assigned: 'Driver Assigned', pickup: 'Picked Up', delivery: 'Out for Delivery', delivered: 'Delivered',
};

export default function VendorOrders({ orders, onAdvance }) {
    const activeOrders = orders.filter(o => o.status !== 'delivered');

    return (
        <div className="vd-card vd-grid-full">
            <div className="vd-card-header">
                <div className="vd-card-title">Live Orders</div>
                <span className="vd-card-badge badge-live">● {activeOrders.length} Active</span>
            </div>
            <div className="orders-table">
                {orders.length === 0 && <div className="empty-state">No orders yet today.</div>}
                {orders.map(order => (
                    <div key={order.id} className="order-row">
                        <div className="order-id">#{order.id}</div>
                        <div>
                            <div className="order-items">{order.customer}</div>
                            <div className="order-items-sub">{order.items.join(', ')}</div>
                        </div>
                        <div className="order-total">R{order.total}</div>
                        <span className={`order-status ${STATUS_COLORS[order.status]}`}>
              {STATUS_LABELS[order.status]}
            </span>
                        <div className="order-actions">
                            {STATUS_NEXT[order.status] && (
                                <button className="action-btn primary" onClick={() => onAdvance(order.id)}>
                                    {STATUS_NEXT[order.status].label}
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}