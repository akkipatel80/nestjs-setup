import { Request } from 'express';

declare module 'express' {
  export interface Request {
    user?: string;
  }
}

type _Request = Request;
