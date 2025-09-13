# Sistema de Ventas - Frontend

Un sistema de gestión de ventas desarrollado con React, TypeScript y Vite.

## 🚀 Características

- **Autenticación**: Sistema de login con roles (Administrador/Vendedor)
- **Dashboard**: Panel de control con estadísticas en tiempo real
- **Inventario**: Gestión completa de productos y stock
- **Ventas**: Registro y seguimiento de ventas
- **Compras**: Gestión de compras a proveedores
- **Reportes**: Análisis y estadísticas del negocio
- **UI Moderna**: Interfaz construida con shadcn/ui y Tailwind CSS

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── ui/             # Componentes de UI base (shadcn/ui)
│   ├── common/         # Componentes comunes reutilizables
│   └── layout/         # Componentes de layout
├── features/           # Características/dominios de la aplicación
│   ├── auth/           # Autenticación
│   │   ├── components/ # Componentes de auth
│   │   └── contexts/   # Contextos de auth
│   ├── dashboard/      # Dashboard
│   ├── inventory/      # Gestión de inventario
│   ├── sales/          # Ventas
│   ├── purchases/      # Compras
│   └── reports/        # Reportes
├── hooks/              # Custom hooks
├── services/           # Servicios y APIs
├── types/              # Tipos TypeScript
├── constants/          # Constantes
└── utils/              # Utilidades
```

## 🛠️ Tecnologías

- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **React Router** - Enrutamiento
- **Tailwind CSS** - Framework de CSS
- **shadcn/ui** - Componentes de UI
- **Lucide React** - Iconos
- **React Hook Form** - Manejo de formularios
- **Zod** - Validación de esquemas

## 🚀 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd front_end
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   pnpm install
   ```

3. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   # o
   pnpm dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:5173
   ```

## 👤 Usuarios de Prueba

- **Administrador**: `admin/admin`
- **Vendedor**: `vendedor/vendedor`

## 📋 Scripts Disponibles

- `npm run dev` - Iniciar servidor de desarrollo
- `npm run build` - Construir para producción
- `npm run preview` - Vista previa de la build
- `npm run lint` - Ejecutar linter

## 🏗️ Arquitectura

### Features (Dominios)

El proyecto está organizado por features/dominios de negocio:

- **Auth**: Manejo de autenticación y autorización
- **Dashboard**: Panel de control principal
- **Inventory**: Gestión de productos y stock
- **Sales**: Registro y seguimiento de ventas
- **Purchases**: Gestión de compras a proveedores
- **Reports**: Análisis y estadísticas

### Componentes

- **UI**: Componentes base de shadcn/ui
- **Common**: Componentes reutilizables (LoadingSpinner, ErrorMessage, etc.)
- **Layout**: Componentes de estructura (DashboardLayout)

### Hooks Personalizados

- `useProducts()` - Gestión de productos
- `useSales()` - Gestión de ventas
- `usePurchases()` - Gestión de compras

### Servicios

- `apiService` - Cliente centralizado para llamadas a la API

## 🎨 UI/UX

- **Diseño Responsivo**: Adaptable a móviles y desktop
- **Tema Oscuro/Claro**: Soporte para múltiples temas
- **Accesibilidad**: Componentes accesibles por defecto
- **Micro-interacciones**: Feedback visual para acciones del usuario

## 🔧 Configuración

### Variables de Entorno

Crear un archivo `.env.local`:

```env
VITE_API_URL=http://localhost:3000/api
```

### Tailwind CSS

Configurado con:
- shadcn/ui preset
- Animaciones personalizadas
- Colores del tema

## 📦 Build y Despliegue

```bash
# Construir para producción
npm run build

# Vista previa de la build
npm run preview
```

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles. 