# Mobile Pro Planner
## Introduction
Mobile Pro Planner is a single page application for managing employees, customers, invoices, and (for those companies that work out of town) hotel stays.
### Stack
Mobile Pro Planner is built on the MERN stack. We use **MongoDB** for record persistence, **Express.js** for backend routing, and **mongoose** for Object Document Mapping. The front end is handled by **React/Redux**.
### Guiding Principals
Mobile Pro Planner was born out of a need for a simple, open-source solution to keeping track of employees, customers, invoices, and hotels, but *most importantly* getting that information to the men and women who need it to do their jobs better.
## Installation
### Prerequisites
This app requires that MongoDB be installed and running as a service. Additionally, node.js must be installed.
### Clone the repository
From the command line, navigate to the directory you wish to clone Mobile Pro Planner into and run the following commands:
```
$ git clone https://github.com/jamesmanone/mobile-pro-planner.git
$ cd mobile-pro-planner
$npm install
```
### Edit Configuration file
Coming Soon!
### Create DB
Mobile Pro Planner will use a database called 'mobilepro'.
You must create this database and populate it with the superuser account. This is done with the following commands:
```
$ mongo
> use mobilepro;
// TODO: INSTANTIATE SUPERUSER
```
### Start The Server
From the mobile-pro-planner directory, run the following command:
```
$ npm start
```
## App Functionality
// TODO: fill in this section
