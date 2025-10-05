import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button, Input, Label } from "@/components/ui/registry";
import type { Training } from "@/types";

interface AddTrainingDialogProps {
	onAdd: (training: Pick<Training, "name">) => void;
}

export function AddTrainingDialog({ onAdd }: AddTrainingDialogProps) {
	const [open, setOpen] = useState(false);
	const [name, setName] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!name.trim()) return;

		onAdd({ name });
		setName("");
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="w-full" dir="auto">
					Add New Training
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle dir="auto">Add New Training</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="grid gap-4 py-4">
					<div className="grid gap-2">
						<Label htmlFor="name" dir="auto">
							Training Name
						</Label>
						<Input
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Enter training name"
							dir="auto"
						/>
					</div>
					<Button type="submit" dir="auto">
						Add Training
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
