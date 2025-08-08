// components\contact\Contacto.tsx

'use client'

import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { sendEmail } from "@/lib/contact";
import { toast } from "sonner";
import { useId } from "react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  nombre: z.string()
    .min(1, { message: "El nombre es requerido" })
    .max(100, { message: "Carácteres máximos excedidos" }),
  email: z.email({ message: "Formato de correo inválido" }),
  mensaje: z.string().min(1, { message: "El mensaje es requerido" })
})

type FormSchema = z.infer<typeof formSchema>;

export default function Contact() {
  const toastId = useId();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      email: "",
      mensaje: ""
    }
  });

  const handleSubmit = async (values: FormSchema) => {
    toast.loading("Enviando mensaje...", { id: toastId });
    const response = await sendEmail({ data: values });

    if (response?.status !== "success") {
      return toast.error("Servidor en mantenimiento. Si deseas comunicarte conmigo por favor contáctate a la dirección de mail alejandro_portaluppi@outlook.com", { id: toastId });
    }

    toast.success("Mensaje enviado con éxito", { id: toastId });
    form.reset();
  }

  const isSubmitting = form.formState.isSubmitting;

  const getSubmitButtonContent = () => {
    if (isSubmitting) {
      return (
        <>
          <Loader2 className="mr-1 h-4 w-4 animate-spin"/>
          Espere...
        </>
      );
    }

    return <span>Enviar</span>;
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-card/50 border border-border/30 rounded-xl p-6 hover:border-border/60 hover:bg-card/80 transition-all duration-300">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="required text-sm text-foreground/80">
                    Nombre
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="mt-1 bg-background/50 border border-border/50 focus:border-primary/60 transition-colors"
                      placeholder="Tu nombre"
                      required
                    />
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
                  <FormLabel className="required text-sm text-foreground/80">
                    Correo electrónico
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      className="mt-1 bg-background/50 border border-border/50 focus:border-primary/60 transition-colors"
                      placeholder="tu@email.com"
                      required
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mensaje"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="required text-sm text-foreground/80">
                    Mensaje
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="mt-1 min-h-[100px] resize-none bg-background/50 border border-border/50 focus:border-primary/60 transition-colors"
                      placeholder="Tu mensaje..."
                      required
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="cursor-pointer w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
              disabled={isSubmitting}
              title='Enviar mensaje'
            >
              {getSubmitButtonContent()}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
