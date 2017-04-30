/* eslint-disable no-template-curly-in-string, max-len */
const fr = {
  status: {
    success: 'Le formulaire est correctement complété.',
    error: 'Veuillez corriger les erreurs.',
  },
  errors: {
    defaultLabel: 'Ce champs',
    rules: {
      required: '${label} est requis.',
      email: '${label} n’est pas une adresse email valide.',
      url: '${label} n’est pas une URL valide.',
      number: '${label} doit être un nombre.',
      min: '${label} doit être inférieur ou égal à ${value0}.',
      max: '${label} doit être supérieur ou égal à ${value0}.',
      minmax: '${label} doit être compris entre ${value0} et ${value1}.',
      minlength: '${label} doit avoir au minimum ${value0} caractères.',
      maxlength: '${label} doit avoir au maximum ${value0} caractères.',
      minmaxlength: '${label} doit avoir entre ${value0} et ${value1} caractères.',
      pattern: '${label} doit correspondre au motif ${value0}.',
    },
  },
};
/* eslint-enable no-template-curly-in-string, max-len */

export default fr;
