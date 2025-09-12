# 🎵 Spotify Clone - Angular + Netlify

Aplicación de reproductor de música con Angular frontend y backend en Netlify Functions.

## 🚀 Deployment en Netlify

### 1. Preparación del Repositorio

1. **Asegurate de tener todos los archivos:**
   - `netlify.toml` (ya configurado)
   - `netlify/functions/` (funciones del backend)
   - Código Angular en `src/`

2. **Configurar variables de entorno locales (opcional):**
   ```bash
   cp .env.example .env
   # Edita .env con tus valores
   ```

### 2. Deployment en Netlify

1. **Conectar repositorio:**
   - Ve a [Netlify](https://app.netlify.com)
   - Click "New site from Git"
   - Conecta tu repositorio GitHub
   - Selecciona la rama `main`

2. **Configuración automática:**
   Netlify detectará automáticamente la configuración desde `netlify.toml`:
   - Build command: `npm install && ng build --configuration production`
   - Publish directory: `dist/spotify`
   - Functions directory: `netlify/functions`

3. **Variables de entorno en Netlify:**
   Ve a Site settings > Environment variables y agrega:
   ```
   JWT_SECRET=tu_jwt_secret_muy_seguro
   DB_URI=mongodb+srv://... (opcional)
   NODE_ENV=production
   ```

### 3. Actualizar URL de la API

1. **URLs de tu aplicación:**
   - Backend: `https://api-spotifyclon.netlify.app`
   - Frontend: `https://spotify-clon-camilo-silva.netlify.app`

2. **Archivos de environment ya configurados:**
   ```typescript
   // src/environments/environment.ts
   export const environment = {
     production: false,
     api: 'https://api-spotifyclon.netlify.app/api/1.0'
   };

   // src/environments/environment.prod.ts
   export const environment = {
     production: true,
     api: 'https://api-spotifyclon.netlify.app/api/1.0'
   };
   ```

3. **Redeploy para aplicar cambios:**
   - Haz commit y push de los cambios
   - Netlify re-deployrá automáticamente

## 📡 Endpoints de la API

Después del deployment, tendrás disponibles:

### Autenticación
- `POST https://api-spotifyclon.netlify.app/api/1.0/auth/login` - Login de usuario
- `POST https://api-spotifyclon.netlify.app/api/1.0/auth/register` - Registro de usuario

### Tracks
- `GET https://api-spotifyclon.netlify.app/api/1.0/tracks` - Obtener todos los tracks
- `GET https://api-spotifyclon.netlify.app/api/1.0/tracks/:id` - Obtener track específico
- `POST https://api-spotifyclon.netlify.app/api/1.0/tracks` - Crear nuevo track
- `PATCH https://api-spotifyclon.netlify.app/api/1.0/tracks/:id` - Actualizar track
- `DELETE https://api-spotifyclon.netlify.app/api/1.0/tracks/:id` - Eliminar track

### Audio
- `GET https://api-spotifyclon.netlify.app/api/1.0/audio/:filename` - Reproducir archivos MP3

## 🛠️ Desarrollo Local

### Con Netlify Dev (Recomendado)
```bash
npm install
npm install -g netlify-cli
netlify dev
```

### Servidor Angular independiente
```bash
npm install
npm start
```

## 🔧 Estructura del Proyecto

```
├── src/                          # Código Angular
│   ├── app/
│   │   ├── modules/
│   │   │   ├── auth/            # Módulo de autenticación
│   │   │   ├── tracks/          # Módulo de música
│   │   │   └── ...
│   │   └── core/
│   │       ├── interceptors/    # HTTP interceptors
│   │       └── services/        # Servicios compartidos
│   └── environments/            # Configuración de entornos
├── netlify/
│   └── functions/               # Funciones del backend
│       ├── auth.js
│       ├── tracks.js
│       └── audio.js
├── netlify.toml                 # Configuración de Netlify
└── public/                      # Archivos de audio estáticos
```

## 🔍 Troubleshooting

### Error: Function not found
- Verifica que `netlify.toml` esté en la raíz
- Confirma que las funciones estén en `netlify/functions/`

### CORS Errors
- Verifica la configuración de headers en `netlify.toml`
- Confirma que los headers estén en las funciones

### Audio no se reproduce
- Confirma que los archivos MP3 estén en `/public`
- Verifica que la función `audio.js` esté funcionando
- Checkea la consola del navegador para errores

### Token no se envía
- Verifica que el interceptor esté configurado correctamente
- Confirma que el nombre de la cookie sea consistente (`token_Service`)

## 📞 Variables de Entorno Requeridas

| Variable | Descripción | Obligatorio |
|----------|-------------|-------------|
| `JWT_SECRET` | Clave secreta para JWT | ✅ |
| `DB_URI` | URI de MongoDB | ❌ (usa datos mock) |
| `NODE_ENV` | Entorno de ejecución | ❌ (default: production) |

## 🎯 Próximos Pasos

1. Configura tu base de datos MongoDB
2. Agrega más funcionalidades (playlists, favoritos)
3. Implementa tests automatizados
4. Configura CI/CD con GitHub Actions