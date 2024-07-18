export const htmlString = (memberData) => {
  const { name, membershipNumber } = memberData;
  return `
    <html lang="es" style="background-color:#29362F">
    <head>
    <style>
      h1   {color: #E8AC0A;}
      img {width: 160px;}
      p {color:#fff; font-size:14px; margin:24px 0; }
      hr {border-color:#fff; margin:20px 0 48px 0;}
      a {color:#E8AC0A; font-size:14px; text-decoration:underline; margin:8px;}
    </style>
    </head>
      <div style="width:100%; height:600px; padding-top:48px; background-color:#29362F; padding-left:16px; padding-right:16px;">
        <div style="margin:0 auto; width:160px;">
          <img
            src="https://www.buenoshumoszaragoza.com/_next/image?url=%2FImages%2Fbhz-web-logo.png&w=3840&q=75"
            alt="buenos humos zaragoza logo"
          />
        </div>
        <div style="width:420px; margin:0 auto; padding: 20px 0 48px;">
          <h1 style="font-size:24px;">Hola, ${name}</h1>
          <p>Te damos la bienvenida a Buenos Humos Zaragoza!</p>
          <p>Tu número de membresía es: ${membershipNumber}</p>
          <hr />
          <p>No te pierdas el próximo evento de Buenos Humos Zaragoza. Descúbrenos en Instagram para más detalles.</p>
          <div style="width: 150px, margin: 0 auto">
            <a style="color:#E8AC0A; font-size:14px; text-decoration:underline; margin:8px;" href="https://www.instagram.com/buenoshumoszaragoza">Instagram</a>
          </div>
          <p>En Zaragoza sois tod@s bienvenid@s!</p>
          <a style="color:#E8AC0A; font-size:14px; text-decoration:underline; margin:8px;" href="https://www.buenoshumoszaragoza.com">www.buenoshumoszaragoza.com</a>
        </div>
      </div>
    </html>`;
};
