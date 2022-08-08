CREATE DATABASE IF NOT EXISTS tortillaland;
USE tortillaland;

CREATE TABLE IF NOT EXISTS pueblos(
id_pueblo SMALLINT PRIMARY KEY,
imagen VARCHAR(25) NOT NULL
);

CREATE TABLE IF NOT EXISTS redes (
id_redes CHAR(5) PRIMARY KEY,
twitch VARCHAR(25),
discord VARCHAR(25),
youtube VARCHAR(25),
twitter VARCHAR(25),
instagram VARCHAR(25)
);

CREATE TABLE IF NOT EXISTS jugadores (
id_jugador CHAR(5) PRIMARY KEY,
nombre VARCHAR(20) NOT NULL,
id_pueblo SMALLINT NOT NULL,
ingreso DATE NOT NULL,
imagen VARCHAR(25) NOT NULL,
redes CHAR(5),
CONSTRAINT fk_redes FOREIGN KEY(redes) REFERENCES redes(id_redes),
CONSTRAINT fk_pueblo FOREIGN KEY(id_pueblo) REFERENCES pueblos(id_pueblo)
);

CREATE TABLE IF NOT EXISTS casas(
id_casa CHAR(10) PRIMARY KEY,
propietario CHAR(5) NOT NULL,
estado CHARACTER NOT NULL,
mini_descripcion VARCHAR(10) NOT NULL,
descripcion VARCHAR(50),
imagen VARCHAR(25) NOT NULL,
CONSTRAINT fk_jugador_casa FOREIGN KEY(propietario) REFERENCES jugadores(id_jugador)
);

CREATE TABLE IF NOT EXISTS constructores (
id_construccion CHAR(10) PRIMARY KEY,
id_casa CHAR(10) NOT NULL,
id_constructor CHAR(5) NOT NULL,
CONSTRAINT fk_casa_construida FOREIGN KEY(id_casa) REFERENCES casas(id_casa),
CONSTRAINT fk_jugador_constructor FOREIGN KEY(id_constructor) REFERENCES jugadores(id_jugador)
);

CREATE TABLE IF NOT EXISTS destructores (
id_destruccion CHAR(10) PRIMARY KEY,
id_casa CHAR(10) NOT NULL,
id_destructor CHAR(5) NOT NULL,
CONSTRAINT fk_casa_destruida FOREIGN KEY(id_casa) REFERENCES casas(id_casa),
CONSTRAINT fk_jugador_destructor FOREIGN KEY(id_destructor) REFERENCES jugadores(id_jugador)
);

CREATE TABLE IF NOT EXISTS ilegalidades(
id_ilegalidad CHAR(10) PRIMARY KEY,
titulo VARCHAR(10) NOT NULL,
fecha DATE NOT NULL,
cargo VARCHAR(20) NOT NULL,
penitencia VARCHAR(6) NOT NULL,
imagen VARCHAR(25) NOT NULL
);

CREATE TABLE IF NOT EXISTS ilegalidad_jugador (
id_ilegal_jugador CHAR(10) PRIMARY KEY,
id_jugador CHAR(5) NOT NULL,
id_ilegalidad CHAR(10) NOT NULL,
CONSTRAINT fk_jugador_ilegal FOREIGN KEY(id_jugador) REFERENCES jugadores(id_jugador),
CONSTRAINT fk_ilegalidad FOREIGN KEY(id_ilegalidad) REFERENCES ilegalidades(id_ilegalidad)
);

