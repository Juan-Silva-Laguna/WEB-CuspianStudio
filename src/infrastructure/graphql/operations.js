import { gql } from '@apollo/client/core';

// ─── AUTH ────────────────────────────────────────────────────────────────────

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      usuario {
        id
        nombre
        email
        rol
      }
    }
  }
`;

export const REGISTRARME = gql`
  mutation Registrarme($input: CrearUsuarioInput!) {
    registrarme(input: $input) {
      token
      usuario {
        id
        nombre
        email
        rol
      }
    }
  }
`;

export const ME = gql`
  query Me {
    me {
      id
      nombre
      email
      rol
    }
  }
`;

// ─── USUARIOS ────────────────────────────────────────────────────────────────

export const GET_USUARIOS = gql`
  query GetUsuarios {
    usuarios {
      id
      nombre
      email
      rol
      activo
      createdAt
    }
  }
`;

export const GET_USUARIO = gql`
  query GetUsuario($id: ID!) {
    usuario(id: $id) {
      id
      nombre
      email
      rol
      activo
      createdAt
    }
  }
`;

export const ACTUALIZAR_USUARIO = gql`
  mutation ActualizarUsuario($id: ID!, $input: ActualizarUsuarioInput!) {
    actualizarUsuario(id: $id, input: $input) {
      id
      nombre
      email
      rol
      activo
    }
  }
`;

export const CREAR_ENTRENADOR = gql`
  mutation CrearEntrenador($input: CrearEntrenadorInput!) {
    crearEntrenador(input: $input) {
      id
      nombre
      email
      especialidad
      activo
    }
  }
`;

export const GET_ENTRENADORES = gql`
  query GetEntrenadores {
    entrenadores {
      id
      nombre
      email
      especialidad
      activo
    }
  }
`;

export const GET_ENTRENADOR = gql`
  query GetEntrenador($id: ID!) {
    entrenador(id: $id) {
      id
      nombre
      email
      especialidad
      activo
    }
  }
`;

export const ACTUALIZAR_ENTRENADOR = gql`
  mutation ActualizarEntrenador($id: ID!, $input: ActualizarEntrenadorInput!) {
    actualizarEntrenador(id: $id, input: $input) {
      id
      nombre
      email
      especialidad
      activo
    }
  }
`;

// ─── SALAS ───────────────────────────────────────────────────────────────────

export const GET_SALAS = gql`
  query GetSalas {
    salas {
      id
      nombre
      capacidad
      descripcion
      activa
    }
  }
`;

export const CREAR_SALA = gql`
  mutation CrearSala($input: CrearSalaInput!) {
    crearSala(input: $input) {
      id
      nombre
      capacidad
      descripcion
      activa
    }
  }
`;

export const ACTUALIZAR_SALA = gql`
  mutation ActualizarSala($id: ID!, $input: ActualizarSalaInput!) {
    actualizarSala(id: $id, input: $input) {
      id
      nombre
      capacidad
      descripcion
      activa
    }
  }
`;

// ─── SERVICIOS ───────────────────────────────────────────────────────────────

export const GET_SERVICIOS = gql`
  query GetServicios {
    servicios {
      id
      nombre
      descripcion
      precio
      activo
    }
  }
`;

export const CREAR_SERVICIO = gql`
  mutation CrearServicio($input: CrearServicioInput!) {
    crearServicio(input: $input) {
      id
      nombre
      descripcion
      precio
      activo
    }
  }
`;

export const ACTUALIZAR_SERVICIO = gql`
  mutation ActualizarServicio($id: ID!, $input: ActualizarServicioInput!) {
    actualizarServicio(id: $id, input: $input) {
      id
      nombre
      descripcion
      precio
      activo
    }
  }
`;

// ─── PLANES ──────────────────────────────────────────────────────────────────

export const GET_PLANES = gql`
  query GetPlanes {
    planes {
      id
      nombre
      tipo
      precio
      duracionDias
      activo
    }
  }
