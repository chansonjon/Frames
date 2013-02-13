# Frames

## Introduction

Frames is a fun little Javascript MVC Framework. Does the world need another Javascript Framework? Not really, however, Frames isn't trying to be like Angular, Backbone, Ember, or Flight. Frames main goal is to be fun, simple and provide an obvious programming patterns that should be easily recognizable to anyone trying it out.

## What Makes Frames Different?

My first goal with Frames was to drive everything off of a controller/action notion. Much like Ruby on Rails or CakePHP, I wanted to be able to look at a URL and know exactly where the code being executed lived.

> http://localhost/FramesApplication/#!/pages/about/

In the URL example above I know that the code being executed would live in the about method within the Pages controller. Super straight forward.

I feel this pattern helps keep Frames applications very maintainable.

## Implementation

For now, check out the example app. It's very, very straight forward.

## Foundational Libraries

Frames was built using other, way more awesome, libraries.

* RequireJS - Really the foundation. RequireJS is an amazing package manager helping keep implementation simple and your code organized.
* Handlebars - The templating language used by Frames.

