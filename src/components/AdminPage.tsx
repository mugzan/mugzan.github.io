import React, { useState } from 'react';
import { useProduct } from '../context/ProductContext';
import { useOrder } from '../context/OrderContext';

type AdminTab = 'products' | 'orders' | 'sales' | 'shipping';

const AdminPage: React.FC = () => {
  const { products, deleteProduct } = useProduct();
  const { orders, updateOrderStatus, updateOrderPayment, getOrderStats } = useOrder();
  const [activeTab, setActiveTab] = useState<AdminTab>('products');

  const handleDelete = (id: number) => {
    if (confirm('정말로 이 상품을 삭제하시겠습니까?')) {
      deleteProduct(id);
    }
  };

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    updateOrderStatus(orderId, newStatus as any);
  };

  const handlePaymentConfirm = (orderId: string) => {
    if (confirm('입금을 확인하셨습니까?')) {
      updateOrderPayment(orderId, 'paid', 'bank');
      alert('입금이 확인되었습니다. 주문 상태가 "주문확인"으로 변경되었습니다.');
    }
  };

  const stats = getOrderStats();

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case 'pending': return '결제 대기';
      case 'pending_payment': return '입금 대기';
      case 'paid': return '결제 완료';
      case 'failed': return '결제 실패';
      default: return status;
    }
  };

  const renderProducts = () => (
    <div>
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-2xl font-light text-black tracking-wide">PRODUCT MANAGEMENT</h2>
        <a
          href="#/admin/add"
          className="bg-black text-white px-6 py-3 text-sm font-light tracking-wide hover:bg-gray-800 transition-colors"
        >
          ADD PRODUCT
        </a>
      </div>

      <div className="bg-white border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-light text-gray-600 uppercase tracking-wider">
                PRODUCT
              </th>
              <th className="px-6 py-4 text-left text-xs font-light text-gray-600 uppercase tracking-wider">
                CATEGORY
              </th>
              <th className="px-6 py-4 text-left text-xs font-light text-gray-600 uppercase tracking-wider">
                PRICE
              </th>
              <th className="px-6 py-4 text-left text-xs font-light text-gray-600 uppercase tracking-wider">
                STOCK
              </th>
              <th className="px-6 py-4 text-left text-xs font-light text-gray-600 uppercase tracking-wider">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover bg-gray-100 mr-4"
                    />
                    <div>
                      <div className="text-sm font-light text-black">
                        {product.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-light">
                  {product.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-black font-light">
                  ₩{product.price.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-light">
                  {product.stock || 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-light space-x-4">
                  <a
                    href={`#/admin/edit/${product.id}`}
                    className="text-gray-600 hover:text-black transition-colors"
                  >
                    EDIT
                  </a>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div>
      <h2 className="text-2xl font-light text-black tracking-wide mb-12">ORDER MANAGEMENT</h2>
      
      <div className="bg-white border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-light text-gray-600 uppercase tracking-wider">
                ORDER ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-light text-gray-600 uppercase tracking-wider">
                CUSTOMER
              </th>
              <th className="px-6 py-4 text-left text-xs font-light text-gray-600 uppercase tracking-wider">
                AMOUNT
              </th>
              <th className="px-6 py-4 text-left text-xs font-light text-gray-600 uppercase tracking-wider">
                PAYMENT STATUS
              </th>
              <th className="px-6 py-4 text-left text-xs font-light text-gray-600 uppercase tracking-wider">
                DATE
              </th>
              <th className="px-6 py-4 text-left text-xs font-light text-gray-600 uppercase tracking-wider">
                STATUS
              </th>
              <th className="px-6 py-4 text-left text-xs font-light text-gray-600 uppercase tracking-wider">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-black">
                  {order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-black font-light">{order.shippingAddress.name}</div>
                  <div className="text-xs text-gray-500 font-light">{order.shippingAddress.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-black font-light">
                  ₩{order.total.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 text-xs font-light ${
                    order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                    order.paymentStatus === 'pending_payment' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {getPaymentStatusText(order.paymentStatus)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-light">
                  {order.createdAt.toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                    className={`px-3 py-1 text-xs font-light border-0 ${
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                      'bg-green-100 text-green-800'
                    }`}
                  >
                    <option value="pending">PENDING</option>
                    <option value="confirmed">CONFIRMED</option>
                    <option value="shipped">SHIPPED</option>
                    <option value="delivered">DELIVERED</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-light space-x-2">
                  {order.paymentStatus === 'pending_payment' && (
                    <button
                      onClick={() => handlePaymentConfirm(order.id)}
                      className="text-green-600 hover:text-green-800 transition-colors"
                    >
                      입금확인
                    </button>
                  )}
                  <button
                    onClick={() => {
                      const orderDetails = order.items.map(item => 
                        `${item.product.name} x ${item.quantity}`
                      ).join('\n');
                      alert(`Order Details:\n${orderDetails}\n\nShipping Address:\n${order.shippingAddress.address} ${order.shippingAddress.detailAddress}\n\nPayment: ${getPaymentStatusText(order.paymentStatus)} (무통장입금)`);
                    }}
                    className="text-gray-600 hover:text-black transition-colors"
                  >
                    VIEW
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSales = () => (
    <div>
      <h2 className="text-2xl font-light text-black tracking-wide mb-12">SALES ANALYTICS</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div className="bg-white border border-gray-100 p-8 text-center">
          <h3 className="text-xs font-light text-gray-600 uppercase tracking-wider mb-4">TOTAL ORDERS</h3>
          <p className="text-3xl font-light text-black">{stats.totalOrders}</p>
        </div>
        <div className="bg-white border border-gray-100 p-8 text-center">
          <h3 className="text-xs font-light text-gray-600 uppercase tracking-wider mb-4">PAID REVENUE</h3>
          <p className="text-3xl font-light text-black">₩{stats.totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white border border-gray-100 p-8 text-center">
          <h3 className="text-xs font-light text-gray-600 uppercase tracking-wider mb-4">PENDING PAYMENT</h3>
          <p className="text-3xl font-light text-yellow-600">
            {orders.filter(o => o.paymentStatus === 'pending_payment').length}
          </p>
        </div>
        <div className="bg-white border border-gray-100 p-8 text-center">
          <h3 className="text-xs font-light text-gray-600 uppercase tracking-wider mb-4">TODAY'S ORDERS</h3>
          <p className="text-3xl font-light text-black">{stats.todayOrders}</p>
        </div>
      </div>

      <div className="bg-white border border-gray-100 p-8">
        <h3 className="text-lg font-light text-black tracking-wide mb-8">BEST SELLERS</h3>
        <div className="space-y-6">
          {stats.popularProducts.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
              <div className="flex items-center">
                <span className="text-sm font-light text-gray-400 mr-6">#{index + 1}</span>
                <span className="text-sm font-light text-black">{item.name}</span>
              </div>
              <div className="text-sm font-light text-gray-600">
                {item.quantity} sold
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderShipping = () => (
    <div>
      <h2 className="text-2xl font-light text-black tracking-wide mb-12">SHIPPING MANAGEMENT</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div className="bg-white border border-gray-100 p-8 text-center">
          <h3 className="text-xs font-light text-gray-600 uppercase tracking-wider mb-4">PENDING PAYMENT</h3>
          <p className="text-3xl font-light text-yellow-600">
            {orders.filter(o => o.paymentStatus === 'pending_payment').length}
          </p>
        </div>
        <div className="bg-white border border-gray-100 p-8 text-center">
          <h3 className="text-xs font-light text-gray-600 uppercase tracking-wider mb-4">READY TO SHIP</h3>
          <p className="text-3xl font-light text-blue-600">
            {orders.filter(o => o.status === 'confirmed' && o.paymentStatus === 'paid').length}
          </p>
        </div>
        <div className="bg-white border border-gray-100 p-8 text-center">
          <h3 className="text-xs font-light text-gray-600 uppercase tracking-wider mb-4">SHIPPED</h3>
          <p className="text-3xl font-light text-purple-600">
            {orders.filter(o => o.status === 'shipped').length}
          </p>
        </div>
        <div className="bg-white border border-gray-100 p-8 text-center">
          <h3 className="text-xs font-light text-gray-600 uppercase tracking-wider mb-4">DELIVERED</h3>
          <p className="text-3xl font-light text-green-600">
            {orders.filter(o => o.status === 'delivered').length}
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100">
          <h3 className="text-lg font-light text-black tracking-wide">SHIPPING STATUS</h3>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-light text-gray-600 uppercase tracking-wider">
                ORDER ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-light text-gray-600 uppercase tracking-wider">
                SHIPPING ADDRESS
              </th>
              <th className="px-6 py-4 text-left text-xs font-light text-gray-600 uppercase tracking-wider">
                CONTACT
              </th>
              <th className="px-6 py-4 text-left text-xs font-light text-gray-600 uppercase tracking-wider">
                PAYMENT
              </th>
              <th className="px-6 py-4 text-left text-xs font-light text-gray-600 uppercase tracking-wider">
                STATUS
              </th>
              <th className="px-6 py-4 text-left text-xs font-light text-gray-600 uppercase tracking-wider">
                DATE
              </th>
              <th className="px-6 py-4 text-left text-xs font-light text-gray-600 uppercase tracking-wider">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-black">
                  {order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-black font-light">
                  <div>({order.shippingAddress.zipCode})</div>
                  <div>{order.shippingAddress.address}</div>
                  <div className="text-gray-500 text-xs">{order.shippingAddress.detailAddress}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-black font-light">
                  <div>{order.shippingAddress.name}</div>
                  <div className="text-gray-500 text-xs">{order.shippingAddress.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 text-xs font-light ${
                    order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                    order.paymentStatus === 'pending_payment' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {getPaymentStatusText(order.paymentStatus)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 text-xs font-light ${
                    order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                    order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status === 'pending' ? 'PENDING' :
                     order.status === 'confirmed' ? 'READY' :
                     order.status === 'shipped' ? 'SHIPPED' : 'DELIVERED'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-light">
                  {order.createdAt.toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-light space-x-4">
                  {order.paymentStatus === 'pending_payment' && (
                    <button
                      onClick={() => handlePaymentConfirm(order.id)}
                      className="text-green-600 hover:text-green-800 transition-colors"
                    >
                      입금확인
                    </button>
                  )}
                  {order.status === 'confirmed' && order.paymentStatus === 'paid' && (
                    <button
                      onClick={() => handleStatusUpdate(order.id, 'shipped')}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      SHIP
                    </button>
                  )}
                  {order.status === 'shipped' && (
                    <button
                      onClick={() => handleStatusUpdate(order.id, 'delivered')}
                      className="text-green-600 hover:text-green-800 transition-colors"
                    >
                      DELIVER
                    </button>
                  )}
                  <button
                    onClick={() => {
                      const trackingNumber = `TK${Date.now().toString().slice(-8)}`;
                      alert(`Tracking Number: ${trackingNumber}\n\nUse this number to track the shipment.`);
                    }}
                    className="text-gray-600 hover:text-black transition-colors"
                  >
                    TRACK
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-light text-black tracking-wide mb-12">ADMIN DASHBOARD</h1>
      
      {/* 탭 네비게이션 */}
      <div className="border-b border-gray-200 mb-16">
        <nav className="-mb-px flex space-x-12">
          <button
            onClick={() => setActiveTab('products')}
            className={`py-3 px-1 border-b-2 font-light text-sm tracking-wide transition-colors ${
              activeTab === 'products'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-black hover:border-gray-300'
            }`}
          >
            PRODUCTS
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-1 border-b-2 font-light text-sm tracking-wide transition-colors ${
              activeTab === 'orders'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-black hover:border-gray-300'
            }`}
          >
            ORDERS
          </button>
          <button
            onClick={() => setActiveTab('sales')}
            className={`py-3 px-1 border-b-2 font-light text-sm tracking-wide transition-colors ${
              activeTab === 'sales'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-black hover:border-gray-300'
            }`}
          >
            ANALYTICS
          </button>
          <button
            onClick={() => setActiveTab('shipping')}
            className={`py-3 px-1 border-b-2 font-light text-sm tracking-wide transition-colors ${
              activeTab === 'shipping'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-black hover:border-gray-300'
            }`}
          >
            SHIPPING
          </button>
        </nav>
      </div>

      {/* 탭 컨텐츠 */}
      {activeTab === 'products' && renderProducts()}
      {activeTab === 'orders' && renderOrders()}
      {activeTab === 'sales' && renderSales()}
      {activeTab === 'shipping' && renderShipping()}
    </div>
  );
};

export default AdminPage;