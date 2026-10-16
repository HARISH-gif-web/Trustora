import React, { useState } from 'react';
import {
  Briefcase,
  DollarSign,
  Clock,
  Star,
  User,
  HelpCircle,
  ChevronRight,
  ShieldCheck,
  Check,
  X,
  MapPin,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { UserProfile, Booking } from '../types';

interface HomeProviderScreenProps {
  user: UserProfile;
  onOpenMenu: () => void;
  onOpenAiAssistant: () => void;
  onViewBookingTracking?: (bookingId: string) => void;
}

interface IncomingRequest {
  id: string;
  customerName: string;
  category: string;
  problem: string;
  locationArea: string;
  distanceKm: number;
  timeSlot: string;
  amount: number;
  status: 'pending' | 'accepted' | 'declined';
}

export const HomeProviderScreen: React.FC<HomeProviderScreenProps> = ({
  user,
  onOpenMenu,
  onOpenAiAssistant,
  onViewBookingTracking
}) => {
  const [showRequestsModal, setShowRequestsModal] = useState(false);
  const [requests, setRequests] = useState<IncomingRequest[]>([
    {
      id: 'REQ-101',
      customerName: 'Ananya S.',
      category: 'Electrician',
      problem: 'Geyser thermostat tripped & not heating water',
      locationArea: 'Kondapur, Raghavendra Colony',
      distanceKm: 2.1,
      timeSlot: 'Today, 2:30 PM',
      amount: 450,
      status: 'pending'
    },
    {
      id: 'REQ-102',
      customerName: 'Vikram Patel',
      category: 'Electrician',
      problem: 'Bedroom ceiling fan replacement + switchboard check',
      locationArea: 'Madhapur, 100 Feet Road',
      distanceKm: 3.4,
      timeSlot: 'Today, 4:00 PM',
      amount: 350,
      status: 'pending'
    },
    {
      id: 'REQ-103',
      customerName: 'Deepak Rao',
      category: 'Electrician',
      problem: 'Main MCB tripping repeatedly on AC turn-on',
      locationArea: 'Gachibowli, Telecom Nagar',
      distanceKm: 4.8,
      timeSlot: 'Tomorrow, 10:00 AM',
      amount: 600,
      status: 'pending'
    }
  ]);

  const [activeTab, setActiveTab] = useState<'requests' | 'active_jobs'>('requests');

  const handleAccept = (id: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'accepted' } : r))
    );
  };

  const handleDecline = (id: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'declined' } : r))
    );
  };

  const pendingCount = requests.filter((r) => r.status === 'pending').length;

  return (
    <div className="pb-24 max-w-xl mx-auto px-4 font-sans">
      {/* Profile Card & Greeting (Screen 10 in wireframe) */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm mt-4 flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl overflow-hidden ring-4 ring-emerald-50 shrink-0">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-tight">
            Welcome, {user.name || 'Ravi'}!
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs font-semibold text-slate-600">Ravi Electrical Services</span>
            <span className="text-slate-300">•</span>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Active & Verified
            </span>
          </div>
        </div>
      </div>

      {/* 3 Metric Cards (Screen 10 in wireframe) */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-3 mt-4">
        {/* New Requests */}
        <div
          onClick={() => setShowRequestsModal(true)}
          className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-xs text-center cursor-pointer hover:border-teal-500 transition"
        >
          <span className="text-2xl sm:text-3xl font-black text-rose-600 block leading-none">
            {12}
          </span>
          <span className="text-[11px] font-bold text-slate-600 mt-1.5 block">New Requests</span>
        </div>

        {/* Today's Jobs */}
        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-xs text-center">
          <span className="text-2xl sm:text-3xl font-black text-slate-900 block leading-none">
            8
          </span>
          <span className="text-[11px] font-bold text-slate-600 mt-1.5 block">Today's Jobs</span>
        </div>

        {/* This Week's Earnings */}
        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-xs text-center">
          <span className="text-2xl sm:text-3xl font-black text-emerald-700 block leading-none">
            ₹3,250
          </span>
          <span className="text-[11px] font-bold text-slate-600 mt-1.5 block">This Week</span>
        </div>
      </div>

      {/* Primary CTA: "View New Requests (12)" (Screen 10 in wireframe) */}
      <button
        onClick={() => setShowRequestsModal(true)}
        className="w-full mt-4 py-3.5 bg-[#009688] hover:bg-[#00796B] active:scale-[0.99] text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
      >
        <span>View New Requests</span>
        <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs font-mono">
          {pendingCount + 9}
        </span>
      </button>

      {/* Provider Management Menu Cards (Screen 10 in wireframe) */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs mt-5 divide-y divide-slate-100 overflow-hidden">
        <button
          onClick={() => setShowRequestsModal(true)}
          className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition text-left"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 block">My Jobs</span>
              <span className="text-[11px] text-slate-500">2 In Progress • 6 Completed</span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400" />
        </button>

        <button
          onClick={() => {}}
          className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition text-left"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 block">My Earnings</span>
              <span className="text-[11px] text-slate-500">Weekly bank payout scheduled for Friday</span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400" />
        </button>

        <button
          onClick={() => {}}
          className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition text-left"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 block">My Availability</span>
              <span className="text-[11px] text-slate-500">Mon - Sat: 9:00 AM - 7:00 PM</span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400" />
        </button>

        <button
          onClick={() => {}}
          className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition text-left"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <Star className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 block">Customer Reviews</span>
              <span className="text-[11px] text-slate-500">★ 4.8 Rating (320 positive reviews)</span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400" />
        </button>

        <button
          onClick={() => {}}
          className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition text-left"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 block">My Profile & Documents</span>
              <span className="text-[11px] text-slate-500">Manage rate cards, areas & insurance</span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400" />
        </button>

        <button
          onClick={() => {}}
          className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition text-left"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 block">Help & Support</span>
              <span className="text-[11px] text-slate-500">24/7 dedicated pro helpline & safety</span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400" />
        </button>
      </div>

      {/* Incoming Requests Modal */}
      {showRequestsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">New Job Requests</h3>
                <p className="text-xs text-slate-500">Respond within 5 minutes to maintain rating</p>
              </div>
              <button
                onClick={() => setShowRequestsModal(false)}
                className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-3.5">
              {requests.map((req) => (
                <div
                  key={req.id}
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2.5"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                        {req.id}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm mt-1">{req.customerName}</h4>
                    </div>
                    <span className="text-sm font-extrabold text-emerald-700">₹{req.amount}</span>
                  </div>

                  <p className="text-xs text-slate-600 font-medium">{req.problem}</p>

                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-teal-600" />
                      {req.locationArea} ({req.distanceKm} km)
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-teal-600" />
                      {req.timeSlot}
                    </span>
                  </div>

                  {req.status === 'pending' ? (
                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => handleAccept(req.id)}
                        className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition"
                      >
                        <Check className="w-4 h-4" />
                        <span>Accept Job</span>
                      </button>
                      <button
                        onClick={() => handleDecline(req.id)}
                        className="flex-1 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition"
                      >
                        <X className="w-4 h-4" />
                        <span>Decline</span>
                      </button>
                    </div>
                  ) : (
                    <div
                      className={`text-center py-1.5 rounded-xl text-xs font-bold ${
                        req.status === 'accepted'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {req.status === 'accepted' ? '✓ Job Accepted' : '✗ Declined'}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50">
              <button
                onClick={() => setShowRequestsModal(false)}
                className="w-full py-2.5 bg-slate-800 text-white text-xs font-bold rounded-xl"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
