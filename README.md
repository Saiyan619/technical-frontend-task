# Department Management

This project is a Department Management application built using React and TypeScript with Vite as the build tool. It provides a user-friendly interface for managing departments and their associated roles within an organization.

## Features

- Create, view, and manage departments.
- Multi-step wizard for creating new departments.
- Responsive design with Tailwind CSS.
- Mock data for testing and development.

## Project Structure

```
department-management
├── src
│   ├── components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── StepIndicator.tsx
│   │   ├── Table.tsx
│   │   ├── Textarea.tsx
│   │   └── EmptyState.tsx
│   ├── features
│   │   └── departments
│   │       ├── components
│   │       │   ├── DepartmentTable.tsx
│   │       │   ├── CreateDepartmentWizard.tsx
│   │       │   ├── NameDescriptionStep.tsx
│   │       │   ├── AddRolesStep.tsx
│   │       │   └── ConfirmationStep.tsx
│   │       └── DepartmentManagementDashboard.tsx
│   ├── types
│   │   ├── Department.ts
│   │   └── Role.ts
│   ├── data
│   │   ├── mockDepartments.ts
│   │   └── mockRoles.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd department-management
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and go to `http://localhost:3000` to view the application.

## License

This project is licensed under the MIT License.