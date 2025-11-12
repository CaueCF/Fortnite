import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  email: z.email({ error: "Por favor insira um formato de email válido!" }),
  senha: z.string(),
})

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      senha: "",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const response = await fetch('http://localhost:3030/credenciais/login/auth',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
          credentials: "include",
        }
      )

      if (!response.ok) {
        form.setError('email', { message: "Credenciais inválidas" });
        form.setError('senha', { message: "Credenciais inválidas" });
        return
      }
      else{
        //console.log(await response.json());
        
      }

      return router.replace('/');

    } catch (error) {
      console.log(error);

    }
  }

  return (
    <form
      className={cn("flex flex-col gap-4", className)}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Logue na sua conta</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Entre seu email para fazer login
          </p>
        </div>
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...field}
                id="email_input"
                placeholder="m@example.com"
                aria-invalid={fieldState.invalid}
                required />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>

          )}
        />
        <Controller
          control={form.control}
          name="senha"
          render={({ field, fieldState }) => (
            <Field>
              <div className="flex items-center">
                <FieldLabel htmlFor="password_label">Senha</FieldLabel>
                <a
                  href="#"
                  className="ml-auto text-sm underline-offset-4 hover:underline"
                >
                  Esqueceu sua senha?
                </a>
              </div>
              <Input
                {...field}
                id="password_input"
                type="password"
                required />
            </Field>
          )}
        />
        <Field>
          <Button type="submit">Login</Button>
        </Field>
        <FieldSeparator />
        <Field>
          <FieldDescription className="text-center">
            Ainda não tem conta?{" "}
            <a href="/signup" className="underline underline-offset-4">
              Resgistre-se
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
