#!/usr/bin/env bash
set -e

# We will wait for MySQL to be ready
for i in {1..10}; do
  mysqladmin ping -h "$DB_HOST" -u"$DB_USER" -p"$DB_PASS" --silent && break
  echo "Waiting for MySQL… ($i)"
  sleep 2
done

# Test registration endpoint
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" \
  -X POST http://localhost:8000/register.php \
  -H "Content-Type: application/json" \
  -d '{"username":"ciuser","password":"ciPass123"}')
if [ "$HTTP_CODE" -ne 201 ]; then
  echo "❌ register.php returned $HTTP_CODE, expected 201"
  exit 1
fi

# Test login endpoint
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" \
  -X POST http://localhost:8000/login.php \
  -H "Content-Type: application/json" \
  -d '{"username":"ciuser","password":"ciPass123"}')
if [ "$HTTP_CODE" -ne 200 ]; then
  echo "❌ login.php returned $HTTP_CODE, expected 200"
  exit 1
fi

echo "Backend API tests passed!"
