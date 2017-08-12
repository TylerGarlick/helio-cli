<img src="http://i.imgur.com/UzC7XPe.png" alt="Helio Training" width="226" align="center"/> <span>&nbsp;v0.1.3</span>

---------------

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

# Helio CLI

A robust(ish) CLI application for generating some of the materials we utilize in our courses [@HelioTraining](https://heliotraining.com). 

Faculty and students can utilize this tool for generating graphql service skeletons, react applications (utilizing create-react-app), and assignments for our full-stack students. This CLI provides all the functionality you need in order to make a full-stack application with some of the hottest packages out there.

## Features

1. Auto generation of introductory api templates (Apollo Server - GraphQL, Express, etc)
2. Tie-ins to existing tools that we use throughout the course like ([create-react-app]())
3. (Helio students) A way to let students pull competency assignments and commit them through their terminal
4. Extendible by any repo that follows guidelines for templates or assignments

## Template Repos

Templates are essentially skeletons that will create a baseline for an application. Some of the base template repo's we have available currently are:

- [Apollo GraphQL Server w/ Mongoose]()
- [Apollo GraphQL Server w/ Sequelize]()
- [Apollo GraphQL Server w/ MemoryStore]()

## Assignment Repos

Assignments are repos containing some set of instructions (and usually tests) to check the levels of competencies of our students.

- [TBD]()

## Actively Under Development

Expect things to change and break while we solidify the CLI.

## Roadmap / Features

- [X] Core - Git Template Manager
- [X] Core - CLI Interface
- [ ] Core - Template List
- [ ] Core - Assignment List
- [X] Core - Metalsmith Integrations
- [ ] Core - Default Templates &amp; Prompts

## License
We utilize the GNU GENERAL PUBLIC LICENSE V3 license. For more information read the LICENSE.txt file.