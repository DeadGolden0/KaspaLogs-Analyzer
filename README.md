# 📊 Kaspa Logs Analyzer

**Kaspa Logs Analyzer** is a Node.js script designed to parse and analyze logs related to the Kaspa network. It extracts useful patterns and information from log files to help you debug, monitor or understand node behavior.

## 📋 Table of Contents

- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Usage](#-usage)
- [Customization](#-customization)
- [Caution](#-caution)
- [Contribution](#-contribution)
- [License](#-license)
- [Contact](#-contact)
- [Support Me](#-support-me)

## 🛠 Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## 📦 Installation

1. Clone this repository:

```bash
git clone https://github.com/DeadGolden0/kaspa-logs-analyzer.git
cd kaspa-logs-analyzer
```

2. Install dependencies:

```bash
npm i
```

## ▶️ Usage

1. Create a folder named `Logs` in the root directory of the project.
2. Place all log files you want to analyze inside the `Logs` folder.
3. Run the script:

```bash
node .
```

## 🛠 Customization

You can customize the log patterns by editing the following file:

- `analysis/patterns.js`

Modify or add new regex patterns based on what you want to detect in your logs.

## ⚠️ Caution

> [!CAUTION]
> I disclaim all responsibility for the use of this software. This software is provided for educational purposes only and should not be used for any other purpose. The user assumes full responsibility for the consequences of its use.

> [!WARNING]
> Storing sensitive data, hardcoded paths, or credentials directly in the codebase is a security risk and should be avoided.
>
> If you plan to extend this script to use environment variables or API keys, make sure to use a `.env` file and **never commit it** to version control. Add `.env` to your `.gitignore` file to keep it secure.

## 🤝 Contributing

Your contributions make the open source community a fantastic place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ✉️ Contact

For any questions or suggestions, please feel free to contact me:

[![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/w92W7XR9Yg)
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:deadgolden9122@gmail.com)
[![Steam](https://img.shields.io/badge/steam-%23000000.svg?style=for-the-badge&logo=steam&logoColor=white)](https://steamcommunity.com/id/DeAdGoLdEn/)

## 💖 Support Me

If you find this project helpful and would like to support my work, you can contribute through PayPal. Any support is greatly appreciated and helps me continue developing and maintaining the project.

[![PayPal](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://paypal.me/DeadGolden0)

