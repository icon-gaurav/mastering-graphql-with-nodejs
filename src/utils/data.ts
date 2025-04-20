const products = [
    {
        "id": "p1",
        "name": "MacBook Pro",
        "price": 1999.99
    },
    {
        "id": "p2",
        "name": "iPhone 15",
        "price": 999.99
    }
]

const users = [
    {
        "id": "u1",
        "name": "Alice Johnson",
        "email": "alice@example.com"
    },
    {
        "id": "u2",
        "name": "Bob Smith",
        "email": "bob@example.com"
    }
]

const orders = [
    {
        "id": "o1",
        "userId": "u1",
        "productId": "p2",
        "quantity": 1,
        "orderDate": "2025-04-10"
    },
    {
        "id": "o2",
        "userId": "u2",
        "productId": "p1",
        "quantity": 2,
        "orderDate": "2025-04-12"
    }
]


export {products, users, orders}
