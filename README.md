## Extract GSheet

This is a prototype for testing out extracting data from a google sheet without going through the API. No keys necessary. This will only read data from a Google sheet provided that you publish and format your document correctly.

This project was inspired by Tabletop, which no longer works due to Google changing their API. It was a fantastic tool while it lasted.

## Things to Know

- This is not thoroughly tested, so I would not recommend this for production, unless maybe your user base is super small and they can let you know when things change.
- This heavily depends on the output HTML that Google provides. If it changes a little bit, this script will break as well.

## To Do

Filter out empty lines (See Bad Example)