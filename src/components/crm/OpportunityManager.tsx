import React, { useState, useEffect } from 'react';
import { supabase, CRMOpportunity, CRMContact, CRMLead } from '../../lib/supabase';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  X,
  Save,
  CheckCircle,
  AlertCircle,
  Briefcase,
  DollarSign,
  Calendar,
  TrendingUp
} from 'lucide-react';

const formatKES = (value: number) => 
  new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(value);

const OpportunitiesPage: React.FC = () => {
  const [opportunities, setOpportunities] = useState<CRMOpportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOpportunity, setSelectedOpportunity] = useState<CRMOpportunity | null>(null);

  // Fetch data
  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const { data, error } = await supabase.from('crm_opportunities').select('*');
        if (error) throw error;
        setOpportunities(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <DollarSign className="text-green-500 w-6 h-6 mr-2" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatKES(opportunities.reduce((sum, opp) => sum + opp.value, 0))}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {opportunities.map((opportunity) => (
              <tr key={opportunity.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{opportunity.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatKES(opportunity.value)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{opportunity.stage}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => setSelectedOpportunity(opportunity)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      {selectedOpportunity && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Opportunity Details</h2>
              <button onClick={() => setSelectedOpportunity(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <p><strong>Name:</strong> {selectedOpportunity.name}</p>
            <p><strong>Value:</strong> {formatKES(selectedOpportunity.value)}</p>
            <p><strong>Stage:</strong> {selectedOpportunity.stage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpportunitiesPage;
