import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Camera,
  Star,
  CheckCircle2,
  Trash2,
  Sparkles,
  Info
} from 'lucide-react';
import { Professional, UserProfile, Booking } from '../types';

interface BookingScreenProps {
  professional: Professional;
  user: UserProfile;
  onBack: () => void;
  onConfirmBooking: (booking: Booking) => void;
}

export const BookingScreen: React.FC<BookingScreenProps> = ({
  professional,
  user,
  onBack,
  onConfirmBooking
}) => {
  const [selectedDate, setSelectedDate] = useState('Today Dec 20');
  const [selectedTime, setSelectedTime] = useState('11:00 AM');
  const [problemDescription, setProblemDescription] = useState('');
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dates = [
    { label: 'Today', date: 'Dec 20' },
    { label: 'Tomorrow', date: 'Dec 21' },
    { label: 'Sun', date: 'Dec 22' },
    { label: 'Mon', date: 'Dec 23' },
  ];

  const times = ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'];

  // Pricing breakdown
  const visitCharge = professional.visitCharge;
  const safetyFee = 29;
  const taxes = 18;
  const discount = 50; // New customer discount
  const totalAmount = visitCharge + safetyFee + taxes - discount;

  const handleAddSamplePhoto = (sampleUrl: string) => {
    if (uploadedPhotos.length < 3) {
      setUploadedPhotos([...uploadedPhotos, sampleUrl]);
    }
  };

  const handleRemovePhoto = (index: number) => {
    setUploadedPhotos(uploadedPhotos.filter((_, i) => i !== index));
  };

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const newBooking: Booking = {
        id: `BK-TR-${Math.floor(1000 + Math.random() * 9000)}`,
        serviceCategory: professional.categoryName,
        professionalId: professional.id,
        professionalName: professional.name,
        professionalAvatar: professional.avatar,
        professionalPhone: professional.phone,
        customerId: user.id,
        customerName: user.name,
        customerPhone: user.phone,
        customerAddress: user.selectedAddress,
        date: selectedDate,
        timeSlot: selectedTime,
        problemDescription: problemDescription || 'General diagnostic inspection & repair',
        problemPhotos: uploadedPhotos,
        status: 'on_the_way',
        statusTimestamps: {
          confirmedTime: '10:00 AM',
          onTheWayTime: '10:20 AM',
          arrivingTime: '10:35 AM'
        },
        etaMinutes: 5,
        pricing: {
          visitCharge,
          serviceFee: safetyFee,
          taxes,
          discount,
          totalAmount
        }
      };

      setIsSubmitting(false);
      onConfirmBooking(newBooking);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-28 font-sans">
      {/* Top Bar (Screen 8 in wireframe) */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-700 transition"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-base sm:text-lg font-bold text-slate-900">Book Service</h1>
          </div>
          <span className="text-xs text-slate-400 font-mono">Step 1 of 1</span>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 mt-4 space-y-4">
        {/* Professional Summary Card (Screen 8) */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs flex items-center gap-3.5">
          <img
            src={professional.avatar}
            alt={professional.name}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-teal-50 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base truncate">
              {professional.name}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-0.5">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-slate-900">{professional.rating}</span>
              <span className="text-slate-400">({professional.reviewCount} reviews)</span>
            </div>
            <div className="text-xs font-extrabold text-teal-800 mt-1">
              ₹{professional.visitCharge} <span className="font-normal text-slate-500">Visit charge</span>
            </div>
          </div>
        </div>

        {/* Select Date & Time (Screen 8) */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-teal-600" />
            <span>Select Date & Time</span>
          </h3>

          {/* Date Chips */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {dates.map((d) => {
              const fullKey = `${d.label} ${d.date}`;
              const isSelected = selectedDate === fullKey;
              return (
                <button
                  key={fullKey}
                  type="button"
                  onClick={() => setSelectedDate(fullKey)}
                  className={`py-2 px-1 rounded-2xl text-center border transition cursor-pointer ${
                    isSelected
                      ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="block text-[11px] font-medium leading-none mb-1 opacity-90">
                    {d.label}
                  </span>
                  <span className="block text-xs font-bold leading-none">{d.date}</span>
                </button>
              );
            })}
          </div>

          {/* Time Slot Chips */}
          <div className="grid grid-cols-4 gap-2">
            {times.map((t) => {
              const isSelected = selectedTime === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSelectedTime(t)}
                  className={`py-2 px-1 rounded-2xl text-center text-xs font-bold border transition cursor-pointer ${
                    isSelected
                      ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        {/* Service Details & Photo Upload (Screen 8) */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Service Details
          </h3>

          <textarea
            value={problemDescription}
            onChange={(e) => setProblemDescription(e.target.value)}
            rows={3}
            placeholder="Describe your problem (e.g. switchboard sparking, water leak, fan humming)..."
            className="w-full p-3.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:outline-hidden focus:border-teal-600 focus:bg-white transition resize-none"
          />

          {/* Add Photos (Optional) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-teal-600" />
                Add Photos (Optional)
              </span>
              <span className="text-[11px] text-teal-700 font-medium">AI Visual Diagnosis</span>
            </div>

            {/* Photo previews & buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              {uploadedPhotos.map((url, i) => (
                <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden ring-1 ring-slate-200">
                  <img src={url} alt="Problem preview" className="w-full h-full object-cover" />
                  <button
                    onClick={() => handleRemovePhoto(i)}
                    className="absolute top-1 right-1 p-1 bg-black/60 rounded-full text-white hover:bg-black"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}

              {uploadedPhotos.length < 3 && (
                <button
                  type="button"
                  onClick={() =>
                    handleAddSamplePhoto(
                      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300&auto=format&fit=crop&q=80'
                    )
                  }
                  className="w-16 h-16 rounded-xl border-2 border-dashed border-teal-300 bg-teal-50/50 hover:bg-teal-100/50 text-teal-700 flex flex-col items-center justify-center text-[10px] font-bold transition cursor-pointer"
                >
                  <Camera className="w-4 h-4 mb-0.5 text-teal-600" />
                  <span>+ Attach</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Address card */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Service Address
            </span>
            <span className="text-xs text-teal-700 font-bold">Edit</span>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-slate-900 mt-1">
            {user.selectedAddress}
          </p>
        </div>

        {/* Transparent Price Breakdown */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Payment Summary
          </h3>
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span>Visit / Diagnostic Charge</span>
            <span className="font-semibold text-slate-900">₹{visitCharge}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span>Safety & Protection Fee</span>
            <span className="font-semibold text-slate-900">₹{safetyFee}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span>Taxes & GST (18%)</span>
            <span className="font-semibold text-slate-900">₹{taxes}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-emerald-600 font-semibold">
            <span>First Booking Promo Discount</span>
            <span>-₹{discount}</span>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-sm font-black text-slate-900">
            <span>Total Payable Amount</span>
            <span className="text-base text-teal-800">₹{totalAmount}</span>
          </div>

          <div className="mt-2 p-2 rounded-xl bg-teal-50 border border-teal-100 text-[11px] text-teal-800 flex items-start gap-1.5">
            <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-teal-600" />
            <span>
              The ₹{visitCharge} visit charge will be adjusted into your final repair invoice.
            </span>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Confirm Button (Screen 8 in wireframe) */}
      <div className="fixed bottom-0 inset-x-0 bg-white border-t border-slate-200/90 p-4 shadow-lg z-40">
        <div className="max-w-xl mx-auto flex items-center justify-between gap-4">
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Pay via Cash / UPI</span>
            <span className="text-lg font-black text-slate-900">₹{totalAmount}</span>
          </div>

          <button
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="flex-1 max-w-xs py-3.5 bg-[#009688] hover:bg-[#00796B] active:scale-[0.99] text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              'Confirm Booking'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
