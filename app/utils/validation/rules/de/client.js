const constraints = {
  firstName: {
    presence: {
      message: '^Introduzca el(los) Nombre(s)',
      allowEmpty: false,
    },
    format: {
      pattern: /^[A-Za-z\s]+$/,
      message: '^Solamente letras',
    },
  },
  lastName: {
    presence: {
      message: '^Introduzca el Apellido Paterno',
      allowEmpty: false,
    },
    format: {
      pattern: /^[A-Za-z\s]+$/,
      message: '^Solamente letras',
    },
  },
  motherLastName: {
    presence: {
      message: '^Introduzca el Apellido Materno',
      allowEmpty: false,
    },
    format: {
      pattern: /^[A-Za-z\s]+$/,
      message: '^Solamente letras',
    },
  },
  marriedName: {
    format: {
      pattern: /^$|^[A-Za-z\s]+$/,
      message: '^Solamente letras',
    },
  },
  dni: {
    presence: {
      message: '^Introduzca el Doc. de Identidad',
      allowEmpty: false,
    },
    numericality: {
      strict: true,
      onlyInteger: true,
      message: '^Introduzca solo números'
    },
  },
  complement: {
    format: {
      pattern: /^$|^[A-Za-z0-9]+$/,
      message: '^Solamente alfanuméricos',
    },
  },
  extension: {
    presence: {
      message: '^Seleccione la Extensión',
      allowEmpty: false,
    },
  },
  birthdate: {
    presence: {
      message: '^Introduzca la Fecha de Nacimiento',
      allowEmpty: false,
    },
  },
  placeResidence: {
    presence: {
      message: '^Introduzca el Lugar de Nacimiento',
      allowEmpty: false,
    },
    format: {
      pattern: /^[ñÑ\w\s-]+$/,
      message: '^Solamente alfanuméricos',
    },
  },
  locality: {
    presence: {
      message: '^Introduzca la Localidad',
      allowEmpty: false,
    },
    format: {
      pattern: /^[ñÑ\w\s-]+$/,
      message: '^Solamente alfanuméricos',
    },
  },
  homeAddress: {
    presence: {
      message: '^Introduzca la Dirección',
      allowEmpty: false,
    },
    format: {
      pattern: /^[ñÑ\w\s-.:°º,\/]+$/,
      message: '^Solamente alfanuméricos',
    },
  },
  businessAddress: {
    presence: {
      message: '^Introduzca la Dirección laboral',
      allowEmpty: false,
    },
    format: {
      pattern: /^[ñÑ\w\s-.:°º,\/]+$/,
      message: '^Solamente alfanuméricos',
    },
  },
  workplace: {
    presence: {
      message: '^Introduzca el Lugar de trabajo',
      allowEmpty: false,
    },
    format: {
      pattern: /^[ñÑ\w\s-.]+$/,
      message: '^Solamente alfanuméricos',
    },
  },
  occupationDescription: {
    presence: {
      message: '^Introduzca la Descripción de actividad',
      allowEmpty: false,
    },
    format: {
      pattern: /^[ñÑ\w\s-.,\/]+$/,
      message: '^Solamente alfanuméricos',
    },
  },
  phoneNumberHome: {
    presence: {
      message: '^Introduzca el Teléfono 1',
      allowEmpty: false,
    },
    format: {
      pattern: /^[\d]{7,12}$/,
      message: '^Solamente números',
    },
  },
  phoneNumberMobile: {
    format: {
      pattern: /^$|^[\d]{7,12}$/,
      message: '^Solamente números',
    },
  },
  phoneNumberOffice: {
    format: {
      pattern: /^$|^[\d]{7,12}$/,
      message: '^Solamente números',
    },
  },
  email: {
    format: {
      pattern: /^$|^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$/,
      message: 'Introduzca un correo electrónico válido',
    },
  },
  weight: {
    presence: {
      message: '^Introduzca el Peso.',
      allowEmpty: false,
    },
    numericality: {
      strict: true,
      onlyInteger: true,
      message: '^Introduzca solo números.'
    },
  },
  height: {
    presence: {
      message: '^Introduzca la Estatura.',
      allowEmpty: false,
    },
    numericality: {
      strict: true,
      onlyInteger: true,
      message: '^Introduzca solo números.'
    },
  },
};

export default constraints;