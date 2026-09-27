/*
 * Example browser-side connection. Include this file at the end of your HTML
 * after the registration form. Give the form id="registrationForm" and use
 * these name attributes on the matching inputs/select:
 * studentName, email, phone, collegeName, eventId.
 *
 * The supplied ZIP does not contain a registration form, so this example is
 * intentionally separate: adjust the selectors to the form you add/use.
 */
const API_URL = 'http://localhost:3000/api';

async function loadEvents() {
  const response = await fetch(`${API_URL}/events`);
  if (!response.ok) throw new Error('Could not load events');
  return response.json();
}

// Use this helper to fill the registration form's event <select>.
async function fillEventOptions(selectElement) {
  const events = await loadEvents();
  selectElement.replaceChildren(new Option('Choose an event', ''));
  for (const event of events) {
    selectElement.add(new Option(`${event.title} — ${event.category}`, event.id));
  }
}

const form = document.querySelector('#registrationForm');
if (form) {
  const eventSelect = form.elements.eventId;
  if (eventSelect) fillEventOptions(eventSelect).catch(console.error);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const registration = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`${API_URL}/registrations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registration)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Registration failed');
      alert(result.message);
      form.reset();
    } catch (error) {
      alert(error.message);
    }
  });
}
