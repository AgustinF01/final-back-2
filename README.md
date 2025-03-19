**Proyecto Final para Back-end 2**

El proyecto consiste en una tienda de ropa y accesorios basica, se utilizo un modelo basico (Material UI + React + Vite) para el front-end ya que no era lo principal en el proyecto, pero aun asi se mantiene una estructura decente y responsiva.

**El back-end consiste en:**
- Registro y acceso de usuarios y administradores.
- Verificacion de usuarios repetidos en la base de datos en tiempo real.
- Verificacion de contraseña segura en tiempo real.
- Los administradores pueden acceder a un dashboard.
- El dashboard permite carga, edicion y eliminacion de productos.
- Rutas protegidas basadas en el rol.
- Redirecciones correspondientes y un sistema de recuperacion de contraseña.
- Añadir productos al carrito y su posterior simulacion de compra con comprobante.

**USUARIOS REGISTRADOS PARA EL TESTEO**
- Administrador: Email: admin@gmail.com // Contraseña: "Aa12345." punto final incluido.
- Usuario normal: Email usuario@gmail.com // Contraseña: "Aa12345." punto final incluido.
- O se puede registrar un usuario nuevo pero sera normal ya aunque los roles de administrador solo se dan desde la base de datos de manera manual.

**ERRORES CONOCIDOS Y ADICIONES PENDIENTES DE IMPLEMENTAR**
- Sobre carga de componentes luego de la compra (Es un error en React, no del back-end y se arregla momentaneamente recargando el sitio).
- Algunas URLs puede llegar a colapsar el servidor (Intente añadir limitadores y verificaciones pero el error puede persistir aun, es recomendable usar URLs que comiencen con https).
- Faltan verificaciones adicionales en relacion al pago, como verificar los datos de la tarjeta y la posibilidad de descargar el comprobante de pago (Pendiente de implementar).
- Sitema de recuperacion de contraseña incompleto (No termino de entender como implementarlo, de momento solo lleva a la pagina de recuperacion pero no hace mas, en el back-end esta medianamente aplicada la logica).
- Forma de pago con Mercado Pago (La logica se encuentra pero no se usa de momento hasta terminar de comprender como implementarlo).
- Formulario de contacto funcional (De momento simula la carga exitosa pero no procesa los datos en ningun lugar, intentare terminarlo si es posible pero no afecta el uso del sitio y existen maneras de implementarlo sin usar back-end).
- Pueden haber archivos o codigo extra ya que es un proyecto utilizado tambien en back-end 1 y 3 pero me asegure de que funcione correctamente.
