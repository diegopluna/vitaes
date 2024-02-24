<a href="https://vitaes.io/">
  <h1 align="center">Vitaes</h1>
</a>

<p align="center">
  <a href="https://github.com/diegopluna/vitaes/blob/main/LICENSE.md">
    <img src="https://img.shields.io/github/license/diegopluna/vitaes?label=license&logo=github&color=f80&logoColor=fff" alt="License" />
  </a>
</p>

<p align="center">
  <a href="#introduction"><strong>Introduction</strong></a> ·
  <a href="#installation"><strong>Installation</strong></a> ·
  <a href="#tech-stack--features"><strong>Tech Stack + Features</strong></a> ·
  <a href="#author"><strong>Author</strong></a> ·
  <a href="#contributing"><strong>Credits</strong></a> ·
  <a href="#license"><strong>License</strong></a>
</p>
<br/>

## Introduction

Vitaes is a free and open-source resume builder. It allows you to create a professional-looking resume with a clean and modern design.

## Installation

To install Vitaes, you need to have Bun or npm installed on your system. You can then clone the repository and install the dependencies using the following commands:

```bash
git clone https://github.com/diegopluna/vitaes.git
cd vitaes
npm install
# or
yarn install
# or
pnpm install
#or
bun install
```

Copy `.env.example` to `.env.local` and update the variables.

```sh
cp .env.example .env.local
```

Start the development server by running the following command:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

This will start the server and make it available at `http://localhost:3000`.

## Tech Stack + Features

### Frameworks

- [Next.js](https://nextjs.org/) – React framework for building performant apps with the best developer experience.
- [Drizzle ORM](https://drizzle-orm.com/): A TypeScript ORM for building database applications.
- [Auth.js](https://authjs.dev/): A library for authentication and authorization in web applications.
- [Puppeteer](https://pptr.dev/): A Node.js library that allows you to automate interactions with web browsers.

### Plataforms

- [Vercel](https://vercel.com/) – Easily preview & deploy changes with git
- [Neon Database](https://neondatabase.com/): A PostgreSQL database that provides a robust and scalable solution for storing and managing data.

### UI

- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework that provides a clean and modern design.
- [Shadcn/ui](https://github.com/sindresorhus/shape-ui): A React UI library that provides a set of components and utilities for building user interfaces.
- [Lucide](https://lucide.dev/) - A collection of icons that can be used in your React applications.

In addition to these technologies, Vitaes also includes the following features:

- Resume builder: Allows you to create a professional-looking resume with a clean and modern design.
- PDF export: Allows you to export your resume as a PDF file.
- Authentication: Supports Github authentication for easy and secure access to your resume.
- Dark mode: Supports a dark mode for a more comfortable and professional experience.

## Authors

- **Diego Luna** - *Initial work* - [diegopluna](https://github.com/diegopluna)
- **Arthur Costa** - *Initial work* - [Arthurlpgc](https://github.com/Arthurlpgc)

## Credits

- [AwesomeCV](https://github.com/posquit0/Awesome-CV) - A LaTeX template for creating a professional CV.

## Contributing

We love our contributors! Here's how you can contribute:
- [Open an issue](https://github.com/diegopluna/vitaes/issues) if you believe you've encountered a bug.
- Make a [pull request](https://github.com/diegopluna/vitaes/pull) to add new features/make quality-of-life improvements/fix bugs.

<a href="https://github.com/diegopluna/vitaes/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=diegopluna/vitaes" />
</a>


## License

Vitaes is licensed under the MIT License. See the [LICENSE](https://github.com/diegopluna/vitaes/blob/main/LICENSE.md) file for more information.
