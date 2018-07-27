const constraints = {
  coverage: {
    presence: {
      message: '^Seleccione la Cobertura',
      allowEmpty: false,
    },
  },
  amountRequested: {
    presence: {
      message: '^Introduzca el Monto Solicitado',
      allowEmpty: false,
    },
    numericality: {
      strict: true,
      message: '^Introduzca solo números'
    },
  },
  currency: {
    presence: {
      message: '^Seleccione la Moneda',
      allowEmpty: false,
    },
  },
  term: {
    presence: {
      message: '^Introduzca el Plazo',
      allowEmpty: false,
    },
    numericality: {
      strict: true,
      onlyInteger: true,
      message: '^Introduzca solo números'
    },
  },
  termType: {
    presence: {
      message: '^Seleccione el Tipo de Plazo',
      allowEmpty: false,
    },
  },
  creditProduct: {
    presence: {
      message: '^Seleccione el Producto',
      allowEmpty: false,
    },
  },
};

export default constraints;