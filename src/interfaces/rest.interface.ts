export interface IREST {
  findAll(): Promise<any>;
  findOne(id: number): Promise<any>;
  create(body: any): Promise<any>;
  update(id: number, body: any): Promise<any>;
  delete(id: number): Promise<any>;
}
