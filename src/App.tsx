/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ScreenName,
  UserProfile,
  UserRole,
  Professional,
  ServiceCategory,
  Booking
} from './types';
import {
  SERVICE_CATEGORIES,
  PROFESSIONALS,
  INITIAL_USER,
  INITIAL_PROVIDER_USER,
  INITIAL_BOOKINGS
} from './data/mockData';

import { HeaderNav } from './components/HeaderNav';
import { MenuDrawer } from './components/MenuDrawer';
import { SplashScreen } from './screens/SplashScreen';
import { RoleSelectScreen } from './screens/RoleSelectScreen';
import { AuthScreen } from './screens/AuthScreen';
import { HomeSeekerScreen } from './screens/HomeSeekerScreen';
import { ServiceListingScreen } from './screens/ServiceListingScreen';
import { ProviderProfileScreen } from './screens/ProviderProfileScreen';
import { BookingScreen } from './screens/BookingScreen';
import { BookingTrackingScreen } from './screens/BookingTrackingScreen';
import { HomeProviderScreen } from './screens/HomeProviderScreen';
import { AiAssistantModal } from './screens/AiAssistantModal';
import { PhotoDiagnosticModal } from './screens/PhotoDiagnosticModal';
import { AdminDashboardScreen } from './screens/AdminDashboardScreen';
import { MyBookingsScreen } from './screens/MyBookingsScreen';
import { SavedProfessionalsScreen } from './screens/SavedProfessionalsScreen';
import { WalletScreen } from './screens/WalletScreen';

