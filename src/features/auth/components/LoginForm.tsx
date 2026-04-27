import { cn } from "@shared/utils/cn";

import { Button } from "@shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@shared/components/ui/field";
import { Input } from "@shared/components/ui/input";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Bienvenido de nuevo</CardTitle>
          <CardDescription>
            Inicia sesión con tu usuario o correo electrónico de Merklys
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="emailOrUsername">
                  Usuario o correo electrónico
                </FieldLabel>
                <Input
                  id="emailOrUsername"
                  type="text"
                  placeholder="user@merklys.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </Field>
              <Field>
                <Button type="submit">Iniciar sesión</Button>
                <FieldDescription className="text-center">
                  ¿Necesitas ayuda para iniciar sesión?{" "}
                  <a href="#">Contacta a soporte</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