CREATE TABLE IF NOT EXISTS momentos(
id_momento CHAR(10) PRIMARY KEY,
titulo VARCHAR(20) NOT NULL,
link VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS momentos_jugador (
id_momentos_jugador CHAR(10) PRIMARY KEY,
id_momento CHAR(10) NOT NULL,
id_jugador CHAR(5) NOT NULL,
CONSTRAINT fk_jugador_momentos FOREIGN KEY(id_jugador) REFERENCES jugadores(id_jugador),
CONSTRAINT fk_momentos FOREIGN KEY(id_momento) REFERENCES momentos(id_momento)
);

CREATE TABLE IF NOT EXISTS eventos(
id_evento CHAR(5) PRIMARY KEY,
descripcion VARCHAR(50),
imagen VARCHAR(25) NOT NULL
);

CREATE TABLE IF NOT EXISTS resultados(
id_resultados CHAR(5) PRIMARY KEY,
votos_totales INT(10) NOT NULL,
votos_pueblo1 INT(10) NOT NULL,
votos_pueblo2 INT(10) NOT NULL,
votos_pueblo3 INT(10) NOT NULL,
ganador SMALLINT NOT NULL,
CONSTRAINT fk_pueblo_ganador FOREIGN KEY(ganador) REFERENCES pueblos(id_pueblo)
);

CREATE TABLE IF NOT EXISTS concursos(
id_concurso CHAR(5) PRIMARY KEY,
id_resultados CHAR(5) NOT NULL,
evento CHAR(5) NOT NULL,
CONSTRAINT fk_resultados FOREIGN KEY(id_resultados) REFERENCES resultados(id_resultados),
CONSTRAINT fk_evento_concusro FOREIGN KEY(evento) REFERENCES eventos(id_evento)
);

CREATE TABLE IF NOT EXISTS jueces(
id_juez CHAR(5) PRIMARY KEY,
nombre VARCHAR(10) NOT NULL,
imagen VARCHAR(25) NOT NULL
);

CREATE TABLE IF NOT EXISTS concurso_jueces(
id CHAR(5) PRIMARY KEY,
juez CHAR(5) NOT NULL,
concurso CHAR(5) NOT NULL,
CONSTRAINT fk_juez FOREIGN KEY(juez) REFERENCES jueces(id_juez),
CONSTRAINT fk_concurso_j FOREIGN KEY(concurso) REFERENCES concursos(id_concurso)
);

CREATE TABLE IF NOT EXISTS premios(
id_premio CHAR(5) PRIMARY KEY,
nombre VARCHAR(10) NOT NULL,
cantidad INT DEFAULT 1,
imagen VARCHAR(25) NOT NULL
);

CREATE TABLE IF NOT EXISTS premio_concurso(
id CHAR(5) PRIMARY KEY,
premio CHAR(5) NOT NULL,
concurso CHAR(5) NOT NULL,
CONSTRAINT fk_premio FOREIGN KEY(premio) REFERENCES premios(id_premio),
CONSTRAINT fk_concurso_p FOREIGN KEY(concurso) REFERENCES concursos(id_concurso)
);

CREATE TABLE IF NOT EXISTS evento_participantes(
id CHAR(5) PRIMARY KEY,
id_participante CHAR(5) NOT NULL,
id_evento CHAR(5) NOT NULL,
CONSTRAINT fk_evento_part FOREIGN KEY(id_evento) REFERENCES eventos(id_evento),
CONSTRAINT fk_participante FOREIGN KEY(id_participante) REFERENCES jugadores(id_jugador)
);

CREATE TABLE IF NOT EXISTS momentos_evento(
id_momentos_evento CHAR(10) PRIMARY KEY,
id_momento CHAR(10) NOT NULL,
id_evento CHAR(5) NOT NULL,
CONSTRAINT fk_evento_momentos FOREIGN KEY(id_evento) REFERENCES eventos(id_evento),
CONSTRAINT fk_momentos_evento FOREIGN KEY(id_momento) REFERENCES momentos(id_momento)
);

CREATE TABLE IF NOT EXISTS usuarios (
id_usuario CHAR(10) PRIMARY KEY,
nombre VARCHAR(10) NOT NULL,
apellido VARCHAR(10) NOT NULL,
correo VARCHAR(20) NOT NULL,
contrasenia CHAR(8) NOT NULL,
imagen VARCHAR(25)
);

CREATE TABLE IF NOT EXISTS personajes_favoritos (
id_favorito CHAR(10) PRIMARY KEY,
personaje CHAR(5) NOT NULL,
usuario CHAR(10) NOT NULL,
CONSTRAINT fk_jugador_fav FOREIGN KEY(personaje) REFERENCES jugadores(id_jugador),
CONSTRAINT fk_usuario_jugador FOREIGN KEY(usuario) REFERENCES usuarios(id_usuario)
);