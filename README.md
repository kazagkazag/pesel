# Introduction

Genearetes valid PESEL number, which is primary personal identyficator number in Poland. It can create 
PESEL based on provided birth date (or just a part of that date) or random one.

# Usage

Repo is not bundled, which means, that your environment should be able to handle common js modules.

## How to install?

`npm install pesel`

## How to use?

```
const {generate} = require("pesel");

console.log(generate());
// > random PESEL number as a string 
```

# API

## `generate(options?: Options): string`

### Options (all optional):

* `year` - number in range `1800-2299`
* `month` - number in range `1-12` where 1 is January and 12 is December
* `day` - number in range `1-31`
* `sex` - string (case insensitive) `K` or `F` for female and `M` for male
* `prettyUnique` - boolean `true`|`false` - useful when used in some sort of automation tests - generates
pesel based on current date, using month, day, hour, minutes and seconds from `new Date()`.

**Important note.** Because script accepts input, that could create invalid date, the non-strict solution
of date computation was choosen. Example: `generate({month: 2, day: 31})` - of course February (2. month)
does not have 31 days, so that the input is incorrect. But script uses `new Date()` constructor to compute
final birth date, and it will first generate random year (let's say 2017) and then use `new Date()` with
that year and provided month and day. The resulting date will be `2017-03-03` (3rd of March).