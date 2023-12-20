export interface HttpAdapter {
  get<t>(url: string): Promise<t>;
  post<t>(url: string, data: any): Promise<t>;
  put<t>(url: string, data: any): Promise<t>;
  delete<t>(url: string): Promise<t>;
}
