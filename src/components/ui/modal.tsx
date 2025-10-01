/**
 * @fileoverview Modal padrão do design system
 * @description Componente base para modais e diálogos
 */

'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

import { cn } from '@/lib/utils';

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

/**
 * Overlay do modal que escurece o fundo.
 *
 * @param {React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>} props
 * @returns {JSX.Element} Overlay do modal renderizado
 */
const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

/**
 * Conteúdo principal do modal.
 *
 * @param {React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>} props
 * @returns {JSX.Element} Conteúdo do modal renderizado
 */
const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground'>
        <X className='h-4 w-4' />
        <span className='sr-only'>Fechar</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

/**
 * Cabeçalho do modal.
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props
 * @returns {JSX.Element} Cabeçalho do modal renderizado
 */
const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

/**
 * Rodapé do modal.
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props
 * @returns {JSX.Element} Rodapé do modal renderizado
 */
const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

/**
 * Título do modal.
 *
 * @param {React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>} props
 * @returns {JSX.Element} Título do modal renderizado
 */
const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

/**
 * Descrição do modal.
 *
 * @param {React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>} props
 * @returns {JSX.Element} Descrição do modal renderizada
 */
const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

/**
 * Componente Modal padrão do sistema.
 * Baseado no Radix UI com customizações para o design system.
 *
 * @example
 * ```tsx
 * // Modal básico
 * <Modal open={isOpen} onOpenChange={setIsOpen}>
 *   <ModalContent>
 *     <ModalHeader>
 *       <ModalTitle>Título do Modal</ModalTitle>
 *       <ModalDescription>Descrição do que o modal faz</ModalDescription>
 *     </ModalHeader>
 *     <div className="py-4">
 *       Conteúdo do modal
 *     </div>
 *     <ModalFooter>
 *       <Button variant="outline" onClick={() => setIsOpen(false)}>
 *         Cancelar
 *       </Button>
 *       <Button onClick={handleSubmit}>Confirmar</Button>
 *     </ModalFooter>
 *   </ModalContent>
 * </Modal>
 *
 * // Modal com trigger
 * <Modal>
 *   <ModalTrigger asChild>
 *     <Button>Abrir Modal</Button>
 *   </ModalTrigger>
 *   <ModalContent>
 *     <ModalHeader>
 *       <ModalTitle>Modal com Trigger</ModalTitle>
 *     </ModalHeader>
 *   </ModalContent>
 * </Modal>
 * ```
 */
export {
  Dialog as Modal,
  DialogPortal as ModalPortal,
  DialogOverlay as ModalOverlay,
  DialogClose as ModalClose,
  DialogTrigger as ModalTrigger,
  DialogContent as ModalContent,
  DialogHeader as ModalHeader,
  DialogFooter as ModalFooter,
  DialogTitle as ModalTitle,
  DialogDescription as ModalDescription,
};
