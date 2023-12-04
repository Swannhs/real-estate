# Real Estate Frontend Project

This project is a frontend web application built using React, TypeScript, Tailwind and Vite. It is specifically designed for real estate businesses to effectively manage and display property listings.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Requirements](#requirements)
3. [Installation](#installation)
4. [Running the App](#running-the-app)
5. [Running Tests](#running-tests)
6. [Built With](#built-with)
7. [Contributing](#contributing)
8. [Folder Structure](#folder-structure)
9. [Build and Deployment](#build-and-deployment)

## Getting Started

To get a local copy up and running follow these simple steps.
```sh
git clone https://Swannhs@bitbucket.org/fortunatis-gmbh/fortunatis-real-estate-ui-service.git
```

## Requirements

This project requires the following tools:

- Node.js (version - 18.12.1) - Used to install dependencies and run the frontend web server
- Yarn - A package manager for Node.js

To confirm that you have Node.js installed, run the following command in your terminal:

```bash
node -v
```

## Installation

To install the dependencies, run the following command in your terminal:

```bash
yarn install
```

## Running the App

To run the app, run the following command in your terminal:

```bash
yarn dev
```

## Running Tests

To run the tests, run the following command in your terminal:

```bash
yarn test
```

## Built With

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript that compiles to plain JavaScript
- [Tailwind](https://tailwindcss.com/) - A utility-first CSS framework
- [Vite](https://vitejs.dev/) - A fast frontend build tool
- [Jest](https://jestjs.io/) - A JavaScript testing framework
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - A simple and complete React DOM testing utilities
- [React Router](https://reactrouter.com/) - A collection of navigational components that compose declaratively with your application
- [React Hook Form](https://react-hook-form.com/) - A performant, flexible and extensible forms with easy-to-use validation
- [Redux Toolkit](https://redux-toolkit.js.org/) - The official, opinionated, batteries-included toolset for efficient Redux development
- [React Redux](https://react-redux.js.org/) - The official React bindings for Redux
- [Axios](https://axios-http.com/) - Promise based HTTP client for the browser and node.js
- [React Icons](https://react-icons.github.io/react-icons/) - A collection of icons for popular icon libraries
- [React Toastify](https://fkhadra.github.io/react-toastify/introduction/) - A React notification library
- [React Datepicker](https://reactdatepicker.com/) - A simple and reusable datepicker component for React
- [React Select](https://react-select.com/) - A flexible and beautiful Select Input control for ReactJS with multiselect, autocomplete and ajax support

## Contributing

Contributions are welcome. Please open up an issue before submitting a pull request.

## Folder Structure

```
├── public
│   ├── .htaccess                       --> Apache configuration file
│   ├── _redirects                      --> Netlify configuration file
│   ├── favicon.png                     --> Fortunatis Icon
│   ├── manifest.json                   --> Web app manifest
│   └── robots.txt                      --> Robots.txt
├── src
│   ├── apis
│   │   ├── Auth.ts                     --> Authentication API such as login, register, forgot password, etc.
│   │   ├── Blog.ts                     --> Blog API such as get blog list, get blog detail, post blog, etc.
│   │   ├── ContactUs.ts                --> Contact us API such as send message, etc.
│   │   ├── IpApi.ts                    --> IP API such as get user location, etc.
│   │   ├── Property.ts                 --> Property API such as get property list, get property detail, etc.
│   │   ├── SearchAlert.ts              --> Search alert API such as get search alert list, get search alert detail, etc.
│   │   ├── Setting.ts                  --> Setting API such as get setting, etc.
│   │   ├── StaticData.ts               --> Static data API such as get category list, get country list, etc.
│   │   └── User.ts                     --> User API such as get user profile, update user profile, etc.
│   ├── assets
│   │   ├── favicon.png
│   │   ├── mainfest.json
│   │   └── react.svg
│   ├── common
│   │   ├── ImageCompressor.ts          --> Image compressor used for compressing image in client side
│   │   ├── query.ts
│   │   ├── tokenValidatiyCheck.ts
│   ├── components
│   │   ├── AnyReactComponent           --> Any React Component is used in google map
│   │   ├── BackgroundSection
│   │   │── Banner                      --> Banner component used in homepage
│   │   │── BgGlassmorphism
│   │   │── BlogCard
│   │   │── BtnLikeIcon                 --> Like button component used in every card property
│   │   │── CarCard
│   │   │── CarCardH
│   │   │── CardAuthor2
│   │   │── CardAuthorBox
│   │   │── CardAuthorBox2
│   │   │── CardCategory1
│   │   │── CardCategory2
│   │   │── CardCategory3
│   │   │── CardCategory4
│   │   │── CardCategory5
│   │   │── CardCategory6
│   │   │── CardCategoryBox1
│   │   │── CategoryBadgeList
│   │   │── CommentListing
│   │   │── ExperiencesCard
│   │   │── ExperiencesCardH
│   │   │── FiveStartIconForRate
│   │   │── FlightCard
│   │   │── GallerySlider               --> Gallery slider component used in property detail page
│   │   │── GoogleMap                   --> Google map component used to point out property location with icon
│   │   │── Header                      --> Header component used in every page
│   │   │── Heading
│   │   │── HeroSearchForm              --> Hero search form component used in homepage searchbar
│   │   │── HeroSearchForm2
│   │   │── HeroSearchForm2Mobile
│   │   │── IconButton
│   │   │── Lablel
│   │   │── Modal                       --> Modal component used in popup sections
│   │   │── NcIputNumber
│   │   │── PostCardMeta
│   │   │── PostTypeFeaturedIcon
│   │   │── PropertyCard
│   │   │── PropertyCardH
│   │   │── SaleOffBadge
│   │   │── SearchBar
│   │   │── SeactionBecomeAnAuthor
│   │   │── SectionHero
│   │   │── SectionHero2ArchivePage
│   │   │── SectionHeroArchivePage
│   │   │── SectionHowItWork
│   │   │── SectionOurFeatures
│   │   │── SectionSliderNewCategories
│   │   │── SectionSubscribe2
│   │   │── StartRating
│   │   │── StayCard
│   │   │── StayCardH
│   │   │── FooterNav.tsx
│   │   │── ModalSelectDate.tsx
│   │   │── ModalSelectGuest.tsx
│   ├── containers
│   │   ├── AccountPage                 --> Account page container /account route
│   │   ├── AuthorPage
│   │   ├── BlogPage                    --> Blog page container /blog route
│   │   ├── CheckOutPage                --> Checkout page container /checkout route
│   │   ├── ListingCarPage
│   │   ├── ListingDetailPage
│   │   ├── ListingExperiencesPage
│   │   ├── ListingFlightsPage
│   │   ├── ListingRealEstatePage
│   │   ├── ListingStayPage
│   │   ├── NotiPage
│   │   ├── Page404
│   │   ├── PageAbout
│   │   ├── PageAddListing1
│   │   ├── PageContact
│   │   ├── PageHome
│   │   ├── PageLogin                   --> Login page container /login route
│   │   ├── PageSignUp                  --> Sign up page container /signup route
│   │   ├── PageSubscription
│   │   ├── PayPage
│   │   ├── PropertyPage
│   │   ├── SearchAlert                 --> Search alert page container /search-alert route
│   │   ├── SiteHeader.tsx
│   ├── contains
│   │   ├── contants.ts
│   │   ├── fackeData.ts
│   ├── data
│   │   ├── jsons
│   ├── fonts
│   ├── hooks
│   ├── images
│   ├── lang
│   ├── redux
│   │   ├── actions
│   │   ├── middleware
│   │   ├── reducers
│   │   ├── actionTypes.ts
│   │   ├── store.ts
│   ├── routes
│   │   ├── index.tsx
│   │   ├── ScrollToTop.tsx
│   │   ├── types.ts
│   ├── shared
│   ├── styles
│   ├── types
│   ├── utils
│   ├── App.tsx
│   ├── i18n.ts
│   ├── index.css
│   ├── index.tsx
│   ├── reportWebVitals.ts
│   ├── type.d.ts
│   ├── vite-env.d.ts
│── .dockerignore
│── .env
│── .gitignore
│── .docker-compose.yml
│── Dockerfile
│── index.html
│── package.json
│── postcss.config.js
│── README.md
│── tailwind.config.js
│── tsconfig.json
│── tsconfig.node.json
│── vercel.json
│── vite.config.ts
└── yarn.lock
```

## Build and Deployment

### Vite
```Intall Vite globally using yarn
yarn global add vite
```
```Intall Vite globally using npm
npm install -g vite
```

### Build

```bash
vite build
```

### Deployment

#### Deploy to Vercel

```bash
vercel
```

#### Deploy to Docker

```bash
docker-compose up -d
```

#### Build locally testing

```bash
vite build
```

#### Build for server development

```bash
vite build --mode dev
```

#### Build for production

```bash
vite build --mode prod
```

#### Bundle Directory

vite.config.ts

```ts
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: '.build',
    }
})
```