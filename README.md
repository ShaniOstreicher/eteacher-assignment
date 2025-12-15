# Course Management System API & Frontend

This project implements a basic course management system, providing core functionalities for managing students, courses, and enrollments, along with a reporting feature that utilizes cloud storage mocking.

## 🚀 Setup Instructions

Follow these steps to get the project running locally.

### Prerequisites

- [.NET 9 SDK (or later)](https://dotnet.microsoft.com/download)
- [Node.js and npm/yarn](https://nodejs.org/) (for the React Frontend)

### 1. Application Setup (`setup.sh`)

The `setup.sh` script handles all necessary dependencies for both the Backend (dotnet) and Frontend (npm).

1.  **Grant execution permissions** to the setup script (Linux/macOS only):
    ```bash
    chmod +x setup.sh
    ```
2.  **Run the setup script** from the project root directory:
    ```bash
    ./setup.sh
    ```
    This script will install all backend dependencies (including the necessary AWS SDK for mocking) and frontend dependencies.

### 2. Running the Application

After successfully running the setup script, start the Backend and Frontend in **two separate terminal windows** to view all logs:

| Layer            | Command                                           |
| :--------------- | :------------------------------------------------ |
| **Backend API**  | `cd backend/eTeacher.Assignment.Api ; dotnet run` |
| **Frontend App** | `cd frontend ; npm run dev`                       |

## 💡 Architecture and Design Decisions

The application follows a standard layered architecture with strong separation of concerns, utilizing ASP.NET Core for the API and React with TanStack Query for the frontend state management.

### Key Decisions

1.  **Relational Data Model (Enrollments):** Instead of saving an array of students directly within each course object (many-to-many relationship embedded in one entity), a dedicated **Enrollment** linking entity was created. This ensures data normalization, prevents data duplication, allows for cleaner queries, and, critically, **enables the storage of additional, specific data about the relationship itself** (e.g., grade, completion status, or registration date).
2.  **AWS S3 Mocking (Bonus):** A service (`AwsS3StorageService`) was implemented against an interface (`ICloudStorageService`). This service **simulates** the S3 API interaction by logging the request, utilizing official **`AWSSDK.S3`** types, and returning a mocked URL, thus proving SDK knowledge without requiring live credentials.

---

## ⚖️ Trade-offs and Areas for Improvement

The following are known trade-offs or suggested areas for future development:

### Backend Improvements

| Area               | Detail & Trade-off                                                                                                                                                                                                                                                        |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Data Access**    | Currently using in-memory LINQ operations. For production, these should be converted to **SQL JOINs** or optimized database queries to avoid excessive memory usage and improve performance (e.g., instead of multiple sequential list fetches in an Aggregator pattern). |
| **Scalability**    | `GetAll` functions should enforce **pagination** (e.g., limit to max 50 items) to prevent massive data loads and ensure API stability under high traffic.                                                                                                                 |
| **Error Handling** | Implement comprehensive global exception handling middleware and return specific HTTP status codes (e.g., 404 for not found, 400 for bad request) instead of generic error responses.                                                                                     |

### Frontend/UX Improvements

| Area                     | Detail & Trade-off                                                                                                                                                                                                                     |
| :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **UX Flow (Enrollment)** | **Trade-off:** Enrollment currently requires students to exist prior to selection. **Improvement:** Implement a "Quick-Create" feature within the enrollment modal to allow users to create a new student and enroll them in one step. |
| **Component Structure**  | Extract smaller, reusable components (e.g., `Button`, `WidgetCard`) from the current components for better maintainability and code reuse.                                                                                             |
| **Feature Richness**     | Add essential features like **search** and **filtering** to the student and course lists.                                                                                                                                              |
| **Component Display**    | On the Enrollments screen, implement grouping/filtering to view data **by Student** or **by Course**.                                                                                                                                  |
| **Styling**              | Centralize and manage colors and core styling values using **CSS Variables** or JavaScript constants.                                                                                                                                  |
