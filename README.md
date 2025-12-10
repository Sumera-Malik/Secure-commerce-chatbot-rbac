# SecureCommerce Chatbot with RBAC

A secure e-commerce chatbot designed with **Multi-Factor Authentication (MFA)**, **JWT-based authentication**, and **Role-Based Access Control (RBAC)**.  
This project protects customer data, prevents misuse, logs security events, and implements advanced threat modeling using **PASTA**, **STRIDE**, and **DREAD**.

This repository contains:
- Full system implementation (frontend + backend)
- Security documentation
- Threat modeling report
- Complete project report submitted for semester evaluation

---

## 🔐 Key Security Features

### ✔ Multi-Factor Authentication (MFA)
- Email + password login  
- OTP (One-Time Password) verification  
- Passwords stored using **bcrypt hashing**

### ✔ JWT-Based Authentication
- Secure token generation  
- Short expiry + token revocation support  
- Protected routes for customer / admin roles

### ✔ Role-Based Access Control (RBAC)
Roles:
- **Customer**
- **Admin**

Admin users can:
- View audit logs  
- Monitor suspicious activity  
- Manage security policies  

### ✔ Secure Chatbot AI
- Input sanitization  
- Blocking of unsafe data (passwords, card numbers, CVVs, bank info)  
- Prompt-injection detection  
- PII redaction before processing  

### ✔ Tamper-Evident Audit Logs
- Each log entry hashed with SHA-256  
- Chain-linked log entries for tamper detection  
- Secure export functionality  

### ✔ Anomaly Detection + Rate Limiting
- Detects brute-force attempts  
- Alerts when users try to share sensitive info  
- Per-user request limits  

---

## 🧱 System Architecture

### Frontend (React)
- Login page  
- OTP verification  
- Chat interface  
- Admin dashboard  
- Security visualizations (logs, anomalies)

### Backend (Node.js + Express)
- Auth APIs  
- OTP service  
- Secure chatbot processing  
- Admin endpoints  
- Audit-log subsystem  
- RBAC + JWT middleware

### Database (SQLite)
Tables:
- users  
- otp_codes  
- audit_logs  
- chat_history  
- revoked_tokens  

---

## 🛡 Documentation Included

### 📄 Project Report  
Contains:
- System requirements  
- Threat modeling  
- Security SDLC  
- UML diagrams (Use case, sequence, activity, *misuse cases*)  
- DFD levels 0, 1, 2  
- Security testing results  
- Implementation details

### 📄 Threat Modeling Document  
Includes:
- PASTA methodology  
- STRIDE threat categories  
- DREAD scoring  
- Risk prioritization  
- Mitigation mapping  
- Attack trees  
- Data flow validation  

(Both documents are included in the `docs/` folder.)

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<your-username>/secure-commerce-chatbot-rbac.git
cd secure-commerce-chatbot-rbac
