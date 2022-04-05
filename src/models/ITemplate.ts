import IEvent from './IEvent';

export default interface ITemplate {
  id: number;
  name: string;
  text: string;
  event: IEvent;
}
