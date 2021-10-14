"# family-tree" 




//Pasos para inicializar el backend

- Situarse en el directorio restapi

- ejecutar: docker-compose up 



//Pasos para inicializar el frontend

- situarse en el directorio app

- ejecutar: docker compose up

- Se mostrará en consola algo como esto: 
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

Donde dice Listening, es la dirección donde está nuestra app, si al darle click no nos funciona
en el navegador, cambiamos la dirección antes de los dos puntos, que en este caso
sería 172.17.0.2 por localhost, quedando así:
http://localhost:5000/


