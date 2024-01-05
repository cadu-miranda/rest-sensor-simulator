import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";

const validateRequest =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      await schema.validate(body);

      return next();
    } catch (error: any) {
      return res.status(422).json({ path: error.path, errors: error.errors });
    }
  };

export { validateRequest };
