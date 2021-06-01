# Clonar el proyecto

Una vez que hayas clonado el proyecto deberás guardar el path absoluto, ya que es necesario para que el servidor de backend pueda funcionar correctamente

Dentro de las variables de ambiente del backend lo deberás asignar a:

LOCAL_REPO_PATH=/home/`<user>`/`<workspace>`/fullstack-interview-test


# Instalación y ejecución de BackEnd

El backend se desarrolló utilizando el Framework FastAPI, usa Python como lenguaje de programación. Se debe usar un virtual environment para correrlo.

Para este proyecto recomiendo utilizar `pipenv`. Previamente debes tener instalado `Python` y `pipenv`. A continuación puedes revisar la documentación de `pipenv` por cualquier duda

- [PipEnv](https://pipenv-es.readthedocs.io/es/latest)
- Python versión mínima 3.7.7

Para correr el servidor backend en localhost debes ejecutar las siguientes líneas

En este punto ya debes haber creado un archivo `.env` con las variables de ambiente necesarias para el backend, esto dentro del directorio api

```
cd api/
pipenv shell
pipenv install
uvicorn main:app --reload
```

Se levantará un servidor sobre el puerto 8000

Para poder ver la documentación de los endpoints deberás acceder a `http://localhost:8000/docs`



# Instalación y ejecución de FrontEnd

El FrontEnd se desarrolló utilizando el Framework Next.js, basado en React.

Para correr el proyecto sólo se deben instalar las dependencias con npm

Es necesario tener instalado la última versión de NodeJS, por lo menos se debe tener la versión `v12.13.0`

Debes crear un archivo `.env.local` con las variables de ambiente necesarias para el proyecto


```
cd web-app/
npm install
npm run dev
```

Esto levantará un servidor web en localhost:3000

Debes entrar desde el navegador para ver las secciones desarrolladas
