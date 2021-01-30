# Node-course S3 "Understanding the basics"

## Module introduction

Haremos una breve introducción a cómo funciona la web (repaso), tras esto crearemos un servidor básico de NODE y veremos cómo funcionan los módulos externos.

Haremos pruebas de peticiones y respuestas del servidor, incluyendo asincronismo y estudiando a la vez _"the event loop"_

## How the web works

El funcionamiento básico de cualquier web es el siguiente:

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d6dab092-9fb5-4dec-acb1-dd97ac2698df/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d6dab092-9fb5-4dec-acb1-dd97ac2698df/Untitled.png)

Existen diferentes protocolos para la transmisión de comunicaciones a través de la web:

- **\*HTTP**: a protocol for transferring data which is understood by browser and server\*
- **\*HTTPS**: HTTP + Data Encryption (during transmission)\*

*[*🧙🏿‍♂️ si quieres saber más, pasate por aquí el siguiente enlace _]_

[HTTP crash course](https://www.notion.so/HTTP-crash-course-8380587db9f74f5586083211ac66749e)

## Creating a Node Server

Creamos un nuevo archivo `server.js`

Para ello, vamos a necesitar utilizar alguno de los módulos propios de NODE, que enumeramos a continuación:

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c4531a93-8581-4910-af05-37a8f1573b06/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c4531a93-8581-4910-af05-37a8f1573b06/Untitled.png)

Al importar un módulo, lo hacemos mediante el sistema antiguo:

```jsx
const http = require('http');
```

estaremos buscando un módulo **GLOBAL**, no en ruta relativa (`./http`) ni absoluta (`/http`)

_[🧙🏿‍♂️ como veremos más adelante, cuando importemos un módulo local o creado por nosotros, la cosa cambia ]_

Fijémonos en algunos de los métodos y propiedades del objeto **HTTP**:

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ac320c6e-6120-4ddc-8d66-628c5a3640fd/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ac320c6e-6120-4ddc-8d66-628c5a3640fd/Untitled.png)

Vamos a usar `createServer`, que, si accedemos a él, vemos que acepta una callback function con 2 argumentos: `req` y `res`:

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3d2d0318-21f8-4c63-9591-e27cdd56781e/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3d2d0318-21f8-4c63-9591-e27cdd56781e/Untitled.png)

Presta atención, pues `createServer` devuelve una función `Server`, que a su vez acepta otros parámetros, como el puerto en el que queremos levantarlo:

```jsx
const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req);
});

server.listen(3000);
```

## Node.js program lifecycle

¿Cuál es el proceso que NODE ha llevado a cabo en el ejercicio anterior para ponerse en marcha?

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/16553fa0-3dbe-4bb8-9010-bc2824f72c96/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/16553fa0-3dbe-4bb8-9010-bc2824f72c96/Untitled.png)

La clave está en el _"event loop"_, que se mantiene activo siempre y cuando haya "_listeners_" en marcha.

No olvides que al utilzar JS y este ser _"single threat"_, en teoría ejecuta el código 1-1. Esta es la forma de tener todos esos eventos "preparados" y de que se lancen casi inmediatamente cada vez que se hace una nueva petición.

La forma de "matar" el proceso activo es mediante `process.exit()`, no lo usaremos, ya que lógicamente NO queremos que el servidor pare.

## Understanding request

Con el siguiente código que vamos a ver, estamos creando un servidor HTTP en el puerto 3000 y controlando tanto el objeto REQ como RES.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0c0505c3-f4e4-492c-82bb-d75ed2e81a84/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0c0505c3-f4e4-492c-82bb-d75ed2e81a84/Untitled.png)

En **REQ**, vamos a ver 3 de las propiedades que más nos interesan:

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/deb2e199-5265-4eba-9682-13a9d738c19a/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/deb2e199-5265-4eba-9682-13a9d738c19a/Untitled.png)

Del objeto **RES**, no nos interesa la configuración que tiene de base, sino que lo que nos interesa en este caso es reconfigurarlo para devolver cierta información o configuración, al cliente.

En este ejemplo, vamos a devolver un contenido HTML (indicando previamente entre los HEADER de la respuesta el tipo de contenido que devolvemos):

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6d4aaafc-eae1-46a6-b6be-95c3dbe2e0b9/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6d4aaafc-eae1-46a6-b6be-95c3dbe2e0b9/Untitled.png)

En las herramientas de desarrollo, podemos observar la configuración de la request:

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fd4d2b7b-0289-40c9-bf93-e70afcc34049/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fd4d2b7b-0289-40c9-bf93-e70afcc34049/Untitled.png)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9a4efd99-6059-4f46-b440-5f97215dfd9b/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9a4efd99-6059-4f46-b440-5f97215dfd9b/Untitled.png)

## Request & Response Headers

El siguiente artículo está muy bien para entender los HEADERS que podemos encontrar y cómo se configuran:

[HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)

