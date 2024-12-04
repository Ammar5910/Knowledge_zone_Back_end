# Knowledge_zone_express
The endpoint means Controller
# Controller
It communicates with the model to retrieve, update, or manipulate data stored in a database.

# postman
https://knowledge-zone-back-end.onrender.com

https://knowledge-zone-back-end.onrender.com/api/orders

https://knowledge-zone-back-end.onrender.com/api/lessons


for postman post
{
    "customer": {
        "firstName": "test",
        "lastName": "test",
        "number": "+971091827430",
        "address": "sharja",
        "email": "test@gmail.com"
    },
    "paymentMethod": "cash",
    "lessons": [
        {
            "name": "Math",
            "price": 100,
            "quantity": 1,
            "lessonId":"6740c5593b50a92a69b60701"
        }
        
    ]
}