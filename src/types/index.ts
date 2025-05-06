export type ActionResponse = {
  success: boolean;
  message: string;
  redirectTo?: string;
};

export type JosePayload = {
  id: string;
  isAdmin: boolean;
}