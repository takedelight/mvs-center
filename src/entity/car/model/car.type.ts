export interface Car {
  id: string;
  vin: string;
  brand: string;
  modelName: string;
  plateNumber: string;
  year: number;

  createdAt: Date;
  updatedAt: Date;
}
