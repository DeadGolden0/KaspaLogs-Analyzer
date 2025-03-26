
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

## 🛠 Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## 📦 Installation

1. Clone this repository:

```bash
git clone https://github.com/your-username/kaspa-logs-analyzer.git
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

> Storing sensitive data, hardcoded paths, or credentials directly in the codebase is a security risk and should be avoided.
>
> If you plan to extend this script to use environment variables or API keys, make sure to use a `.env` file and **never commit it** to version control. Add `.env` to your `.gitignore` file to keep it secure.

## 🤝 Contribution

Contributions are welcome! Feel free to fork the repo, open issues, or submit pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
