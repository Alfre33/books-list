# 📚 API de Libros y Usuarios

API GraphQL para gestionar usuarios y sus colecciones de libros, construida con NestJS, MongoDB y GraphQL.

## 🚀 Stack Tecnológico

- **NestJS** v11.0.1 - Framework progresivo de Node.js
- **GraphQL** - Enfoque code-first con Apollo Server
- **MongoDB** - Base de datos con Mongoose ORM
- **TypeScript** - Desarrollo con tipado seguro
- **Class Validator** - Validación de DTOs

## 📋 Requisitos Previos

- Node.js (v18 o superior)
- Instancia de MongoDB ejecutándose localmente o cadena de conexión remota
- npm o yarn

## ⚙️ Instalación

```bash
npm install
```

## 🔧 Configuración

Crea un archivo `.env` basado en `.env.example` o configura la conexión a MongoDB en `app.module.ts`:

```typescript
MongooseModule.forRoot('mongodb://localhost:27017/books-db')
```

## 🏃 Ejecutar la Aplicación

```bash
# Modo desarrollo con hot-reload
npm run start:dev

# Modo producción
npm run start:prod
```

El GraphQL Playground estará disponible en: `http://localhost:3000/graphql`

## 📖 Documentación de la API

### Módulo de Usuarios

#### Consultas (Queries)

**Obtener todos los usuarios:**
```graphql
query {
  users {
    _id
    name
    email
    age
    createdAt
    updatedAt
  }
}
```

**Obtener usuario por ID:**
```graphql
query {
  user(id: "674123abc...") {
    _id
    name
    email
    age
  }
}
```

#### Mutaciones (Mutations)

**Crear usuario:**
```graphql
mutation {
  createUser(createUserInput: {
    name: "Juan Pérez"
    email: "juan@ejemplo.com"
    age: 30
  }) {
    _id
    name
    email
  }
}
```

**Actualizar usuario:**
```graphql
mutation {
  updateUser(
    id: "674123abc..."
    updateUserInput: {
      name: "Juan Actualizado"
      age: 31
    }
  ) {
    _id
    name
    age
  }
}
```

**Eliminar usuario:**
```graphql
mutation {
  removeUser(id: "674123abc...") {
    _id
    name
  }
}
```

### Módulo de Libros

#### Consultas (Queries)

**Obtener todos los libros:**
```graphql
query {
  books {
    _id
    title
    author
    userId
    createdAt
    updatedAt
  }
}
```

**Obtener libro por ID:**
```graphql
query {
  book(id: "674456def...") {
    _id
    title
    author
    userId
  }
}
```

**Obtener libros por usuario:**
```graphql
query {
  booksByUser(userId: "674123abc...") {
    _id
    title
    author
  }
}
```

#### Mutaciones (Mutations)

**Crear libro:**
```graphql
mutation {
  createBook(createBookInput: {
    title: "Código Limpio"
    author: "Robert Martin"
    userId: "674123abc..."
  }) {
    _id
    title
    author
    userId
  }
}
```

**Actualizar libro:**
```graphql
mutation {
  updateBook(
    id: "674456def..."
    updateBookInput: {
      title: "Código Limpio: Edición Actualizada"
    }
  ) {
    _id
    title
    author
  }
}
```

**Eliminar libro:**
```graphql
mutation {
  removeBook(id: "674456def...") {
    _id
    title
  }
}
```

## 🎯 Características

### Validaciones
- Validación de formato de email
- Restricciones de longitud de cadenas (mín/máx)
- Validación de ObjectId de MongoDB
- Validación de rango de edad (1-150)

### Reglas de Negocio
- **Emails únicos**: Los usuarios no pueden tener emails duplicados
- **Libros únicos por usuario**: Un mismo usuario no puede tener libros duplicados (mismo título + autor)
- **Validación de usuario**: Los libros requieren una referencia válida de usuario
- **Trimming automático**: Las cadenas se limpian automáticamente

### Manejo de Errores
- `NotFoundException` (404): Recurso no encontrado
- `ConflictException` (409): Entradas duplicadas
- Mensajes de error detallados en las respuestas de GraphQL

## 🗄️ Esquema de Base de Datos

### Colección User
```typescript
{
  _id: ObjectId
  name: string (3-100 caracteres)
  email: string (único, email válido)
  age: number (1-150)
  createdAt: Date
  updatedAt: Date
}
```

### Colección Book
```typescript
{
  _id: ObjectId
  title: string (1-200 caracteres)
  author: string (2-100 caracteres)
  userId: ObjectId (ref: User)
  createdAt: Date
  updatedAt: Date
}
```

**Índices:**
- `{ email: 1 }` - Índice único en User.email
- `{ userId: 1, title: 1, author: 1 }` - Índice compuesto único en Books

## 📁 Estructura del Proyecto

```
src/
├── users/
│   ├── dto/
│   │   ├── create-user.input.ts
│   │   └── update-user.input.ts
│   ├── entities/
│   │   └── user.entity.ts
│   ├── users.module.ts
│   ├── users.resolver.ts
│   └── users.service.ts
├── books/
│   ├── dto/
│   │   ├── create-book.input.ts
│   │   └── update-book.input.ts
│   ├── entities/
│   │   └── book.entity.ts
│   ├── books.module.ts
│   ├── books.resolver.ts
│   └── books.service.ts
├── app.module.ts
└── main.ts
```

## 🛠️ Desarrollo

```bash
# Formatear código
npm run format

# Lintear código
npm run lint

# Construir para producción
npm run build
```

## 📝 Notas

- La conexión a MongoDB debe estar activa antes de iniciar la aplicación
- El esquema de GraphQL se genera automáticamente (enfoque code-first)
- Todos los timestamps (createdAt, updatedAt) son gestionados automáticamente por MongoDB
- ValidationPipe está configurado globalmente con `whitelist: true` para seguridad

## 👤 Autor

Implementación de prueba técnica para proceso de reclutamiento realizado por José Alfredo Gaspar.


