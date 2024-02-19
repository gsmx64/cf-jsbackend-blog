/**
 * Extends the Express Request interface to include additional properties.
 */
declare namespace Express {
  interface Request {
    idUser: string;
    roleUser: string;
  }
}