import React, { useState, useEffect } from 'react';
import { supabase, CRMWorkflow } from '../../lib/supabase';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  X,
  Save,
  CheckCircle,
  AlertCircle,
  Workflow,
  Play,
  Pause,
  Settings,
  Zap
} from 'lucide-react';

const WorkflowManager = () => {
  const [workflows, setWorkflows] = useState<CRMWorkflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingWorkflow, setEditingWorkflow] = useState<CRMWorkflow | null>(null);
  const [viewingWorkflow, setViewingWorkflow] = useState<CRMWorkflow | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const [newWorkflow, setNewWorkflow] = useState({
    name: '',
    description: '',
    trigger_type: 'contact_created' as const,
    trigger_conditions: {},
    actions: [],
    is_active: true
  });

  const triggerTypes = [
    { value: 'contact_created', label: 'Contact Created' },
    { value: 'lead_created', label: 'Lead Created' },
    { value: 'opportunity_created', label: 'Opportunity Created' },
    { value: 'task_completed', label: 'Task Completed' },
    { value: 'stage_changed', label: 'Stage Changed' }
  ];

  const actionTypes = [
    { value: 'send_email', label: 'Send Email' },
    { value: 'create_task', label: 'Create Task' },
    { value: 'update_field', label: 'Update Field' },
    { value: 'assign_to_user', label: 'Assign to User' },
    { value: 'add_tag', label: 'Add Tag' },
    { value: 'send_notification', label: 'Send Notification' }
  ];

  useEffect(() => {
    fetchWorkflows();
  }, []);

  const fetchWorkflows = async () => {
    try {
      if (!supabase) {
        throw new Error('Database connection not available');
      }

      const { data, error } = await supabase
        .from('crm_workflows')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWorkflows(data || []);
    } catch (error) {
      console.error('Error fetching workflows:', error);
      showMessage('error', 'Failed to load workflows');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const addWorkflow = async () => {
    setSaving(true);
    try {
      if (!supabase) {
        throw new Error('Database connection not available');
      }

      const { data, error } = await supabase
        .from('crm_workflows')
        .insert([newWorkflow])
        .select()
        .single();

      if (error) throw error;

      setWorkflows(prev => [data, ...prev]);
      setShowAddModal(false);
      resetNewWorkflow();
      showMessage('success', 'Workflow created successfully');
    } catch (error) {
      console.error('Error adding workflow:', error);
      showMessage('error', 'Failed to create workflow');
    } finally {
      setSaving(false);
    }
  };

  const updateWorkflow = async (workflow: CRMWorkflow) => {
    setSaving(true);
    try {
      if (!supabase) {
        throw new Error('Database connection not available');
      }

      const { error } = await supabase
        .from('crm_workflows')
        .update(workflow)
        .eq('id', workflow.id);

      if (error) throw error;

      setWorkflows(prev => prev.map(w => w.id === workflow.id ? workflow : w));
      setEditingWorkflow(null);
      showMessage('success', 'Workflow updated successfully');
    } catch (error) {
      console.error('Error updating workflow:', error);
      showMessage('error', 'Failed to update workflow');
    } finally {
      setSaving(false);
    }
  };

  const deleteWorkflow = async (id: string) => {
    if (!confirm('Are you sure you want to delete this workflow?')) return;

    try {
      if (!supabase) {
        throw new Error('Database connection not available');
      }

      const { error } = await supabase
        .from('crm_workflows')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setWorkflows(prev => prev.filter(w => w.id !== id));
      showMessage('success', 'Workflow deleted successfully');
    } catch (error) {
      console.error('Error deleting workflow:', error);
      showMessage('error', 'Failed to delete workflow');
    }
  };

  const toggleWorkflowStatus = async (workflow: CRMWorkflow) => {
    const updatedWorkflow = { ...workflow, is_active: !workflow.is_active };
    await updateWorkflow(updatedWorkflow);
  };

  const resetNewWorkflow = () => {
    setNewWorkflow({
      name: '',
      description: '',
      trigger_type: 'contact_created',
      trigger_conditions: {},
      actions: [],
      is_active: true
    });
  };

  const addAction = () => {
    setNewWorkflow(prev => ({
      ...prev,
      actions: [...prev.actions, { type: 'send_email', config: {} }]
    }));
  };

  const updateAction = (index: number, action: any) => {
    setNewWorkflow(prev => ({
      ...prev,
      actions: prev.actions.map((a, i) => i === index ? action : a)
    }));
  };

  const removeAction = (index: number) => {
    setNewWorkflow(prev => ({
      ...prev,
      actions: prev.actions.filter((_, i) => i !== index)
    }));
  };

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
          <h3 className="text-2xl font-bold text-gray-900">Workflow Automation</h3>
          <p className="text-gray-600">Automate your CRM processes with custom workflows</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Create Workflow</span>
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

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Workflow className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Workflows</p>
              <p className="text-2xl font-bold text-gray-900">{workflows.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Play className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Workflows</p>
              <p className="text-2xl font-bold text-gray-900">{workflows.filter(w => w.is_active).length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Pause className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Inactive Workflows</p>
              <p className="text-2xl font-bold text-gray-900">{workflows.filter(w => !w.is_active).length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Automations</p>
              <p className="text-2xl font-bold text-gray-900">
                {workflows.reduce((sum, w) => sum + (w.actions?.length || 0), 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Workflows List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Workflow
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trigger
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {workflows.map((workflow) => (
                <tr key={workflow.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{workflow.name}</div>
                      <div className="text-sm text-gray-500">{workflow.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {triggerTypes.find(t => t.value === workflow.trigger_type)?.label || workflow.trigger_type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {workflow.actions?.length || 0} actions
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleWorkflowStatus(workflow)}
                      className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
                        workflow.is_active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {workflow.is_active ? <Play className="w-3 h-3 mr-1" /> : <Pause className="w-3 h-3 mr-1" />}
                      {workflow.is_active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setViewingWorkflow(workflow);
                          setShowViewModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setEditingWorkflow(workflow)}
                        className="text-green-600 hover:text-green-900"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteWorkflow(workflow.id)}
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

      {/* Add Workflow Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Create New Workflow</h3>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    resetNewWorkflow();
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Workflow Name *
                    </label>
                    <input
                      type="text"
                      value={newWorkflow.name}
                      onChange={(e) => setNewWorkflow({...newWorkflow, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter workflow name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={newWorkflow.description}
                      onChange={(e) => setNewWorkflow({...newWorkflow, description: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Describe what this workflow does"
                    />
                  </div>
                </div>

                {/* Trigger */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Trigger</h4>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      When should this workflow run?
                    </label>
                    <select
                      value={newWorkflow.trigger_type}
                      onChange={(e) => setNewWorkflow({...newWorkflow, trigger_type: e.target.value as any})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      {triggerTypes.map(trigger => (
                        <option key={trigger.value} value={trigger.value}>
                          {trigger.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Actions */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-lg font-semibold text-gray-900">Actions</h4>
                    <button
                      onClick={addAction}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm flex items-center space-x-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Action</span>
                    </button>
                  </div>
                  
                  {newWorkflow.actions.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No actions added yet. Click "Add Action" to get started.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {newWorkflow.actions.map((action, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <h5 className="font-medium text-gray-900">Action {index + 1}</h5>
                            <button
                              onClick={() => removeAction(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <select
                            value={action.type}
                            onChange={(e) => updateAction(index, { ...action, type: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          >
                            {actionTypes.map(actionType => (
                              <option key={actionType.value} value={actionType.value}>
                                {actionType.label}
                              </option>
                            ))}
                          </select>
                          
                          {/* Action-specific configuration */}
                          {action.type === 'send_email' && (
                            <div className="mt-3 space-y-2">
                              <input
                                type="text"
                                placeholder="Email subject"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                                onChange={(e) => updateAction(index, { 
                                  ...action, 
                                  config: { ...action.config, subject: e.target.value }
                                })}
                              />
                              <textarea
                                placeholder="Email body"
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                                onChange={(e) => updateAction(index, { 
                                  ...action, 
                                  config: { ...action.config, body: e.target.value }
                                })}
                              />
                            </div>
                          )}
                          
                          {action.type === 'create_task' && (
                            <div className="mt-3 space-y-2">
                              <input
                                type="text"
                                placeholder="Task title"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                                onChange={(e) => updateAction(index, { 
                                  ...action, 
                                  config: { ...action.config, title: e.target.value }
                                })}
                              />
                              <textarea
                                placeholder="Task description"
                                rows={2}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                                onChange={(e) => updateAction(index, { 
                                  ...action, 
                                  config: { ...action.config, description: e.target.value }
                                })}
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Status */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={newWorkflow.is_active}
                    onChange={(e) => setNewWorkflow({...newWorkflow, is_active: e.target.checked})}
                    className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                    Activate workflow immediately
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    resetNewWorkflow();
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addWorkflow}
                  disabled={saving || !newWorkflow.name || newWorkflow.actions.length === 0}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors flex items-center space-x-2 disabled:opacity-50"
                >
                  {saving ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                  <span>Create Workflow</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Workflow Modal */}
      {showViewModal && viewingWorkflow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Workflow Details</h3>
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    setViewingWorkflow(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Basic Information</h4>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div><strong>Name:</strong> {viewingWorkflow.name}</div>
                    <div><strong>Description:</strong> {viewingWorkflow.description || 'No description'}</div>
                    <div><strong>Status:</strong> 
                      <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${
                        viewingWorkflow.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {viewingWorkflow.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Trigger</h4>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">
                        {triggerTypes.find(t => t.value === viewingWorkflow.trigger_type)?.label || viewingWorkflow.trigger_type}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Actions ({viewingWorkflow.actions?.length || 0})</h4>
                  <div className="space-y-3">
                    {viewingWorkflow.actions?.map((action, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Settings className="w-4 h-4 text-gray-600" />
                          <span className="font-medium">
                            {actionTypes.find(a => a.value === action.type)?.label || action.type}
                          </span>
                        </div>
                        {action.config && Object.keys(action.config).length > 0 && (
                          <div className="text-sm text-gray-600 ml-6">
                            {Object.entries(action.config).map(([key, value]) => (
                              <div key={key}>
                                <strong>{key}:</strong> {String(value)}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )) || (
                      <div className="text-gray-500 text-center py-4">No actions configured</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    setViewingWorkflow(null);
                    setEditingWorkflow(viewingWorkflow);
                  }}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors flex items-center space-x-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Workflow</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkflowManager;