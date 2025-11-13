# DocMate

> A comprehensive digital patient management system designed for healthcare professionals to efficiently maintain and access patient records.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Routes](#api-routes)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

DocMate is a full-stack web application that empowers doctors and healthcare practitioners to maintain detailed digital records of their patients. With an intuitive interface and robust backend, DocMate streamlines patient management, visit tracking, and medical history documentation.

### Key Benefits
✅ Secure patient data management  
✅ Visit history tracking with detailed notes  
✅ Quick patient search functionality  
✅ Dashboard analytics for revenue and patient insights  
✅ Multi-authentication support (Email, Google, Facebook)  

## ✨ Features

### Patient Management
- 📝 **Add & Edit Patients** - Create comprehensive patient profiles with personal and medical information
- 🔍 **Search Patients** - Quick search by name or phone number
- 📊 **Patient Details** - View complete patient history and visit records
- 🗂️ **Organize Records** - Categorize patients by Ayurvedic constitution (Prakarti)

### Visit Tracking
- 📅 **Record Visits** - Document complaints, investigations, diagnosis, and treatment
- 💊 **Treatment Notes** - Add therapy, duration, and medication details
- 💰 **Payment Tracking** - Log visit payments for accounting
- 📝 **Visit History** - Access all previous visits for a patient

### Dashboard & Analytics
- 💵 **Revenue Tracking** - Monthly revenue calculation
- 👥 **Patient Statistics** - Weekly and monthly patient counts
- 📈 **Visual Metrics** - Interactive dashboard with real-time data

### Authentication
- 🔐 **Secure Login** - Email/password authentication with bcrypt
- 🔗 **OAuth Integration** - Sign in with Google or Facebook
- 🛡️ **Session Management** - Secure session handling with MongoDB

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: Passport.js (Local, Google OAuth, Facebook OAuth)
- **Security**: bcrypt for password hashing
- **Sessions**: express-session with MongoDB store

### Frontend
- **Template Engine**: Handlebars (HBS)
- **Styling**: Custom CSS
- **UI Library**: Aqua CSS, Font Awesome Icons
- **Client-side**: jQuery

### Additional Tools
- dotenv for environment variables
- connect-flash for flash messages
- body-parser for request parsing

## 📦 Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn package manager
- Google OAuth credentials (optional)
- Facebook OAuth credentials (optional)

## 🚀 Installation

1. **Clone the repository**
```bash
git clone https://github.com/atreyyash/DocMate.git
cd DocMate