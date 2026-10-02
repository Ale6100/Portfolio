// components\contact\Contacto.tsx

'use client'

import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { EMAIL_CONTACTO, enviarMensaje } from "@/lib/contact";
import { toast } from "sonner";
import { useId } from "react";
import { Loader2, Send } from "lucide-react";

const formSchema = z.object({
  nombre: z.string()
    .min(1, { message: "El nombre es requerido" })
    .max(100, { message: "Carácteres máximos excedidos" }),
  email: z.email({ message: "Formato de correo inválido" }),
  mensaje: z.string().min(1, { message: "El mensaje es requerido" }),
  botcheck: z.boolean()
})

type FormSchema = z.infer<typeof formSchema>;

const inputClassName = "h-10 bg-card";

export default function Contact() {
  const toastId = useId();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      email: "",
      mensaje: "",
      botcheck: false
    }
  });

  const handleSubmit = async (values: FormSchema) => {
    toast.loading("Enviando mensaje...", { id: toastId });
    const enviado = await enviarMensaje(values);

    if (!enviado) {
      return toast.error(`No se pudo enviar el mensaje. Podés escribirme directamente a ${EMAIL_CONTACTO}`, { id: toastId });
    }

    toast.success("Mensaje enviado con éxito", { id: toastId });
    form.reset();
  }

  const isSubmitting = form.formState.isSubmitting;

  return (
    <div className="max-w-xl">
      <p className="mb-8 text-base text-muted-foreground text-pretty sm:text-lg">
        ¿Tenés una propuesta, una consulta o simplemente querés saludar? Escribime por acá o a <a href={`mailto:${EMAIL_CONTACTO}`} className="font-medium text-foreground underline decoration-brand/50 underline-offset-4 hover:decoration-brand transition-colors">{EMAIL_CONTACTO}</a>.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} noValidate className="space-y-5">
          <input {...form.register("botcheck")} type="checkbox" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="required">Nombre</FormLabel>
                  <FormControl>
                    <Input {...field} className={inputClassName} placeholder="Tu nombre" autoComplete="name" required />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="required">Correo electrónico</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" className={inputClassName} placeholder="tu@email.com" autoComplete="email" required />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="mensaje"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="required">Mensaje</FormLabel>
                <FormControl>
                  <Textarea {...field} className="min-h-32 resize-y bg-card" placeholder="Tu mensaje..." required />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            size="lg"
            className="h-10 cursor-pointer px-5"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" data-icon="inline-start" />
                Enviando...
              </>
            ) : (
              <>
                Enviar mensaje
                <Send data-icon="inline-end" />
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
