# 🎯 Bingo Host App

An interactive, multi-window Bingo hosting application built with **Electron**, **React**, and **TypeScript**.
Designed to manage live Bingo games with customizable themes, animations, and multi-display support.

---

## 📌 Features (Planned)
- **Multi-window environment**: Configurator, Host Controller, Main Display, and Numbers Grid Display.
- **Real-time game state management** (phases, drawn numbers, timers, modes).
- **IPC-based communication** between windows.
- **Persistence & recovery system** to resume games after restart.
- **Custom themes** for a fully branded experience.
- **Media support** for videos, audio, and images.

---

## 🛠 Tech Stack
- **Electron** – Desktop application framework.
- **React** – UI rendering and component management.
- **TypeScript** – Type safety and better developer experience.
- **Node.js** – Backend runtime for Electron.
- **IPC** – Inter-process communication between main and renderer processes.

---

## 📂 Project Structure
```bash
/app
  /main            # Electron main process
  /windows
    /configurator
    /host-controller
    /main-display
    /numbers-grid
  /shared           # types, constants, utilities
  /themes           # theme packs
  /assets           # videos, audio, images
```
# 🚀 Getting Started

1️⃣ Clone the repository
```bash
git clone https://github.com/MarcosPimienta/bingo-host-app.git
cd bingo-host-app
```
2️⃣ Install dependencies
```bash
npm install
```
3️⃣ Run in development
```bash
npm run dev
```
4️⃣ Build for production
```bash
npm run build
```

# 📜 Scripts
```bash
#Command 	#Description
```
---
```bash
npm run dev	Start app in development mode
npm run build	Build production-ready app
npm start	Run compiled app
```
