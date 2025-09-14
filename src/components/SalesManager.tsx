import React, { useState, useEffect } from 'react';
import { FileText, Users, BarChart2, DollarSign, Plus, Edit, Trash2, Eye, X, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

const TABS = [
  { key: 'quotes', label: 'Quotations', icon: <FileText className="w-5 h-5" /> },
  { key: 'clients', label: 'Clients', icon: <Users className="w-5 h-5" /> },
  { key: 'analytics', label: 'Analytics', icon: <BarChart2 className="w-5 h-5" /> },
];

const initialQuote = {
  client_id: '',
  items: [],
  subtotal: 0,
  tax: 0,
  discount: 0,
  total: 0,
  status: 'Draft',
};

const initialClient = {
  name: '',
  email: '',
  company: '',
  phone: '',
  tags: [],
  notes: '',
};

const SalesManager = () => {
  const [activeTab, setActiveTab] = useState('quotes');
  // Quotes
  const [quotes, setQuotes] = useState<any[]>([]);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [editingQuote, setEditingQuote] = useState<any | null>(null);
  // Clients
  const [clients, setClients] = useState<any[]>([]);
  const [showClientModal, setShowClientModal] = useState(false);
  const [editingClient, setEditingClient] = useState<any | null>(null);
  // Analytics
  const [quoteStats, setQuoteStats] = useState({ total: 0, accepted: 0, rejected: 0, revenue: 0 });
  // Shared
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Fetch data
  useEffect(() => {
    if (activeTab === 'quotes') fetchQuotes();
    if (activeTab === 'clients') fetchClients();
    if (activeTab === 'analytics') fetchQuoteStats();
    // eslint-disable-next-line
  }, [activeTab]);

  // Fetch Quotes
  const fetchQuotes = async () => {
    const { data, error } = await supabase.from('sales_quotes').select('*').order('created_at', { ascending: false });
    if (!error) setQuotes(data || []);
  };
  // Fetch Clients (from CRM contacts)
  const fetchClients = async () => {
    const { data, error } = await supabase.from('crm_contacts').select('*').order('created_at', { ascending: false });
    if (!error) setClients(data || []);
  };
  // Fetch Analytics
  const fetchQuoteStats = async () => {
    const { data, error } = await supabase.from('sales_quotes').select('*');
    if (!error && data) {
      const total = data.length;
      const accepted = data.filter((q: any) => q.status === 'Accepted').length;
      const rejected = data.filter((q: any) => q.status === 'Rejected').length;
      const revenue = data.filter((q: any) => q.status === 'Accepted').reduce((sum: number, q: any) => sum + (q.total || 0), 0);
      setQuoteStats({ total, accepted, rejected, revenue });
    }
  };

  // CRUD for Quotes
  const handleSaveQuote = async (quote: any) => {
    if (editingQuote) {
      // Update
      const { error } = await supabase.from('sales_quotes').update(quote).eq('id', editingQuote.id);
      if (!error) {
        setMessage({ type: 'success', text: 'Quote updated.' });
        fetchQuotes();
      }
    } else {
      // Create
      const { error } = await supabase.from('sales_quotes').insert([{ ...quote }]);
      if (!error) {
        setMessage({ type: 'success', text: 'Quote created.' });
        fetchQuotes();
      }
    }
    setShowQuoteModal(false);
    setEditingQuote(null);
  };
  const handleDeleteQuote = async (id: string) => {
    if (!window.confirm('Delete this quote?')) return;
    const { error } = await supabase.from('sales_quotes').delete().eq('id', id);
    if (!error) {
      setMessage({ type: 'success', text: 'Quote deleted.' });
      fetchQuotes();
    }
  };

  // CRUD for Clients (on CRM contacts)
  const handleSaveClient = async (client: any) => {
    if (editingClient) {
      const { error } = await supabase.from('crm_contacts').update(client).eq('id', editingClient.id);
      if (!error) {
        setMessage({ type: 'success', text: 'Client updated.' });
        fetchClients();
      }
    } else {
      const { error } = await supabase.from('crm_contacts').insert([{ ...client }]);
      if (!error) {
        setMessage({ type: 'success', text: 'Client created.' });
        fetchClients();
      }
    }
    setShowClientModal(false);
    setEditingClient(null);
  };
  const handleDeleteClient = async (id: string) => {
    if (!window.confirm('Delete this client?')) return;
    const { error } = await supabase.from('crm_contacts').delete().eq('id', id);
    if (!error) {
      setMessage({ type: 'success', text: 'Client deleted.' });
      fetchClients();
    }
  };

  // UI for Quotes
  const renderQuotes = () => (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Quotations</h3>
        <button className="flex items-center px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600" onClick={() => { setShowQuoteModal(true); setEditingQuote(null); }}>
          <Plus className="w-4 h-4 mr-1" /> New Quote
        </button>
      </div>
      {message && (
        <div className={`mb-4 p-3 rounded flex items-center space-x-2 ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <span>{message.text}</span>
        </div>
      )}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {quotes.map((q) => (
              <tr key={q.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{q.client_id}</td>
                <td className="px-6 py-4 whitespace-nowrap">KES {q.total?.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${q.status === 'Accepted' ? 'bg-green-100 text-green-800' : q.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>{q.status}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-2" onClick={() => { setEditingQuote(q); setShowQuoteModal(true); }}><Edit className="w-4 h-4" /></button>
                  <button className="text-red-600 hover:text-red-900" onClick={() => handleDeleteQuote(q.id)}><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Quote Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-bold">{editingQuote ? 'Edit Quote' : 'New Quote'}</h4>
              <button className="text-gray-400 hover:text-gray-600" onClick={() => { setShowQuoteModal(false); setEditingQuote(null); }}><X className="w-5 h-5" /></button>
            </div>
            {/* Simple form for demo purposes */}
            <form onSubmit={e => { e.preventDefault(); handleSaveQuote(editingQuote || initialQuote); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Client ID</label>
                <input className="border px-2 py-1 rounded w-full" value={editingQuote?.client_id || ''} onChange={e => setEditingQuote({ ...editingQuote, client_id: e.target.value })} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Total</label>
                <input type="number" className="border px-2 py-1 rounded w-full" value={editingQuote?.total || 0} onChange={e => setEditingQuote({ ...editingQuote, total: Number(e.target.value) })} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select className="border px-2 py-1 rounded w-full" value={editingQuote?.status || 'Draft'} onChange={e => setEditingQuote({ ...editingQuote, status: e.target.value })}>
                  <option value="Draft">Draft</option>
                  <option value="Sent">Sent</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Expired">Expired</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" className="bg-gray-200 px-4 py-2 rounded" onClick={() => { setShowQuoteModal(false); setEditingQuote(null); }}>Cancel</button>
                <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  // UI for Clients
  const renderClients = () => (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Clients</h3>
        <button className="flex items-center px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600" onClick={() => { setShowClientModal(true); setEditingClient(null); }}>
          <Plus className="w-4 h-4 mr-1" /> New Client
        </button>
      </div>
      {message && (
        <div className={`mb-4 p-3 rounded flex items-center space-x-2 ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <span>{message.text}</span>
        </div>
      )}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {clients.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{c.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{c.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{c.company}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-2" onClick={() => { setEditingClient(c); setShowClientModal(true); }}><Edit className="w-4 h-4" /></button>
                  <button className="text-red-600 hover:text-red-900" onClick={() => handleDeleteClient(c.id)}><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Client Modal */}
      {showClientModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-bold">{editingClient ? 'Edit Client' : 'New Client'}</h4>
              <button className="text-gray-400 hover:text-gray-600" onClick={() => { setShowClientModal(false); setEditingClient(null); }}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={e => { e.preventDefault(); handleSaveClient(editingClient || initialClient); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input className="border px-2 py-1 rounded w-full" value={editingClient?.name || ''} onChange={e => setEditingClient({ ...editingClient, name: e.target.value })} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input className="border px-2 py-1 rounded w-full" value={editingClient?.email || ''} onChange={e => setEditingClient({ ...editingClient, email: e.target.value })} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Company</label>
                <input className="border px-2 py-1 rounded w-full" value={editingClient?.company || ''} onChange={e => setEditingClient({ ...editingClient, company: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input className="border px-2 py-1 rounded w-full" value={editingClient?.phone || ''} onChange={e => setEditingClient({ ...editingClient, phone: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Notes</label>
                <textarea className="border px-2 py-1 rounded w-full" value={editingClient?.notes || ''} onChange={e => setEditingClient({ ...editingClient, notes: e.target.value })} />
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" className="bg-gray-200 px-4 py-2 rounded" onClick={() => { setShowClientModal(false); setEditingClient(null); }}>Cancel</button>
                <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  // UI for Analytics
  const renderAnalytics = () => (
    <div>
      <h3 className="text-xl font-bold mb-4">Analytics & Reporting</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-3xl font-bold text-orange-600 mb-2">{quoteStats.total}</span>
          <span className="text-gray-600">Total Quotes</span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-3xl font-bold text-green-600 mb-2">{quoteStats.accepted}</span>
          <span className="text-gray-600">Accepted Quotes</span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-3xl font-bold text-red-600 mb-2">{quoteStats.rejected}</span>
          <span className="text-gray-600">Rejected Quotes</span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center md:col-span-3">
          <span className="text-3xl font-bold text-blue-600 mb-2">KES {quoteStats.revenue.toLocaleString()}</span>
          <span className="text-gray-600">Revenue from Accepted Quotes</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-[600px]">
      {/* Sidebar */}
      <div className="w-56 bg-white border-r border-gray-200 p-6">
        <h2 className="text-2xl font-bold mb-8">Sales Manager</h2>
        <nav className="flex flex-col space-y-2">
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors text-left ${activeTab === tab.key ? 'bg-orange-100 text-orange-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>
      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeTab === 'quotes' && renderQuotes()}
        {activeTab === 'clients' && renderClients()}
        {activeTab === 'analytics' && renderAnalytics()}
      </div>
    </div>
  );
};

export default SalesManager;
