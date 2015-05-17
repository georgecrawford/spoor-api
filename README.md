## Spoor API

Spoor is any sign of a creature or trace by which the progress of someone or
something may be followed. A spoor may include tracks, scents, scat, or broken
foliage. Spoor is useful for discovering or surveying what types of animals
live in an area, or in animal tracking.

Spoor is the data collection pipeline for FT.com.

# Usage

`make run`

`curl -i localhost:5101/foo?data=1`

Will write a file containing '1' to S3 (archive) and our Kinesis stream.

# Theory

```
                                             +------------------+           
                                      +--->  |   s3 (archive)   |           
                                      |      +------------------+
                                      |     
+----------+      +-------------+     |      +------------------+    
|  client  | +--> |  spoor api  | +-> | -->  | kinesis (ingest) |       
+----------+      +-------------+     |      +------------------+                           
                                      |   
                                      |      +------------------+           
                                      +--->  |       sqs        |           
                                             +------------------+
```

## Collection

- Spoor receives event data.
- Archived on s3.
- Pushed to a Kenesis queue.
- Pushed to an SQS queue.

## Decoration

- Then we decorated by additional API (session API, CAPI etc.).
- Pushed to another queue.
- Consumed by anyone who wants it.

The main consumer will be RedShift.

