import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase, ServiceRequest } from '../lib/supabase';
import { LogOut, Users, Clock, CheckCircle, XCircle, Search, Filter, Eye, Edit, Trash2, Mail, Phone, Calendar, AlertCircle, TrendingUp, LayoutDashboard, FileText, MessageSquare, Palette as Newsletter, Settings } from 'lucide-react';
import CMSManager from '../components/CMSManager';

interface NewsletterSubscription {
  id: string;
  email: string;
  name?: string;
  status: 'active' | 'unsubscribed';
  created_at: string;
  updated_at: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
  created_at: string;
  updated_at: string;
}

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [newsletterSubscriptions, setNewsletterSubscriptions] = useState<NewsletterSubscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | ContactMessage | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      if (!supabase) {
        console.error('Supabase client not initialized');
        return;
      }

      // Fetch service requests
      const { data: serviceData, error: serviceError } = await supabase
        .from('service_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (serviceError) throw serviceError;
      setServiceRequests(serviceData || []);

      // Fetch contact messages
      const { data: contactData, error: contactError } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (contactError) throw contactError;
      setContactMessages(contactData || []);

      // Fetch newsletter subscriptions
      const { data: newsletterData, error: newsletterError } = await supabase
        .from('newsletter_subscriptions')
        .select('*')
        .order('created_at', { ascending: false });

      if (newsletterError) throw newsletterError;
      setNewsletterSubscriptions(newsletterData || []);

    } catch (error) {
      console.error('Error fetching data:', error);
      if (error.message?.includes('JWT')) {
        alert('Session expired. Please log in again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = async (id: string, status: string, table: 'service_requests' | 'contact_messages' = 'service_requests') => {
    try {
      if (!supabase) {
        throw new Error('Database connection not available');
      }

      const { error } = await supabase
        .from(table)
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      
      if (table === 'service_requests') {
        setServiceRequests(prev => 
          prev.map(req => req.id === id ? { ...req, status } : req)
        );
      } else {
        setContactMessages(prev => 
          prev.map(req => req.id === id ? { ...req, status } : req)
        );
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status. Please try again.');
    }
  };

  const deleteRequest = async (id: string, table: 'service_requests' | 'contact_messages' = 'service_requests') => {
    if (!confirm(`Are you sure you want to delete this ${table === 'service_requests' ? 'service request' : 'contact message'}?`)) return;

    try {
      if (!supabase) {
        throw new Error('Database connection not available');
      }

      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      if (table === 'service_requests') {
        setServiceRequests(prev => prev.filter(req => req.id !== id));
      } else {
        setContactMessages(prev => prev.filter(req => req.id !== id));
      }
      setShowModal(false);
    } catch (error) {
      console.error(`Error deleting ${table}:`, error);
      alert(`Failed to delete ${table === 'service_requests' ? 'service request' : 'contact message'}. Please try again.`);
    }
  };

  const deleteNewsletterSubscription = async (id: string) => {
    if (!confirm('Are you sure you want to delete this subscription?')) return;

    try {
      if (!supabase) {
        throw new Error('Database connection not available');
      }

      const { error } = await supabase
        .from('newsletter_subscriptions')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setNewsletterSubscriptions(prev => prev.filter(sub => sub.id !== id));
    } catch (error) {
      console.error('Error deleting subscription:', error);
      alert('Failed to delete subscription. Please try again.');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'unread': return 'bg-red-100 text-red-800';
      case 'read': return 'bg-blue-100 text-blue-800';
      case 'replied': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'unsubscribed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'normal': return 'bg-green-100 text-green-800';
      case 'urgent': return 'bg-orange-100 text-orange-800';
      case 'asap': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredData = () => {
    let data = [];
    if (activeTab === 'service-requests') {
      data = serviceRequests;
    } else if (activeTab === 'contact-messages') {
      data = contactMessages;
    } else if (activeTab === 'newsletter') {
      return newsletterSubscriptions.filter(sub => 
        sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (sub.name && sub.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    return data.filter(item => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.service && item.service.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.subject && item.subject.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  };

  const stats = {
    totalRequests: serviceRequests.length,
    pendingRequests: serviceRequests.filter(r => r.status === 'pending').length,
    inProgressRequests: serviceRequests.filter(r => r.status === 'in_progress').length,
    completedRequests: serviceRequests.filter(r => r.status === 'completed').length,
    totalContacts: contactMessages.length,
    unreadContacts: contactMessages.filter(c => c.status === 'unread').length,
    totalNewsletterSubs: newsletterSubscriptions.length,
    activeNewsletterSubs: newsletterSubscriptions.filter(s => s.status === 'active').length,
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'service-requests', label: 'Service Requests', icon: <FileText className="w-5 h-5" /> },
    { id: 'contact-messages', label: 'Contact Messages', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'newsletter', label: 'Newsletter Subscriptions', icon: <Newsletter className="w-5 h-5" /> },
    { id: 'cms', label: 'CMS Manager', icon: <Settings className="w-5 h-5" /> },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const renderDashboardOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <FileText className="w-8 h-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Service Requests</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalRequests}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <MessageSquare className="w-8 h-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Contact Messages</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalContacts}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Newsletter className="w-8 h-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Newsletter Subscribers</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalNewsletterSubs}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed Requests</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completedRequests}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Service Requests</h3>
          <div className="space-y-3">
            {serviceRequests.slice(0, 5).map((request) => (
              <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{request.name}</p>
                  <p className="text-sm text-gray-600">{request.service}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                  {request.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Contact Messages</h3>
          <div className="space-y-3">
            {contactMessages.slice(0, 5).map((message) => (
              <div key={message.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{message.name}</p>
                  <p className="text-sm text-gray-600">{message.subject || 'No subject'}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(message.status)}`}>
                  {message.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Newsletter Subscriptions</h3>
          <div className="space-y-3">
            {newsletterSubscriptions.slice(0, 5).map((subscription) => (
              <div key={subscription.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{subscription.name || 'Anonymous'}</p>
                  <p className="text-sm text-gray-600">{subscription.email}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(subscription.status)}`}>
                  {subscription.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Unread Messages</span>
              <span className="font-bold text-red-600">{stats.unreadContacts}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Pending Requests</span>
              <span className="font-bold text-yellow-600">{stats.pendingRequests}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Active Subscribers</span>
              <span className="font-bold text-green-600">{stats.activeNewsletterSubs}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Completed Projects</span>
              <span className="font-bold text-blue-600">{stats.completedRequests}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderServiceRequestsTable = () => {
    const data = filteredData();

    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-orange-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-orange-50 to-orange-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Urgency
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((request) => (
                <tr key={request.id} className="hover:bg-orange-25 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{request.name}</div>
                      <div className="text-sm text-gray-500">{request.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{request.service}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getUrgencyColor(request.urgency)}`}>
                      {request.urgency}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={request.status}
                      onChange={(e) => updateRequestStatus(request.id, e.target.value)}
                      className={`text-xs font-semibold rounded-full px-2 py-1 border-0 ${getStatusColor(request.status)}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(request.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedRequest(request);
                          setShowModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteRequest(request.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderContactMessagesTable = () => {
    const data = filteredData();

    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-blue-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Message Preview
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((message) => (
                <tr key={message.id} className="hover:bg-blue-25 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{message.name}</div>
                      <div className="text-sm text-gray-500">{message.email}</div>
                      {message.phone && (
                        <div className="text-xs text-gray-400">{message.phone}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{message.subject || 'No subject'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600 max-w-xs truncate">
                      {message.message}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={message.status}
                      onChange={(e) => updateRequestStatus(message.id, e.target.value, 'contact_messages')}
                      className={`text-xs font-semibold rounded-full px-2 py-1 border-0 ${getStatusColor(message.status)}`}
                    >
                      <option value="unread">Unread</option>
                      <option value="read">Read</option>
                      <option value="replied">Replied</option>
                      <option value="archived">Archived</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(message.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedRequest(message);
                          setShowModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <a
                        href={`mailto:${message.email}?subject=Re: ${message.subject || 'Your message'}`}
                        className="text-green-600 hover:text-green-900"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => deleteRequest(message.id, 'contact_messages')}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderNewsletterTable = () => {
    const data = filteredData();

    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-purple-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-purple-50 to-purple-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subscriber
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subscribed Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((subscription) => (
                <tr key={subscription.id} className="hover:bg-purple-25 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{subscription.name || 'Anonymous'}</div>
                      <div className="text-sm text-gray-500">{subscription.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(subscription.status)}`}>
                      {subscription.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(subscription.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <a
                        href={`mailto:${subscription.email}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => deleteNewsletterSubscription(subscription.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderDataTable = () => {
    if (activeTab === 'newsletter') {
      return renderNewsletterTable();
    } else if (activeTab === 'contact-messages') {
      return renderContactMessagesTable();
    } else if (activeTab === 'service-requests') {
      return renderServiceRequestsTable();
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <div className="flex items-center space-x-3">
            <img 
              src="/Shemmy Logos.jpg" 
              alt="Shemmy Mae Logo" 
              className="w-10 h-10 object-contain"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-600">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="mt-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-6 py-3 text-left transition-colors ${
                activeTab === item.id
                  ? 'bg-orange-50 text-orange-600 border-r-2 border-orange-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-64 p-6 border-t border-gray-200">
          <div className="space-y-3">
            <div className="text-sm text-gray-600">
              <div className="font-medium">Welcome,</div>
              <div className="truncate">{user?.email}</div>
            </div>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 capitalize">
            {activeTab === 'dashboard' ? 'Dashboard Overview' : activeTab.replace('-', ' ')}
            {activeTab === 'cms' && 'CMS Manager'}
          </h2>
          <p className="text-gray-600">
            {activeTab === 'dashboard' && 'Overview of all your business metrics'}
            {activeTab === 'service-requests' && 'Manage service requests from your website'}
            {activeTab === 'contact-messages' && 'View and respond to contact form submissions'}
            {activeTab === 'newsletter' && 'Manage newsletter subscriptions'}
            {activeTab === 'cms' && 'Manage website content, images, and sections'}
          </p>
        </div>

        {activeTab === 'dashboard' ? (
          renderDashboardOverview()
        ) : activeTab === 'cms' ? (
          <CMSManager />
        ) : (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder={`Search ${
                        activeTab === 'newsletter' ? 'subscribers' : 
                        activeTab === 'contact-messages' ? 'messages' : 'requests'
                      }...`}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
                {activeTab !== 'newsletter' && (
                  <div className="sm:w-48">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="all">All Status</option>
                      {activeTab === 'service-requests' ? (
                        <>
                          <option value="pending">Pending</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </>
                      ) : (
                        <>
                          <option value="unread">Unread</option>
                          <option value="read">Read</option>
                          <option value="replied">Replied</option>
                          <option value="archived">Archived</option>
                        </>
                      )}
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Data Table */}
            {renderDataTable()}

            {filteredData().length === 0 && (
              <div className="text-center py-12">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No data found</h3>
                <p className="text-gray-500">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Try adjusting your search or filter criteria.'
                    : `No ${activeTab.replace('-', ' ')} ${activeTab === 'newsletter' ? 'subscriptions' : ''} have been submitted yet.`
                  }
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Request Details Modal */}
      {showModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedRequest.service ? 'Service Request Details' : 'Contact Message Details'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Client Information</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Name:</span>
                        <span className="text-sm font-medium">{selectedRequest.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Email:</span>
                        <a href={`mailto:${selectedRequest.email}`} className="text-sm font-medium text-blue-600 hover:text-blue-800">
                          {selectedRequest.email}
                        </a>
                      </div>
                      {selectedRequest.phone && (
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">Phone:</span>
                          <a href={`tel:${selectedRequest.phone}`} className="text-sm font-medium text-blue-600 hover:text-blue-800">
                            {selectedRequest.phone}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      {selectedRequest.service ? 'Service Request Details' : 'Message Details'}
                    </h4>
                    <div className="space-y-2">
                      {selectedRequest.service ? (
                        <>
                          <div>
                            <span className="text-sm text-gray-600">Service:</span>
                            <span className="text-sm font-medium ml-2">{selectedRequest.service}</span>
                          </div>
                          <div>
                            <span className="text-sm text-gray-600">Urgency:</span>
                            <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getUrgencyColor(selectedRequest.urgency)}`}>
                              {selectedRequest.urgency}
                            </span>
                          </div>
                        </>
                      ) : (
                        <div>
                          <span className="text-sm text-gray-600">Subject:</span>
                          <span className="text-sm font-medium ml-2">{selectedRequest.subject || 'No subject'}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-sm text-gray-600">Status:</span>
                        <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedRequest.status)}`}>
                          {selectedRequest.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Submitted:</span>
                        <span className="text-sm font-medium">{new Date(selectedRequest.created_at).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    {selectedRequest.service ? 'Project Details' : 'Message'}
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedRequest.message}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-6 border-t">
                  <div className="flex space-x-2">
                    <a
                      href={`mailto:${selectedRequest.email}?subject=Re: ${selectedRequest.service || selectedRequest.subject || 'Your message'}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Reply via Email</span>
                    </a>
                    {selectedRequest.phone && (
                      <a
                        href={`tel:${selectedRequest.phone}`}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                      >
                        <Phone className="w-4 h-4" />
                        <span>Call Client</span>
                      </a>
                    )}
                  </div>
                  <button
                    onClick={() => deleteRequest(selectedRequest.id, selectedRequest.service ? 'service_requests' : 'contact_messages')}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete {selectedRequest.service ? 'Request' : 'Message'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;