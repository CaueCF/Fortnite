import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup className="gap-2.5">
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Crie sua conta</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Preencha os campos abaixo para se registrar
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name">Nome</FieldLabel>
          <Input id="name" type="text" placeholder="João" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Senha</FieldLabel>
          <Input id="password" type="password" required />
          <FieldDescription>
            Deve ter pelo menos 8 caracteres.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirme sua senha</FieldLabel>
          <Input id="confirm-password" type="password" required />
          <FieldDescription>Por favor, confirme sua senha.</FieldDescription>
        </Field>
        <Field>
          <Button type="submit">Criar conta</Button>
        </Field>
        <FieldSeparator />
        <Field>
          <FieldDescription className="px-6 text-center">
           Já tem uma conta? <a href="/login">Entrar</a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
