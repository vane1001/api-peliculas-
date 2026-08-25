const app = require('./src/app');
const { sequelize } = require('./src/models');

const PORT = 3000;

async function main() {
  try {
    await sequelize.authenticate();
    console.log('Conexion a la base de datos establecida correctamente.');
    await sequelize.sync();
    console.log('Modelos sincronizados con la base de datos.');
    app.listen(PORT, () => {
      console.log('Servidor escuchando en http://localhost:' + PORT);
    });
  } catch (error) {
    console.error('No se pudo iniciar el servidor:', error);
  }
}

main();