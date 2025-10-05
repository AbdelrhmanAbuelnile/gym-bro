import { Button as ButtonPrimitive } from "@/components/ui/button";
import { Card as CardPrimitive } from "@/components/ui/card";
import { Input as InputPrimitive } from "@/components/ui/input";
import { Label as LabelPrimitive } from "@/components/ui/label";

export const Button = (props: React.ComponentProps<typeof ButtonPrimitive>) => (
	<ButtonPrimitive dir="auto" {...props} />
);

export const Card = (props: React.ComponentProps<typeof CardPrimitive>) => (
	<CardPrimitive dir="auto" {...props} />
);

export const Input = (props: React.ComponentProps<typeof InputPrimitive>) => (
	<InputPrimitive dir="auto" {...props} />
);

export const Label = (props: React.ComponentProps<typeof LabelPrimitive>) => (
	<LabelPrimitive dir="auto" {...props} />
);
