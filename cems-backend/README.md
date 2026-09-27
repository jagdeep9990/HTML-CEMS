# CEMS backend (Node.js + MySQL)

Beginner-friendly backend for the supplied CEMS event portal. It lists events and stores registrations using MySQL.

The complete demo webpage is in `public/index.html`. Double-click that file to view it in a browser. Event browsing and the registration form are visible right away. To save registrations, also set up and start the backend using the steps below.

## Folder structure

- `server.js`: starts Express and connects API routes.
- `config/db.js`: reads `.env` settings and creates the MySQL connection pool.
- `routes/events.js`: returns event data for the cards and event selector.
- `routes/registrations.js`: checks and saves student registrations.
- `database.sql`: creates the database and tables and inserts two sample events.
- `frontend-connection.js`: example browser code using `fetch()` to call the API.
- `public/index.html`: complete CEMS demo page with event cards and registration form.
- `.env.example`: database settings template.

## Setup

1. Install Node.js and MySQL, then start MySQL.
2. Run `database.sql` in MySQL Workbench or the MySQL command line.
3. Open a terminal in this folder and run `npm install`.
4. Copy `.env.example` to `.env`, and replace `your_mysql_password` with your MySQL password.
5. Run `npm start`. The server runs at `http://localhost:3000`.
6. Visit `http://localhost:3000/api/health`; `GET /api/events` returns seeded events.

Keep `.env` private because it contains the database password.

## API endpoints

| Method | URL | Purpose |
| --- | --- | --- |
| GET | `/api/health` | Confirm the server is running |
| GET | `/api/events` | Get events for display and the registration selector |
| POST | `/api/registrations` | Save one student's registration |

Send this JSON to the registration endpoint:

```json
{
  "eventId": 1,
  "studentName": "Asha Sharma",
  "email": "asha@example.com",
  "phone": "9876543210",
  "collegeName": "Aravali College of Engineering and Management"
}
```

The API validates required fields and email format, checks the event ID, and prevents a student's email from being registered twice for one event.

## Connecting the frontend

The supplied ZIP has `index.html` with sample event cards, but the HTML ends partway through the third card. It contains no registration form, input fields, or JavaScript. So its original form field names cannot be determined from this ZIP.

`frontend-connection.js` expects a form with `id="registrationForm"` and named controls `studentName`, `email`, `phone`, `collegeName`, and `eventId`. Add or use the full registration form, adapt the names/selectors to it, then include `<script src="frontend-connection.js"></script>` after the form. The script fills the event selector and sends the form as JSON. For dynamic cards, use `GET /api/events`; each event has `id`, `title`, `category`, `date`, `venue`, and `description`.

## Explaining the database

`events` stores each event once. `registrations` stores student details and an `event_id` link to the selected event. The foreign key makes sure a registration refers to a real event. `routes/registrations.js` uses `?` placeholders in SQL so submitted values are passed separately from the query text.
