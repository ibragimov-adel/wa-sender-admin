import IEvent from './IEvent';

export default interface IRecipient {
  id: number;
  firstName: string;
  secondName: string | null;
  lastName: string | null;
  birthDate: number | null;
  birthMonth: number | null;
  phone: string;
  events: IEvent[];
}
