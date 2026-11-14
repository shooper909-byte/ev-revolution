import { act, fireEvent, renderRouter, screen, waitFor, within } from 'expo-router/testing-library';

import { karpa } from '@/integrations/karpa';
import { SESSION_KEY, secureStorage } from '@/services/auth/secureStorage';


// Render the real app directory (root layout, providers, protected routes).
const APP = './src/app';

beforeEach(async () => {
  await secureStorage.remove(SESSION_KEY);
  karpa.simulation.latencyMs = 0;
  karpa.simulation.forceNetworkError = false;
  karpa.reset();
});

/** Fires an event and lets every resulting state update and effect settle. */
async function fire(fn: () => void) {
  await act(async () => {
    fn();
  });
}

async function signIn(email = 'amara@example.com', password = 'Sunlit-Garden-42') {
  const emailInput = await screen.findByTestId('sign-in-email');
  await fire(() => fireEvent.changeText(emailInput, email));
  await fire(() => fireEvent.changeText(screen.getByTestId('sign-in-password'), password));
  await fire(() => fireEvent.press(screen.getByTestId('sign-in-submit')));
}

describe('authentication', () => {
  it('validates the sign-in form before submitting', async () => {
    await renderRouter(APP, { initialUrl: '/sign-in' });
    await fire(() => fireEvent.press(screen.getByTestId('sign-in-submit')));
    expect(screen.getByText('Email is required.')).toBeOnTheScreen();
    expect(screen.getByText('Password is required.')).toBeOnTheScreen();
  });

  it('shows a safe error for bad credentials and clears the password', async () => {
    await renderRouter(APP, { initialUrl: '/sign-in' });
    await signIn('amara@example.com', 'wrong-password');
    expect(await screen.findByTestId('sign-in-error')).toHaveTextContent(/didn’t match/);
    expect(screen.getByTestId('sign-in-password').props.value).toBe('');
  });

  it('signs in, lands on the dashboard, and signs out again', async () => {
    const router = await renderRouter(APP, { initialUrl: '/sign-in' });
    await signIn();
    await waitFor(() => expect(router.getPathname()).toBe('/home'));
    expect(await screen.findByTestId('care-plan-card')).toBeOnTheScreen();
    expect(screen.getAllByTestId('demo-notice').length).toBeGreaterThan(0);

    await fire(() => fireEvent.press(screen.getByText('Account')));
    const signOutButton = await screen.findByTestId('sign-out');
    await fire(() => fireEvent.press(signOutButton));
    await waitFor(() => expect(router.getPathname()).toBe('/welcome'));
  });

  it('blocks patient-only routes when signed out', async () => {
    const router = await renderRouter(APP, { initialUrl: '/account/profile' });
    await waitFor(() => expect(router.getPathname()).not.toBe('/account/profile'));
  });
});

describe('catalog', () => {
  it('treatment pages show safety disclosures and ask visitors to sign in before a consultation', async () => {
    await renderRouter(APP, { initialUrl: '/treatments/tretinoin-cream' });
    expect(await screen.findByTestId('safety-disclosures')).toBeOnTheScreen();
    expect(screen.getByText('Not appropriate during pregnancy.')).toBeOnTheScreen();
    expect(screen.getByText(/never provides dosing/)).toBeOnTheScreen();
    await fire(() => fireEvent.press(screen.getByTestId('start-consultation')));
    expect(screen.getByTestId('consultation-auth-prompt')).toBeOnTheScreen();
  });

  it('renders each Mrs. Collection package page', async () => {
    await renderRouter(APP, { initialUrl: '/collection/mrs-robinson' });
    expect(await screen.findByText('Let them wonder.')).toBeOnTheScreen();
    expect(screen.getByText(/memberships start at \$199\/month/)).toBeOnTheScreen();
  });

  it('shows a not-found state for an unknown treatment', async () => {
    await renderRouter(APP, { initialUrl: '/treatments/not-a-real-thing' });
    expect(await screen.findByText('We couldn’t find that treatment')).toBeOnTheScreen();
  });
});

describe('patient workflows', () => {
  it('shows the error state when the data service is unreachable, then recovers', async () => {
    const router = await renderRouter(APP, { initialUrl: '/sign-in' });
    await signIn();
    await waitFor(() => expect(router.getPathname()).toBe('/home'));
    await screen.findByTestId('care-plan-card');

    karpa.simulation.forceNetworkError = true;
    await fire(() => fireEvent.press(screen.getByText('Visits')));
    expect(await screen.findByTestId('error-state')).toBeOnTheScreen();
    karpa.simulation.forceNetworkError = false;
    await fire(() => fireEvent.press(screen.getByText('Try again')));
    expect(await screen.findByText('Hormones & Menopause consultation')).toBeOnTheScreen();
  });

  it('schedules a simulated appointment end to end', async () => {
    const router = await renderRouter(APP, { initialUrl: '/sign-in' });
    await signIn();
    await waitFor(() => expect(router.getPathname()).toBe('/home'));
    await fire(() => fireEvent.press(screen.getByText('Visits')));
    await fire(() => fireEvent.press(screen.getByTestId('schedule-visit')));
    await fire(() => fireEvent.press(screen.getByTestId('type-follow-up')));
    await fire(() => fireEvent.press(screen.getByTestId('schedule-next')));

    // Review is disabled until a time is chosen.
    expect(screen.getByTestId('schedule-review')).toBeDisabled();
    const times = await screen.findByLabelText('Time');
    const firstTime = within(times).getAllByRole('radio')[0];
    await fire(() => fireEvent.press(firstTime));
    await fire(() => fireEvent.press(screen.getByTestId('schedule-review')));
    await fire(() => fireEvent.press(screen.getByTestId('schedule-confirm')));

    expect(await screen.findByTestId('booking-confirmed')).toHaveTextContent(/Follow-up visit/);
    const list = await karpa.appointments.list();
    expect(list.filter((a) => a.type === 'follow-up' && a.status === 'scheduled')).toHaveLength(1);
  });

  it('records a journal check-in after validating it', async () => {
    const router = await renderRouter(APP, { initialUrl: '/sign-in' });
    await signIn();
    await waitFor(() => expect(router.getPathname()).toBe('/home'));
    await fire(() => fireEvent.press(screen.getByText('Journey')));
    await fire(() => fireEvent.press(screen.getByText('Check in')));
    const save = await screen.findByTestId('checkin-save');
    await fire(() => fireEvent.press(save));
    expect(screen.getByTestId('checkin-error')).toHaveTextContent(/energy level and a mood/);
    await fire(() => fireEvent.press(screen.getByTestId('energy-4')));
    await fire(() => fireEvent.press(screen.getByLabelText('Bright')));
    await fire(() => fireEvent.press(screen.getByTestId('checkin-save')));
    await waitFor(() => expect(router.getPathname()).toBe('/journey'));
  });
});
