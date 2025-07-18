# 🛒 API RESTful de Productos - Proyecto Final

## Descripción
Esta API permite gestionar productos de un e-commerce utilizando Firestore como base de datos y autenticación mediante JWT.

---

## Autenticación
- `POST /login` → Inicia sesión con usuario y contraseña. Devuelve un token JWT.

- ```json
- {"username": "admin" `, `"password": "123456"`}
```
---

## Productos

🔐 Todos los endpoints de productos requieren un **token JWT** enviado en el header:
Authorization: Bearer <token>

### CRUD Básico

- `GET /products` → Lista todos los productos.
- `GET /products/:id` → Obtiene un producto por su ID.
- `POST /products` → Crea un nuevo producto.
- `PUT /products/:id` → Actualiza completamente un producto.
- `PATCH /products/:id` → Actualiza parcialmente un producto.
- `DELETE /products/:id` → Elimina un producto por ID.

---

## 🔍 Filtros y búsqueda avanzada (GET /products)

Podés usar los siguientes **query parameters**:

| Parámetro     | Descripción                                     | Ejemplo                     |
|---------------|-------------------------------------------------|-----------------------------|
| `search`      | Busca por nombre del producto                   | `?search=intel`             |
| `category`    | Filtra por categoría (minúsculas)               | `?category=procesadores`    |
| `min`         | Precio mínimo                                   | `?min=1000`                 |
| `max`         | Precio máximo                                   | `?max=3000`                 |
| `sortField`   | Campo a ordenar (`title`, `price`, etc.)        | `?sortField=price`          |
| `sortOrder`   | Dirección (`asc` o `desc`)                      | `?sortOrder=desc`           |

📌 Los filtros se pueden combinar:
GET /products?category=memorias&min=1000&max=5000&sortField=price&sortOrder=asc


---
