# CSV to LatLong

This is a mini project to proof that we can parse a csv document, and insert the data to DB.

# INSTALLATION
```
git clone https://github.com/kumangxxx/csv_to_latlong.git
```

# HOW TO USE
1. Setup your .env
    ```
    MONGO_URL=mongodb://user:password@host:27017/db_name
    PORT=4000
    ```
2. Run the service
    ```
    node index.js
    ```

# API
#### Import CSV
```
curl -X POST \
  http://localhost:4000/import \
  -H 'cache-control: no-cache' \
  -H 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \
  -H 'postman-token: 2111bab8-0002-7b96-d6d9-b5d9e5060335' \
  -F 'csv=@/home/kumangkumeng/Downloads/Tracking Data.csv'
```
#### Get points
```
curl -X GET \
  http://localhost:4000/points \
  -H 'cache-control: no-cache' \
  -H 'postman-token: 949dfed5-9e58-4342-fa94-d1bae59771e9'
```

# Note
This project is still in development mode.

# Contributor / Contact
- Rahadian Ahmad (kumangxxx@gmail.com)

# How to Contribute
1. Make a pull request / merge request