export default function App() {
  // Screen state - starts with Screen 1 Splash
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('splash');
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [menuOpen, setMenuOpen] = useState(false);

  // Selected items for drill-downs
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>(SERVICE_CATEGORIES[0]);
  const [selectedProfessional, setSelectedProfessional] = useState<Professional>(PROFESSIONALS[0]);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [activeBooking, setActiveBooking] = useState<Booking>(INITIAL_BOOKINGS[0]);

  // AI modals
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [aiInitialQuery, setAiInitialQuery] = useState('');
  const [photoDiagnosisOpen, setPhotoDiagnosisOpen] = useState(false);

  // Notification count
  const [notifications, setNotifications] = useState(3);

  // Switch role handler (Seeker / Provider / Admin)
  const handleSwitchRole = (newRole: UserRole) => {
    if (newRole === 'provider') {
      setUser(INITIAL_PROVIDER_USER);
      setCurrentScreen('home_provider');
    } else if (newRole === 'admin') {
      setUser({
        ...INITIAL_USER,
        name: 'System Admin',
        role: 'admin'
      });
      setCurrentScreen('admin_dashboard');
    } else {
      setUser(INITIAL_USER);
      setCurrentScreen('home_seeker');
    }
  };

  // Category select handler -> opens Service Listing (Screen 6)
  const handleSelectCategory = (categoryId: string) => {
    const cat = SERVICE_CATEGORIES.find((c) => c.id === categoryId) || SERVICE_CATEGORIES[0];
    setSelectedCategory(cat);
    setCurrentScreen('service_listing');
  };

  // Professional select handler -> opens Profile (Screen 7)
  const handleSelectProfessional = (pro: Professional) => {
    setSelectedProfessional(pro);
    setCurrentScreen('provider_profile');
  };

  // Book Now button -> opens Booking Form (Screen 8)
  const handleBookNow = (pro: Professional) => {
    setSelectedProfessional(pro);
    setCurrentScreen('booking');
  };

  // Booking confirmed -> saves booking and transitions to Tracking (Screen 9)
  const handleConfirmBooking = (newBooking: Booking) => {
    setBookings([newBooking, ...bookings]);
    setActiveBooking(newBooking);
    setCurrentScreen('tracking');
  };

  // AI open helper
  const handleOpenAiAssistant = (query?: string) => {
    setAiInitialQuery(query || '');
    setAiAssistantOpen(true);
  };

  // Render header condition (Screens 1, 2, 3 don't require the persistent navbar)
  const shouldShowHeader = !['splash', 'role_select', 'auth'].includes(currentScreen);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-teal-100 selection:text-teal-900">
      {/* Persistent App Header (Screen 4, 10, etc.) */}
      {shouldShowHeader && (
        <HeaderNav
          user={user}
          onOpenMenu={() => setMenuOpen(true)}
          onNavigateHome={() =>
            setCurrentScreen(user.role === 'provider' ? 'home_provider' : 'home_seeker')
          }
          onSelectCity={(city) => setUser({ ...user, selectedCity: city })}
          onToggleOnline={(isOnline) => setUser({ ...user, isOnline })}
          onSwitchRole={handleSwitchRole}
          notificationCount={notifications}
          onOpenNotifications={() => setCurrentScreen('my_bookings')}
        />
      )}

      {/* Slide-in Right Corner Menu Drawer (Screen 5 in wireframe) */}
      <MenuDrawer
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        user={user}
        onNavigate={(screen) => setCurrentScreen(screen)}
        onLogout={() => {
          setCurrentScreen('role_select');
        }}
        onSwitchRole={handleSwitchRole}
        notificationCount={notifications}
      />

      {/* Main View Area routing through the 10 core screens */}
      <main className="flex-1">
        {/* Screen 1: Splash Screen */}
        {currentScreen === 'splash' && (
          <SplashScreen onComplete={() => setCurrentScreen('role_select')} />
        )}

        {/* Screen 2: Choose Your Role */}
        {currentScreen === 'role_select' && (
          <RoleSelectScreen
            onSelectRole={(role) => {
              setUser(role === 'provider' ? INITIAL_PROVIDER_USER : INITIAL_USER);
              setCurrentScreen('auth');
            }}
            onSkipToHome={() => setCurrentScreen('home_seeker')}
            onGoToLogin={() => setCurrentScreen('auth')}
          />
        )}

        {/* Screen 3: Sign Up / Login */}
        {currentScreen === 'auth' && (
          <AuthScreen
            initialRole={user.role}
            onSuccess={(loggedInUser) => {
              setUser(loggedInUser);
              setCurrentScreen(
                loggedInUser.role === 'provider'
                  ? 'home_provider'
                  : loggedInUser.role === 'admin'
                  ? 'admin_dashboard'
                  : 'home_seeker'
              );
            }}
            onBackToRoles={() => setCurrentScreen('role_select')}
          />
        )}

        {/* Screen 4: Home Page (Seeker) */}
        {currentScreen === 'home_seeker' && (
          <HomeSeekerScreen
            user={user}
            categories={SERVICE_CATEGORIES}
            professionals={PROFESSIONALS}
            onSelectCategory={handleSelectCategory}
            onSelectProfessional={handleSelectProfessional}
            onOpenAiAssistant={handleOpenAiAssistant}
            onOpenPhotoDiagnosis={() => setPhotoDiagnosisOpen(true)}
            onBookNow={handleBookNow}
          />
        )}

        {/* Screen 6: Service Listing (e.g. Electricians) */}
        {currentScreen === 'service_listing' && (
          <ServiceListingScreen
            category={selectedCategory}
            city={user.selectedCity}
            professionals={PROFESSIONALS}
            onBack={() => setCurrentScreen('home_seeker')}
            onSelectProfessional={handleSelectProfessional}
            onBookNow={handleBookNow}
          />
        )}

        {/* Screen 7: Professional Profile */}
        {currentScreen === 'provider_profile' && (
          <ProviderProfileScreen
            professional={selectedProfessional}
            onBack={() => setCurrentScreen('service_listing')}
            onBookNow={handleBookNow}
          />
        )}

        {/* Screen 8: Booking Page */}
        {currentScreen === 'booking' && (
          <BookingScreen
            professional={selectedProfessional}
            user={user}
            onBack={() => setCurrentScreen('provider_profile')}
            onConfirmBooking={handleConfirmBooking}
          />
        )}

        {/* Screen 9: Booking Tracking */}
        {currentScreen === 'tracking' && (
          <BookingTrackingScreen
            booking={activeBooking}
            onBack={() => setCurrentScreen('home_seeker')}
            onUpdateStatus={(newStatus) => {
              setActiveBooking((b) => ({ ...b, status: newStatus }));
            }}
          />
        )}

        {/* Screen 10: Home Page (Provider) */}
        {currentScreen === 'home_provider' && (
          <HomeProviderScreen
            user={user}
            onOpenMenu={() => setMenuOpen(true)}
            onOpenAiAssistant={() => handleOpenAiAssistant()}
            onViewBookingTracking={() => setCurrentScreen('tracking')}
          />
        )}

        {/* Account / Support Screens */}
        {currentScreen === 'my_bookings' && (
          <MyBookingsScreen
            bookings={bookings}
            onBack={() =>
              setCurrentScreen(user.role === 'provider' ? 'home_provider' : 'home_seeker')
            }
            onSelectBooking={(b) => {
              setActiveBooking(b);
              setCurrentScreen('tracking');
            }}
          />
        )}

        {currentScreen === 'saved_professionals' && (
          <SavedProfessionalsScreen
            professionals={PROFESSIONALS.slice(0, 2)}
            onBack={() => setCurrentScreen('home_seeker')}
            onSelectProfessional={handleSelectProfessional}
            onBookNow={handleBookNow}
          />
        )}

        {currentScreen === 'wallet' && (
          <WalletScreen
            onBack={() =>
              setCurrentScreen(user.role === 'provider' ? 'home_provider' : 'home_seeker')
            }
          />
        )}

        {/* Admin Dashboard & AI Hub */}
        {(currentScreen === 'admin_dashboard' || currentScreen === 'ai_evaluations') && (
          <AdminDashboardScreen
            onBack={() =>
              setCurrentScreen(user.role === 'provider' ? 'home_provider' : 'home_seeker')
            }
          />
        )}
      </main>

      {/* AI Assistant Modal (Screens 17 & 25 - NLP, Telugu/English Voice, RAG) */}
      <AiAssistantModal
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
        initialQuery={aiInitialQuery}
        onNavigateToCategory={handleSelectCategory}
        onBookProvider={() => {
          handleSelectProfessional(PROFESSIONALS[0]);
          setCurrentScreen('provider_profile');
        }}
      />

      {/* AI Computer Vision Photo Diagnostic Modal (Screen 24) */}
      <PhotoDiagnosticModal
        isOpen={photoDiagnosisOpen}
        onClose={() => setPhotoDiagnosisOpen(false)}
        onBookCategory={handleSelectCategory}
      />
    </div>
  );
}
