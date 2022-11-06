# IBM Quantum Challenges

Hi! I'm Dalina and I'm on a mission to complete this challenge!

## Challenges

### Frontend Challenge

challenge: `<project_main/challenges/frontend>`
solution: `<project_main>/solutions/pokemon`

#### Run the app

```bash
# Navigate to the app
$ cd solutions/pokedex
# Install dependencies
$ npm ci
# Run the app
$ npm run start
```

#### Other commands
Run end to end tests (Run the app first before running e2e tests): `npm run test:e2e`

Run end to end tests command line interface (Run the app first before running e2e tests): `npm run test:e2e-ci`

Run linters: `npm run lint`

### Notes

- Created end to end test with cypress as I felt it was best to demonstrate the expected outcomes, behaviours of the features, and what should exist on the ui.
- Acquired Bootstrap icons from cdn and imported https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css
- Created BaseApiService to provide and interface to backend api for new services
- config.json contains server url path and is intended for any configurable items. I would use a .env file for environment variables for the individual user to configure the server url (in the event the server urls could be different) usually but to reduce the number of steps a person would have to do to get the app running I used a config.json file.
- Used infinite scrolling for a seamless look and feel
- Created a base Pokemon Summary Component to be easily reused as I saw that was content common on several views (i.e. details page and summary)
- I've considered including .eslintrc.json file and following the style standard but for the sake of time I decided to not include that as I saw there would have been a lot of changes that would be required. I felt that for the scope of this effort, focusing on the feaures was most important. However, I did set some eslint rules in package.json
- I felt that the styling took a bit more of my time than developing the features/functionality since I was trying to make the app look similar to what was demonstrated in the example video.
- Transitions css to scss as scss is Syntactically Awesome Style Sheet.
- Whenever the page is loading it'll display a pokeball spinning which I thought was cool.
- To use or to not use semicolons?! I went with using semicolons... I wasn't stuck on using one way over the other but just went with using semicolons.
- My test for favoriting/unfavoriting a pokemon is a little trippy I think. I've seen it pass most times but a few times it didn't pass but couldn't catch why that was.

### Resources

- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [React](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Pokemon Ball Spinner](https://www.youtube.com/watch?v=PZzxbhf9KaM)
- [Cypress](https://www.cypress.io/)