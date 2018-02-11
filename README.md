[![Build Status](https://travis-ci.org/giving-a-fuck-about-climate-change/carbon-inferno.svg?branch=master)](https://travis-ci.org/giving-a-fuck-about-climate-change/carbon-inferno)
[![Heroku](https://img.shields.io/badge/Heroku-Deployed-brightgreen.svg)](https://carbon-inferno.herokuapp.com/)

[![GitHub issues](https://img.shields.io/github/issues/giving-a-fuck-about-climate-change/carbon-inferno.svg)](https://github.com/giving-a-fuck-about-climate-change/carbon-inferno/issues)
[![GitHub forks](https://img.shields.io/github/forks/giving-a-fuck-about-climate-change/carbon-inferno.svg)](https://github.com/giving-a-fuck-about-climate-change/carbon-inferno/network)
[![GitHub stars](https://img.shields.io/github/stars/giving-a-fuck-about-climate-change/carbon-inferno.svg)](https://github.com/giving-a-fuck-about-climate-change/carbon-inferno/stargazers)
[![GitHub stars](https://img.shields.io/github/watchers/giving-a-fuck-about-climate-change/carbon-inferno.svg)](https://github.com/giving-a-fuck-about-climate-change/carbon-inferno/watchers)
[![Gitter chat](https://badges.gitter.im/giving-a-fuck-about-climate-change/gitter.png)](https://gitter.im/giving-a-fuck-about-climate-change/Lobby)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

![CarbonDoomsDay Logo](https://i.imgur.com/jfj3CMs.png)

A [React.js] web application for visualising CO2 emissions since 1958.

[React.js]: https://github.com/facebookincubator/create-react-app

We're currently live over at [carbondoomsday.com]. This application is part of the [Carbon Doomsday project]:

[carbondoomsday.com]: http://www.carbondoomsday.com/
[Carbon Doomsday project]: http://datadrivenjournalism.net/featured_projects/carbon_doomsday_tracking_co2_since_1958

> Carbon Doomsday is a real-time API and chart of worldwide carbon dioxide
> levels. Developed as a community project, its goal is to be an open-source
> platform for climate data. Data for the API and chart comes from NOAA’s Earth
> System Research Lab in Mauna Loa, Hawaii. The project is rooted in principles
> of free software, open data access and a willingness to contribute to further
> education on the global climate issue.

We pull our data from [api.carbondoomsday.com] (powered by [carbondoomsday]) while [giving a fuck].

[api.carbondoomsday.com]: http://api.carbondoomsday.com/apidocs/
[giving a fuck]: http://titojankowski.com/no-one-gives-a-fck-about-climate-change/
[carbondoomsday]: https://github.com/giving-a-fuck-about-climate-change/carbondoomsday

## How to run locally

  * `git clone` the project.
  * Install the dependencies using `npm i`.
  * Run `npm start`.
  * The app will run on `http://localhost:3000`.

## Linting

We are using [eslint] and [prettier], we recommend setting up your editor to
format on save. But we also have a git hook which will also do the prettier
formatting upon committing.

[eslint]: https://github.com/eslint/eslint
[prettier]: https://github.com/prettier/prettier

## Tests

To run the tests run `npm test`.

## Deploy to Production

Every merged pull request to master gets auto-magically deployed.

Check the [buildpack](https://github.com/mars/create-react-app-buildpack) that we are using.

## Graph Component

Our Chart component is an SVG component written in react.

We are using [react-svg-coordfuncs].

[react-svg-coordfunc]: https://github.com/grady-lad/react-svg-coordfuncs

## Contributing

We welcome all persons no matter what skill level you have!

If you're interested in contributing, we need you! Please check out the following:

  * [Wiki]: Read about the project!
  * [Gitter Lobby]: Come chat to us!
  * [Vision] Repository: Weigh in and let us know your opinion!

[Wiki]: https://github.com/giving-a-fuck-about-climate-change/carbondoomsday/wiki
[Gitter Lobby]: https://gitter.im/giving-a-fuck-about-climate-change/Lobby
[Vision]: https://github.com/giving-a-fuck-about-climate-change/vision

# Support

Support us with a monthly donation and help us continue our activities.

> [Become a backer!](https://opencollective.com/giving-a-fuck-about-climate-change)

<a href="https://opencollective.com/giving-a-fuck-about-climate-change/backer/0/website" target="_blank"><img src="https://opencollective.com/giving-a-fuck-about-climate-change/backer/0/avatar.svg"></a>
