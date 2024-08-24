export type AutoDeleteSelectPropsType = {
  value: "daily" | "weekly" | "monthly" | "yearly";
  token: string;
};

export type HandleChangeType = (
  event:
    | React.MouseEvent<Element>
    | React.KeyboardEvent<Element>
    | React.FocusEvent<Element>
    | null,
  newValue: "daily" | "weekly" | "monthly" | "yearly" | null
) => void;
