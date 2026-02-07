API de gestión de pedidos.
Documentación en postman: https://documenter.getpostman.com/view/51906899/2sBXc8pj1d

Como comentario extra y consejo, hay que cuidar muy bien lo que se realiza en postman y de preferencia ver un tutorial antes de usarlo, cualquier detalle se puede tornar en un dolor de cabeza

Este proyecto es un backend robusto construido con Node.js y Express, diseñado bajo los principios de POO. El objetivo principal es demostrar la correcta separación de responsabilidades y la implementación de reglas de negocio críticas en un entorno de pedidos.

Tecnologías Utilizadas.
Node.js para el entorno de ejecución.
Express.js como framework para el servidor web.
JavaScript en el uso de clases, campos privados (`#`) y módulos.

Arquitectura del Proyecto.
El proyecto sigue una estructura de tres capas para asegurar la escalabilidad y el mantenimiento:

/routes: Define los puntos de entrada (endpoints) y redirige el flujo al controlador.
/controllers: Contiene la lógica de aplicación, validaciones de entrada y decide las respuestas HTTP.
/repositories: Capa de persistencia en memoria que gestiona los datos de forma aislada mediante el uso de una clase con campos privados.

Reglas de Negocio Implementadas

Para garantizar la integridad de los datos, se han programado las siguientes restricciones:

1.  Estado Inicial: Todo pedido nuevo se crea automáticamente en estado "pendiente".
2.  Validación de Cantidad: No se permiten pedidos con cantidades iguales o menores a 0.
3.  Inmutabilidad de Pedidos Finalizados: Un pedido en estado "confirmado" o "cancelado" no puede ser modificado ni eliminado.
4.  Flujo de Estados: Solo se permite cambiar el estado de "pendiente" a "confirmado" o "cancelado".
5.  Eliminación Restringida: Solo los pedidos en estado "pendiente" son elegibles para ser eliminados del sistema.

También es importante recalcar que hay que usar los siguientes comandos:
npm init -y
npm install express
npm install --save-dev nodemon

Método,Endpoint,Descripción
GET,/pedidos,Obtiene la lista de todos los pedidos.
GET,/pedidos/:id,Obtiene un pedido específico por su ID.
POST,/pedidos,Crea un nuevo pedido (Solo producto y cantidad).
PUT,/pedidos/:id,Actualiza el estado de un pedido (Requiere nuevoEstado).
DELETE,/pedidos/:id,Elimina un pedido (Solo si está pendiente).
