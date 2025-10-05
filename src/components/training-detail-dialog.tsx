import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
} from "@/components/ui/form";
import { Button, Input } from "@/components/ui/registry";
import type { Training, TrainingSet } from "@/types";
import { useForm } from "react-hook-form";

interface TrainingDetailDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	training: Training;
	onAddSet: (trainingId: string, set: Omit<TrainingSet, "date">) => void;
}

interface SetFormData {
	reps: number;
	weight?: number;
	notes?: string;
}

export function TrainingDetailDialog({
	open,
	onOpenChange,
	training,
	onAddSet,
}: TrainingDetailDialogProps) {
	const form = useForm<SetFormData>({
		defaultValues: {
			reps: 0,
			weight: undefined,
			notes: "",
		},
	});

	const onSubmit = (data: SetFormData) => {
		onAddSet(training.id, data);
		form.reset();
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle dir="auto">{training.name}</DialogTitle>
				</DialogHeader>

				<div className="space-y-6">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<FormField
								control={form.control}
								name="reps"
								render={({ field }) => (
									<FormItem>
										<FormLabel dir="auto">Reps</FormLabel>
										<FormControl>
											<Input
												type="number"
												min={0}
												{...field}
												onChange={(e) => field.onChange(Number(e.target.value))}
												dir="auto"
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="weight"
								render={({ field }) => (
									<FormItem>
										<FormLabel dir="auto">Weight (optional)</FormLabel>
										<FormControl>
											<Input
												type="number"
												min={0}
												{...field}
												onChange={(e) => field.onChange(Number(e.target.value))}
												dir="auto"
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="notes"
								render={({ field }) => (
									<FormItem>
										<FormLabel dir="auto">Notes (optional)</FormLabel>
										<FormControl>
											<Input {...field} dir="auto" />
										</FormControl>
									</FormItem>
								)}
							/>

							<Button type="submit" dir="auto">
								Add Set
							</Button>
						</form>
					</Form>

					<div className="mt-6">
						<h4 className="text-sm font-medium mb-4" dir="auto">
							Previous Sets
						</h4>
						<div className="space-y-2">
							{training.sets.map((set, index) => (
								<div
									key={index}
									className="text-sm p-2 bg-muted rounded-md"
									dir="auto"
								>
									<p>Reps: {set.reps}</p>
									{set.weight && <p>Weight: {set.weight}</p>}
									{set.notes && <p>Notes: {set.notes}</p>}
									<p className="text-xs text-muted-foreground">
										{new Date(set.date).toLocaleString()}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
