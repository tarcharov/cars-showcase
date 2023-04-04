export interface CardType {
  id: number;
  name: string;
  model: string;
  year: number;
  color: string;
  price: number;
  latitude: number;
  longitude: number;
  onDeleteClick: () => void;
  onChangeClick: (id: number, text: string, field: keyof CardType) => void;
}
