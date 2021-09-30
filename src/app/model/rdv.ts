import {RdvStatus} from "./enums/rdv-status";
import Infirmiere from "./infirmiere";

export default class Rdv {
  id: string;
  statut: RdvStatus = RdvStatus.SOUHAITE;
  infirmiereId: string;
  infirmiere: Infirmiere;
  date: Date;
}
