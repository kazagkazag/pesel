# Introduction

This project helps you generate valid PESEL number, which is primary personal identyficator number
in Poland.

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

## `generate(options: Options): string`

## `Options { year: number; month: number; day: number; sex: "k"|"K"|"f"|"F"|"m"|"M"; prettyUnique: boolean }`

* `year`
* `month`
* `day`
* `sex`
* `prettyUnique`