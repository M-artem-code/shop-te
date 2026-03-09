class AmountPayment {
  value: number;
  currency: string;
}

class ObjectPayment {
  id: string;
  status: string;
  amount: AmountPayment;
  payment_method: {
    type: string;
    id: string;
    saved: boolean;
    title: string;
    card: object;
  };
  created_at: string;
  expires_at: string;
  description: string;
}

export class PaymentStatusDto {
  event: string;
  type: string;
  object: ObjectPayment;
}
