import React, { useState, useEffect } from 'react';
import { supabase, CRMOpportunity, CRMPipeline, CRMPipelineStage } from '../../lib/supabase';
import { 
  Plus, 
  Edit, 
  Trash2, 
  X,
  Save,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  DollarSign,
  BarChart3
} from 'lucide-react';

const PipelineManager = () => {
  const [opportunities, setOpportunities] = useState<CRMOpportunity[]>([]);
  const [pipelines, setPipelines] = useState<CRMPipeline[]>([]);
  const [stages, setStages] = useState<CRMPipelineStage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPipeline, setSelectedPipeline] = useState<string>('');
  const [showAddStageModal, setShowAddStageModal] = useState(false);
  const [editingStage, setEditingStage] = useState<CRMPipelineStage | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const [newStage, setNewStage] = useState({
    name: '',
    description: '',
    stage_order: 1,
    probability: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (pipelines.length > 0 && !selectedPipeline) {
      setSelectedPipeline(pipelines[0].id);
    }
  }, [pipelines]);

  const fetchData = async () => {
    try {
      if (!supabase) {
        throw new Error('Database connection not available');
      }

      const [opportunitiesResult, pipelinesResult, stagesResult] = await Promise.all([
        supabase.from('crm_opportunities').select('*').order('created_at', { ascending: false }),
        supabase.from('crm_pipelines').select('*').eq('is_active', true).order('name'),
        supabase.from('crm_pipeline_stages').select('*').order('stage_order')
      ]);

      if (opportunitiesResult.error) throw opportunitiesResult.error;
      if (pipelinesResult.error) throw pipelinesResult.error;
      if (stagesResult.error) throw stagesResult.error;

      setOpportunities(opportunitiesResult.data || []);
      setPipelines(pipelinesResult.data || []);
      setStages(stagesResult.data || []);
    } catch (error) {
      console.error('Error fetching pipeline data:', error);
      showMessage('error', 'Failed to load pipeline data');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const addStage = async () => {
    setSaving(true);
    try {
      if (!supabase || !selectedPipeline) {
        throw new Error('Database connection not available or no pipeline selected');
      }

      const { data, error } = await supabase
        .from('crm_pipeline_stages')
        .insert([{
          ...newStage,
          pipeline_id: selectedPipeline
        }])
        .select()
        .single();

      if (error) throw error;

      setStages(prev => [...prev, data].sort((a, b) => a.stage_order - b.stage_order));
      setShowAddStageModal(false);
      resetNewStage();
      showMessage('success', 'Stage added successfully');
    } catch (error) {
      console.error('Error adding stage:', error);
      showMessage('error', 'Failed to add stage');
    } finally {
      setSaving(false);
    }
  };

  const updateStage = async (stage: CRMPipelineStage) => {
    setSaving(true);
    try {
      if (!supabase) {
        throw new Error('Database connection not available');
      }

      const { error } = await supabase
        .from('crm_pipeline_stages')
        .update(stage)
        .eq('id', stage.id);

      if (error) throw error;

      setStages(prev => prev.map(s => s.id === stage.id ? stage : s).sort((a, b) => a.stage_order - b.stage_order));
      setEditingStage(null);
      showMessage('success', 'Stage updated successfully');
    } catch (error) {
      console.error('Error updating stage:', error);
      showMessage('error', 'Failed to update stage');
    } finally {
      setSaving(false);
    }
  };

  const deleteStage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this stage? This action cannot be undone.')) return;

    try {
      if (!supabase) {
        throw new Error('Database connection not available');
      }

      const { error } = await supabase
        .from('crm_pipeline_stages')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setStages(prev => prev.filter(s => s.id !== id));
      showMessage('success', 'Stage deleted successfully');
    } catch (error) {
      console.error('Error deleting stage:', error);
      showMessage('error', 'Failed to delete stage');
    }
  };

  const updateOpportunityStage = async (opportunityId: string, newStage: string) => {
    try {
      if (!supabase) {
        throw new Error('Database connection not available');
      }

      const { error } = await supabase
        .from('crm_opportunities')
        .update({ stage: newStage })
        .eq('id', opportunityId);

      if (error) throw error;

      setOpportunities(prev => prev.map(opp => 
        opp.id === opportunityId ? { ...opp, stage: newStage } : opp
      ));

      showMessage('success', 'Opportunity moved successfully');
    } catch (error) {
      console.error('Error updating opportunity stage:', error);
      showMessage('error', 'Failed to move opportunity');
    }
  };

  const resetNewStage = () => {
    setNewStage({
      name: '',
      description: '',
      stage_order: Math.max(...stages.map(s => s.stage_order), 0) + 1,
      probability: 0
    });
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'prospecting': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'qualification': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'proposal': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'negotiation': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'closed_won': return 'bg-green-100 text-green-800 border-green-200';
      case 'closed_lost': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const currentStages = stages.filter(stage => stage.pipeline_id === selectedPipeline);
  const stageOpportunities = (stageName: string) => 
    opportunities.filter(opp => opp.stage === stageName);

  const getTotalValue = (stageName: string) => 
    stageOpportunities(stageName).reduce((sum, opp) => sum + opp.value, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Sales Pipeline Management</h3>
          <p className="text-gray-600">Visualize and manage your sales pipeline</p>
        </div>
        <button
          onClick={() => setShowAddStageModal(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Stage</span>
        </button>
      </div>

      {/* Message */}
      {message && (
        <div className={`p-4 rounded-lg flex items-center space-x-2 ${
          message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          {message.type === 'success' ? 
            <CheckCircle className="w-5 h-5" /> : 
            <AlertCircle className="w-5 h-5" />
          }
          <span>{message.text}</span>
        </div>
      )}

      {/* Pipeline Selector */}
      {pipelines.length > 1 && (
        <div className="bg-white rounded-lg shadow p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Pipeline
          </label>
          <select
            value={selectedPipeline}
            onChange={(e) => setSelectedPipeline(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            {pipelines.map(pipeline => (
              <option key={pipeline.id} value={pipeline.id}>
                {pipeline.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Pipeline Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Opportunities</p>
              <p className="text-2xl font-bold text-gray-900">{opportunities.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Pipeline Value</p>
              <p className="text-2xl font-bold text-gray-900">
                ${opportunities.reduce((sum, opp) => sum + opp.value, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Won Deals</p>
              <p className="text-2xl font-bold text-gray-900">
                {opportunities.filter(opp => opp.stage === 'closed_won').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Win Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {opportunities.length > 0 ? 
                  Math.round((opportunities.filter(opp => opp.stage === 'closed_won').length / opportunities.length) * 100) : 0
                }%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pipeline Board */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentStages.map((stage) => (
            <div key={stage.id} className="min-h-[400px]">
              <div className={`rounded-lg border-2 ${getStageColor(stage.name.toLowerCase().replace(' ', '_'))} p-4 mb-4`}>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold">{stage.name}</h4>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => setEditingStage(stage)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteStage(stage.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="text-sm">
                  <div>Count: {stageOpportunities(stage.name.toLowerCase().replace(' ', '_')).length}</div>
                  <div>Value: ${getTotalValue(stage.name.toLowerCase().replace(' ', '_')).toLocaleString()}</div>
                  <div>Probability: {stage.probability}%</div>
                </div>
              </div>

              <div className="space-y-3 max-h-80 overflow-y-auto">
                {stageOpportunities(stage.name.toLowerCase().replace(' ', '_')).map((opportunity) => (
                  <div
                    key={opportunity.id}
                    className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-move"
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/plain', opportunity.id);
                    }}
                  >
                    <h5 className="font-medium text-gray-900 mb-2 text-sm">{opportunity.name}</h5>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div className="flex justify-between">
                        <span>Value:</span>
                        <span className="font-medium">${(opportunity.value / 1000).toFixed(0)}k</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Probability:</span>
                        <span>{opportunity.probability}%</span>
                      </div>
                      {opportunity.expected_close_date && (
                        <div className="flex justify-between">
                          <span>Close Date:</span>
                          <span>{new Date(opportunity.expected_close_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Drop Zone */}
              <div
                className="mt-4 p-3 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500 hover:border-orange-500 hover:text-orange-500 transition-colors text-sm"
                onDragOver={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.add('border-orange-500', 'text-orange-500');
                }}
                onDragLeave={(e) => {
                  e.currentTarget.classList.remove('border-orange-500', 'text-orange-500');
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  const opportunityId = e.dataTransfer.getData('text/plain');
                  const newStage = stage.name.toLowerCase().replace(' ', '_');
                  updateOpportunityStage(opportunityId, newStage);
                  e.currentTarget.classList.remove('border-orange-500', 'text-orange-500');
                }}
              >
                Drop here
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Stage Modal */}
      {showAddStageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Add New Stage</h3>
                <button
                  onClick={() => {
                    setShowAddStageModal(false);
                    resetNewStage();
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stage Name *
                  </label>
                  <input
                    type="text"
                    value={newStage.name}
                    onChange={(e) => setNewStage({...newStage, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newStage.description}
                    onChange={(e) => setNewStage({...newStage, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stage Order
                  </label>
                  <input
                    type="number"
                    value={newStage.stage_order}
                    onChange={(e) => setNewStage({...newStage, stage_order: parseInt(e.target.value) || 1})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Probability (%)
                  </label>
                  <input
                    type="number"
                    value={newStage.probability}
                    onChange={(e) => setNewStage({...newStage, probability: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
                <button
                  onClick={() => {
                    setShowAddStageModal(false);
                    resetNewStage();
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addStage}
                  disabled={saving || !newStage.name}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors flex items-center space-x-2 disabled:opacity-50"
                >
                  {saving ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                  <span>Add Stage</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Stage Modal */}
      {editingStage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Edit Stage</h3>
                <button
                  onClick={() => setEditingStage(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stage Name *
                  </label>
                  <input
                    type="text"
                    value={editingStage.name}
                    onChange={(e) => setEditingStage({...editingStage, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={editingStage.description || ''}
                    onChange={(e) => setEditingStage({...editingStage, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stage Order
                  </label>
                  <input
                    type="number"
                    value={editingStage.stage_order}
                    onChange={(e) => setEditingStage({...editingStage, stage_order: parseInt(e.target.value) || 1})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Probability (%)
                  </label>
                  <input
                    type="number"
                    value={editingStage.probability}
                    onChange={(e) => setEditingStage({...editingStage, probability: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
                <button
                  onClick={() => setEditingStage(null)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => updateStage(editingStage)}
                  disabled={saving || !editingStage.name}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors flex items-center space-x-2 disabled:opacity-50"
                >
                  {saving ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PipelineManager;