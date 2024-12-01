// src/routes/routes.config.ts
import { lazy, LazyExoticComponent } from 'react';

interface RouteConfig {
  path: string;
  component: LazyExoticComponent<() => JSX.Element>;
  children?: RouteConfig[];
}

// Lazy load all page components
// const HomePage = lazy(() => import('@/pages/HomePage'));
// const InvestorPage = lazy(() => import('@/pages/InvestorPage'));
// const StartupPage = lazy(() => import('@/pages/StartupPage'));
// const SyndicatePage = lazy(() => import('@/pages/SyndicatePage'));
// const AboutPage = lazy(() => import('@/pages/AboutPage'));
// const MediaPage = lazy(() => import('@/pages/MediaPage'));
// const ContactPage = lazy(() => import('@/pages/ContactPage'));
// const BlogsPage = lazy(() => import('@/pages/BlogsPage'));
// const BlogDetailsPage = lazy(() => import('@/pages/BlogDetailsPage'));
// const EventsPage = lazy(() => import('@/pages/EventsPage'));
// const SuccessStoriesPage = lazy(() => import('@/pages/SuccessStoriesPage'));
// const HelpPage = lazy(() => import('@/pages/HelpPage'));
// const PrivacyPage = lazy(() => import('@/pages/PrivacyPage'));
// const TermsPage = lazy(() => import('@/pages/TermsPage'));
// const CookiesPage = lazy(() => import('@/pages/CookiesPage'));
// const CorporatePage = lazy(() => import('@/pages/CorporatePage'));
// const MentorshipPage = lazy(() => import('@/pages/MentorshipPage'));
// const ResearchPage = lazy(() => import('@/pages/ResearchPage'));
// const PartnershipsPage = lazy(() => import('@/pages/PartnershipsPage'));
// const CareersPage = lazy(() => import('@/pages/CareersPage'));
// const GlobalPage = lazy(() => import('@/pages/GlobalPage'));
// const ImpactPage = lazy(() => import('@/pages/ImpactPage'));
// const LoginPage = lazy(() => import('@/pages/LoginPage'));
// const SignUpPage = lazy(() => import('@/pages/SignUpPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

export const routes: RouteConfig[] = [
  // {
  //   path: '/',
  //   component: HomePage,
  // },
  // {
  //   path: '/investor',
  //   component: InvestorPage,
  // },
  // {
  //   path: '/startup',
  //   component: StartupPage,
  // },
  // {
  //   path: '/syndicate',
  //   component: SyndicatePage,
  // },
  // {
  //   path: '/about',
  //   component: AboutPage,
  // },
  // {
  //   path: '/media',
  //   component: MediaPage,
  // },
  // {
  //   path: '/contact',
  //   component: ContactPage,
  // },
  // {
  //   path: '/blogs',
  //   component: BlogsPage,
  // },
  // {
  //   path: '/blogs/:id',
  //   component: BlogDetailsPage,
  // },
  // {
  //   path: '/events',
  //   component: EventsPage,
  // },
  // {
  //   path: '/success-stories',
  //   component: SuccessStoriesPage,
  // },
  // {
  //   path: '/help',
  //   component: HelpPage,
  // },
  // {
  //   path: '/privacy',
  //   component: PrivacyPage,
  // },
  // {
  //   path: '/terms',
  //   component: TermsPage,
  // },
  // {
  //   path: '/cookies',
  //   component: CookiesPage,
  // },
  // {
  //   path: '/corporate',
  //   component: CorporatePage,
  // },
  // {
  //   path: '/mentorship',
  //   component: MentorshipPage,
  // },
  // {
  //   path: '/research',
  //   component: ResearchPage,
  // },
  // {
  //   path: '/partnerships',
  //   component: PartnershipsPage,
  // },
  // {
  //   path: '/careers',
  //   component: CareersPage,
  // },
  // {
  //   path: '/global',
  //   component: GlobalPage,
  // },
  // {
  //   path: '/impact',
  //   component: ImpactPage,
  // },
  // {
  //   path: '/login',
  //   component: LoginPage,
  // },
  // {
  //   path: '/signup',
  //   component: SignUpPage,
  // },
  {
    path: '*',
    component: NotFoundPage,
  },
];