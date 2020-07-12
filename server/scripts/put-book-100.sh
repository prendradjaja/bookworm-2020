curl \
    -H "Content-Type: application/json" \
    -X PUT \
    --data '{"title": "Book 100"}' \
    "http://localhost:4200/api/books/100"
