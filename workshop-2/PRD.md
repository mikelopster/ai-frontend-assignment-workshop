# **Product Requirements Document (PRD): PayWise P2P Transfers**

**Version:** 1.0
**Date:** [Current Date]
**Author:** Product Team
**Status:** Scoped for Development


## **1. Overview & Goal**

**PayWise** is a new Peer-to-Peer (P2P) transfer feature to be integrated into our core Mobile Banking application. The primary goal is to provide users with a **fast, simple, and secure** money transfer experience. This feature aims to streamline everyday transactions, such as splitting bills with friends or sending money to family, by eliminating the friction and complexity of traditional bank transfers.


## **2. Target Audience**

Existing bank customers who are active users of the Mobile Banking application. This group values convenience and relies on digital channels for their daily financial activities, particularly for making frequent, small-value payments.


## **3. User Stories & Features**

### **Epic 1: Transaction Creation & Confirmation**

*   **US1.1: Recipient Identification**
    *   **As a** user,
    *   **I want to** find a recipient using a unique, user-friendly identifier called a "PayTag" (e.g., @username123),
    *   **so that** I can accurately and quickly identify who I am sending money to without needing their full bank account number.

*   **US1.2: Amount & Memo Entry**
    *   **As a** user,
    *   **I want to** enter the amount of money to transfer and add an optional short note (memo),
    *   **so that** I can specify the purpose of the transaction for my own records and for the recipient.

*   **US1.3: Transaction Review**
    *   **As a** user,
    *   **I want to** see a final confirmation screen summarizing the transaction details (recipient's name, PayTag, and amount),
    *   **so that** I can verify all information is correct before authorizing the payment.

*   **US1.4: Transaction Authorization**
    *   **As a** user,
    *   **I must** enter my 6-digit PIN to authorize every transaction,
    *   **so that** I can be confident that all payments are securely approved by me.

### **Epic 2: Transaction History & Details**

*   **US2.1: Transaction History Feed**
    *   **As a** user,
    *   **I want to** view a list of my recent transactions, including both outgoing and incoming payments,
    *   **so that** I can easily track my account activity.

*   **US2.2: Transaction Details View**
    *   **As a** user,
    *   **I want to** tap on any transaction in my history to view its detailed information, including the date, time, unique Transaction ID, and memo,
    *   **so that** I can use this information for future reference or reconciliation.


### **4. Acceptance Criteria**

*   **Transfer Flow:**
    *   [ ] The system must validate that the recipient's PayTag exists. If not, it must display a "User not found" error.
    *   [ ] The transfer amount cannot be zero or negative, and it cannot exceed the user's available account balance.
    *   [ ] The final confirmation screen must clearly display the recipient's full name and PayTag.
    *   [ ] If the user enters an incorrect PIN more than 3 times, the transaction capability must be temporarily locked for security.
    *   [ ] A successful transfer must generate a digital receipt (E-Slip) containing all essential details (sender, recipient, amount, date/time, Transaction ID), which can be saved as an image.

*   **Transaction History:**
    *   [ ] The transaction list must be sorted in reverse chronological order (most recent first).
    *   [ ] Outgoing and incoming transfers must be visually distinct (e.g., using different icons like outgoing/incoming arrows, or different colors like red/green).
    *   [ ] The transaction details view must display all data fields specified in US2.2.

