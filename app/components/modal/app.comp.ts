"scripts": {
    "start": "tsc && concurrently \"tsc -w\" \"lite-server\" ",
    "lint": "tslint ./app/**/*.ts -t verbose",
    "lite": "lite-server",
    "test": "tsc && concurrently \"tsc -w\" \"karma start karma.conf.js\"",
    "test-once": "tsc && karma start karma.conf.js --single-run",
    "tsc": "tsc",
    "tsc:w": "tsc -w"
  }