`;

export const CREAR_PLAN = gql`
  mutation CrearPlan($input: CrearPlanInput!) {
    crearPlan(input: $input) {
      id
      nombre
      tipo
      precio
      duracionDias
      activo
    }
  }
`;

export const ACTUALIZAR_PLAN = gql`
  mutation ActualizarPlan($id: ID!, $input: ActualizarPlanInput!) {
    actualizarPlan(id: $id, input: $input) {
      id
      nombre
      tipo
      precio
      duracionDias
      activo
    }
  }
`;

// ─── HORARIOS ────────────────────────────────────────────────────────────────

export const GET_HORARIOS = gql`
  query GetHorarios {
    horarios {
      id
      fecha
      hora
      entrenador {
        id
        nombre
      }
      sala {
        id
        nombre
      }
      servicio {
        id
        nombre
      }
      capacidad
      reservas
      activo
    }
  }
`;

export const GET_HORARIOS_DISPONIBLES = gql`
  query GetHorariosDisponibles {
    horariosDisponibles {
      id
      fecha
      hora
      entrenador {
        id
        nombre
      }
      sala {
        id
        nombre
      }
      servicio {
        id
        nombre
      }
      capacidad
      reservas
    }
  }
`;

export const CREAR_HORARIO = gql`
  mutation CrearHorario($input: CrearHorarioInput!) {
    crearHorario(input: $input) {
      id
      fecha
      hora
      capacidad
      activo
    }
  }
`;

export const ACTUALIZAR_HORARIO = gql`
  mutation ActualizarHorario($id: ID!, $input: ActualizarHorarioInput!) {
    actualizarHorario(id: $id, input: $input) {
      id
      fecha
      hora
      capacidad
      activo
    }
  }
`;

export const ELIMINAR_HORARIO = gql`
  mutation EliminarHorario($id: ID!) {
    eliminarHorario(id: $id) {
      id
    }
  }
`;

export const MIS_HORARIOS = gql`
  query MisHorarios {
    misHorarios {
      id
      fecha
      hora
      sala {
        id
        nombre
      }
      servicio {
        id
        nombre
      }
      capacidad
      reservas
    }
  }
`;

// ─── RESERVAS ────────────────────────────────────────────────────────────────

export const GET_RESERVAS = gql`
  query GetReservas {
    reservas {
      id
      usuario {
        id
        nombre
      }
      horario {
        id
        fecha
        hora
      }
      estado
      createdAt
    }
  }
`;

export const GET_RESERVAS_POR_FECHA = gql`
  query GetReservasPorFecha($fecha: String!) {
    reservasPorFecha(fecha: $fecha) {
      id
      usuario {
        id
        nombre
      }
      horario {
        id
        fecha
        hora
      }
      estado
    }
  }
`;

export const CREAR_RESERVA = gql`
  mutation CrearReserva($horarioId: ID!) {
    crearReserva(horarioId: $horarioId) {
      id
      estado
      createdAt
    }
  }
`;

export const RESERVAR_SERVICIO_PUNTUAL = gql`
  mutation ReservarServicioPuntual($servicioId: ID!, $fecha: String!, $hora: String!) {
    reservarServicioPuntual(servicioId: $servicioId, fecha: $fecha, hora: $hora) {
      id
      estado
      createdAt
    }
  }
`;

export const CANCELAR_RESERVA = gql`
  mutation CancelarReserva($id: ID!) {
    cancelarReserva(id: $id) {
      id
      estado
    }
  }
`;

export const MIS_RESERVAS = gql`
  query MisReservas {
    misReservas {
      id
      horario {
        id
        fecha
        hora
        servicio {
          nombre
        }
      }
      estado
      createdAt
    }
  }
`;

export const RESERVAS_POR_HORARIO = gql`
  query ReservasPorHorario($horarioId: ID!) {
    reservasPorHorario(horarioId: $horarioId) {
      id
      usuario {
        id
        nombre
      }
      estado
      asistencia
    }
  }
