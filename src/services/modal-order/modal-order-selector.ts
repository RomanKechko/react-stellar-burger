export const nubers = (state: any) =>
  (state.modalOrder.status?.order.number as number) || null;
export const download = (state: any) => state.modalOrder?.loading as boolean;
export const authorizationUser = (state: any) =>
  state.modalOrder.authorizationPage as boolean;
