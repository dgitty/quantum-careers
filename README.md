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
Run unit tests: `npm run test:unit`

Run linters: `npm run lint`

### Notes

- Acquired Bootstrap icons from cdn and imported https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css
- Created BaseApiService to provide and interface to backend api for new services
- config.json contains url path and is intended for any configurable items
- Used infinite scrolling for a seamless look and feel
- Created a base Pokemon Summary Component to be easily reused as I saw that was content common on several views (i.e. details page and summary)
- I've considered including eslintrc.json file and following the style standard but for the sake of time I decided to not include that as I saw there would have been a lot of changes that would be required. I felt that for the scope of this effort, focusing on the feaures was most important.
- I felt that the styling took more of my time than developing the features/functionality since I was trying to make the app similar to what was demonstrated in the example video.

### Resources
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [React](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)