`;

export const MARCAR_ASISTENCIA = gql`
  mutation MarcarAsistencia($reservaId: ID!, $asistio: Boolean!) {
    marcarAsistencia(reservaId: $reservaId, asistio: $asistio) {
      id
      asistencia
    }
  }
`;

// ─── SUSCRIPCIONES ───────────────────────────────────────────────────────────

export const GET_SUSCRIPCIONES = gql`
  query GetSuscripciones {
    suscripciones {
      id
      usuario {
        id
        nombre
      }
      plan {
        id
        nombre
        tipo
      }
      fechaInicio
      fechaFin
      activa
    }
  }
`;

export const SUSCRIBIRME = gql`
  mutation Suscribirme($planId: ID!) {
    suscribirme(planId: $planId) {
      id
      fechaInicio
      fechaFin
      activa
    }
  }
`;

export const MI_SUSCRIPCION = gql`
  query MiSuscripcion {
    miSuscripcion {
      id
      plan {
        id
        nombre
        tipo
      }
      fechaInicio
      fechaFin
      activa
    }
  }
`;

export const RENOVAR_SUSCRIPCION = gql`
  mutation RenovarSuscripcion($suscripcionId: ID!) {
    renovarSuscripcion(suscripcionId: $suscripcionId) {
      id
      fechaInicio
      fechaFin
      activa
    }
  }
`;

export const ACTIVAR_SUSCRIPCION = gql`
  mutation ActivarSuscripcion($suscripcionId: ID!) {
    activarSuscripcion(suscripcionId: $suscripcionId) {
      id
      activa
    }
  }
`;

// ─── PAGOS ───────────────────────────────────────────────────────────────────

export const GET_PAGOS = gql`
  query GetPagos {
    pagos {
      id
      usuario {
        id
        nombre
      }
      monto
      concepto
      fecha
      metodo
    }
  }
`;

export const REGISTRAR_PAGO = gql`
  mutation RegistrarPago($input: RegistrarPagoInput!) {
    registrarPago(input: $input) {
      id
      monto
      concepto
      fecha
      metodo
    }
  }
`;

export const MIS_PAGOS = gql`
  query MisPagos {
    misPagos {
      id
      monto
      concepto
      fecha
      metodo
    }
  }
`;

// ─── GASTOS ENTRENADORES ─────────────────────────────────────────────────────

export const GET_GASTOS = gql`
  query GetGastos {
    gastos {
      id
      entrenador {
        id
        nombre
      }
      monto
      concepto
      fecha
    }
  }
`;

export const GET_GASTOS_POR_ENTRENADOR = gql`
  query GetGastosPorEntrenador($entrenadorId: ID!) {
    gastosPorEntrenador(entrenadorId: $entrenadorId) {
      id
      monto
      concepto
      fecha
    }
  }
`;

export const REGISTRAR_GASTO = gql`
  mutation RegistrarGasto($input: RegistrarGastoInput!) {
    registrarGasto(input: $input) {
      id
      monto
      concepto
      fecha
    }
  }
`;

export const ACUMULADO_ENTRENADOR = gql`
  query AcumuladoEntrenador($entrenadorId: ID!) {
    acumuladoEntrenador(entrenadorId: $entrenadorId) {
      total
      pagado
      pendiente
    }
  }
`;

export const PAGOS_POR_ENTRENADOR = gql`
  query PagosPorEntrenador($entrenadorId: ID!) {
    pagosPorEntrenador(entrenadorId: $entrenadorId) {
      id
      monto
      concepto
      fecha
    }
  }
`;

// ─── REPORTES ────────────────────────────────────────────────────────────────

export const REPORTE_VENTAS = gql`
  query ReporteVentas($fechaInicio: String!, $fechaFin: String!) {
    reporteVentas(fechaInicio: $fechaInicio, fechaFin: $fechaFin) {
      totalIngresos
      totalGastos
      utilidad
      pagos {
        id
        monto
        concepto
        fecha
      }
    }
  }
`;
