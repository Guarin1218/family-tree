# Family Tree

## Pasos para inicializar el backend

1. Situarse en el directorio *restapi*
2. Ejecutar: docker compose up

## Pasos para inicializar el frontend

1. Situarse en el directorio *app*
2. Ejecutar: docker compose up
3. Se mostrará en consola algo como esto:


 ╭────────────────────────────────────────╮
 │                                        │
 │   Nuxt @ v2.15.8                       │
 │                                        │
 │   ▸ Environment: production            │
 │   ▸ Rendering:   server-side           │
 │   ▸ Target:      server                │
 │                                        │
 │   Memory usage: 33 MB (RSS: 82 MB)     │
 │                                        │
 │   Listening: http://172.17.0.2:5000/   │
 │                                        │
 ╰────────────────────────────────────────╯


Donde dice Listening, es la dirección donde está nuestra app (Contenedor), al darle click no va a funcionar
en el navegador.\
Se debe cambiar la dirección antes de los dos puntos, que en este caso
sería 172.17.0.2 por localhost o 127.0.0.1, quedando así:
http://localhost:5000/

