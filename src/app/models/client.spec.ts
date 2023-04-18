import { Client } from './client';

describe('Client', () => {
  it('should create an instance', () => {
    expect(new Client(1,"","","","","","","","",0,false,"logo")).toBeTruthy();
  });
});
