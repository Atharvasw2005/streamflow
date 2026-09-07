# 🎬 StreamFlow

A full-stack, cloud-based video streaming platform built as a final-year engineering project. Users can securely upload, manage, and stream video content through a modern web application.

**Stack:** React frontend · Spring Boot backend · Relational database · AWS S3 storage · AWS CloudFront CDN

---

## 🚀 Features

- **User Management** — Registration, secure login, role-based access control, protected API endpoints
- **Video Management** — Upload, store metadata, retrieve, manage, and stream video content
- **Cloud Storage** — Videos stored in AWS S3 instead of the app server, keeping the backend lightweight and scalable
- **CDN Delivery** — AWS CloudFront serves video content for faster, more reliable delivery
- **Security** — Authentication, authorization, and role-based access enforced at the API level

---

## 🏗️ Architecture

```text
User Browser
     │
     ▼
React Frontend  ──────────────►  Spring Boot Backend
                                  (Controller → Service → Repository)
                                         │
                          ┌──────────────┴──────────────┐
                          ▼                              ▼
                     Database                      AWS S3 (Storage)
                (Users, Roles,                            │
                 Video Metadata)                           ▼
                                                    AWS CloudFront (CDN)
                                                            │
                                                            ▼
                                                   Video streamed to user
```

**Flow summary:**
1. **Auth** — Frontend sends credentials → backend validates → returns auth token → user accesses protected routes.
2. **Upload** — User uploads a video → backend saves metadata to the database and the file to S3.
3. **Streaming** — User requests a video → backend fetches metadata → video is served via CloudFront.

---

## 🛠️ Technology Stack

**Frontend:** React, JavaScript/TypeScript, HTML, CSS, REST APIs

**Backend:** Java, Spring Boot, Spring Web, Spring Security, Spring Data, Maven

**Database entities:**
```text
User: id, username, email, role
Video: id, title, description, storageLocation, uploadDate, userRef
```

**AWS Services:** S3 (storage), CloudFront (CDN)

---

## 📁 Project Structure

```text
Streaming-application/
├── streaming-app-backend/
│   ├── src/main/java/.../{controller, service, repository, entity, config, security}
│   ├── src/main/resources/{application.properties, application.yml}
│   └── pom.xml
├── streaming-app-frontend/
│   ├── src/{components, pages, services, hooks}
│   ├── public/
│   └── package.json
└── README.md
```

---

## ⚙️ Prerequisites

- **Backend:** Java JDK, Maven, a database server, an IDE (IntelliJ / Eclipse / VS Code)
- **Frontend:** Node.js, npm
- **Cloud:** AWS account with S3 and CloudFront configured, plus valid credentials

---

## 🔧 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/Atharvasw2005/streamflow
cd Streaming-application
```

### 2. Backend setup
```bash
cd streaming-app-backend
```
Set your database and AWS values in `application.properties` (or via environment variables — see below), then run:
```bash
./mvnw spring-boot:run
```

### 3. Frontend setup
```bash
cd streaming-app-frontend
npm install
npm run dev
```

The app will be available at the local URL shown by the dev server.

---

## 🔐 Environment Variables

Never commit real credentials. Use a `.env` file (and provide a `.env.example` with empty values for contributors):

```env
DB_URL=
DB_USERNAME=
DB_PASSWORD=

AWS_ACCESS_KEY=
AWS_SECRET_KEY=
AWS_REGION=

CLOUDFRONT_DOMAIN=
```

**Files to keep out of version control:**
```text
.env
application-secret.properties
target/
node_modules/
dist/
build/
.idea/
.vscode/
*.log
```

---

## 🎯 Goals & Learning Outcomes

This project was built to understand the architecture behind real-world video streaming platforms — full-stack development, REST API design, authentication/authorization, database design, cloud storage integration, and CDN-based content delivery.

---

## 🔮 Future Enhancements

- Video transcoding & adaptive bitrate streaming (HLS)
- Thumbnails, search, categories, and playlists
- Watch history, user profiles, and recommendations
- Comments, ratings, and analytics
- Admin dashboard
- Docker + CI/CD pipeline

---

## 🤝 Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

Currently intended for educational and academic purposes. Add a license (e.g., MIT) if you plan to open it up further.

---

## 👨‍💻 Author

**Atharva Wankhade** — Final-Year Engineering Project

**Upload. Store. Stream.**
