// backend/src/types/express.d.ts

declare global {
    namespace Express {
      export interface Request {
        user?: {
          userId: string;
          email: string;
        };
      }
    }
  }
  
  // This export is necessary to make the file a module
  export {};