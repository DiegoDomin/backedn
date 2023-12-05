# Endpoints


# 1- Endpoint 
Tipo de Url : **"/api"**
Metodo Http:
Cuerpo:  **sin ningun cuerpo** 
Cabeceras: **No se requiere cabecera**
Respuesta: **Url padre**
response:**200 oK**
error:***500**~~~

## 2- Endpoint
Tipo de Url : **"/api/disapp"**
Metodo Http: **GET**
Cuerpo:  **sin ningun cuerpo** 
Cabeceras: **No se requiere cabecera**
Respuesta: **Obtiene la lista de todos los formularios,s**
response:**200 OK**
error:**500**


## 3- Endpoint
Tipo de Url : **"/api/disapp/:identifier"**
Metodo Http: **GET**
Cuerpo:  **sin ningun cuerpo** 
Cabeceras: **No se requiere cabecera**
Respuesta: **Obtiene formulario con id especifico**
response:**200 OK**
error:**500**


## 4- Endpoint
Tipo de Url : **"api/auth/registrarse"**
Metodo Http: **POST**
Cuerpo:  **sin ningun cuerpo** 
Cabeceras: **No se requiere cabecera**
Respuesta: **Registrar usuario**
response:**201 Usuario creado correctamente**,
error:**409 Ya existe esta cuenta**


## 5-Endpoint
tipo de Url : **"api/auth/:identifier"**
Metodo Http: **PUT**
Cuerpo:  **sin ningun cuerpo** 
Cabeceras: **No se requiere cabecera**
Respuesta: ****
response:**201 Se ha editado el formulario**,
error:**500 NO se ha editar guardar el fomilario**


## 6 - ENDPOINT
tipo de Url : **"api/send-email"**
Metodo Http: **POST**
Cuerpo:  **sin ningun cuerpo** 
Cabeceras: **No se requiere cabecera**
Respuesta: **201 Se enviado gmail correctamente**

response:**201 Se ha editado el formulario**,
error:**500 NO se ha podido g   uardar el fomilario**
## 7 - Endpoint

tipo de Url : **"api/disapper/:identfier"**
Metodo Http: **DELETE**
Cuerpo:  **sin ningun cuerpo** 
Cabeceras: **No se requiere cabecera**
Respuesta: **Se ha eliminado correctamente**
response:**201 Se ha editado el formualrio**,
error:**500 NO se ha podido eliminar el fomilari**

## 8 - Endpoint

tipo de Url : **"api/auth/login"**
Metodo Http: **POST**
Cuerpo:  **sin ningun cuerpo** 
Cabeceras: **No se requiere cabecera**
Respuesta: **Se ha iniciado sesion correctamente**
response:**200 se ha registrado correctemente**,
error:**500**