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

import * as React from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  name: z.string(),
  email: z.email({ error: "Por favor insira um formato de email válido!" }),
  senha: z.string()
    .min(8, { error: "Sua senha deve ter pelo menos 8 caracteres!" }),
  confirmSenha: z.string(),
})
  .refine((data) => data.senha === data.confirmSenha,
    {
      error: "As senhas não coincidem!",
      path: ["confirmSenha"],

      when(payload) {
        return formSchema
          .pick({ senha: true, confirmSenha: true })
          .safeParse(payload.value).success;
      },
    }
  );

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      senha: "",
      confirmSenha: "",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const request = await fetch('http://localhost:3030/credenciais/createCredenciais',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            {
              nome: data.name, 
              email: data.email,
              senha: data.senha
            }
          ),
        }
      )

      if (request.status == 422) {
        form.setError('email', { message: await request.text() });
        return
      }

      router.replace('/login');

    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup className="gap-2.5">
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Crie sua conta</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Preencha os campos abaixo para se registrar
          </p>
        </div>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor="name_label">Nome</FieldLabel>
              <Input
                {...field}
                id="name_input"
                aria-invalid={fieldState.invalid}
                placeholder="João"
                autoComplete="off"
                required />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )} />
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email_label">Email</FieldLabel>
              <Input
                {...field}
                id="email_input"
                aria-invalid={fieldState.invalid}
                placeholder="joao@exemplo.com"
                autoComplete="off"
                required />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )} />
        <Controller
          name="senha"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password_label">Senha</FieldLabel>
              <Input
                {...field}
                id="password_input"
                type="password"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                required />
              {!fieldState.error ? <FieldDescription>
                Deve ter pelo menos 8 caracteres.
              </FieldDescription> :
                <FieldError errors={[fieldState.error]} />
              }
            </Field>
          )} />
        <Controller
          name="confirmSenha"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="confirmSenha_label">Confirme sua senha</FieldLabel>
              <Input
              {...field}
                id="confirmSenha_input"
                type="password"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                required />

              {fieldState.invalid ?
                <FieldError errors={[fieldState.error]} /> :
                <FieldDescription>Por favor, confirme sua senha.</FieldDescription>
              }
            </Field>
          )}
        />
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