## Routing requests

Vamos a crear un servidor ligero con diferentes rutas, que muestren un contenido un otro dependiendo de a donde navegue el cliente.

Lo primero que haremos será crear una ruta base `/` con un formulario. Este formulario, al enviarse, cambiará la URL a `/message`

```jsx
if (url === '/') {
  res.write('<html>');
  res.write('<head><title>Enter message</title></head>');
  res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
  res.write('</html>');
  return res.end();
}
```

El siguiente paso será hacer que, si la ruta es `/message` y el **método es POST** (tal y como hemos definido en el formulario), se cree un archivo con el contenido (de momento random):

```jsx
if (url === '/message' && method === 'POST') {
  fs.writeFileSync('message.txt', 'DUMMY');
  res.statusCode = 302;
  res.setHeader('Location', '/');
  console.log(req);
  return res.end();
}
```

Vayamos ahora al caso en el que queremos introducir el contenido del usuario dentro del archivo creado. ¿Hay alguna forma de acceder a una propiedad del estilo de _`req.data`_? **NO**.

¿Cómo podemos recoger el contenido de la request del cliente?

### Working with response stream

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0413fc00-bc06-4901-951d-967b550b24ef/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0413fc00-bc06-4901-951d-967b550b24ef/Untitled.png)

"Buffer is like a bus stop"

**La respuesta del usuario recorre un largo camino en el que se va completando paso a paso. En el caso de que mandemos un texto como en el ejemplo, no debemos tener esto muy en cuenta pero si estamos mandando un archivo, por ejemplo, lo mismo nos interesa poder ir accediendo a ciertos "valores" de la response antes de que nos llegue completa.**

### **req.on()**

El objeto `req` tiene un "_listener_", `req.on` que nos permite ir trabajando con los eventos temporales que ocurren en el servidor. Lo utilizaremos para "estar pendientes" de los datos recibidos y almacenarlos en un array de datos `body`:

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0944c4ef-95c8-4954-a12c-54d8c355cd5b/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0944c4ef-95c8-4954-a12c-54d8c355cd5b/Untitled.png)

Y lanzaremos otro "_listener_" para que, cuando la request finalice, "_parsear_" los datos y crear un fichero con los mismos (`req.on('end'...)`)

Ten en cuenta que los datos del usuario llegan codificados:

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f5826a1a-a4df-41b5-8f36-e97661ecb53e/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f5826a1a-a4df-41b5-8f36-e97661ecb53e/Untitled.png)

Nos está mandando message={lo que introduzca}, donde "message" es el "name" del input

Al acceder en el navegador a la ruta `/` e introducir un texto en el input y enviarlo, se crea, tal y como habíamos previsto, un fichero con el contenido del mismo.

_[🧙🏿‍♂️ Ojo que esto te sirve en pasos siguientes para almacenar los input del usuario en una BBDD]_

_[🧙🏿‍♂️ ¿Menudo rollo para crear un simple servidor, cierto?, por eso tenemos EXPRESS, que realiza todo esto de una forma más sencilla, lo vamos a ver]_

## Understanding event driven code execution

El código que se ha ejecutado en el servidor combina sincronismo con asincronismo, ten en cuenta que el proceso `req.end()` se ha ejecutado incluso después de redirigir al cliente a otra ruta:

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/03854899-69ae-41a4-87fa-27c3e7631b5c/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/03854899-69ae-41a4-87fa-27c3e7631b5c/Untitled.png)

Podemos considerar que NODE, internamente, "almacena" una serie de código (en este caso la función), que sólo se ejecutará cuando el "listener" lo determine (una promesa, vamos).

## Blocking and non-blocking code

Prestemos atención a la función que hemos invocado de la librería `fs`:

```jsx
(...)
fs.writeFileSync('message.txt', decodeUri(message));
```

¿Qué diferencia hay con `writeFile`?

El primero es **SÍNCRONO**, mientras que este último es **ASÍNCRONO**

Nos interesa usar `writeFile` para que esta operación de guardado de datos transcurra de forma paralela, sin bloquear el código (con un archivo muy grande, por ejemplo).

Además, acepta un tercer argumento, una "_callback function_", que se ejecuta al resolverse la acción de escritura. Esta puede recibir como parámetro `err` si se produce, en caso contrario recibe `null`, por lo que nos aprovechamos de esto para decirle que, en caso de que ocurra un fallo, nos vuelva a redirigir al formulario cutre

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/83bafa1c-e6b5-48d0-9199-95c67987298f/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/83bafa1c-e6b5-48d0-9199-95c67987298f/Untitled.png)

## Node.js - Looking Behind the Scenes

Date cuenta que NODE maneja eventos que pueden tardar bastante tiempo en ejecutarse, pero no por ello debe dejar de dar servicio a otras request ni bloquear el servidor. Es por ello por lo que el código asíncrono es muy común en el lado del servidor (mucho más que en cliente).

