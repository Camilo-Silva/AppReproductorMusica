# Spotify Clone

Este proyecto es un clon de Spotify desarrollado con Angular 17.3, que implementa un reproductor de música, gestión de usuarios, historial, favoritos y navegación modular. El objetivo es practicar arquitectura escalable, buenas prácticas y el uso de Angular moderno (standalone components, directivas y pipes).

## Tabla de Contenidos
- [Dependencias](#dependencias)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Reproductor de Música](#reproductor-de-música)
- [Instalación y Uso](#instalación-y-uso)
- [Scripts Disponibles](#scripts-disponibles)
- [Testing](#testing)
- [Notas](#notas)

## Dependencias
Principales librerías y frameworks utilizados:
- **@angular/core** ^17.3.0
- **@angular/router** ^17.3.0
- **@angular/forms** ^17.3.0
- **rxjs** ~7.8.0
- **express** ^4.18.2 (para SSR)
- **zone.js** ~0.14.3
- **Karma/Jasmine** (testing)

## Estructura del Proyecto
```
src/app/
  core/           # Modelos y lógica central (ej: models/artist.model.ts, tracks.model.ts)
  data/           # Datos estáticos (ej: tracks.json)
  modules/        # Módulos de funcionalidad (auth, favorites, history, home, tracks)
    auth/         # Autenticación y páginas relacionadas
    favorites/    # Favoritos
    history/      # Historial
    home/         # Página principal
    tracks/       # Listado y detalles de canciones
  shared/         # Componentes, directivas y pipes reutilizables
    components/   # Ej: side-bar, card-player, media-player, header-user, etc.
    directives/   # Ej: img-broken.directive.ts (gestiona imágenes rotas)
    pipe/         # Ej: order-list.pipe.ts (ordenar listas)
    shared.module.ts # Módulo compartido
  app.routes.ts   # Definición de rutas principales
```

## Reproductor de Música
El reproductor está implementado en el componente `media-player` y `card-player`. Permite mostrar la carátula, nombre y álbum de la canción, así como controles de reproducción. El sistema de imágenes rotas está gestionado por la directiva `appImgBroken`, que reemplaza la imagen por defecto si la original falla.

- El estado del reproductor se gestiona por componente y puede integrarse con servicios para manejar la reproducción global.
- El diseño es responsivo y modular, permitiendo reutilizar componentes en diferentes vistas.

## Instalación y Uso
1. Clona el repositorio:
   ```bash
   git clone <url-del-repo>
   cd spotify
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm start
   # o
   ng serve
   ```
   Accede a `http://localhost:4200/` en tu navegador.

## Scripts Disponibles
- `npm start` / `ng serve`: Servidor de desarrollo
- `npm run build`: Compilar la app
- `npm test`: Ejecutar tests unitarios
- `npm run serve:ssr:spotify`: Servir la app con SSR (Server Side Rendering)

## Testing
- Ejecuta `ng test` para correr los tests unitarios con Karma y Jasmine.
- Los tests se encuentran junto a los componentes (`*.spec.ts`).

## Notas
- La APP es la versión 1.0.
- El proyecto utiliza Angular Standalone Components, Directivas y Pipes, por lo que deben importarse explícitamente donde se usen.
- La estructura modular permite escalar fácilmente nuevas funcionalidades.
- El diseño y la lógica del reproductor pueden ampliarse para soportar streaming real, integración con APIs, etc.

---

Desarrollado por Camilo Silva.
