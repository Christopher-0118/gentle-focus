# Gentle Focus

AI-assisted productivity and focus planner.

The app allows users to create calendar events using natural language,
generate structured daily schedules with AI assistance,
and later integrate focus sessions and ambient soundscapes
for deep work and productivity support.

## Vision

Gentle Focus is designed to become a calm AI productivity companion.

Instead of functioning as a traditional task manager,

the app helps users:

- organize schedules naturally,
- reduce planning friction,
- enter focus states more easily,
- combine calendar planning with concentration tools.

Future features may include:

- AI-generated schedules,
- focus timers,
- ambient productivity sounds,
- event-linked focus sessions,
- intelligent workload balancing,
- calendar visualization.

## MVP 1

The first MVP version focuses only on:

- [x] Google OAuth login
- [x] Natural language event creation
- [x] OpenAI prompt parsing
- [x] Google Calendar event creation
- [x] Success response + link to event
- [x] Minimal chat-style interface

The MVP explicitly excludes:

- calendar visualization,
- event editing,
- recurring events,
- focus timers,
- ambient sounds,
- notifications,
- advanced scheduling,
- mobile support.
  <<<<<<< HEAD
  =======

## MVP 2 Roadmap

The goal of MVP 2 is to make the assistant more reliable and expand calendar management beyond event creation.

- [ ] **Authentication Context**
  - Move authentication state into a shared React Context
  - Provide centralized access to the current user and authentication status
  - Expose login and logout actions through a reusable authentication hook
  - Use the same authentication state across the application

- [ ] **Loading and disabled states**
  - Disable message submission while a request is in progress
  - Prevent duplicate requests
  - Display clear loading and error states in the chat interface

- [ ] **Improved assistant responses**
  - Return human-readable responses instead of only a Google Calendar link
  - Display important event details such as title, date, and time
  - Keep the Google Calendar link as an additional action

- [ ] **Clarification and error handling**
  - Ask follow-up questions when required information is missing
  - Avoid guessing critical event details
  - Handle authentication, Google Calendar API, and AI request errors gracefully

- [ ] **Edit calendar events through chat**
  - Reschedule an event
  - Change the event title
  - Update the event location
  - Support other event fields when needed

- [ ] **Delete calendar events**
  - Find the relevant event based on the user's request
  - Ask for confirmation before deletion
  - Return a clear confirmation message after successful deletion

### Suggested Implementation Order

`Auth Context → Request States → Improved Responses → Clarification Flow → Event Editing → Event Deletion`

> > > > > > > main