Vamos a estudiar este tema un poco más a fondo.

Volvamos a repetir una idea clave: Node trabaja con JS, y JS es Single Thread, entonces... ¿cómo puede hacer frente a múltiples request si sólo procesa el código 1-1?

_[🧙🏿‍♂️ aquí es cuando vuelves a repasar el EventLoop ;)]_

[✨♻️ JavaScript Visualized: Event Loop](https://dev.to/lydiahallie/javascript-visualized-event-loop-3dif)

### Single thread, Event Loop & Blocking Code

El esquema de trabajo de NODE sería el siguiente:

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/af71bbbb-f1a2-4bd4-a3f0-d47db66de316/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/af71bbbb-f1a2-4bd4-a3f0-d47db66de316/Untitled.png)

Todos los eventos que "llaman" a un "_callback_" al resolverse, pasan al **EventLoop**.

Aquellos que requieren una cantidad adicional de recursos (como lectura, escritura de archivos), pasan al "**Worker Pool**"

_[🧙🏿‍♂️ Investiga qué es esto, porque lo menciona como un "thread" paralelo]_

### Event Loop

Consideralo una rueda, en la que se van añadiendo todos los _callback_ que finalizan después de un evento, cuando las tareas "_síncronas_" finalizan, las que se hayan finalizado del **EventLoop** pasan al _"call stack"_ y se ejecutan también.

Cuando el "engine" de NODE no tiene nada que hacer, observa el **EventLoop** a ver qué puede traerse para trabajar.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/adf9656e-0a3d-462c-bcd7-ac64ff3fbb23/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/adf9656e-0a3d-462c-bcd7-ac64ff3fbb23/Untitled.png)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/145a1963-62e0-488c-b17b-073385879698/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/145a1963-62e0-488c-b17b-073385879698/Untitled.png)

## Use the Node Modules system

Mejoraremos un poco el código creando "**módulos**":

Todo el código de las rutas lo vamos a introducir en un nuevo archivo independiente: `/routes.js`

Para importar en NODE, tenemos que hacerlo a la antigua usanza:

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d5ee296f-e451-4b3d-a4d2-fd9691d71144/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d5ee296f-e451-4b3d-a4d2-fd9691d71144/Untitled.png)

E importarlo también mediante `require`:

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/02293111-cd44-47a2-8fbf-b89d65e659bb/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/02293111-cd44-47a2-8fbf-b89d65e659bb/Untitled.png)

Si son varios los elementos que necesitamos exportar del archivo, podemos hacerlo mediante:

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/01c1be71-9e17-4775-8375-0532fbd87f2b/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/01c1be71-9e17-4775-8375-0532fbd87f2b/Untitled.png)

Date cuenta que ahora, cuando lo importes, querrás acceder a la propiedad específica del objeto `exports`:

```jsx
const routes = require('./routes');

console.log(routes.someText);
```

## Module summary

Hemos hecho una breve descripción de cómo funcionan las webs:

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c3d09acd-becb-4cb4-8ee4-fe5364ba6b03/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c3d09acd-becb-4cb4-8ee4-fe5364ba6b03/Untitled.png)

También hemos conocido cómo funcionan las tripas de NODE:

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/319b403d-2f80-4ee7-a04e-ca0cebce24ae/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/319b403d-2f80-4ee7-a04e-ca0cebce24ae/Untitled.png)

Tomamos consciencia de la importancia del código asíncrono en JS:

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c58925b0-eb34-4fbf-a612-7fda3730f85f/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c58925b0-eb34-4fbf-a612-7fda3730f85f/Untitled.png)

Hemos trabajado con request y responses:

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/565f6efc-fa46-4125-b2b7-a113f82ed1f2/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/565f6efc-fa46-4125-b2b7-a113f82ed1f2/Untitled.png)

Trabajamos con algunos de los módulos del code de NODE (fs, http...):

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d2f4cbbe-342b-43b9-b127-a4b232f3601f/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d2f4cbbe-342b-43b9-b127-a4b232f3601f/Untitled.png)

Siendo conscientes también de cómo se importan, exportan los módulos creados por nosotros:

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8a6338a0-1cf5-4799-8f84-4d46053d033c/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8a6338a0-1cf5-4799-8f84-4d46053d033c/Untitled.png)

## Useful resources & links

_Attached, you find the source code for this section._

_Useful resources:_

- _Official Node.js Docs: [https://nodejs.org/en/docs/guides/](https://nodejs.org/en/docs/guides/)_
- _Full Node.js Reference (for all core modules): [https://nodejs.org/dist/latest/docs/api/](https://nodejs.org/dist/latest/docs/api/)_
- _More about the Node.js Event Loop: [https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)_
- _Blocking and Non-Blocking Code: [https://nodejs.org/en/docs/guides/dont-block-the-event-loop/](https://nodejs.org/en/docs/guides/dont-block-the-event-loop/)_
