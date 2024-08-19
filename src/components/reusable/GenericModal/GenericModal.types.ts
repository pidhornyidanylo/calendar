export type GenericModalProps = {
  open: boolean;
  setOpen: () => void;
  children: React.ReactNode;
  forPDFPreview?: boolean;
};
