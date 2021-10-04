export default class Patient {
  id: string;
  prenom: string;
  nom: string;
  email: string;
  address: string;
  telephone: {
    mobile: string;
    fixe: string;
    autre: string;
  }
  personContact: string;
  dateNaissance: Date;
  commentaire: string;
}
