# FullStack Admin

A comprehensive full-stack admin system built with a modern technology stack to ensure performance, scalability, and maintainability.

##  Technology Stack

### Frontend (User Interface)
- **Next.js**: Framework using App Router for efficient rendering and routing.
- **TypeScript**: For static type checking and better development experience.
- **Ant Design**: UI component library for consistent and rapid UI development.
- **NextAuth.js**: Handling session and authentication.

### Backend (Server & API)
- **NestJS**: A progressive Node.js framework for building efficient, reliable and scalable server-side applications.
- **MongoDB**: NoSQL database for flexible data modeling.
- **JWT (JSON Web Tokens)**: Used for secure authentication.
- **Passport**: Authentication middleware.
- **Nodemailer**: For sending emails (e.g., password resets, notifications).

##  Architecture Overview

### 1. Separation of Concerns
- **Frontend** is strictly responsible for UI rendering, user interactions, and API consumption. All data mapping for the UI happens here.
- **Backend** acts as the single source of truth handling business logic, validation (via class-validator), and database interactions.

### 2. API Communication
- All communication flows through a centralized API helper.
- Protected routes require a valid `Authorization: Bearer <token>` header.
- The standard response structure for list queries:
  ```json
  {
    "result": [],
    "totalItem": 0,
    "totalPage": 0
  }
  ```

### 3. Database Operations
- Uses MongoDB with `ObjectId` for relationships (resolved using `populate()`).
- Employs **Soft Deletion** (`isDeleted: true`) rather than hard removing records from the database.

##  Authentication & Roles

- **Strategy**: Session-based auth on the client (via NextAuth) and JWT token validation on the backend.
- **Roles**:
  - `manager`: Unrestricted access.
  - `staff`: Limited access based on permissions.
- **Guards**: Both Next.js (Frontend) and NestJS (Backend) implement route guards to prevent unauthorized access.

## ⚙️ Workflows & Best Practices

- **Pagination is Mandatory**: Tables load data progressively via server-side pagination to ensure performance at scale.
- **Strict Hooks Rules**: React Hooks are placed at the top level exclusively.
- **Component Design**: Components are kept small, reusable, and heavily leverage Ant Design.
- **Validation**: Client input is never trusted; detailed validation occurs via DTOs on the backend.

##  Getting Started

### Prerequisites
- Node.js (v20+)
- MongoDB instance

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd admin-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your variables:
   - **Database**: MongoDB URI and credentials.
   - **JWT**: JWT Secret and expiration timings.
   - **Mailer**: SMTP configuration (`MAILDEV_INCOMING_USER`, `MAILDEV_INCOMING_PASS`). The system uses [@nestjs-modules/mailer](https://github.com/nestjs-modules/mailer) with Nodemailer for sending emails.
4. Start the development server:
   ```bash
   npm run start:dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd admin-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and configure your API routes.
4. Run the development server:
   ```bash
   npm run dev
   ```
