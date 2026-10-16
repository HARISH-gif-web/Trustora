import React, { useState } from 'react';
import {
  ArrowLeft,
  ShieldCheck,
  Users,
  CheckCircle,
  XCircle,
  Activity,
  Calendar,
  DollarSign,
  TrendingUp,
  Cpu,
  BarChart3,
  Search,
  Filter,
  Check,
  X
} from 'lucide-react';
import { AI_ML_EVALUATION_METRICS } from '../data/mockData';

interface AdminDashboardScreenProps {
  onBack: () => void;
}

interface VerificationCandidate {
  id: string;
  name: string;
  category: string;
  phone: string;
  experienceYears: number;
  documentsSubmitted: string[];
  status: 'pending' | 'approved' | 'rejected';
}

export const AdminDashboardScreen: React.FC<AdminDashboardScreenProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'verifications' | 'ai_metrics'>('overview');
  const [candidates, setCandidates] = useState<VerificationCandidate[]>([
    {
      id: 'VRF-401',
      name: 'Ramesh Babu',
      category: 'Plumber',
      phone: '+91 98490 88776',
      experienceYears: 7,
      documentsSubmitted: ['Aadhaar Card', 'Trade ITI Certificate', 'Police Clearance Certificate'],
      status: 'pending'
    },
    {
      id: 'VRF-402',
      name: 'Mahesh Chary',
      category: 'Carpenter',
      phone: '+91 97000 33445',
      experienceYears: 10,
      documentsSubmitted: ['Aadhaar Card', 'Govt Skill Passbook', 'Bank Cancelled Cheque'],
      status: 'pending'
    },
    {
      id: 'VRF-403',
      name: 'Anita Devi',
      category: 'Cleaning',
      phone: '+91 98481 22334',
      experienceYears: 4,
      documentsSubmitted: ['Aadhaar Card', 'Police Record Check'],
      status: 'pending'
    }
  ]);

  const handleApprove = (id: string) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'approved' } : c))
    );
  };

  const handleReject = (id: string) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'rejected' } : c))
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
      {/* Top Admin Header */}
      <div className="sticky top-0 z-30 bg-slate-900 text-white px-4 py-3 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 -ml-2 rounded-full hover:bg-slate-800 text-slate-300 transition"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold">Trustora Admin & AI Control</h1>
                <span className="text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-400/30 px-2 py-0.5 rounded">
                  Operator Role
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 hidden sm:inline">Active Nodes: 4 Clusters</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-4">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1 shadow-xs mb-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition ${
              activeTab === 'overview'
                ? 'bg-purple-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Platform Overview
          </button>
          <button
            onClick={() => setActiveTab('verifications')}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition ${
              activeTab === 'verifications'
                ? 'bg-purple-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Verification Queue ({candidates.filter((c) => c.status === 'pending').length})
          </button>
          <button
            onClick={() => setActiveTab('ai_metrics')}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition ${
              activeTab === 'ai_metrics'
                ? 'bg-purple-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            AI Engineering & ML Metrics
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Top KPI Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Registered Seekers
                </span>
                <span className="text-2xl font-black text-slate-900 mt-1 block">14,820</span>
                <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
                  ↑ +18% this month
                </span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Verified Pros
                </span>
                <span className="text-2xl font-black text-slate-900 mt-1 block">1,240</span>
                <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
                  4.85 avg rating
                </span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Completed Jobs
                </span>
                <span className="text-2xl font-black text-slate-900 mt-1 block">38,910</span>
                <span className="text-[11px] text-teal-600 font-semibold mt-1 block">
                  99.2% fulfillment
                </span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Platform Gross
                </span>
                <span className="text-2xl font-black text-slate-900 mt-1 block">₹28.4L</span>
                <span className="text-[11px] text-purple-600 font-semibold mt-1 block">
                  100% On-time Payouts
                </span>
              </div>
            </div>

            {/* Platform Demand Trend Forecast */}
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">
                    Weekly Service Demand Forecast (AI Time-Series)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Prophet / ARIMA predictive dispatch forecasting for Hyderabad metro
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
                  MAE: 4.2%
                </span>
              </div>

              <div className="space-y-3">
                {AI_ML_EVALUATION_METRICS.demandForecasting.map((dayData) => (
                  <div key={dayData.day} className="flex items-center gap-3 text-xs">
                    <span className="w-8 font-bold text-slate-700">{dayData.day}</span>
                    <div className="flex-1 flex gap-1 h-5 bg-slate-100 rounded-md overflow-hidden p-0.5">
                      {/* Electrician */}
                      <div
                        style={{ width: `${dayData.electrician / 7}%` }}
                        className="bg-teal-600 rounded-sm"
                        title={`Electrician: ${dayData.electrician}`}
                      />
                      {/* Plumber */}
                      <div
                        style={{ width: `${dayData.plumber / 7}%` }}
                        className="bg-blue-600 rounded-sm"
                        title={`Plumber: ${dayData.plumber}`}
                      />
                      {/* AC Service */}
                      <div
                        style={{ width: `${dayData.ac_service / 7}%` }}
                        className="bg-amber-500 rounded-sm"
                        title={`AC Service: ${dayData.ac_service}`}
                      />
                      {/* Cleaning */}
                      <div
                        style={{ width: `${dayData.cleaning / 7}%` }}
                        className="bg-purple-600 rounded-sm"
                        title={`Cleaning: ${dayData.cleaning}`}
                      />
                    </div>
                    <span className="w-12 text-right font-mono font-bold text-slate-900">
                      {dayData.electrician + dayData.plumber + dayData.ac_service + dayData.cleaning}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4 mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-600 font-semibold justify-center">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-xs bg-teal-600" />
                  Electrician
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-xs bg-blue-600" />
                  Plumber
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-xs bg-amber-500" />
                  AC Service
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-xs bg-purple-600" />
                  Cleaning
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Verification Queue */}
        {activeTab === 'verifications' && (
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">
                  Professional Verification Workflow
                </h3>
                <p className="text-xs text-slate-500">
                  Review trade certificates, police clearance, and identity credentials
                </p>
              </div>
              <span className="text-xs font-bold bg-amber-50 text-amber-800 px-3 py-1 rounded-full">
                {candidates.filter((c) => c.status === 'pending').length} Action Required
              </span>
            </div>

            <div className="space-y-3.5">
              {candidates.map((cand) => (
                <div
                  key={cand.id}
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-500">{cand.id}</span>
                      <h4 className="font-bold text-slate-900 text-sm">{cand.name}</h4>
                      <span className="text-xs bg-teal-50 text-teal-800 px-2 py-0.2 rounded-md font-semibold">
                        {cand.category}
                      </span>
                    </div>

                    <div className="text-xs text-slate-500 mt-1">
                      <span>Phone: {cand.phone}</span>
                      <span className="mx-2">•</span>
                      <span>{cand.experienceYears} years trade experience</span>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      {cand.documentsSubmitted.map((doc, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md"
                        >
                          📄 {doc}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    {cand.status === 'pending' ? (
                      <>
                        <button
                          onClick={() => handleApprove(cand.id)}
                          className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1 shadow-xs transition"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve & Grant Badge</span>
                        </button>
                        <button
                          onClick={() => handleReject(cand.id)}
                          className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-xl transition"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span
                        className={`text-xs font-bold px-3 py-1.5 rounded-xl ${
                          cand.status === 'approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {cand.status === 'approved' ? '✓ Verified & Onboarded' : '✗ Application Rejected'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: AI Engineering & ML Metrics (Section 26 in spec) */}
        {activeTab === 'ai_metrics' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-teal-600" />
                    <span>Service Request NLP Classifier (DistilBERT + Ensemble)</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Evaluated on 3,500 natural language customer problem statements
                  </p>
                </div>
                <span className="text-xs font-mono font-bold bg-teal-50 text-teal-800 px-2.5 py-1 rounded-full border border-teal-200">
                  Latency: {AI_ML_EVALUATION_METRICS.classifier.inferenceLatencyMs}ms
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Accuracy</span>
                  <span className="text-xl font-black text-slate-900 block mt-1">
                    {AI_ML_EVALUATION_METRICS.classifier.accuracy}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Precision</span>
                  <span className="text-xl font-black text-slate-900 block mt-1">
                    {AI_ML_EVALUATION_METRICS.classifier.precision}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Recall</span>
                  <span className="text-xl font-black text-slate-900 block mt-1">
                    {AI_ML_EVALUATION_METRICS.classifier.recall}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">F1-Score</span>
                  <span className="text-xl font-black text-teal-700 block mt-1">
                    {AI_ML_EVALUATION_METRICS.classifier.f1Score}
                  </span>
                </div>
              </div>
            </div>

            {/* RAG Knowledge Grounding & Faithfulness */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs">
              <h3 className="font-extrabold text-slate-900 text-base mb-1 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>RAG Grounding & Hallucination Defense</span>
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Benchmarked against 1,420 Ground Truth Trustora policy & pricing QA pairs
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                  <span className="text-[11px] font-bold text-slate-500 uppercase">Faithfulness</span>
                  <span className="text-xl font-black text-emerald-800 block mt-1">
                    {AI_ML_EVALUATION_METRICS.ragGrounding.faithfulnessScore}
                  </span>
                </div>
                <div className="p-3 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                  <span className="text-[11px] font-bold text-slate-500 uppercase">Answer Relevance</span>
                  <span className="text-xl font-black text-emerald-800 block mt-1">
                    {AI_ML_EVALUATION_METRICS.ragGrounding.answerRelevance}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Hallucination Rate</span>
                  <span className="text-xl font-black text-emerald-700 block mt-1">
                    {AI_ML_EVALUATION_METRICS.ragGrounding.hallucinationRate}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Retrieval Latency</span>
                  <span className="text-xl font-black text-slate-900 block mt-1">
                    {AI_ML_EVALUATION_METRICS.ragGrounding.avgRetrievalLatencyMs}ms
                  </span>
                </div>
              </div>
            </div>

            {/* Recommendation Engine Evaluation */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs">
              <h3 className="font-extrabold text-slate-900 text-base mb-1 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <span>Two-Tower Provider Recommendation Ranking</span>
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Learned ranking balancing distance, verified rating, completion rate, and speed
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 bg-purple-50/50 rounded-2xl border border-purple-100">
                  <span className="text-[11px] font-bold text-slate-500 uppercase">NDCG @ 5</span>
                  <span className="text-xl font-black text-purple-800 block mt-1">
                    {AI_ML_EVALUATION_METRICS.recommendationEngine.ndcgAt5}
                  </span>
                </div>
                <div className="p-3 bg-purple-50/50 rounded-2xl border border-purple-100">
                  <span className="text-[11px] font-bold text-slate-500 uppercase">MAP @ 5</span>
                  <span className="text-xl font-black text-purple-800 block mt-1">
                    {AI_ML_EVALUATION_METRICS.recommendationEngine.mapAt5}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Match Acceptance</span>
                  <span className="text-xl font-black text-slate-900 block mt-1">
                    {AI_ML_EVALUATION_METRICS.recommendationEngine.providerMatchAcceptanceRate}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Avg Time to Match</span>
                  <span className="text-xl font-black text-slate-900 block mt-1">
                    {AI_ML_EVALUATION_METRICS.recommendationEngine.avgTimeToAcceptMinutes}m
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
