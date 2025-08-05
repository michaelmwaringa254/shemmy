import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Target, 
  Calendar,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react';

const AnalyticsReports = () => {
  const [analytics, setAnalytics] = useState({
    totalContacts: 0,
    totalLeads: 0,
    totalOpportunities: 0,
    totalTasks: 0,
    totalRevenue: 0,
    wonDeals: 0,
    lostDeals: 0,
    conversionRate: 0,
    averageDealSize: 0,
    salesCycle: 0,
    monthlyRevenue: [],
    leadSources: [],
    stageDistribution: [],
    taskCompletion: 0,
    overdueTasksCount: 0
  });
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('30');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchAnalytics();
  }, [dateRange]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      if (!supabase) {
        throw new Error('Database connection not available');
      }

      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - parseInt(dateRange));

      // Fetch basic counts
      const [contactsResult, leadsResult, opportunitiesResult, tasksResult] = await Promise.all([
        supabase.from('crm_contacts').select('id', { count: 'exact' }),
        supabase.from('crm_leads').select('id', { count: 'exact' }),
        supabase.from('crm_opportunities').select('*'),
        supabase.from('crm_tasks').select('*')
      ]);

      const opportunities = opportunitiesResult.data || [];
      const tasks = tasksResult.data || [];

      // Calculate metrics
      const totalRevenue = opportunities
        .filter(opp => opp.stage === 'closed_won')
        .reduce((sum, opp) => sum + opp.value, 0);

      const wonDeals = opportunities.filter(opp => opp.stage === 'closed_won').length;
      const lostDeals = opportunities.filter(opp => opp.stage === 'closed_lost').length;
      const conversionRate = opportunities.length > 0 ? (wonDeals / opportunities.length) * 100 : 0;
      const averageDealSize = wonDeals > 0 ? totalRevenue / wonDeals : 0;

      // Task completion rate
      const completedTasks = tasks.filter(task => task.status === 'completed').length;
      const taskCompletion = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;

      // Overdue tasks
      const now = new Date();
      const overdueTasksCount = tasks.filter(task => 
        task.due_date && 
        new Date(task.due_date) < now && 
        task.status !== 'completed'
      ).length;

      // Stage distribution
      const stageDistribution = [
        { name: 'Prospecting', count: opportunities.filter(o => o.stage === 'prospecting').length },
        { name: 'Qualification', count: opportunities.filter(o => o.stage === 'qualification').length },
        { name: 'Proposal', count: opportunities.filter(o => o.stage === 'proposal').length },
        { name: 'Negotiation', count: opportunities.filter(o => o.stage === 'negotiation').length },
        { name: 'Closed Won', count: wonDeals },
        { name: 'Closed Lost', count: lostDeals }
      ];

      // Lead sources (mock data for now)
      const leadSources = [
        { name: 'Website', count: Math.floor(Math.random() * 50) + 10 },
        { name: 'Referral', count: Math.floor(Math.random() * 30) + 5 },
        { name: 'Social Media', count: Math.floor(Math.random() * 25) + 8 },
        { name: 'Email', count: Math.floor(Math.random() * 20) + 3 },
        { name: 'Other', count: Math.floor(Math.random() * 15) + 2 }
      ];

      // Monthly revenue (mock data for demonstration)
      const monthlyRevenue = Array.from({ length: 6 }, (_, i) => {
        const date = new Date();
        date.setMonth(date.getMonth() - (5 - i));
        return {
          month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          revenue: Math.floor(Math.random() * 50000) + 10000
        };
      });

      setAnalytics({
        totalContacts: contactsResult.count || 0,
        totalLeads: leadsResult.count || 0,
        totalOpportunities: opportunities.length,
        totalTasks: tasks.length,
        totalRevenue,
        wonDeals,
        lostDeals,
        conversionRate,
        averageDealSize,
        salesCycle: 30, // Mock data
        monthlyRevenue,
        leadSources,
        stageDistribution,
        taskCompletion,
        overdueTasksCount
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    setRefreshing(true);
    await fetchAnalytics();
    setRefreshing(false);
  };

  const exportReport = () => {
    const reportData = {
      generatedAt: new Date().toISOString(),
      dateRange: `${dateRange} days`,
      metrics: analytics
    };

    const dataStr = JSON.stringify(reportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `crm-analytics-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
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
          <h3 className="text-2xl font-bold text-gray-900">Analytics & Reports</h3>
          <p className="text-gray-600">Comprehensive insights into your CRM performance</p>
        </div>
        <div className="flex space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
          <button
            onClick={refreshData}
            disabled={refreshing}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={exportReport}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Contacts</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalContacts}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Leads</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalLeads}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${analytics.totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.conversionRate.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Sales Performance</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Won Deals</span>
              <span className="font-semibold text-green-600">{analytics.wonDeals}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Lost Deals</span>
              <span className="font-semibold text-red-600">{analytics.lostDeals}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Average Deal Size</span>
              <span className="font-semibold">${analytics.averageDealSize.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Sales Cycle</span>
              <span className="font-semibold">{analytics.salesCycle} days</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Task Management</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Tasks</span>
              <span className="font-semibold">{analytics.totalTasks}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Completion Rate</span>
              <span className="font-semibold text-green-600">{analytics.taskCompletion.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Overdue Tasks</span>
              <span className="font-semibold text-red-600">{analytics.overdueTasksCount}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Pipeline Health</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Opportunities</span>
              <span className="font-semibold">{analytics.totalOpportunities}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Pipeline Value</span>
              <span className="font-semibold">${analytics.totalRevenue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Win Rate</span>
              <span className="font-semibold text-green-600">{analytics.conversionRate.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stage Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Pipeline Stage Distribution</h4>
          <div className="space-y-3">
            {analytics.stageDistribution.map((stage, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-600">{stage.name}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full" 
                      style={{ 
                        width: `${analytics.totalOpportunities > 0 ? (stage.count / analytics.totalOpportunities) * 100 : 0}%` 
                      }}
                    ></div>
                  </div>
                  <span className="font-semibold text-sm w-8">{stage.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Sources */}
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Lead Sources</h4>
          <div className="space-y-3">
            {analytics.leadSources.map((source, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-600">{source.name}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ 
                        width: `${Math.max(...analytics.leadSources.map(s => s.count)) > 0 ? (source.count / Math.max(...analytics.leadSources.map(s => s.count))) * 100 : 0}%` 
                      }}
                    ></div>
                  </div>
                  <span className="font-semibold text-sm w-8">{source.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Revenue Trend */}
      <div className="bg-white rounded-lg shadow p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend (Last 6 Months)</h4>
        <div className="flex items-end space-x-2 h-64">
          {analytics.monthlyRevenue.map((month, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="bg-orange-500 rounded-t w-full min-h-[20px] flex items-end justify-center text-white text-xs font-semibold pb-1"
                style={{ 
                  height: `${(month.revenue / Math.max(...analytics.monthlyRevenue.map(m => m.revenue))) * 200 + 20}px` 
                }}
              >
                ${(month.revenue / 1000).toFixed(0)}k
              </div>
              <div className="text-xs text-gray-600 mt-2 text-center">{month.month}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Report Summary */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
        <h4 className="text-lg font-semibold mb-4">Performance Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-orange-100">Top Performing Metric</p>
            <p className="font-semibold">
              {analytics.conversionRate > 50 ? 'Conversion Rate' : 
               analytics.taskCompletion > 80 ? 'Task Completion' : 
               'Revenue Growth'}
            </p>
          </div>
          <div>
            <p className="text-orange-100">Areas for Improvement</p>
            <p className="font-semibold">
              {analytics.overdueTasksCount > 5 ? 'Task Management' : 
               analytics.conversionRate < 30 ? 'Lead Conversion' : 
               'Pipeline Management'}
            </p>
          </div>
          <div>
            <p className="text-orange-100">Next Action</p>
            <p className="font-semibold">
              {analytics.overdueTasksCount > 0 ? 'Review Overdue Tasks' : 
               analytics.totalLeads < 10 ? 'Generate More Leads' : 
               'Optimize Sales Process'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsReports;