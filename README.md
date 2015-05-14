## Spoor API

Spoor is any sign of a creature or trace by which the progress of someone or
something may be followed. A spoor may include tracks, scents, scat, or broken
foliage. Spoor is useful for discovering or surveying what types of animals
live in an area, or in animal tracking.

Spoor is the data collection pipeline for FT.com.

# Usage

`make run`

`curl -i localhost:5101/adsf?data=1`

Will write a file containing '1' to s3. 

# Theory

`spoor api -> s3 -> sqs (raw) -> decorators -> sqs (decorated) -> redshift | keen.io | bettsy etc.`

- Spoor receives event data.
- Archived on s3.
- Pushed to a queue.
- Decorated by additional API (session API, CAPI etc.).
- Pushed to another queue.
- Consumed by anyone who wants it.
