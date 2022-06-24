export interface Notification {
  _id: string;
  title: string;
  body: string;
  data?: {
    uri?: string;
  };
  createdAt: Date;
}
