# Preproduction Table Generation Service

This repository contains a full‑stack implementation of a preproduction
table generation service.  It allows film crews to upload a zipped
script in PDF or DOCX format and receive a structured Excel table
describing all of the production elements (locations, time of day,
characters, extras, props, special effects, etc.) for each scene.  The
service includes both a **Python FastAPI** backend and a **React
TypeScript** frontend styled with **Tailwind CSS**.  A simple SQL
database stores the history of uploads and results.

The actual natural‑language processing that extracts information from
scripts is not implemented here; instead, a stub generates
placeholder data.  In a real deployment you would replace the stub
with your own ML service and have the backend call it.

## Features

* **Upload scripts in ZIP format** – Users drag and drop or select a
  zipped script, which the backend unpacks and processes.  Only ZIP
  archives are accepted.
* **Automatic table generation** – A stub implementation returns an
  Excel workbook with a preproduction table.  The backend also
  converts the workbook to JSON so the frontend can display it
  immediately.
* **History of uploads** – All uploads are persisted in a SQLite
  database along with the generated table and the original filename.
* **Light/Dark theme** – The frontend exposes a theme toggle and
  persists the user's preference in `localStorage`.  Tailwind CSS’s
  `dark` variant is used to apply different palettes.
* **Minimalistic UI with accent colour** – The UI is clean and
  modern, using the accent colour `#FF841C` and a matching gradient.
* **Dockerized** – A multi‑stage Dockerfile builds the frontend,
  installs backend dependencies and runs everything behind Uvicorn.

## Project structure

```
project/
├── backend/             # FastAPI app
│   ├── app/
│   │   ├── main.py      # Application entrypoint
│   │   ├── database.py  # SQLAlchemy engine and session
│   │   ├── models.py    # ORM models
│   │   ├── schemas.py   # Pydantic schemas
│   │   ├── crud.py      # Database operations
│   │   └── ml_stub.py   # Placeholder script processor
│   └── requirements.txt # Backend dependencies
├── frontend/            # React + Vite + Tailwind frontend
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── src/
│   │   ├── api/
│   │   │   └── index.ts
│   │   ├── components/
│   │   │   ├── UploadForm.tsx
│   │   │   ├── TableDisplay.tsx
│   │   │   ├── HistoryList.tsx
│   │   │   └── ThemeToggle.tsx
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   └── History.tsx
│   │   ├── theme/
│   │   │   └── ThemeProvider.tsx
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── README.md
├── Dockerfile          # Container definition
└── README.md           # This file
```

## Running locally

### With Docker

The repository includes a `Dockerfile` that produces a single image
containing both the built frontend and the backend.  To build and run
the container, run:

```bash
docker build -t preprod-service ./project
docker run -p 8000:8000 preprod-service
```

The frontend will be available at `http://localhost:8000/` and the
backend API at `/upload`, `/history`, `/result/{id}` and
`/download/{id}`.

### Without Docker

If you prefer to run services separately during development:

1. **Backend**

   ```bash
   cd project/backend
   python3 -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   uvicorn app.main:app --reload
   ```

2. **Frontend**

   ```bash
   cd project/frontend
   npm install
   npm run dev
   ```

   The frontend will run on `http://localhost:5173` and proxy API
   requests to `http://localhost:8000` (see `vite.config.ts`).

## Security considerations

* Only ZIP archives are accepted by the upload endpoint.  The backend
  uses Python’s built‑in `zipfile` module to extract files.  The
  `extractall()` method extracts every member to a chosen directory; as
  noted in the Python documentation, never extract archives from
  untrusted sources without prior inspection, because filenames may
  contain absolute paths or `..` segments【989702220391920†L394-L405】.  In this
  stub implementation the extraction directory is isolated to
  mitigate path traversal issues.
* The service stores the uploaded script and the generated result
  under a unique directory per upload.  You should still review
  untrusted archives before using them in production.

## Acknowledgements

This project draws on the FastAPI documentation for file uploads, which
demonstrates how to receive files using `UploadFile`【532705150219520†L292-L303】.
Dark‑mode support is implemented following Tailwind CSS’s guidance on
manually toggling dark mode using a `dark` class on the root element
and localStorage to persist user preference【523031736702918†L293-L361】.