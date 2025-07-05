# SBOM-Viewer

A web-based tool for visualizing and analyzing Software Bill of Materials (SBOMs).  
Live Demo: [sbom-viewer.onrender.com](https://sbom-viewer.onrender.com/)

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## About

**SBOM-Viewer** is an open-source application designed to help users upload, view, and analyze SBOM files. SBOMs are essential for understanding the components and dependencies within a software project, improving transparency and security.

---

## Features

- Upload and visualize SBOM files
- Interactive and user-friendly interface
- Supports common SBOM formats (CycloneDX, SPDX, etc.)
- Component and dependency graph visualization
- Search and filter components
- Responsive design

---

## Demo

Check out the live demo: [sbom-viewer.onrender.com](https://sbom-viewer.onrender.com/)

---

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Clone the Repository

```bash
git clone https://github.com/sumanth-14/SBOM-Viewer.git
cd SBOM-Viewer
```

### Install Dependencies

#### For the client:

```bash
cd client
npm install
```

#### For the server:

```bash
cd ../server
npm install
```

---

## Usage

### Start the Server

```bash
cd server
npm start
```

### Start the Client

In a new terminal:

```bash
cd client
npm start
```

The client will typically run on [http://localhost:3000](http://localhost:3000) and the server on [http://localhost:5000](http://localhost:5000) (or as configured).

---

## Project Structure

```
SBOM-Viewer/
├── client/   # Frontend React application
├── server/   # Backend Node.js/Express server
└── README.md
```

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

---

## License

This project is licensed under the MIT License.

---

## Contact

For questions or feedback, please open an issue on the [GitHub repository](https://github.com/sumanth-14/SBOM-Viewer).

---

Feel free to further customize this README to better fit your project’s specifics or add more details as your project evolves!
