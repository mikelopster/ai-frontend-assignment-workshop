# Programming Workshop Assignments

This repository contains a series of programming workshops designed to test and improve your skills across various programming languages and concepts.

## Workshop Overview

| Workshop | Topic | Description |
|----------|-------|-------------|
| Workshop 1 | Problem Solving | Practical programming exercises in LeetCode. |
| Workshop 2 | POC Product Creation | Creating a deployable UI Proof-of-Concept from a PRD using AI tools. |
| Workshop 3 | Frontend Development | Integrating a design system and documenting components with Storybook. |
| Workshop 4 | Backend for Frontend | Generating API specifications and creating a mock server from a UI. |
| Workshop 5 | Frontend Quality & Testing | Implementing automated tests and refactoring code for a frontend application. |
| Workshop 6 | Documentation Generation | Using AI to generate essential project documentation. |

## Workshop 1: Problem Solving

**Objective**: Solve 1 of the following LeetCode problems using JavaScript.

- https://leetcode.com/problems/median-of-two-sorted-arrays/description/
- https://leetcode.com/problems/regular-expression-matching/description/
- https://leetcode.com/problems/longest-valid-parentheses/description/

## Workshop 2: POC Product Creation

**Objective**: Create a Product Proof-of-Concept (POC) from a given Product Requirements Document (PRD).

**Tasks**:
- Use an AI UI generation tool (e.g., V0.dev, Bolt.new, Lovable) to build the user interface based on the PRD.
- Deploy the resulting application to a public hosting service (e.g., Vercel, Netlify).

## Workshop 3: Frontend Development

**Objective**: Integrate a design system and document components based on the UI created in Workshop #2.

**Tasks**:
1.  **Theme Integration**: Integrate the provided Design Tokens into the UI from Workshop #2. Apply the theme settings using Tailwind CSS to ensure the UI aligns with the design specifications.
2.  **Design System Documentation**: Develop a basic Design System for the project. Create documentation for each UI component using Storybook. The project should use **React + Typescript**.

**Exist**:
- `workshop-3/index.css` = Design Token Task (Tailwind)

## Workshop 4: Backend for Frontend

**Objective**: Develop API specifications and a mock server based on the frontend's data requirements, following an API-First approach.

**Tasks**:
1.  **Generate API Specifications**: Create a Swagger (OpenAPI) specification file that reflects the data requirements of the user interface from the previous workshops.
2.  **Create a Mock API Server**: Build a mock API server using Node.js based on the generated Swagger JSON file. This server should be usable by the frontend application.
3.  **Reverse Generation (Verification)**: As a verification step, generate a basic UI from the Swagger JSON file to ensure the API contract is correct and complete.

## Workshop 5: Frontend Quality & Testing

**Objective**: Improve the frontend application's quality and robustness through automated testing and code refactoring.

**Tasks**:
1.  **Implement Automated Testing**:
    - **Component Testing**: Write tests for individual UI components directly within Storybook.
    - **E2E Testing**: Create End-to-End test scripts using Playwright to simulate real user interactions.
2.  **Refactor Code with Linters & AI**:
    - **Static Analysis**: Analyze code quality and security using a tool like SonarQube.
    - **Code & Style Enforcement**: Set up and apply linters (e.g., ESLint), potentially with AI assistance, to enforce coding standards and improve code quality.

## Workshop 6: Documentation Generation

**Objective**: Generate essential project documentation using AI-assisted tools.

**Tasks**:
- **Code of Conduct**: Generate a standard Code of Conduct document for project contributors.
- **Architecture Overview**: Create a document that describes the project's overall architecture.
- The final output for both tasks should be in **Markdown format**.